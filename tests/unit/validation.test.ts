import { describe, expect, it } from "vitest";
import { contentSchema, doctorSchema, organizationInfoSchema, pageSchema, passwordSchema, profileSchema, registerSchema } from "../../src/lib/validation";

const validContent = {
  kind: "ARTICLE",
  slug: "valid-article",
  title: "Корректная статья",
  excerpt: "Достаточно длинное описание материала.",
  body: "<p>Текст</p>",
  status: "DRAFT",
  publishedAt: null,
};

const validProfile = {
  firstName: "Иван",
  lastName: "Иванов",
  patronymic: "",
  phone: "",
  birthDate: "",
};

const validRegistration = {
  ...validProfile,
  phone: "+79990000000",
  email: "user@example.com",
  password: "strong-password-123",
  agreePersonalData: true,
  agreeCommunication: false,
  ageConfirmed: true,
};

describe("server validation", () => {
  it("enforces password length and bcrypt input limit", () => {
    expect(passwordSchema.safeParse("short").success).toBe(false);
    expect(passwordSchema.safeParse("a".repeat(12)).success).toBe(true);
    expect(passwordSchema.safeParse("a".repeat(73)).success).toBe(false);
  });

  it("accepts a valid content payload", () => {
    expect(contentSchema.parse(validContent)).toMatchObject({ slug: "valid-article", status: "DRAFT" });
  });

  it.each(["not-a-date", "2026-99-99", "yesterday"])(
    "rejects invalid publication date %s",
    (publishedAt) => expect(contentSchema.safeParse({ ...validContent, publishedAt }).success).toBe(false),
  );

  it("rejects invalid slugs", () => {
    expect(contentSchema.safeParse({ ...validContent, slug: "../private" }).success).toBe(false);
    expect(contentSchema.safeParse({ ...validContent, slug: "Русский" }).success).toBe(false);
  });

  it("validates FAQ and revision restoration on pages", () => {
    const page = { title: "Пациентам", subtitle: "", body: "", faq: [{ id: "one", question: "Вопрос?", answer: "Ответ" }] };
    expect(pageSchema.parse(page)).toMatchObject({ title: "Пациентам" });
    expect(pageSchema.safeParse({ ...page, restoreRevisionId: "not-a-uuid" }).success).toBe(false);
  });

  it("allows an empty optional profile phone and validates a provided one", () => {
    expect(profileSchema.safeParse(validProfile).success).toBe(true);
    expect(profileSchema.safeParse({ ...validProfile, phone: "+79990000000" }).success).toBe(true);
    expect(profileSchema.safeParse({ ...validProfile, phone: "1" }).success).toBe(false);
  });

  it("keeps communication optional but requires privacy consent and adulthood", () => {
    expect(registerSchema.parse(validRegistration).agreeCommunication).toBe(false);
    expect(registerSchema.parse({ ...validRegistration, agreeCommunication: true }).agreeCommunication).toBe(true);
    expect(registerSchema.safeParse({ ...validRegistration, agreePersonalData: false }).success).toBe(false);
    expect(registerSchema.safeParse({ ...validRegistration, ageConfirmed: false }).success).toBe(false);
  });

  it("allows partial organization data for the compliance checklist", () => {
    expect(organizationInfoSchema.parse({}).fullName).toBe("");
    expect(organizationInfoSchema.parse({ licenseNumber: "ЛО-01-001234" }).licenseNumber).toBe("ЛО-01-001234");
  });

  it("requires education and qualification for every published doctor", () => {
    const doctor = { fullName: "Иван Иванов", position: "Врач", specialization: "Уролог", education: "Медицинский вуз", qualification: "Первая категория" };
    expect(doctorSchema.parse(doctor)).toMatchObject({ isPublished: true, sortOrder: 0 });
    expect(doctorSchema.safeParse({ ...doctor, education: "" }).success).toBe(false);
    expect(doctorSchema.safeParse({ ...doctor, qualification: "" }).success).toBe(false);
  });
});
