# Macau Sauna — Brief del Proyecto

> **Documento de la FASE 0 según el workflow NO PROB**
> Stack fijo: Astro v5/6 + Tailwind CSS v4 + TypeScript + React (componentes interactivos)
> Output: Static (Cloudflare Pages)

---

## 📋 DATOS DEL PROYECTO

- **Nombre del Proyecto**: Macau Sauna
- **Cliente**: Por definir
- **Sitio actual del cliente**: https://relaxmacau.com/en/ ← **Este es el sitio que estamos rediseñando**
- **Tipo**: Rediseño completo de sitio web estático (SSG) — Venue / Concierge de entretenimiento premium en Macao
- **Idioma**: Exclusivamente en **inglés**
- **Stack**: Astro v7 (arquitectura general + páginas estáticas) + React v19 (componentes interactivos como Smart Match)
- **CSS**: Tailwind CSS v4.3 (vía plugin Vite, NO `@astrojs/tailwind`)
- **Dominio temporal**: Cloudflare Pages (`*.pages.dev`)
- **Dominio producción**: El cliente lo vinculará a su propio GitHub + Cloudflare

---

## 🎯 OBJETIVO DEL PROYECTO

Rediseñar y reconstruir **desde cero** el sitio web actual del cliente (`relaxmacau.com/en/`) — un servicio de concierge/booking de venues (spa/sauna/entretenimiento) en Macao. El nuevo sitio debe:

1. **Conservar la misma arquitectura y contenido** del sitio actual (`relaxmacau.com/en/`), que es de donde se extraen la estructura de páginas, textos, venues y funcionalidades
2. **Superar visualmente** al competidor principal (`macausauna.tw`) con un diseño significativamente premium y único
3. **Ser editable por el cliente** mediante archivos `.md` (Markdown) para gestionar venues, artículos y contenido
4. **Incluir un componente interactivo "Smart Match"** (calculadora/filtro en React) como núcleo de conversión (ya existe en el sitio actual, se rediseñará con mejor UX)
5. **Integrar enlaces directos de contacto** (WhatsApp, Telegram, WeChat)

---

## 🏢 QUÉ HACEN (propuesta de valor)

Plataforma de concierge VIP que conecta visitantes internacionales con los mejores venues de spa y entretenimiento en Macao. Ofrecen:

- Recomendación personalizada de venues
- Transporte privado gratuito (pickup y return)
- Entrada VIP sin filas + precios especiales
- Extras gratuitos (masajes, manicure, etc.)
- Soporte 24/7 en múltiples idiomas vía chat (WhatsApp, Telegram, WeChat, LINE)

---

## 🚫 QUÉ NO SON (diferenciación)

- **NO** son los venues directamente — son un servicio de concierge/booking que conecta clientes con los venues
- **NO** es una agencia de viajes tradicional
- **NO** es un directorio genérico — es un servicio curado con recomendaciones personalizadas

---

## 🎨 TONO DE MARCA

- **Premium / High-end**: Sofisticado, elegante, lujoso
- **Exclusivo**: Sensación VIP, membresía, acceso privilegiado
- **Confiable**: Profesional, transparente, seguro
- **Temática**: Vida nocturna + casino + lujo (inspiración en la estética de Macao como capital mundial del juego)
- **Cosmopolita**: Orientado a audiencia internacional (inglés)

---

## 🌐 SITIO ACTUAL DEL CLIENTE (fuente de contenido y arquitectura)

**URL**: https://relaxmacau.com/en/

Este es el sitio que estamos rediseñando. De aquí se extraen:

- **Estructura de páginas**: Home, Venues, Smart Match, How It Works, Guides/Blog, FAQ, Contact
- **Contenido**: textos de venues, descripciones, precios, features, testimonios
- **Arquitectura funcional**: Smart Match, sistema de filtrado de venues, proceso "How It Works", tabla de VIP Extras
- **12 venues**: Manhao Spa, Number Nine Spa, Shang Pin Spa, Majesty Spa, The Excellent Sauna, Empire Sauna, East Castle Spa, Victoria Sauna, M CLUB, Oceanic Royal Spa, Number One Sauna, Familia Nobre
- **Canales de contacto**: WhatsApp, Telegram, WeChat, LINE
- **Guías/Blog**: artículos como "Macau Sauna Prices 2026"

**Lo que se CONSERVA**:
- Misma estructura de páginas y rutas
- Mismo contenido textual (textos, descripciones de venues, precios)
- Mismas funcionalidades (Smart Match, filtrado, contacto)
- Mismo enfoque internacional en inglés

**Lo que se MEJORA**:
- Diseño visual premium (Noir + Gold, Emerald + Cream, o Crimson + Charcoal)
- Rendimiento (Astro SSG, zero JS donde no se necesite)
- Animaciones y micro-interacciones (GSAP, CSS keyframes)
- Contenido gestionable por Markdown (actualmente hardcodeado)
- SEO técnico (sitemap, OG, JSON-LD, canonical, meta tags únicos por página)

---

## 🏗️ ESTRUCTURA DE PÁGINAS

Basada en el sitio actual del cliente (`relaxmacau.com/en/`)

| # | Página | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | **Home** | `/` | Hero tipo "boarding pass" VIP, featured venues, Smart Match rápido, cómo funciona, testimonios, CTA de contacto |
| 2 | **Venues / Saunas** | `/venues` | Listado completo de venues con sistema de filtrado por categorías (All, Theme Rooms, Best Value, Newest, KTV, etc.) |
| 3 | **Venue Detail** | `/venues/[slug]` | Página individual por venue: galería, descripción, features, precios, CTA para reservar |
| 4 | **How It Works** | `/how-it-works` | Proceso paso a paso (5 pasos): recomendación → shuttle → VIP entry → extras → return ride |
| 5 | **Smart Match** | `/smart-match` | Página dedicada al componente interactivo de matching/calculadora (React) |
| 6 | **Blog / Guides** | `/guides` | Artículos tipo guía: precios, tips, comparativas, first-timer guide, etc. |
| 7 | **Guide Detail** | `/guides/[slug]` | Artículo individual en Markdown |
| 8 | **Contact** | `/contact` | Página de contacto con enlaces directos a WhatsApp, Telegram, WeChat, LINE + FAQ |
| 9 | **FAQ** | `/faq` | Preguntas frecuentes |
| 10 | **404** | `/404` | Página de error personalizada |

### Secciones del Home (según análisis de competencia):

```
1. NAV: Logo + links + CTA "Book Now" / "Contact"
2. HERO: Estilo "Boarding Pass" VIP con animación
   - "Your VIP Experience" / "Macau Sauna & Spa"
   - Badges: Free Shuttle, VIP Entry, 24/7 Support
   - CTA: "Explore Venues" + "Book Now"
   - Lista horizontal de venues destacados (autoscroll)
3. FEATURED VENUES: Grid de cards con tabs de filtro
   - All | Theme Rooms | Best Value | Newest | KTV
   - Cada card: imagen, nombre, badge, breve desc, "Learn More →"
4. SMART MATCH (embeber): Versión compacta del filtro interactivo
   - Preguntas: How many? / What experience? / When? / Coming from?
   - Resultado: "Best Match" con % de compatibilidad + alternativas
   - CTA: "Book Now"
5. HOW IT WORKS: Timeline visual de 5 pasos
   - Con iconos y transiciones suaves
6. WHY CHOOSE US: 4 features clave con iconos
   - Selection Show, Private 1-on-1, Themed Rooms, Overnight
7. TESTIMONIALS: Carrusel/scroll de testimonios reales
   - Con nacionalidad del cliente, rating, texto
8. LATEST GUIDES: Mini-preview de 2-3 artículos del blog
9. FINAL CTA: "Not Sure? Let Us Recommend" + botones de contacto
10. FOOTER: Links, contacto, legales
```

---

## 📞 CANALES DE CONTACTO OFICIALES

| Canal | Dato | Enlace / Acción |
|---|---|---|
| **WhatsApp** | `+853 6567 0348` | [Abrir chat](https://api.whatsapp.com/send/?phone=85365670348&text=I%27m+interested+in+Macau+sauna.+Could+you+help+arrange+this%3F&type=phone_number&app_absent=0) |
| **Telegram** | `@Aomensauna` | [Abrir chat](https://t.me/Aomensauna) |
| **WeChat** | `AN99348` | Copiar ID manualmente |
| **LINE** | `16880348` | Copiar ID manualmente |

> La página de contacto (`/contact`) dirá algo como: "Answer Your Questions — We take pride in your satisfaction. Reach out anytime — we reply within minutes, 24 hours a day." — y mostrará las 4 opciones de contacto.

---

## 🧩 FUNCIONALIDADES CLAVE

### 1. Smart Match (React Component) ⚡

El **core interactivo** del sitio. Una calculadora/filtro client-side que:

- Hace preguntas secuenciales (quiz-style o filtros simultáneos):
  - ¿Cuántas personas? (1, 2, 3-4, 5+)
  - ¿Qué experiencia buscan? (Main Stage, Theme Rooms, Buy 1 Get 1, JP/KR Staff, Newest, KTV, Classic)
  - ¿Cuándo? (Right now, Tonight, Tomorrow, Sat night, Sun night)
  - ¿Desde dónde? (Border, Hotel, Airport)
  - ¿Overnight? (toggle: necesito habitación para dormir)
- **Lógica client-side pura** (sin backend): cruza criterios con un dataset de venues
- Muestra:
  - **Best Match** con porcentaje de compatibilidad (ej. 93% match)
  - **Alternativas** (2-3 opciones secundarias con % menor)
  - CTA directo a WhatsApp/Telegram para reservar
- Animaciones fluidas con GSAP (transiciones entre preguntas, reveal del resultado)
- Debe existir como:
  - Versión completa en `/smart-match`
  - Versión embed compacta en el Hero del Home

### 2. Gestión de Contenido por Markdown

El cliente debe poder editar sin tocar código:

```
src/content/
├── venues/
│   ├── manhao-spa.md
│   ├── number-nine-spa.md
│   └── ...
├── guides/
│   ├── macau-sauna-prices-2026.md
│   ├── first-timer-guide.md
│   └── ...
└── config/
    └── site-settings.md (o constants.ts para datos globales)
```

- **Venues**: nombre, slug, descripción, features, pricing, galería, badges (New, Popular, etc.), categorías
- **Guides**: título, fecha, autor, excerpt, contenido markdown, imagen destacada
- **Astro Content Collections** para type-safety y autocompletado

### 3. Integración de Contacto Directo

Enlaces estáticos y limpios (sin rastreadores, sin acortadores):

- **WhatsApp**: [`+853 6567 0348`](https://api.whatsapp.com/send/?phone=85365670348&text=I%27m+interested+in+Macau+sauna.+Could+you+help+arrange+this%3F&type=phone_number&app_absent=0) — "I'm interested in Macau sauna. Could you help arrange this?"
- **Telegram**: [`@Aomensauna`](https://t.me/Aomensauna)
- **WeChat**: `AN99348` (ID para copiar — no hay deep link universal)
- **LINE**: `16880348`

Componente `ContactBar.astro` reutilizable (flotante o en footer) con íconos de Lucide.

### 4. Sistema de Filtrado de Venues

En la página `/venues`:
- Tabs: All | Theme Rooms | Best Value | Newest | KTV | JP/KR Staff
- Cada venue es una card con: imagen, nombre, badge, excerpt, "Learn More →"
- Animaciones de transición al cambiar de tab (GSAP)

---

## 🎨 SISTEMA DE DISEÑO (preliminar)

### Paleta de Colores (inspiración: noche + casino + lujo)

| Variable | Color | Uso |
|----------|-------|-----|
| `--color-primary` | `#C9A84C` (Gold/Dorado) | Acentos, CTAs, badges, íconos destacados |
| `--color-primary-dark` | `#A68A3E` | Hover states del primary |
| `--color-secondary` | `#1A1A2E` (Deep Navy/Noir) | Fondos oscuros, hero sections |
| `--color-bg` | `#0D0D1A` (Almost Black) | Fondo principal |
| `--color-surface` | `#16162B` (Dark Card) | Cards, superficies elevadas |
| `--color-border` | `#2A2A4A` | Bordes sutiles |
| `--color-text` | `#EDEDF5` (Off-white) | Texto principal |
| `--color-text-muted` | `#8888A8` | Texto secundario |
| `--color-accent` | `#7B2D8B` (Purple/Violet) | Gradientes, glow effects, detalles de vida nocturna |

> **Alternativa de paleta**: tonos verde-esmeralda + dorado (inspiración casino de lujo) o rojo-oscuro + dorado (inspiración casino asiático). A definir en FASE 1.

### Tipografía

| Rol | Fuente | Pesos | Tipo |
|-----|--------|-------|------|
| **Headings** | Playfair Display | 600, 700, 800 | Serif elegante |
| **Body** | Inter | 300, 400, 500, 600 | Sans-serif legible |

> Alternativas para headings: Cormorant Garamond, Cinzel, Bodoni Moda
> Carga: Google Fonts con `preconnect` + `font-display: swap`

### Componentes Visuales Clave

- **Hero Boarding Pass**: Diseño tipo tarjeta de embarque con bordes dorados, tipografía elegante, animación de entrada
- **Cards de Venues**: Glassmorphism o superficie oscura con borde dorado sutil, badge de categoría, hover effect con glow
- **Smart Match**: UI tipo "quiz" premium, transiciones suaves entre pasos, animación de "match percentage" con contador
- **Botones**: Primario dorado con hover glow, secundario outline, CTA flotante de WhatsApp
- **Testimonios**: Cards con quote marks grandes, foto/avatar, nacionalidad, estrellas
- **Timeline (How It Works)**: Línea vertical con nodos animados al hacer scroll (GSAP ScrollTrigger)

---

## 📊 ANÁLISIS DE COMPETENCIA

### Fuente de contenido y arquitectura: relaxmacau.com/en/ (sitio ACTUAL del cliente)

| Aspecto | Observación |
|---------|-------------|
| **Rol en el proyecto** | **Sitio actual del cliente.** Es la fuente oficial de contenido, estructura, venues y funcionalidades. Estamos haciendo un rediseño completo, no un clon. |
| **Target** | Internacional (English) |
| **Estructura** | Hero + Venues + Smart Match + How It Works + Why Us + Testimonials + Blog + Contact |
| **Lo que conservamos** | Arquitectura de páginas, textos de venues, precios, features, Smart Match, proceso "How It Works", VIP Extras, canales de contacto |
| **Lo que mejoramos** | Diseño visual, rendimiento, animaciones, gestionabilidad (Markdown), SEO técnico |
| **Lo que NO copiamos** | El diseño visual — se reemplaza completamente con una estética premium propia |

### Competidor principal: macausauna.tw

| Aspecto | Observación |
|---------|-------------|
| **Target** | Taiwan players (繁中) |
| **Estructura** | Hero boarding pass + Venues + Smart Match + Process + Testimonials + Contact |
| **Fortalezas** | Smart Match interactivo, diseño tipo boarding pass original, muchos testimonios, 12 venues detallados |
| **Debilidades** | Diseño funcional pero no premium, carga visual pesada, mucho texto scroll infinito, testimonios repetidos 3 veces, sin blog |
| **Lo que tomamos como inspiración** | Concepto del Smart Match, estructura de venues, pasos del proceso, sistema de tabs — pero con diseño propio y superior |

### Qué haremos MEJOR que ambos:

1. **Diseño visualmente superior**: animaciones GSAP, glassmorphism, glow effects, tipografía más elegante
2. **Smart Match más pulido**: UI de quiz premium, animaciones de transición, contador de %, confeti al hacer match
3. **Rendimiento superior**: Astro SSG con zero JS en páginas estáticas, React solo en Smart Match
4. **Contenido gestionable**: Markdown para venues y guides (ambos sitios de referencia lo tienen hardcodeado)
5. **Dark theme premium**: Noir + gold aesthetic que realmente transmita lujo
6. **No duplicación de contenido**: testimonios únicos, sin scroll infinito repetido

---

## 🔧 REQUERIMIENTOS TÉCNICOS

### Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Astro | v7+ | Framework SSG principal |
| React | v19 | Componentes interactivos (Smart Match) |
| TypeScript | v5+ | Type safety |
| Tailwind CSS | v4 | Estilos utilitarios (plugin Vite) |
| GSAP | v3+ | Animaciones avanzadas |
| Lenis | latest | Smooth scrolling |
| Lucide Astro | latest | Iconografía |
| @astrojs/sitemap | latest | SEO sitemap |

### Reglas de Arquitectura (NO PROB)

- ✅ **Un solo Layout** (`BaseLayout.astro`)
- ✅ **Componente `SEO.astro` separado** (OG, Twitter, JSON-LD, canonical)
- ✅ **Textos en `constants.ts`** (no duplicar)
- ✅ **Astro para estático, React solo para interactivo** (no duplicar .astro + .jsx)
- ✅ **Tailwind utilitario, CSS solo para animaciones complejas**
- ✅ **Google Fonts con preconnect + font-display: swap**
- ✅ **`devToolbar: false`**

### Estructura de Carpetas

```
macau/
├── docs/
│   ├── 01-brief.md           ← Este documento
│   └── 02-design.md          ← Sistema de diseño detallado (FASE 1)
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   ├── images/
│   │   ├── venues/           ← Imágenes de venues (placeholders inicialmente)
│   │   ├── og/               ← Open Graph images
│   │   └── ui/               ← Iconos, texturas, backgrounds
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── global/           ← Header, Footer, SEO, ContactBar
│   │   ├── home/             ← Hero, FeaturedVenues, HowItWorks, Testimonials, etc.
│   │   ├── venues/           ← VenueCard, VenueFilter, VenueGrid
│   │   ├── smart-match/      ← React: SmartMatch, MatchResult, QuizStep
│   │   └── ui/               ← Button, Badge, Card, Timeline, TestimonialCard
│   ├── content/
│   │   ├── venues/           ← Markdown: cada venue
│   │   ├── guides/           ← Markdown: cada artículo
│   │   └── config.ts         ← Colecciones de Astro Content
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro       ← Home
│   │   ├── venues/
│   │   │   ├── index.astro   ← Listado de venues
│   │   │   └── [slug].astro  ← Detalle de venue
│   │   ├── smart-match.astro ← Página dedicada Smart Match
│   │   ├── how-it-works.astro
│   │   ├── guides/
│   │   │   ├── index.astro   ← Listado de guías
│   │   │   └── [slug].astro  ← Detalle de guía
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css        ← @import "tailwindcss" + @theme
│   ├── types/
│   │   └── index.ts          ← Interfaces: Venue, Guide, SeoProps, NavLink, etc.
│   └── utils/
│       ├── constants.ts      ← SITE_TITLE, NAV_LINKS, CONTACT_INFO, etc.
│       └── match-logic.ts    ← Lógica del Smart Match (compartida Astro + React)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.toml             ← Cloudflare Pages config
```

---

## 🗺️ PLAN DE DESARROLLO (Workflow NO PROB)

### FASE 0 — Brief ✅ (ESTE DOCUMENTO)
- [x] Análisis de competencia
- [x] Estructura de páginas
- [x] Funcionalidades clave
- [x] Diseño preliminar

### FASE 1 — Diseño (siguiente paso)
- [ ] Definir paleta de colores final
- [ ] Definir tipografía final
- [ ] Crear moodboard/referencias visuales
- [ ] Crear `docs/02-design.md`
- [ ] Decidir entre estética "Noir + Gold" vs "Emerald + Gold" vs "Red + Gold"

### FASE 2 — Setup
- [ ] `npm create astro@latest`
- [ ] Instalar dependencias (tailwindcss, gsap, lenis, lucide-astro, sitemap, react)
- [ ] Configurar `astro.config.mjs`, `tsconfig.json`, `global.css`
- [ ] Crear estructura de carpetas
- [ ] `npm run dev` funcionando

### FASE 3 — Desarrollo
- [ ] Tipos e interfaces (`types/index.ts`)
- [ ] Constantes (`utils/constants.ts`)
- [ ] Componentes globales (SEO, BaseLayout, Header, Footer, ContactBar)
- [ ] UI components (Button, Badge, Card, Timeline)
- [ ] Home page (Hero, FeaturedVenues, SmartMatch embed, HowItWorks, Testimonials, Guides preview, FinalCTA)
- [ ] Content collections (venues + guides)
- [ ] Venues page (listado + filtrado)
- [ ] Venue detail page
- [ ] Smart Match page (React component full)
- [ ] How It Works page
- [ ] Guides (listado + detalle)
- [ ] Contact page
- [ ] FAQ page
- [ ] 404 page
- [ ] SEO por página
- [ ] robots.txt + sitemap
- [ ] Animaciones GSAP (ScrollTrigger, transiciones, reveals)

### FASE 4 — Deploy
- [ ] Deploy a Cloudflare Pages (dominio temporal)
- [ ] Pruebas de rendimiento (Lighthouse)
- [ ] Revisión con cliente
- [ ] Ajustes finales
- [ ] Entrega: vinculación a GitHub del cliente + Cloudflare producción

---

## 📝 CONTENIDO PRELIMINAR POR PÁGINA

### Home

```
H1: Macau Sauna & Spa — Your VIP Experience
Subtítulo: Complimentary 24/7 Private Shuttle Pickup & Return
Badges: Free Shuttle · VIP Entry · 24/7 English Support · 12 Partner Venues
Featured venues grid con tabs
Smart Match embed ("Find your perfect venue in 60 seconds")
How It Works (5 pasos)
Why Choose Us (4 features)
Testimonials carrusel
Latest Guides (2-3 previews)
Final CTA: "Not Sure? Let Us Recommend"
```

### Venues

```
H1: Explore Our Partner Venues
Subtítulo: 12 hand-picked venues — each with its own selection show, private sessions, themed rooms, and overnight stays.
Tabs: All | Theme Rooms | Best Value | Newest | KTV | JP/KR Staff
```

### Smart Match

```
H1: Find Your Perfect Venue
Subtítulo: Answer a few questions — we'll match you to the best venue in 60 seconds.
Componente React interactivo full-width
```

### How It Works

```
H1: How It Works
5 pasos con timeline visual:
1. Let us recommend
2. Free private shuttle pickup
3. VIP entry + special pricing
4. Pick 1 VIP extra (free)
5. Complimentary return ride
Tabla de VIP Extras (Back Rub, Thigh Massage, Head Massage, Reflexology, Manicure, Pedicure, Hand Massage, Ear Cleaning)
```

### Contact

```
H1: Contact Us
Subtítulo: WhatsApp / Telegram / WeChat — choose your channel. English 24/7 support.
Botones grandes de contacto por canal
FAQ resumida
```

---

## 🔍 SEO — KEYWORDS PRINCIPALES

```
- Macau sauna
- Macau spa
- Macau nightlife
- Macau VIP experience
- Macau sauna booking
- Macau spa guide
- Macau entertainment
- luxury spa Macau
- Macau sauna prices 2026
- Macau sauna recommendation
- Macau free shuttle spa
```

---

## ⚠️ NOTAS IMPORTANTES

1. **Contenido placeholder**: Durante desarrollo se usarán textos e imágenes del sitio actual (`relaxmacau.com/en/`). El cliente podrá reemplazarlos editando los archivos `.md` antes del launch.
2. **No clon exacto**: Misma estructura funcional, diseño significativamente diferente y superior.
3. **Sin contenido explícito**: El sitio es un concierge/guía — no muestra contenido adulto.
4. **18+ disclaimer**: Evaluar si se necesita un age gate sutil (modal "Are you 18+?").
5. **Markdown-first**: Todo contenido que el cliente necesite modificar debe estar en `.md`, nunca hardcodeado.
6. **React solo donde sea necesario**: Smart Match es el único componente que justifica React. Todo lo demás en `.astro`.

---

> **Próximo paso**: FASE 1 — Crear `docs/02-design.md` con la paleta definitiva, tipografía, moodboard y especificaciones visuales detalladas.
