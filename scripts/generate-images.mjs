#!/usr/bin/env node
/**
 * Electroria — Image Generation via SiliconFlow
 * Usage: SILICONFLOW_API_KEY=sk-... node scripts/generate-images.mjs
 *        or with .env: node -r dotenv/config scripts/generate-images.mjs
 *
 * Requires: node 18+ (native fetch)
 * Output:   apps/web/src/assets/images/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "apps/web/src/assets/images");

const API_KEY = process.env.SILICONFLOW_API_KEY;
const API_URL = `${String(process.env.SILICONFLOW_BASE_URL || "https://api.siliconflow.com/v1").replace(/\/$/, "")}/images/generations`;
const MODEL = String(process.env.SILICONFLOW_IMAGE_MODEL || "black-forest-labs/FLUX.2-pro").trim();

if (!API_KEY) {
  console.error("❌  SILICONFLOW_API_KEY not set. Add it to .env or export it.");
  process.exit(1);
}

// ─── IMAGE MANIFEST ──────────────────────────────────────────────────────────

const IMAGES = [
  {
    name: "hero-panel",
    width: 800,
    height: 600,
    prompt: `
      Close-up editorial photograph of a modern electrical panel installation.
      Neat, organized circuit breakers with color-coded wires in a brushed steel
      enclosure. Shallow depth of field, professional workshop lighting from above.
      Ultra-sharp foreground, blurred clean industrial background.
      Color palette: deep navy blues, precise metallic tones, clean whites.
      Shot on medium format camera. Premium architectural photography.
      No people visible. No stock photography clichés. No orange safety vests.
    `.trim().replace(/\s+/g, " "),
    negative: "blurry, amateur, stock photo, hard hat, safety vest, overexposed, ugly, deformed, cartoon, drawing",
  },
  {
    name: "hero-background",
    width: 1280,
    height: 720,
    prompt: `
      Abstract dark technology background for a professional electrical company website.
      Very fine blueprint-style circuit diagram lines, barely visible over deep navy
      (#0c1525). Subtle isometric electrical schematic elements. No bright colors.
      Monochromatic navy-blue palette with faint electric blue glow traces.
      Cinematic, premium, ultra-minimalist. High resolution horizontal format.
    `.trim().replace(/\s+/g, " "),
    negative: "neon, cyberpunk, orange, bright colors, people, text, logos, watermark",
  },
  {
    name: "service-instalaciones",
    width: 600,
    height: 400,
    prompt: `
      Professional editorial photograph of a home electrical installation in progress.
      Clean wiring running through white conduit in a freshly plastered wall.
      Warm natural window light, organized cables, no clutter. High-end Spanish
      residential interior. Canon 5D look, premium real estate photography style.
      No people. Authentic, not staged.
    `.trim().replace(/\s+/g, " "),
    negative: "amateur, stock, ugly, deformed, cartoon, people, dark, dirty",
  },
  {
    name: "service-cuadros",
    width: 600,
    height: 400,
    prompt: `
      Beautifully composed close-up photograph of a custom electrical panel interior.
      ABB or Schneider circuit breakers perfectly aligned in rows. Color-coded and
      labeled wiring with immaculate cable management. Cool tungsten overhead lighting.
      Industrial precision aesthetics. Premium product photography style. Extreme detail.
      No people.
    `.trim().replace(/\s+/g, " "),
    negative: "blurry, amateur, stock, dirty wires, chaotic, ugly, cartoon",
  },
  {
    name: "service-mantenimiento",
    width: 600,
    height: 400,
    prompt: `
      Editorial close-up of professional gloved hands using a digital clamp multimeter
      on a circuit breaker panel. Focus on hands and instrument, blurred workshop
      background. Clean technical environment, professional workwear visible.
      Trust-inspiring, authentic photography. No stock clichés. Premium commercial look.
    `.trim().replace(/\s+/g, " "),
    negative: "stock, fake smile, amateur, blurry foreground, ugly, deformed",
  },
  {
    name: "service-automatizacion",
    width: 600,
    height: 400,
    prompt: `
      Modern industrial control panel interior with PLC modules, relay blocks, and
      sensor cables. Structured wiring, DIN rail components, everything labeled.
      Low-key dramatic side lighting, deep professional shadows.
      Industrial precision aesthetics. Premium editorial photography. No people.
    `.trim().replace(/\s+/g, " "),
    negative: "amateur, stock, dirty, chaotic wires, ugly, cartoon, deformed",
  },
  {
    name: "service-eficiencia",
    width: 600,
    height: 400,
    prompt: `
      Modern LED lighting installation in a clean Spanish office space. Recessed LED
      ceiling panels with perfect grid alignment. Architectural interior photography,
      wide angle, natural daylight blending with precise artificial light.
      Premium commercial real estate photography aesthetic.
    `.trim().replace(/\s+/g, " "),
    negative: "fluorescent, old, ugly, dark, amateur, stock, cartoon",
  },
  {
    name: "service-emergencias",
    width: 600,
    height: 400,
    prompt: `
      Cinematic night exterior scene of a modern industrial building with warm interior
      lights glowing through tall windows. Professional electrical maintenance van
      parked outside with subtle equipment visible. Trustworthy, professional atmosphere.
      Cinematic lighting, slight blue-night tones, no action movie aesthetics.
      No people clearly visible, silhouette only if any.
    `.trim().replace(/\s+/g, " "),
    negative: "danger, explosions, scary, amateur, blurry, ugly, cartoon, deformed",
  },
  {
    name: "empresa-team",
    width: 800,
    height: 500,
    prompt: `
      Editorial photograph of 2-3 professional electrical engineers in a clean modern
      workshop reviewing technical drawings on a tablet. Natural daylight from skylights,
      organized tools and equipment visible in background. Candid, authentic feel.
      Spanish professional services company aesthetic. Not posed like stock photography.
    `.trim().replace(/\s+/g, " "),
    negative: "stock, fake smiles, posed, ugly, deformed, amateur, blurry",
  },
  {
    name: "og-default",
    width: 1200,
    height: 630,
    prompt: `
      Minimal professional background for a technical blog Open Graph image.
      Clean dark navy gradient (#0c1525 to #091120) with very subtle circuit board
      texture barely visible at 5% opacity. Empty center space for text overlay.
      No complex elements, ultra-minimal, premium corporate brand aesthetic.
      16:9 aspect ratio, horizontal.
    `.trim().replace(/\s+/g, " "),
    negative: "bright, colorful, busy, cluttered, text, logos, watermark, people",
  },
];

// ─── GENERATION LOGIC ────────────────────────────────────────────────────────

async function generateImage(image) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: image.prompt,
      negative_prompt: image.negative,
      image_size: `${image.width}x${image.height}`,
      num_inference_steps: 28,
      guidance_scale: 7.0,
      num_images: 1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data.images?.[0]?.url ?? data.data?.[0]?.url;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
}

async function main() {
  console.log(`🎨  Electroria Image Generator`);
  console.log(`📁  Output: ${OUTPUT_DIR}`);
  console.log(`🤖  Model: ${MODEL}`);
  console.log(`🖼️   Images to generate: ${IMAGES.length}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const log = [];

  for (const image of IMAGES) {
    const filename = `${image.name}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️   ${filename} — already exists, skipping`);
      continue;
    }

    process.stdout.write(`⏳  Generating ${filename} (${image.width}×${image.height})...`);

    try {
      const imageUrl = await generateImage(image);

      if (!imageUrl) {
        throw new Error("No image URL in response");
      }

      await downloadImage(imageUrl, filepath);
      const sizeKB = Math.round(fs.statSync(filepath).size / 1024);
      console.log(` ✅  ${sizeKB}KB`);

      log.push({ name: image.name, file: filename, size: sizeKB, status: "ok" });
    } catch (err) {
      console.log(` ❌  ${err.message}`);
      log.push({ name: image.name, file: filename, status: "error", error: err.message });
    }

    // Rate limit: 1 request/sec
    await new Promise((r) => setTimeout(r, 1200));
  }

  // Summary
  const ok = log.filter((l) => l.status === "ok").length;
  const fail = log.filter((l) => l.status === "error").length;

  console.log(`\n📊  Done: ${ok} generated, ${fail} failed`);

  if (fail > 0) {
    console.log("\n❌  Failures:");
    log.filter((l) => l.status === "error").forEach((l) => {
      console.log(`   ${l.name}: ${l.error}`);
    });
  }

  // Write generation log
  const logPath = path.join(ROOT, "docs/image-generation-run.json");
  fs.writeFileSync(logPath, JSON.stringify({ timestamp: new Date().toISOString(), model: MODEL, images: log }, null, 2));
  console.log(`\n📄  Log saved: docs/image-generation-run.json`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
