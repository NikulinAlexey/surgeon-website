import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env, hasS3Storage } from "./env";
import { HttpError } from "./api";

const ALLOWED_FILES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 8 * 1024 * 1024;

function s3Client() {
  return new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    forcePathStyle: env.S3_FORCE_PATH_STYLE === "true",
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID!,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
    },
  });
}

function hasValidSignature(mimeType: string, data: Buffer) {
  if (mimeType === "application/pdf") return data.subarray(0, 4).toString() === "%PDF";
  if (mimeType === "image/jpeg") return data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if (mimeType === "image/png") return data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mimeType === "image/webp") return data.subarray(0, 4).toString() === "RIFF" && data.subarray(8, 12).toString() === "WEBP";
  return false;
}

export async function validateUpload(file: File) {
  if (!ALLOWED_FILES.has(file.type)) throw new HttpError(400, "Допустимы PDF, JPEG, PNG и WebP");
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) throw new HttpError(400, "Файл должен быть не больше 8 МБ");
  const data = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(file.type, data)) throw new HttpError(400, "Содержимое файла не соответствует его типу");
  return data;
}

export async function storeFile(data: Buffer, mimeType: string) {
  const extensions: Record<string, string> = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };
  const storageKey = `${randomUUID()}${extensions[mimeType]}`;

  if (hasS3Storage()) {
    await s3Client().send(new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: storageKey,
      Body: data,
      ContentType: mimeType,
      ServerSideEncryption: "AES256",
    }));
  } else {
    const directory = path.resolve(env.LOCAL_STORAGE_DIR);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, storageKey), data, { mode: 0o600 });
  }
  return storageKey;
}

export async function readStoredFile(storageKey: string) {
  if (!/^[a-f0-9-]+\.(pdf|jpg|png|webp)$/.test(storageKey)) {
    throw new HttpError(400, "Некорректный идентификатор файла");
  }
  if (hasS3Storage()) {
    const result = await s3Client().send(new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: storageKey }));
    if (!result.Body) throw new HttpError(404, "Файл не найден");
    return Buffer.from(await result.Body.transformToByteArray());
  }
  const directory = path.resolve(env.LOCAL_STORAGE_DIR);
  return readFile(path.join(directory, storageKey));
}
