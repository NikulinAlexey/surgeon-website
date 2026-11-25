import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { env } from "./env";

interface MailMessage {
  to: string;
  subject: string;
  text: string;
}

export async function sendMail(message: MailMessage) {
  if (env.SMTP_URL) {
    const transporter = nodemailer.createTransport(env.SMTP_URL);
    await transporter.sendMail({ from: env.EMAIL_FROM, ...message });
    return;
  }

  if (env.NODE_ENV === "production") {
    throw new Error("SMTP_URL is required in production");
  }

  await mkdir(env.DEV_MAIL_DIR, { recursive: true });
  await writeFile(
    path.join(env.DEV_MAIL_DIR, `${Date.now()}-${randomUUID()}.json`),
    JSON.stringify(message, null, 2),
    { mode: 0o600 },
  );
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = new URL("/verify-email", env.APP_URL);
  url.searchParams.set("token", token);
  await sendMail({
    to,
    subject: "Подтверждение email",
    text: `Подтвердите email в течение 24 часов: ${url.toString()}`,
  });
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = new URL("/reset-password", env.APP_URL);
  url.searchParams.set("token", token);
  await sendMail({
    to,
    subject: "Восстановление пароля",
    text: `Ссылка действительна 1 час: ${url.toString()}\nЕсли вы не запрашивали восстановление, проигнорируйте письмо.`,
  });
}
