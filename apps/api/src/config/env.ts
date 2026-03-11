import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGIN: z.string().default("http://localhost:4000"),
  UPLOADS_DIR: z.string().default("./uploads"),
  ELECTRORIA_SITE_URL: z.string().url().default("https://electroria.com"),
  ELECTRORIA_SITE_NAME: z.string().default("Electroria"),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().default("oficina@electroria.com"),
  TALKARIS_LEAD_WEBHOOK_SECRET: z.string().optional(),
  TALKARIS_LEAD_WEBHOOK_SECRET_HEADER: z
    .string()
    .default("x-talkaris-chat-secret"),
  AUCTORIO_WEBHOOK_SECRET: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  TURNSTILE_VERIFY_URL: z
    .string()
    .url()
    .default("https://challenges.cloudflare.com/turnstile/v0/siteverify"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  RATE_LIMIT_CONTACT_WINDOW_MS: z.coerce.number().int().positive().default(10 * 60 * 1000),
  RATE_LIMIT_CONTACT_MAX: z.coerce.number().int().positive().default(8),
  RATE_LIMIT_AUCTORIO_WINDOW_MS: z.coerce.number().int().positive().default(60 * 1000),
  RATE_LIMIT_AUCTORIO_MAX: z.coerce.number().int().positive().default(30),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => {
    const key = issue.path.join(".") || "UNKNOWN_ENV";
    return `${key}: ${issue.message}`;
  });

  console.error("[api] Missing or invalid environment variables:");
  issues.forEach((issue) => console.error(`- ${issue}`));
  console.error("[api] Revisa tu .env antes de arrancar la API.");
  process.exit(1);
}

const smtpEnabled = Boolean(
  parsed.data.SMTP_HOST &&
    parsed.data.SMTP_PORT &&
    parsed.data.SMTP_USER &&
    parsed.data.SMTP_PASS &&
    parsed.data.SMTP_FROM
);

if (
  [
    parsed.data.SMTP_HOST,
    parsed.data.SMTP_PORT,
    parsed.data.SMTP_USER,
    parsed.data.SMTP_PASS,
    parsed.data.SMTP_FROM,
  ].some((value) => value !== undefined && value !== null && String(value).trim() !== "") &&
  !smtpEnabled
) {
  console.error("[api] SMTP is partially configured. Define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and SMTP_FROM together.");
  process.exit(1);
}

export const env = {
  ...parsed.data,
  smtpEnabled,
};
