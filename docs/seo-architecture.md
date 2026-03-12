# SEO Architecture — Electroria Web

Fecha: 2026-03-11
Dominio: electroria.com
Región objetivo: Vigo, Pontevedra, Galicia (España)
Idioma: es-ES

---

## 1. Mapa de páginas y arquitectura de intención

| Ruta | Tipo | Intención principal |
|---|---|---|
| `/` | Home | Informacional + transaccional |
| `/servicios` | Hub de servicios | Transaccional / navegacional |
| `/servicios/instalaciones-electricas` | Landing servicio | Transaccional local |
| `/servicios/cuadros-electricos` | Landing servicio | Transaccional / comercial |
| `/servicios/mantenimiento-preventivo` | Landing servicio | Transaccional / comercial |
| `/servicios/automatizacion-industrial` | Landing servicio | Transaccional / comercial |
| `/servicios/eficiencia-energetica` | Landing servicio | Transaccional / informacional |
| `/servicios/emergencias-24-7` | Landing servicio | Transaccional urgente |
| `/empresa` | About | Navegacional / EEAT |
| `/zonas` | Cobertura geográfica | Informacional local |
| `/proyectos` | Portfolio | EEAT / navegacional |
| `/certificaciones` | Confianza técnica | EEAT / informacional |
| `/blog` | Hub editorial | Informacional / tráfico orgánico |
| `/blog/categoria/cuadros-electricos` | Categoría blog | Informacional |
| `/blog/:slug` | Artículo | Informacional / long-tail |
| `/contacto` | Contacto | Transaccional |
| `/aviso-legal` | Legal | — |
| `/privacidad` | Legal | — |
| `/cookies` | Legal | — |

---

## 2. Keyword principal y secundarias por página

### Home `/`
- **Keyword principal**: `instalaciones eléctricas Vigo`
- **Secundarias**: electricistas Vigo, empresa electricidad Galicia, electricista Vigo presupuesto, instaladores eléctricos autorizados Galicia
- **H1 actual**: "Instalaciones eléctricas en Vigo con rigor técnico y documentación completa."
- **Title actual**: "Instalaciones eléctricas profesionales en Galicia | Electroria"
- **Oportunidad**: El title puede mejorarse para incluir "Vigo": "Instalaciones eléctricas en Vigo y Galicia | Electroria"

### Servicios `/servicios`
- **Keyword principal**: `servicios eléctricos Vigo`
- **Secundarias**: instalaciones eléctricas Galicia, cuadros eléctricos a medida, mantenimiento eléctrico, electricistas industriales Galicia
- **Title actual**: "Servicios eléctricos en Vigo y Galicia | Electroria" ✓

### Instalaciones eléctricas `/servicios/instalaciones-electricas`
- **Keyword principal**: `instalaciones eléctricas en Vigo`
- **Secundarias**: electricistas autorizados Galicia, reforma eléctrica vivienda, instalación eléctrica local comercial, adecuación REBT Vigo
- **Title actual**: "Instalaciones eléctricas en Vigo y Galicia | Electroria" ✓

### Cuadros eléctricos `/servicios/cuadros-electricos`
- **Keyword principal**: `cuadros eléctricos a medida Galicia`
- **Secundarias**: montaje cuadro eléctrico, fabricación cuadros eléctricos, cuadros Schneider ABB Galicia, cuadro eléctrico industrial Vigo
- **Title actual**: "Cuadros eléctricos a medida en Galicia | Electroria" ✓

### Mantenimiento preventivo `/servicios/mantenimiento-preventivo`
- **Keyword principal**: `mantenimiento eléctrico preventivo Vigo`
- **Secundarias**: revisión instalación eléctrica Vigo, mantenimiento cuadros eléctricos, plan mantenimiento eléctrico empresa, electricista mantenimiento Galicia
- **Title actual**: "Mantenimiento eléctrico preventivo en Vigo | Electroria" ✓

### Automatización industrial `/servicios/automatizacion-industrial`
- **Keyword principal**: `automatización industrial eléctrica Galicia`
- **Secundarias**: cuadros control eléctrico, programación PLC Vigo, automatización maniobras industriales, control eléctrico industria
- **Title actual**: "Automatización industrial eléctrica en Galicia | Electroria" ✓

### Eficiencia energética `/servicios/eficiencia-energetica`
- **Keyword principal**: `eficiencia energética instalaciones eléctricas`
- **Secundarias**: ahorro consumo eléctrico empresa, auditoría eléctrica Galicia, mejora iluminación LED industrial, optimización eléctrica Vigo
- **Title actual**: "Eficiencia energética para instalaciones eléctricas | Electroria" — Podría mejorar a "Eficiencia energética eléctrica en Vigo y Galicia"

### Emergencias 24/7 `/servicios/emergencias-24-7`
- **Keyword principal**: `electricista urgencias 24 horas Vigo`
- **Secundarias**: avería eléctrica 24 horas, electricista emergencias Galicia, urgencias eléctricas Vigo, fallo cuadro eléctrico urgente
- **Title actual**: "Electricista de urgencias 24 horas en Vigo | Electroria" ✓ (excelente)

### Empresa `/empresa`
- **Keyword principal**: `empresa instalaciones eléctricas Vigo`
- **Secundarias**: Electroria Vigo, electricistas empresa Galicia, quiénes somos electricistas Vigo
- **Title actual**: "Electroria | Empresa de instalaciones eléctricas en Vigo" ✓

### Zonas `/zonas`
- **Keyword principal**: `electricistas Vigo cobertura`
- **Secundarias**: electricistas Pontevedra, instalaciones eléctricas Galicia zona cobertura, electricistas Mos Redondela Nigrán
- **Title actual**: "Cobertura de instalaciones eléctricas en Galicia | Electroria" ✓

### Certificaciones `/certificaciones`
- **Keyword principal**: `certificado instalación eléctrica Galicia`
- **Secundarias**: boletín eléctrico Galicia, certificación REBT, documentación instalación eléctrica, legalización instalación eléctrica Vigo
- **Title actual**: "Certificaciones y cumplimiento eléctrico | Electroria" — Podría mejorar a "Certificaciones y boletines eléctricos en Galicia"

### Contacto `/contacto`
- **Keyword principal**: `contacto electricista Vigo presupuesto`
- **Secundarias**: solicitar presupuesto instalación eléctrica, electricista Vigo teléfono
- **Title**: No tiene title propio definido — pendiente

---

## 3. Schema.org implementado

| Schema | Páginas | Estado |
|---|---|---|
| `BreadcrumbList` | Todas | ✅ Implementado |
| `FAQPage` | Home, Servicios, Servicio detail, Contacto, Empresa, Zonas... | ✅ Implementado |
| `Service` | Páginas de servicio | ✅ Implementado |
| `Article` | Artículos de blog | ✅ Implementado |
| `Organization` (tipo Electrician) | Home (via SeoService) | ✅ Disponible |
| `WebPage` | Disponible en SeoService | ⚠️ No activado por defecto |
| `LocalBusiness` | No implementado | ❌ Oportunidad |

**Oportunidad clave**: Añadir `LocalBusiness` con `geo` (latitud/longitud Vigo), `openingHours`, `telephone` y `areaServed` mejorará el pack local de Google Maps.

---

## 4. Enlazado interno recomendado

### Desde Home hacia:
- `/servicios` (CTA "Ver servicios")
- `/servicios/emergencias-24-7` (CTA zona floating bar)
- `/zonas` (sección cobertura)
- `/contacto` (múltiples CTAs)

### Desde `/servicios` hacia:
- Cada una de las 6 páginas de servicio
- `/contacto`

### Desde cada servicio hacia:
- 3 servicios relacionados (ya implementado)
- `/contacto`
- `/servicios` (breadcrumb)

### Oportunidades no implementadas:
- `/empresa` debería enlazar a `/certificaciones` y `/servicios`
- `/zonas` debería enlazar a `/servicios/emergencias-24-7`
- `/certificaciones` debería enlazar a `/servicios/instalaciones-electricas` y `/servicios/cuadros-electricos`
- Blog posts deberían enlazar a servicios relacionados (anchor text keyword-rich)

---

## 5. Open Graph y metadatos sociales

**Estado actual**: Implementados via `SeoService` con:
- `og:title`, `og:description`, `og:url`
- `twitter:card = summary_large_image`
- Canonical URL

**Pendiente**:
- `og:image` → Necesita una imagen OG por defecto (ver image-generation-log.md)
- `og:type = LocalBusiness` → para la home
- `og:locale = es_ES`

---

## 6. Sitemap

El sitemap se genera dinámicamente en `server.ts` con todas las rutas públicas. Incluye:
- Home
- Todas las páginas de servicio (6)
- Páginas info (empresa, zonas, proyectos, certificaciones)
- Blog (posts con slug)
- Contacto

**Pendiente**:
- Añadir `<changefreq>` y `<priority>` a rutas clave
- Excluir páginas legales del sitemap o marcarlas con `noindex`

---

## 7. Robots.txt

Gestionado dinámicamente en `server.ts`. Debe verificarse que:
- Permite crawl de todas las páginas públicas
- Bloquea `/api/*` y cualquier ruta interna
- Referencia el sitemap

---

## 8. Gaps semánticos detectados

### Palabras clave con intención comercial alta sin página dedicada:

| Keyword | Volumen estimado | Acción recomendada |
|---|---|---|
| `precio instalación eléctrica Vigo` | Alto | Crear landing `/precio-instalacion-electrica` |
| `electricista barato Vigo` | Medio | Sección en home con enfoque precio/valor |
| `electricista Pontevedra` | Medio-alto | Crear landing local `/electricista-pontevedra` |
| `electricista Santiago de Compostela` | Medio | Crear landing local |
| `empresa mantenimiento eléctrico industrial Galicia` | Medio | Ampliar `/servicios/mantenimiento-preventivo` |
| `cuándo cambiar cuadro eléctrico` | Informacional | Artículo de blog |
| `qué es el REBT` | Informacional | Artículo de blog o sección en certificaciones |
| `instalación eléctrica nueva vivienda` | Transaccional | Landing o sección en instalaciones |

### Gaps de contenido informacional (oportunidad blog):
1. "Cuándo hay que cambiar el cuadro eléctrico de casa"
2. "Qué significa el REBT y por qué importa"
3. "Diferencia entre cuadro eléctrico doméstico e industrial"
4. "Mantenimiento eléctrico preventivo vs correctivo: guía práctica"
5. "Cómo preparar una instalación eléctrica para una nave industrial"
6. "Ahorro energético en iluminación industrial: guía técnica"
7. "Qué hacer cuando se va la luz en el cuadro y no vuelve"

---

## 9. Optimizaciones técnicas SEO pendientes

| Mejora | Impacto | Dificultad |
|---|---|---|
| Añadir `LocalBusiness` schema con geo y areaServed | Alto | Medio |
| Mejorar title de home: añadir "Vigo" | Medio | Bajo |
| Crear imagen OG por defecto | Medio | Bajo |
| Añadir `og:locale`, `og:type` | Bajo | Bajo |
| Implementar hreflang si se añade versión gallega | Bajo | Medio |
| Añadir `priority` y `changefreq` al sitemap | Bajo | Bajo |
| Activar Search Console y verificar indexación | Alto | Bajo |
| Monitorizar Core Web Vitals en producción | Alto | Bajo |
| Añadir WebPage schema en páginas informacionales | Bajo | Bajo |

---

## 10. Estrategia de contenido a 6 meses

### Mes 1-2: Base
- Completar datos registrales en aviso-legal
- Activar Search Console
- Monitorizar indexación de las 16+ páginas actuales
- Generar imágenes para hero y servicios (imagen-generation-log.md)

### Mes 3-4: Expansión local
- Crear landing `/electricista-pontevedra`
- Crear landing `/electricista-vigo` (diferenciada de home)
- Publicar 2-3 artículos de blog evergreen

### Mes 5-6: Contenido y autoridad
- Publicar 3-5 artículos más (ver gaps informacionales)
- Crear landing de precios/presupuesto
- Solicitar enlaces desde asociaciones eléctricas, proveedores, gremios locales
- Revisar posicionamiento y ajustar keywords según datos reales de Search Console
