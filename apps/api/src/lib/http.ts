import type { Request } from "express";

type BucketState = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
};

export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]?.trim() || req.ip || "unknown";
  }

  if (Array.isArray(forwarded) && forwarded.length) {
    return forwarded[0]?.split(",")[0]?.trim() || req.ip || "unknown";
  }

  return req.ip || req.socket.remoteAddress || "unknown";
}

export function getUserAgent(req: Request): string {
  return String(req.headers["user-agent"] || "").trim();
}

export function getReferer(req: Request): string {
  return String(req.headers["referer"] || req.headers["referrer"] || "").trim();
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const buckets = new Map<string, BucketState>();

  return {
    consume(key: string): RateLimitResult {
      const now = Date.now();

      if (buckets.size > 5_000) {
        for (const [bucketKey, state] of buckets.entries()) {
          if (state.resetAt <= now) {
            buckets.delete(bucketKey);
          }
        }
      }

      const current = buckets.get(key);
      if (!current || current.resetAt <= now) {
        buckets.set(key, {
          count: 1,
          resetAt: now + windowMs,
        });

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - 1),
          retryAfterMs: 0,
        };
      }

      if (current.count >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterMs: Math.max(0, current.resetAt - now),
        };
      }

      current.count += 1;
      buckets.set(key, current);

      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - current.count),
        retryAfterMs: 0,
      };
    },
  };
}
