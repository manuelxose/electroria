import { env } from "../config/env.js";

type TurnstileResponse = {
  success?: boolean;
};

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string
): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  if (!token?.trim()) {
    return false;
  }

  try {
    const payload = new URLSearchParams();
    payload.set("secret", env.TURNSTILE_SECRET_KEY);
    payload.set("response", token.trim());
    if (remoteIp) {
      payload.set("remoteip", remoteIp);
    }

    const response = await fetch(env.TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      return false;
    }

    const parsed = (await response.json()) as TurnstileResponse;
    return parsed.success === true;
  } catch {
    return false;
  }
}
