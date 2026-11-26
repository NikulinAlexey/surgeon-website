import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email("Введите корректный email").max(254);
export const passwordSchema = z.string().min(12, "Пароль должен содержать не менее 12 символов").max(72);
export const nameSchema = z.string().trim().min(2, "Минимум 2 символа").max(80);
export const phoneSchema = z.string().trim().min(6, "Введите телефон").max(30);

const birthDateSchema = z.string().optional().default("").refine((value) => {
  if (!value) return true;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.getUTCFullYear() >= 1900 && date <= new Date();
}, "Введите корректную дату рождения");

export function parseBirthDate(value: string) {
  return value ? new Date(`${value}T00:00:00.000Z`) : null;
}

export const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  patronymic: z.string().trim().max(80).optional().default(""),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
  birthDate: birthDateSchema,
  agreePersonalData: z.literal(true),
  agreeCommunication: z.literal(true),
});

export const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(72) });
export const emailOnlySchema = z.object({ email: emailSchema });
export const tokenSchema = z.object({ token: z.string().min(20).max(500) });
export const resetPasswordSchema = tokenSchema.extend({ password: passwordSchema });

export const profileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  patronymic: z.string().trim().max(80).optional().default(""),
  phone: z.union([z.literal(""), phoneSchema]),
  birthDate: birthDateSchema,
});

export const specialistRequestSchema = z.object({
  specialization: z.string().trim().min(2).max(160),
  experience: z.coerce.number().int().min(0).max(80),
  description: z.string().trim().min(20).max(5000),
});

export const verificationDecisionSchema = z.object({
  decision: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().trim().max(2000).optional().default(""),
});

export const userAdminSchema = z.object({
  action: z.enum(["BLOCK", "UNBLOCK", "SET_ROLE"]),
  role: z.enum(["PATIENT", "SPECIALIST", "EDITOR", "ADMIN"]).optional(),
});

export const contentSchema = z.object({
  kind: z.enum(["ARTICLE", "NEWS"]),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: латиница, цифры и дефисы").max(180),
  title: z.string().trim().min(3).max(220),
  excerpt: z.string().trim().min(10).max(1200),
  body: z.string().min(3).max(300_000),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  coverAlt: z.string().trim().max(240).optional().default(""),
  seoTitle: z.string().trim().max(220).optional().default(""),
  seoDescription: z.string().trim().max(500).optional().default(""),
  publishedAt: z.string().nullable().optional().refine(
    (value) => !value || !Number.isNaN(Date.parse(value)),
    "Введите корректную дату публикации",
  ),
});

export const faqSchema = z.array(z.object({
  id: z.string().min(1).max(80),
  question: z.string().trim().min(3).max(300),
  answer: z.string().trim().min(3).max(5000),
})).max(50);

export const pageSchema = z.object({
  title: z.string().trim().min(2).max(220),
  subtitle: z.string().trim().max(3000).default(""),
  body: z.string().max(300_000).default(""),
  faq: faqSchema.default([]),
  seoTitle: z.string().trim().max(220).default(""),
  seoDescription: z.string().trim().max(500).default(""),
  restoreRevisionId: z.string().uuid().optional(),
});

export const settingsSchema = z.object({
  phone: z.string().trim().max(40),
  email: z.union([z.literal(""), emailSchema]),
  address: z.string().trim().max(400),
  workHours: z.string().trim().max(200),
});
