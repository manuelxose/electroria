import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { env } from "./config/env.js";
import { pool } from "./db/pool.js";
import v1Router from "./routes/v1/index.js";

const app = express();
app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: false,
  })
);
app.use(
  express.json({
    limit: "2mb",
    verify: (req, _res, buffer) => {
      (req as express.Request & { rawBody?: string }).rawBody = buffer.toString("utf8");
    },
  })
);
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/uploads", express.static(path.resolve(env.UPLOADS_DIR)));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "electroria-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", v1Router);

app.use((req, res) => {
  res.status(404).json({ code: "NOT_FOUND", message: `Route ${req.path} not found` });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[api] Unhandled error", error);
  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Unexpected server error",
  });
});

async function ensureDatabaseConnection(): Promise<void> {
  try {
    await pool.query("SELECT 1");
  } catch (error) {
    console.error("[api] DATABASE_URL is configured but the database is not reachable.");

    if (error instanceof Error) {
      console.error(`[api] ${error.message}`);
    }

    process.exit(1);
  }
}

async function start(): Promise<void> {
  await ensureDatabaseConnection();
  const host = process.env["HOST"] || "127.0.0.1";

  app.listen(env.PORT, host, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://${host}:${env.PORT}`);
  });
}

void start();
