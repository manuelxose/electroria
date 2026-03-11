import nodemailer from "nodemailer";
import { env } from "../config/env.js";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;

let transporter: MailTransporter | null = null;

function getTransporter(): MailTransporter | null {
  if (!env.smtpEnabled) {
    return null;
  }

  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST!,
    port: env.SMTP_PORT!,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER!,
      pass: env.SMTP_PASS!,
    },
  });

  return transporter;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer) {
    return false;
  }

  await mailer.sendMail({
    from: env.SMTP_FROM!,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });

  return true;
}
