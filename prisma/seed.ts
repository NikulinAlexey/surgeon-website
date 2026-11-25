import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

const adapter = new PrismaPg({ connectionString: databaseUrl });
const db = new PrismaClient({ adapter });

const defaultFaq = [
  { id: "visit", question: "Как записаться на прием?", answer: "Уточните порядок записи по телефону или через администратора отделения." },
  { id: "services", question: "Какие услуги предоставляет отделение?", answer: "Перечень услуг и необходимые документы можно уточнить у администратора." },
  { id: "preparation", question: "Нужна ли подготовка к приему?", answer: "Если требуется предварительная подготовка, администратор сообщит об этом при записи." },
];

const pages = [
  { slug: "home", title: "Архангельский региональный урологический центр", subtitle: "Первый урологический центр Поморья.", body: "", faq: defaultFaq },
  { slug: "about", title: "О нас", subtitle: "Структура и подразделения центра", body: "<p>На этой странице размещаются сведения о центре, его структуре и подразделениях.</p>", faq: [] },
  { slug: "about/ambulatornoe-otdelenie", title: "Амбулаторное отделение", subtitle: "Информация об амбулаторном отделении", body: "<p>Отделение оказывает консультативную и диагностическую помощь. Порядок записи, перечень необходимых документов и график приёма уточняйте у администратора.</p><h2>Что взять с собой</h2><p>Возьмите паспорт, полис ОМС и имеющиеся результаты обследований. Если требуется специальная подготовка, администратор сообщит об этом при записи.</p>", faq: defaultFaq },
  { slug: "about/dnevnoy-stacionar", title: "Дневной стационар", subtitle: "Информация о дневном стационаре", body: "<p>В дневном стационаре проводятся обследования и лечебные процедуры, не требующие круглосуточного пребывания в больнице.</p><p>Направление, перечень документов, время визита и необходимую подготовку уточняйте у лечащего врача или администратора.</p>", faq: defaultFaq },
  { slug: "about/urologicheskoe-otdelenie", title: "Урологическое отделение", subtitle: "Информация об урологическом отделении", body: "<p>Отделение оказывает специализированную урологическую помощь. Объём обследования и лечения определяет врач с учётом клинической ситуации.</p><p>Условия госпитализации, необходимые документы и правила подготовки уточняйте у администратора отделения.</p>", faq: defaultFaq },
  { slug: "patients", title: "Пациентам", subtitle: "Информация для пациентов", body: "<p>Здесь публикуются сведения о порядке обращения, подготовке к приёму и работе подразделений. Актуальную информацию уточняйте у администратора.</p>", faq: defaultFaq },
  { slug: "specialists", title: "Специалистам", subtitle: "Материалы и информация для специалистов", body: "<p>В разделе публикуются статьи и профессиональные материалы центра.</p>", faq: [] },
  { slug: "conferences", title: "Конференции", subtitle: "Поморские урологические чтения", body: "<p>Здесь публикуются актуальные сведения о конференциях, программах и порядке участия. По вопросам участия используйте контакты центра.</p>", faq: [] },
  { slug: "contacts", title: "Контакты", subtitle: "Контактная информация центра", body: "", faq: [] },
  { slug: "privacy", title: "Политика конфиденциальности", subtitle: "", body: "<p>Администратор сайта обязан разместить здесь актуальную политику обработки персональных данных, согласованную с юристом медицинской организации.</p>", faq: [] },
  { slug: "terms", title: "Пользовательское соглашение", subtitle: "", body: "<p>Администратор сайта обязан разместить здесь актуальные условия использования сайта, согласованные с юристом медицинской организации.</p>", faq: [] },
];

async function main() {
  const existingAdmin = await db.user.findFirst({ where: { role: "ADMIN" } });
  if (!existingAdmin) {
    const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
    if (!email || !password || password.length < 12) {
      throw new Error("Set BOOTSTRAP_ADMIN_EMAIL and a BOOTSTRAP_ADMIN_PASSWORD of at least 12 characters");
    }
    await db.user.create({ data: {
      email,
      passwordHash: await hashPassword(password),
      firstName: "Администратор",
      lastName: "Сайта",
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    } });
    console.log(`Administrator created: ${email}`);
  }

  for (const page of pages) {
    await db.page.upsert({
      where: { slug: page.slug },
      create: { seoTitle: null, seoDescription: null, ...page },
      update: {},
    });
  }
  await db.siteSettings.upsert({
    where: { id: 1 },
    create: {
      phone: "",
      email: "info@doctor-androlog.ru",
      address: "163001, Архангельская обл., г. Архангельск, ул. Суворова, 1",
      workHours: "Пн–Пт: 9:00–18:00",
    },
    update: {},
  });
  console.log(`Seed complete: ${pages.length} editable pages`);
}

main().finally(() => db.$disconnect());
