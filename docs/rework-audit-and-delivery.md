# Rework Audit & Delivery — Electroria Web

Fecha: 2026-03-11
Alcance: Angular 20 SSR monorepo — apps/web

---

## 1. Resumen ejecutivo

Se ha realizado un rework integral del frontend de Electroria para elevar la calidad comercial, corregir errores críticos de contenido y mejorar el sistema de diseño visual. El proyecto partía de una base técnica sólida (Angular 20 SSR, SEO estructurado, contenido centralizado) pero presentaba problemas graves de contenido público que exponían lenguaje interno de desarrollo, así como oportunidades claras de mejora en copy, diseño y conversión.

---

## 2. Auditoría inicial — Principales problemas detectados

### Críticos (contenido interno expuesto en producción)

| Problema | Ubicación | Severidad |
|---|---|---|
| Copyright del footer: "Base corporativa en Angular SSR para captar, informar y convertir demanda real en Galicia." | `site-footer.component.ts` | **Crítico** |
| Sección empresa "Base digital de la nueva etapa" con menciones a Angular SSR, Talkaris y Auctorio | `site-content.ts` | **Crítico** |
| Home page — párrafo ventajas: "La nueva web y el nuevo proceso comercial están preparados para captar mejor..." | `home-page.component.ts` | **Crítico** |
| Aviso legal intro: "Esta página sustituye a las rutas legales inexistentes del sitio legacy..." | `site-content.ts` | **Crítico** |
| Aviso legal: "Datos registrales completos y NIF: pendiente de validación manual antes de publicación definitiva." | `site-content.ts` | **Crítico** |
| Certificaciones — sección: "Qué queda pendiente de validación manual" | `site-content.ts` | **Crítico** |
| Privacidad intro: "La nueva base web incorpora formularios propios y endpoints dedicados." | `site-content.ts` | **Crítico** |
| Cookies intro: "La nueva web reduce dependencias innecesarias..." | `site-content.ts` | **Crítico** |

### Errores tipográficos visibles

| Problema | Ubicación |
|---|---|
| "Instalaciones electricas en Galicia" (sin acento) | `site-header.component.html` |
| "Instalaciones electricas y cuadros a medida" (sin acento) | `site-footer.component.ts` |
| "Navegacion" (sin acento) | `site-footer.component.ts` |
| "movil, tablet y desktop compacto" en drawer | `site-header.component.html` |

### UX / Conversión

| Problema | Impacto |
|---|---|
| Métricas de confianza duplicadas: en hero panel Y en sección inferior | Redundancia visual, experiencia repetitiva |
| H1 genérico: "Instalaciones eléctricas profesionales para viviendas, comercio e industria." | Bajo diferencial, sin keyword geográfica fuerte |
| FAQs home page: solo 4 preguntas | Cobertura semántica reducida para SEO |
| Steps del proceso con números en el texto ("1. Revisión...") | No premium, dependencia de texto para numeración visual |

### Diseño

| Problema | Impacto |
|---|---|
| Body background: 3 gradients radiales muy visibles | Ruido visual, fondo poco limpio |
| Tokens de color: azul principal algo genérico | Identidad visual mejorable |
| Cards: sin hover state | Falta feedback interactivo |
| Floating bar: sombra genérica | Menos premium |
| Brand mark: gradiente básico, sin presencia | Menor autoridad de marca |
| Sección de métricas sin tratamiento propio | Métricas perdidas en fondo blanco |

---

## 3. Decisiones estratégicas

### Qué se mantuvo
- Arquitectura Angular 20 SSR (sólida, no tocar)
- Sistema de rutas y lazy loading (correcto)
- SEO service y schema.org (bien implementado)
- Estructura de contenidos en `site-content.ts` (buena base)
- Paleta de color base (azul + crema, identitaria)
- Fuentes tipográficas (Space Grotesk + Libre Franklin, premium)
- Responsive breakpoints (correctos)
- Componente de formulario de contacto

### Qué se cambió
- Todo el texto de desarrollo interno expuesto en producción → eliminado/reemplazado
- Copyright del footer → texto de marca profesional
- Hero H1 → keyword geográfica + diferenciador real
- Sección ventajas → copy orientado al cliente, sin referencias internas
- Panel hero → eliminadas mini-métricas duplicadas, añadidos badges de credencial
- Sección de métricas → diseño propio sobre fondo oscuro (separación visual clara)
- Timeline steps → numeración via CSS counter (más premium que texto)
- FAQs → ampliadas de 4 a 7 preguntas (mayor cobertura semántica)
- Body background → fondo limpio sin ruido de gradientes múltiples
- Tokens CSS → colores refinados, sombras mejoradas, transiciones añadidas
- Cards → hover state añadido, sombras revisadas
- Brand mark → gradiente azul con sombra de color, más presencia visual
- Floating bar → sombra de mayor calidad, glow perceptivo sutil
- Empresa page → sección nueva "Compromiso con la calidad de ejecución" (cliente-facing)
- Certificaciones page → eliminada sección de desarrollo interno

### Qué se eliminó
- Texto "La nueva web y el nuevo proceso comercial..." del home
- Sección "Base digital de la nueva etapa" en empresa
- Highlight "Soporte apoyado por ecosistema digital propio"
- "Qué queda pendiente de validación manual" en certificaciones
- Referencias a WordPress, Angular SSR, Talkaris, Auctorio en contenido público
- Mini-métricas duplicadas del hero panel

---

## 4. Cambios realizados por archivo

### `apps/web/src/app/site/content/site-content.ts`
- `processSteps`: Eliminados prefijos de número ("1.", "2.", "3.", "4.") — la numeración la gestiona CSS counter
- `homeFaqs`: Ampliado de 4 a 7 FAQs (+3 nuevas sobre precio, reformas parciales, diferencia preventivo/correctivo)
- `infoPages.empresa.highlights[2]`: "Soporte apoyado por ecosistema digital propio" → "Atención directa y trato claro"
- `infoPages.empresa.sections[2]`: "Base digital de la nueva etapa" (con Angular SSR, Talkaris, Auctorio) → "Compromiso con la calidad de ejecución"
- `infoPages.certificaciones.sections`: Eliminada sección "Qué queda pendiente de validación manual"
- `infoPages.aviso-legal.intro`: Eliminada referencia al "sitio legacy" → intro limpia y profesional
- `infoPages.aviso-legal.sections[0]`: "pendiente de validación manual" → lenguaje profesional neutro
- `infoPages.privacidad.intro`: Eliminada referencia a "base web" y "endpoints dedicados"
- `infoPages.cookies.intro`: Eliminada referencia a "la nueva web" y "dependencias innecesarias"

### `apps/web/src/app/site/components/site-footer.component.ts`
- Copyright: "Base corporativa en Angular SSR..." → "© 2026 Electroria. Instalaciones eléctricas en Vigo y Galicia."
- "Navegacion" → "Navegación"
- "Instalaciones electricas" → "Instalaciones eléctricas"

### `apps/web/src/app/site/components/site-header.component.html`
- "Instalaciones electricas en Galicia" → "Instalaciones eléctricas en Galicia"
- `aria-label="Navegacion principal"` → "Navegación principal"
- Texto del drawer: "movil, tablet y desktop compacto" → "Servicios, cobertura y contacto."

### `apps/web/src/app/site/pages/home-page.component.ts`
- H1: "Instalaciones eléctricas profesionales para viviendas, comercio e industria." → **"Instalaciones eléctricas en Vigo con rigor técnico y documentación completa."** (keyword geográfica + diferenciador)
- Hero panel: Eliminadas mini-métricas duplicadas → Añadidos `cert-badge` (REBT, 24/7, +500 proyectos, 2 años garantía)
- Panel label: "Experiencia +15 años" → "Instaladores autorizados · Galicia"
- Sección métricas: `section-accent` → `section-metrics` (diseño propio con `metric-card`, fondo oscuro)
- Sección servicios: "Explorar servicio" (text-link) → "Ver detalle" (button-secondary)
- Sección ventajas: Heading "Ventajas competitivas" → "Por qué Electroria"; Eliminado párrafo con lenguaje de desarrollo
- Sección proceso: Reordenada antes de cobertura; Añadido párrafo de apoyo
- Testimonios: `item.quote` → `item.quote` con comillas y clase `.testimonial-quote`
- FAQs: `faq-list` → `faq-list faq-list--wide`; heading mejorado

### `apps/web/src/styles.css`
- `--bg`: `#f3f0e7` → `#f5f3ee` (más limpio)
- `--bg-dark`: `#101a2e` → `#0c1525` (más profundo)
- `--primary`: `#1c5eff` → `#1851f5` (más refinado)
- `--shadow-*`: Revisadas para mayor elegancia
- `--radius-*`: Ligeramente reducidos (xl: 32→28, lg: 24→20, md: 18→16)
- `body background`: Eliminados 3 gradients radiales → fondo sólido limpio `var(--bg)`
- `.hero-section`: Añadido dot grid pattern via `::before` (muy sutil, 1px/36px)
- `.hero-panel-certs` + `.cert-badge`: Nuevos estilos para badges de credencial
- `.metric-card`, `.metric-value`, `.metric-label`, `.metric-detail`: Sistema de métricas propio
- `.section-metrics`: Nueva sección sobre fondo oscuro para destacar métricas
- `.section-dark`: Gradientes refinados, fondo más profundo
- `.section-accent`: Bordes top/bottom añadidos para separación clara
- `.surface-card`: Hover state con `translateY(-2px)` y sombra en service cards
- `.button-primary`: Hover state mejorado con sombra de color y gradiente inverso
- `.brand-mark`: Gradiente azul/oscuro, sombra de color, border-radius refinado
- `.timeline-grid`: `counter-reset: step-counter`
- `.timeline-step`: `counter-increment: step-counter` + `::before` con número formateado "01", "02"...
- `.testimonial-quote`: Nueva clase para estilo de cita con cursiva
- `.faq-list--wide`: Variante ancha para home page
- `.floating-bar` (dentro de `@media 1024px`): Sombra de calidad mejorada

---

## 5. Cambios de copy destacados

### Hero H1 (antes → después)
- ❌ "Instalaciones eléctricas profesionales para viviendas, comercio e industria."
- ✅ "Instalaciones eléctricas en Vigo con rigor técnico y documentación completa."

**Por qué**: La keyword geográfica "en Vigo" mejora la intención local de búsqueda. "Rigor técnico y documentación completa" es un diferenciador real y específico, no genérico como "profesionales".

### Sección ventajas (antes → después)
- ❌ "La nueva web y el nuevo proceso comercial están preparados para captar mejor, responder con más contexto y sostener la relación técnica después de la instalación."
- ✅ (párrafo eliminado, H2 mejorado a "Cuatro principios que definen cómo preparamos, ejecutamos y cerramos cada proyecto.")

### Empresa page — sección nueva
- ✅ "Compromiso con la calidad de ejecución" — contenido orientado al cliente sobre materiales, documentación y seguimiento post-instalación

### 3 nuevas FAQs para SEO (home page)
1. "¿Cuánto cuesta una instalación eléctrica en Vigo?" → respuesta sobre presupuesto sin compromiso
2. "¿Hacéis reformas eléctricas parciales o solo proyectos completos?" → respuesta sobre alcance flexible
3. "¿Qué diferencia hay entre mantenimiento preventivo y correctivo?" → respuesta educativa con ambos servicios

---

## 6. Mejoras de conversión

| Elemento | Antes | Después |
|---|---|---|
| CTA hero primario | "Solicitar presupuesto gratis" | "Solicitar presupuesto" (más directo) |
| CTA servicios | "Explorar servicio" (text-link) | "Ver detalle" (button-secondary — más visible) |
| Hero panel credenciales | Mini-métricas (duplicadas) | Cert-badges (REBT, 24/7, +500, 2 años garantía) |
| Métricas sección | Cards sobre fondo claro (poco peso visual) | Cards sobre fondo oscuro (gran contraste, impacto) |
| FAQs disponibles | 4 preguntas | 7 preguntas |

---

## 7. Mejoras SEO

| Elemento | Cambio |
|---|---|
| H1 home | Añadida keyword geográfica "en Vigo" |
| FAQs home | +3 preguntas → más schema FAQPage, más cobertura semántica |
| Empresa page | Eliminado contenido sobre tecnología interna → mejor topical relevance |
| Páginas legales | Intros limpias → menos ruido para crawlers |
| Aria labels | Corregidos (Navegación principal con acento) |

---

## 8. Imágenes — Estado actual

No hay imágenes propias en el proyecto actualmente. Las secciones hero y de servicios son íntegramente texto + CSS. El dot grid del hero aporta textura sin imagen. Ver `/docs/image-generation-log.md` para el plan de generación.

**Impacto**: La ausencia de imágenes reduce el atractivo visual máximo alcanzable, pero los cambios CSS compensan en gran parte con el nuevo tratamiento de secciones (fondo oscuro métricas, hero con patrón, cards con hover).

---

## 9. Responsive — Estado

La base responsive estaba bien implementada. No se realizaron cambios estructurales en los breakpoints. Los nuevos componentes (`.metric-card`, `.cert-badge`, `.hero-panel-certs`) heredan el sistema grid y se adaptan correctamente. El `.faq-list--wide` solo aplica max-width en desktop y no rompe mobile.

---

## 10. Riesgos y limitaciones

| Riesgo | Mitigación |
|---|---|
| Páginas legales (aviso-legal) sin datos registrales completos | Texto neutral con instrucción de solicitud → pendiente completar antes de indexar |
| Imágenes hero ausentes | CSS compensatorio implementado; generación pendiente (ver image-generation-log.md) |
| Blog solo con posts legacy estáticos | Arquitectura preparada para CMS dinámico, no se modificó |
| Sin analytics activo | Privacidad preparada para analytics futuro; no bloquea launch |
| Chat widget (Talkaris) | No modificado; referencias eliminadas del contenido público |

---

## 11. Propuestas Fase 2

### Contenido y SEO
- Crear landing page `/electricista-vigo` orientada a búsqueda local de alta intención
- Crear landing page `/precio-instalacion-electrica-vigo` (long-tail transaccional)
- Crear landing pages de ciudad: Pontevedra, Santiago de Compostela, A Coruña
- Ampliar blog con artículos evergreen: "Cuándo cambiar el cuadro eléctrico", "Qué es el REBT", "Mantenimiento eléctrico industrial"
- Añadir datos registrales completos en aviso legal

### Imágenes
- Generar hero image con SiliconFlow (ver image-generation-log.md)
- Generar visual abstracto para sección dark de ventajas
- Generar imágenes por servicio (6 visuales)

### Diseño
- Añadir microanimaciones de entrada para secciones (IntersectionObserver)
- Crear página `/sobre-nosotros` con equipo y metodología más elaborada
- Añadir galería de proyectos (fotos antes/después o composiciones)
- Implementar modo oscuro opcional

### Técnico
- Configurar Analytics (GA4 o Plausible con consentimiento)
- Implementar banner de cookies compatible con RGPD
- Añadir Web App Manifest para mejora PWA
- Configurar Lighthouse CI en pipeline
- Añadir tests E2E básicos para formulario de contacto

### Conversión
- Añadir bloque de "Solicitar visita gratuita" como CTA alternativo al formulario
- Añadir chat en vivo integrado con formulario fallback
- Implementar seguimiento de eventos (CTA clicks, form submits) en Analytics
