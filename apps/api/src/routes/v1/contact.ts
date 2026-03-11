import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env.js";
import { pool } from "../../db/pool.js";
import { createRateLimiter, getClientIp, getReferer, getUserAgent } from "../../lib/http.js";
import { safeCompare } from "../../lib/security.js";
import { sendEmail } from "../../services/email.js";
import { verifyTurnstileToken } from "../../services/turnstile.js";

const router = Router();
const contactLimiter = createRateLimiter(
  env.RATE_LIMIT_CONTACT_MAX,
  env.RATE_LIMIT_CONTACT_WINDOW_MS
);

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service1: z.string().optional(),
  service2: z.string().optional(),
  message: z.string().min(3),
  sourcePath: z.string().optional(),
  sourceLabel: z.string().optional(),
  propertyType: z.string().optional(),
  urgency: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  privacy: z.boolean().optional(),
  turnstileToken: z.string().optional(),
});

router.post("/", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ code: "INVALID_INPUT", message: "Invalid payload" });
    return;
  }

  const clientIp = getClientIp(req);
  const limitResult = contactLimiter.consume(`contact:${clientIp}`);
  res.setHeader("X-RateLimit-Remaining", String(limitResult.remaining));

  if (!limitResult.allowed) {
    res.setHeader("Retry-After", String(Math.ceil(limitResult.retryAfterMs / 1000)));
    res.status(429).json({
      code: "RATE_LIMITED",
      message: "Too many contact requests",
    });
    return;
  }

  const body = parsed.data;
  const secretHeader = req.header(env.TALKARIS_LEAD_WEBHOOK_SECRET_HEADER);
  const isTalkarisLead = Boolean(secretHeader);

  if (isTalkarisLead) {
    if (!env.TALKARIS_LEAD_WEBHOOK_SECRET) {
      res.status(503).json({
        code: "TALKARIS_NOT_CONFIGURED",
        message: "Talkaris lead sink is not configured",
      });
      return;
    }

    if (!safeCompare(secretHeader || "", env.TALKARIS_LEAD_WEBHOOK_SECRET)) {
      res.status(401).json({
        code: "INVALID_TALKARIS_SIGNATURE",
        message: "Invalid Talkaris shared secret",
      });
      return;
    }
  }

  if (!isTalkarisLead && body.website?.trim()) {
    res.status(202).json({ ok: true, ignored: true });
    return;
  }

  const turnstileOk = isTalkarisLead
    ? true
    : await verifyTurnstileToken(body.turnstileToken, clientIp);
  if (!turnstileOk) {
    res.status(400).json({
      code: "TURNSTILE_FAILED",
      message: "Captcha verification failed",
    });
    return;
  }

  const metadata = {
    receivedFrom: isTalkarisLead ? "talkaris" : "website",
    turnstileVerified: turnstileOk,
    headers: {
      host: req.headers.host || "",
      "x-forwarded-host": String(req.headers["x-forwarded-host"] || ""),
      "x-forwarded-proto": String(req.headers["x-forwarded-proto"] || ""),
    },
  };

  const query = await pool.query(
    `INSERT INTO contact_messages (
       name,
       email,
       phone,
       company,
       service_1,
       service_2,
       message,
       source,
       source_path,
       source_label,
       property_type,
       urgency,
       budget,
       website,
       ip_address,
       user_agent,
       referer,
       consent_given,
       turnstile_passed,
       metadata
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20
     ) RETURNING id`,
    [
      body.name,
      body.email,
      body.phone ?? null,
      body.company ?? null,
      body.service1 ?? null,
      body.service2 ?? null,
      body.message,
      isTalkarisLead ? "talkaris" : "website",
      body.sourcePath ?? null,
      body.sourceLabel ?? (isTalkarisLead ? "talkaris-widget" : "formulario-web-electroria"),
      body.propertyType ?? null,
      body.urgency ?? null,
      body.budget ?? null,
      body.website ?? null,
      clientIp,
      getUserAgent(req) || null,
      getReferer(req) || null,
      Boolean(body.privacy),
      turnstileOk,
      JSON.stringify(metadata),
    ]
  );

  void sendEmail({
    to: env.CONTACT_NOTIFICATION_EMAIL,
    subject: `[Electroria] Nuevo lead ${body.service1 || "sin clasificar"}`,
    text: [
      `Nombre: ${body.name}`,
      `Email: ${body.email}`,
      `Telefono: ${body.phone || "-"}`,
      `Empresa: ${body.company || "-"}`,
      `Servicio: ${body.service1 || "-"}`,
      `Detalle: ${body.service2 || "-"}`,
      `Urgencia: ${body.urgency || "-"}`,
      `Presupuesto: ${body.budget || "-"}`,
      `Origen: ${isTalkarisLead ? "talkaris" : "website"}`,
      `Ruta: ${body.sourcePath || "-"}`,
      "",
      body.message,
    ].join("\n"),
    html: `
      <h2>Nuevo lead Electroria</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(body.phone || "-")}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(body.company || "-")}</p>
      <p><strong>Servicio:</strong> ${escapeHtml(body.service1 || "-")}</p>
      <p><strong>Detalle:</strong> ${escapeHtml(body.service2 || "-")}</p>
      <p><strong>Urgencia:</strong> ${escapeHtml(body.urgency || "-")}</p>
      <p><strong>Presupuesto:</strong> ${escapeHtml(body.budget || "-")}</p>
      <p><strong>Origen:</strong> ${isTalkarisLead ? "talkaris" : "website"}</p>
      <p><strong>Ruta:</strong> ${escapeHtml(body.sourcePath || "-")}</p>
      <hr />
      <p>${escapeHtml(body.message).replace(/\n/g, "<br />")}</p>
    `,
  }).catch((error) => {
    console.error("[contact] Notification email failed", error);
  });

  res.status(201).json({
    ok: true,
    id: query.rows[0].id,
  });
});

export default router;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
