import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SMTP_URL: z.string().optional(),
  EMAIL_FROM: z.string().default("Surgeon Website <no-reply@localhost>"),
  DEV_MAIL_DIR: z.string().default("/tmp/surgeon-website-mail"),
  LOCAL_STORAGE_DIR: z.string().default("/tmp/surgeon-website-storage"),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().default("ru-central1"),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_FORCE_PATH_STYLE: z.string().default("true"),
  PRIVACY_VERSION: z.string().default("2026-11-25"),
  TERMS_VERSION: z.string().default("2026-11-25"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://build:build@localhost:5432/build",
  APP_URL: process.env.APP_URL,
  NODE_ENV: process.env.NODE_ENV,
  SMTP_URL: process.env.SMTP_URL,
  EMAIL_FROM: process.env.EMAIL_FROM,
  DEV_MAIL_DIR: process.env.DEV_MAIL_DIR,
  LOCAL_STORAGE_DIR: process.env.LOCAL_STORAGE_DIR,
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_FORCE_PATH_STYLE: process.env.S3_FORCE_PATH_STYLE,
  PRIVACY_VERSION: process.env.PRIVACY_VERSION,
  TERMS_VERSION: process.env.TERMS_VERSION,
});

export function hasS3Storage() {
  return Boolean(
    env.S3_ENDPOINT &&
      env.S3_BUCKET &&
      env.S3_ACCESS_KEY_ID &&
      env.S3_SECRET_ACCESS_KEY,
  );
}
