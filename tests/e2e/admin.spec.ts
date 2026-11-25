import { expect, test } from "@playwright/test";

const adminEmail = process.env.BOOTSTRAP_ADMIN_EMAIL;
const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD;

test.skip(!adminEmail || !adminPassword, "Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD for local E2E");

test("admin creates and previews a private draft on desktop and mobile", async ({ page, request }) => {
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });

  await page.goto("/auth?next=/admin");
  await page.locator('input[name="email"]').fill(adminEmail!);
  await page.locator('input[name="password"]').fill(adminPassword!);
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/admin"),
    page.getByRole("button", { name: "Войти", exact: true }).click(),
  ]);
  await expect(page.getByRole("heading", { name: "Обзор" })).toBeVisible();
  const primaryButtonColor = await page.getByRole("link", { name: "Добавить материал" }).evaluate(
    (element) => getComputedStyle(element).color,
  );
  expect(primaryButtonColor).toBe("rgb(255, 255, 255)");
  const activeNavigationColor = await page.getByRole("link", { name: "Обзор", exact: true }).evaluate(
    (element) => getComputedStyle(element).color,
  );
  expect(activeNavigationColor).toBe("rgb(255, 255, 255)");

  await page.goto("/admin/content/new");
  const slug = `e2e-browser-${Date.now()}`;
  await page.getByLabel("Заголовок", { exact: true }).fill("Материал браузерного теста");
  await page.getByLabel("Slug (латиница, цифры, дефисы)").fill(slug);
  await page.getByLabel("Краткое описание").fill("Проверка создания черновика через интерфейс администратора.");
  await page.locator(".ProseMirror").fill("Текст из визуального редактора.");
  await page.getByRole("button", { name: "Создать материал" }).click();
  await page.waitForURL((url) => /\/admin\/content\/[0-9a-f-]+$/.test(url.pathname));
  await expect(page.getByRole("button", { name: "Сохранить изменения" })).toBeVisible();

  await page.getByRole("link", { name: "Предпросмотр" }).click();
  await expect(page.getByRole("heading", { name: "Материал браузерного теста" })).toBeVisible();
  expect((await request.get(`/articles/${slug}`)).status()).toBe(404);

  await page.goto("/admin/content");
  await page.getByPlaceholder("Название или slug").fill(slug);
  await page.getByRole("button", { name: "Применить" }).click();
  await expect(page.getByText("Материал браузерного теста")).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.goto("/admin/content/new");
  const adminHeight = await page.locator(".admin").evaluate((element) => element.getBoundingClientRect().height);
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(adminHeight).toBeGreaterThanOrEqual(documentHeight - 1);

  await page.goto("/admin/pages/about/ambulatornoe-otdelenie");
  await expect(page.getByLabel("Заголовок страницы")).toHaveValue("Амбулаторное отделение");
  await page.goto("/admin/settings");
  await expect(page.getByRole("heading", { name: "Контакты" })).toBeVisible();
  await page.goto("/admin/users");
  await expect(page.getByRole("heading", { name: "Пользователи" })).toBeVisible();
  await page.goto("/admin/audit");
  await expect(page.getByRole("heading", { name: "Журнал действий" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("anonymous visitor cannot open admin API", async ({ request }) => {
  expect((await request.get("/api/admin/content")).status()).toBe(401);
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({ status: "ok" });
});
