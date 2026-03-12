# Image Generation Log — Electroria Web

Fecha: 2026-03-11
Estado: Pendiente de ejecución (API key SiliconFlow no disponible en entorno actual)

---

## Estado actual de imágenes

El proyecto no cuenta con imágenes propias en `apps/web/src/assets/`. El diseño actual es íntegramente CSS + tipografía. Los cambios del rework han añadido tratamientos visuales CSS (dot grid en hero, sección oscura para métricas, etc.) que compensan parcialmente la ausencia de imágenes.

---

## Plan de generación — Imágenes prioritarias

### Prioridad 1: Hero image

**Ubicación**: Hero section, reemplazaría o acompañaría al panel de credenciales en desktop

**Prompt sugerido**:
```
Photorealistic editorial scene of a modern electrical panel installation in progress.
Close-up of neat, organized circuit breakers with color-coded wires in a stainless
steel enclosure. Professional workshop lighting, shallow depth of field, clean
industrial background slightly blurred. Color palette: deep navy blues, clean whites,
precise metallic tones. Shot on medium format camera. Ultra-sharp, no people visible,
no stock photography clichés. Premium architectural photography style.
Negative: no orange safety vests, no hard hats, no fake smiles, no generic stock look.
```

**Dimensiones**: 800×600px (panel hero desktop), 400×300px (mobile fallback)
**Formato**: WebP, calidad 85
**Uso**: `aside.hero-panel` background o sección hero

---

### Prioridad 2: Abstract tech visual para sección dark (ventajas)

**Ubicación**: Background sutil de la sección `section-dark` con ventajas competitivas

**Prompt sugerido**:
```
Abstract dark technology background. Blueprint-style technical circuit diagram,
very subtle and fine-lined, barely visible over deep navy (#0c1525). Isometric
electrical schematic elements floating in space. No bright colors, monochromatic
blue-navy palette with trace amounts of electric blue (#1851f5) glow.
Cinematic, premium, ultra-minimalist. 4K resolution, horizontal format.
Negative: no neon colors, no cyberpunk aesthetic, no gradients, no orange.
```

**Dimensiones**: 1920×600px
**Formato**: WebP, calidad 70 (background decorativo)
**Uso**: `section-dark` background-image con overlay

---

### Prioridad 3: Service visuals (6 imágenes)

#### 3a. Instalaciones eléctricas
```
Wide shot of a modern home electrical installation in progress. Clean wiring
running through white conduit in a freshly plastered wall. Professional,
organized, no clutter. Warm natural light from a window. High-end residential
interior. Spain, Mediterranean aesthetic. Editorial photography, Canon 5D look.
```

#### 3b. Cuadros eléctricos
```
Close-up, beautifully composed shot of a custom electrical panel interior.
ABB or Schneider circuit breakers perfectly aligned. Color-coded and labeled
wiring, immaculate cable management. Industrial precision aesthetics. Cool
tungsten lighting from above. Premium product photography style, extreme detail.
```

#### 3c. Mantenimiento preventivo
```
Electrical technician hands (gloved, professional) using a digital multimeter
on a circuit breaker. Focus on hands and instrument. Blurred workshop background.
Clean technical environment. Professional workwear visible. Trust-inspiring,
no stock clichés, editorial photography style.
```

#### 3d. Automatización industrial
```
Modern industrial control panel interior with PLC modules, relay blocks, and
sensor cables. Structured wiring, DIN rail components, everything labeled.
Low-key dramatic lighting from the side. Deep shadows. Industrial precision.
Premium editorial photography. No people.
```

#### 3e. Eficiencia energética
```
Modern LED lighting installation in an office space. Before/after split showing
old fluorescent vs. new efficient LED strips. Clean architectural space,
contemporary Spanish office interior. Natural light blending with artificial.
Architectural photography, wide angle.
```

#### 3f. Emergencias 24/7
```
Night scene, exterior of an industrial building with emergency electrical
maintenance van parked outside, warm interior lights through windows,
professional technician silhouette entering the building. Cinematic lighting,
slightly dramatic, trustworthy and professional. No action movie aesthetics.
```

**Dimensiones para todas las de servicio**: 600×400px
**Formato**: WebP, calidad 80

---

### Prioridad 4: Empresa / About

**Prompt sugerido**:
```
Professional team of 2-3 electrical engineers in a clean workshop reviewing
technical drawings on a tablet. Modern industrial workspace background,
organized tools and equipment visible. Natural daylight from skylights.
Candid, authentic feel — not posed like a stock photo. Spain, professional
services company aesthetic. Editorial photography.
```

**Dimensiones**: 800×500px
**Formato**: WebP, calidad 82

---

### Prioridad 5: Blog placeholder / OG images

**Concepto**: Una imagen base abstracta para posts de blog sin imagen propia

**Prompt sugerido**:
```
Minimal abstract background for a technical blog post. Clean dark navy gradient
with very subtle circuit board texture barely visible. Space for centered text
overlay. No complex elements. Premium, readable, professional.
16:9 aspect ratio.
```

**Dimensiones**: 1200×630px (OG image estándar)
**Formato**: WebP, calidad 85

---

## Guía para generar imágenes con SiliconFlow

### Configuración recomendada
```
API endpoint: https://api.siliconflow.cn/v1/images/generations
Model: black-forest-labs/FLUX.1-dev (recomendado para calidad premium)
      o stabilityai/stable-diffusion-3-5-large (alternativa)
Steps: 28-35 (mayor calidad)
CFG Scale: 7.0
Negative prompt: (incluir siempre) amateur, blurry, stock photo look,
                 plastic people, fake smiles, overexposed, ugly, deformed
```

### Script de generación (crear como `scripts/generate-images.ts`)
```typescript
// Requiere: SILICONFLOW_API_KEY en .env
// Uso: npx ts-node scripts/generate-images.ts

const API_KEY = process.env.SILICONFLOW_API_KEY;
const OUTPUT_DIR = './apps/web/src/assets/images/';

const images = [
  { name: 'hero-panel', prompt: '...', width: 800, height: 600 },
  // ... resto de imágenes
];

// Generar, descargar y guardar en OUTPUT_DIR
```

---

## Optimización recomendada post-generación

1. Convertir a WebP con `cwebp` o `sharp`
2. Generar variantes `@2x` para retina
3. Añadir atributos `loading="lazy"` en imágenes below-the-fold
4. Añadir atributos `width` y `height` explícitos para evitar CLS
5. Escribir alt text descriptivos y semánticamente ricos
6. Comprimir sin pérdida perceptible: objetivo <150KB por imagen de contenido

---

## Criterio de dirección de arte

Todas las imágenes deben compartir:
- **Temperatura de color**: Fría (5500-6500K) con toques cálidos puntuales
- **Estilo**: Editorial / comercial premium, no stock genérico
- **Tratamiento**: Realista, técnico, preciso — como las mejores fotos de comunicación corporativa B2B
- **Coherencia**: Todas deben parecer de la misma sesión o mismo estilo editorial
- **Paleta**: Compatible con `--bg-dark: #0c1525` y `--primary: #1851f5`
