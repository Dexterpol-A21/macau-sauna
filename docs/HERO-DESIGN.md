# Macau Sauna — Global Design System

> **Scope:** This document defines the visual language for the entire site.
> Every section — Hero, Partner Saunas, Concierge — follows these rules.
> Color, typography, borders, buttons, animations, and spacing are consistent
> from the first pixel of `YOUR NIGHT` to the last VIP Extra row.

---

## 1. Color Palette

### 1.1 Semantic Tokens (global.css)

```css
--color-primary:           #C9A84C   /* gold */
--color-primary-light:     #DFC878   /* lighter gold for hover states */
--color-primary-dark:      #A68A3E   /* darker gold for depth */
--color-primary-foreground:#0A0A14   /* text on gold backgrounds */

--color-bg:                #0A0A14   /* site background */
--color-surface:           #12122A
--color-surface-light:     #1A1A3A
--color-border:            #2A2A4A
--color-text:              #EDEDF5   /* body text near-white */
--color-text-muted:        #8888A8   /* secondary text */
--color-ring:              #C9A84C
```

### 1.2 Section-Specific Accent

All sections derive their accent from `#DDB855` (hero gold) or `#C9A84C` (CSS variable).

| Token | Hex | Section(s) |
|---|---|---|
| Gold accent (hero) | `#DDB855` | Hero diamond marks, accent labels, button border/text |
| Gold accent (sections) | `#C9A84C` | AllSaunas badges, Concierge eyebrow, filter active state |
| Gold gradient | `#C9A84C → #E0CA6A` | VIP Extra "Free" badges |
| Pink spotlight | `rgba(255, 20, 147, 0.15)` | Hero card 0 (Manhao) only |
| Gold spotlight | `rgba(221, 184, 85, 0.12)` | Hero cards 1–4 |

### 1.3 Typography Colors

| Role | Hex | Usage |
|---|---|---|
| Headline white | `#FFF8F0` | Section titles, hero title, TOP PICKS, card names |
| Body beige | `#B0A890` | Hero subtext only |
| Body muted | `#8888A8` / `#9999AA` / `#9999B0` | Card descriptions, step descriptions |
| Dim text | `#7777A0` / `#666688` | Extra notes, struck-through prices |
| Background | `#0A0A0A` | AllSaunas + Concierge sections (near-black, not pure `#0A0A14`) |
| Hero background | `#000000` | Explicit `bg-black` on ContainerScroll |
| Card surface | `#111111` | AllSaunas cards |
| Card reverse | `#0A0A0F` | FlipCard back face |

---

## 2. Typography

### 2.1 Font Families

| Role | Family | Weight | Usage |
|---|---|---|---|
| Headings | `Playfair Display` | 700–900 | Section titles, hero titles, card names, step titles |
| Body / UI / Labels | `Inter` | 400–700 | Descriptions, buttons, filters, badges, prices, eyebrow labels |

### 2.2 Typographic Scale

#### Hero — `YOUR NIGHT`

```
font-family:  'Playfair Display', serif
font-weight:  900                    (font-black)
font-size:    clamp(4rem, 12vw, 10rem)
line-height:  0.95
letter-spacing: -0.03em
text-transform: uppercase
padding-block: 0.06em
overflow:     visible
color:        #FFF8F0
text-shadow:  0 0 80px rgba(0, 0, 0, 0.6)
```

#### Hero — `TOP PICKS`

```
font-family:  'Playfair Display', serif
font-weight:  900
font-size:    clamp(3rem, 8vw, 7rem)
line-height:  0.92
letter-spacing: -0.02em
text-transform: uppercase
color:        #FFF8F0        ("TOP")
color:        accent         ("PICKS")
text-shadow:  0 0 60px rgba(0, 0, 0, 0.5)
```

#### Section Titles (AllSaunas + Concierge)

```
font-family:  'Playfair Display', serif
font-weight:  800
font-size:    clamp(2.5rem, 6vw, 4rem)    ← Concierge (largest)
              clamp(2rem, 5vw, 3.25rem)    ← AllSaunas (smaller)
line-height:  1.05 – 1.15
letter-spacing: -0.02em
color:        #FFF8F0
```

#### Section Eyebrow Label

```
font-family:  'Inter', sans-serif
font-weight:  700
font-size:    0.625rem – 0.68rem
letter-spacing: 0.28em – 0.34em
text-transform: uppercase
color:        #C9A84C
```

#### Card Names (AllSaunas)

```
font-family:  'Playfair Display', serif
font-weight:  700
font-size:    1.1rem (standard) / 1.35rem (hero cell)
line-height:  1.2
letter-spacing: -0.01em
color:        #FFF8F0
```

#### Badges

```
font-family:  'Inter', sans-serif
font-size:    0.55rem
font-weight:  700
letter-spacing: 0.15em
text-transform: uppercase
color:        #0A0A0A
background:   #C9A84C
border-radius: 0.2rem
padding:      0.2rem 0.65rem
```

#### Concierge Step Numbers

```
font-family:  'Playfair Display', serif
font-size:    3.5rem
font-weight:  700
color:        rgba(201, 168, 76, 0.16)
line-height:  0.8
letter-spacing: -0.03em
```

---

## 3. Buttons

### 3.1 Primary CTA — Gradient ("Contact Us")

```
display:        inline-flex; align-items: center; justify-content: center;
padding:        0.85rem 2rem;
font-size:      0.88rem;
font-weight:    600;
letter-spacing: 0.10em;
text-transform: uppercase;
min-width:      120px;
border-radius:  0.5em;
color:          #0A0A0A;
border:         none;

background-image: linear-gradient(
  325deg,
  #A68A3E  0%,       /* darkenHex(accent, 0.25) */
  #E8C96A 55%,       /* accentLight */
  #A68A3E 90%
);
background-size: 280% auto;

box-shadow:
  0px 0px 20px         rgba(221, 184, 85, 0.50),  /* outer glow */
  0px 5px 5px -1px     rgba(221, 184, 85, 0.25),  /* floor shadow */
  inset 4px 4px 8px    rgba(232, 201, 106, 0.50),  /* highlight */
  inset -4px -4px 8px  rgba(166, 138, 62, 0.35);   /* depth shadow */
```

| State | Effect |
|---|---|
| Hover | `translateY(-2px)`, background-position slides right |
| Active | `translateY(0)` |
| Focus-visible | Dual ring: `0 0 0 3px #0A0A0A` + `0 0 0 6px #A68A3E` |
| Reduced motion | `transition: linear` |

### 3.2 Secondary CTA — Outline ("Find Your Match")

```
display:        inline-flex; align-items: center; justify-content: center;
gap:            0.65rem;
min-width:      190px;
height:         50px;
padding:        0 1.6rem;
font-size:      0.88rem;
font-weight:    600;
letter-spacing: 0.10em;
text-transform: uppercase;
color:          accent;
background:     transparent;
border:         1px solid rgba(221, 184, 85, 0.45);
border-radius:  0.5em;
cursor:         pointer;
transition:     transform 0.25s ease;
```

Hover: `translateY(-2px)`, slot-machine poker icons cycle every 400ms.

### 3.3 Filter Buttons (AllSaunas)

```
font-family:  'Inter', sans-serif;
font-size:    0.7rem;
font-weight:  600;
letter-spacing: 0.1em;
text-transform: uppercase;
color:        #8888A8;
background:   rgba(255, 255, 255, 0.02);
border:       1px solid rgba(255, 255, 255, 0.06);
border-radius: 0.25rem;
padding:      0.45rem 1rem;
transition:   all 0.3s ease;
```

| State | Effect |
|---|---|
| Hover / Active | `color: #0A0A0A; background: #C9A84C; border-color: #C9A84C` |

### 3.4 Card CTAs (AllSaunas — "Learn More")

```
font-family:  'Inter', sans-serif;
font-size:    0.7rem;
font-weight:  600;
color:        #C9A84C;
opacity:      0 (default) → 1 (card hover)
transform:    translateX(-4px) (default) → translateX(0) (card hover)
transition:   opacity 0.35s ease, transform 0.35s ease;
```

### 3.5 VIP Extra "Free" Badge (Concierge)

```
padding:        0.35rem 1.15rem;
font-size:      0.6rem;
font-weight:    700;
letter-spacing: 0.12em;
text-transform: uppercase;
color:          #0A0A14;
background:     linear-gradient(135deg, #C9A84C, #E0CA6A);
border-radius:  9999px;
```

---

## 4. Borders & Separators

| Element | Spec |
|---|---|
| **Primary button** | No border (gradient fill), rounded `0.5em` |
| **Secondary outline button** | `1px solid` accent at 45% opacity, rounded `0.5em` |
| **Filter buttons** | `1px solid rgba(255,255,255, 0.06)`, rounded `0.25rem` |
| **Hero title accent line** | `height: 3px; flex: 1; background: accent` — sits right of diamond mark |
| **FlipCard back top accent line** | `height: 2px; width: 2.5rem; border-radius: 9999px; background: accent` |
| **FlipCard back bottom divider** | `height: 1px; width: 4rem; background: linear-gradient(to right, transparent, accent 40%, transparent)` |
| **AllSaunas card** | `border: 1px solid rgba(201, 168, 76, 0.08); border-radius: 0.375rem` |
| **AllSaunas card hover** | `border-color: rgba(201, 168, 76, 0.4)` |
| **AllSaunas card footer divider** | `border-top: 1px solid rgba(255, 255, 255, 0.05)` |
| **FlipCard** | `border-radius: 0.75rem; overflow: hidden` |
| **Concierge extras list** | `border: 1px solid rgba(201, 168, 76, 0.08); border-radius: 0.5rem` |
| **Concierge extras block divider** | `border-top: 1px solid rgba(201, 168, 76, 0.08)` |
| **Extra row bottom** | `border-bottom: 1px solid rgba(255, 255, 255, 0.03)` |

**Rule:** All gold borders are at 8% opacity by default, 40% on hover/card interaction, 45% on interactive button.

---

## 5. Shadows & Glows

| Element | Shadow |
|---|---|
| Hero title `YOUR NIGHT` | `text-shadow: 0 0 80px rgba(0, 0, 0, 0.6)` |
| `TOP PICKS` title | `text-shadow: 0 0 60px rgba(0, 0, 0, 0.5)` |
| Primary button glow | `0px 0px 20px rgba(221, 184, 85, 0.5)` |
| Flip cards | `box-shadow: 0 4px 40px rgba(0, 0, 0, 0.4)` |
| AllSaunas card hover | `box-shadow: 0 12px 40px rgba(201, 168, 76, 0.07)` |

---

## 6. Animations

### 6.1 SlotMachineText

Per-character spring-driven slot-machine effect. Used on: `YOUR NIGHT` (stripLength=12), `TOP PICKS` (stripLength=8).

```
CHAR_POOL:     "ABCDEFGHIKLMNOPRSTUVWXYZ"   (no J, Q — tails clip in Playfair)

Strip layout (per character):
  [3 blanks] [N random chars] [target] [3 blanks]

Spring:
  type: spring
  stiffness: 75
  damping: 10
  mass: 0.5
  delay: 0.15 + index × 0.06        ← staggered

clipPath: inset(0em -0.5em 0em -0.5em)     ← hides other strip rows
```

### 6.2 Hero Scroll Animations

| Element | Trigger | Effect |
|---|---|---|
| `ContainerScale` (YOUR NIGHT) | `scrollYProgress 0→0.5` | Scale `[1→0]`, opacity `[1→0]` |
| `ContainerScale` position | `≥0.6` | Switches from `fixed` to `absolute` |
| `BentoCell` (images) | `0.1→0.9` | translateY `["-35%"→"0%"]`, scale `[0.5→1]` |
| `BentoFeaturedLabel` (TOP PICKS) | `0.55→0.7` | opacity `[0→1]`, x `[-24→0]` |
| TOP PICKS after 0.7 | `>0.7` | Locked at opacity=1, x=0 (React state, never fades on scroll-down) |
| TOP PICKS scroll-up | `0.7→0.55` | opacity `[1→0]`, x `[0→-24]` (fade-out) |

### 6.3 FlipCard

3D spring flip on hover:

```
rotateY: 0 → 180 (hover)
transition: { type: "spring", stiffness: 300, damping: 30 }
perspective: 1200
transformStyle: preserve-3d

Front opacity:  rotateY [0, 90] → [1, 0]
Back opacity:   rotateY [90, 180] → [0, 1]
```

### 6.4 SpotlightCard

Cursor-following radial glow. CSS custom properties on `mousemove`:

```css
--mouse-x, --mouse-y: cursor position within card
--spotlight-color: gold (0.12) or pink (0.15)

radial-gradient(circle at var(--mouse-x) var(--mouse-y),
  var(--spotlight-color), transparent 80%)

opacity: 0 → 1 (:hover / :focus-within)
transition: opacity 0.4s ease
```

### 6.5 AllSaunas Card Hover

```
border-color:  rgba(201, 168, 76, 0.08) → 0.4
transform:     none → translateY(-3px)
box-shadow:    none → 0 12px 40px rgba(201, 168, 76, 0.07)
image scale:   1 → 1.06 (inside .as-card-media img)
Learn More:    opacity 0, translateX(-4px) → opacity 1, translateX(0)
```

### 6.6 Concierge

```
Extra row hover: background rgba(201, 168, 76, 0.03)  (subtle gold tint on hover)
```

---

## 7. Layout & Spacing

### 7.1 Page Structure

```
BaseLayout
  └─ index.astro
       ├─ HeroGallery         (h-[350vh] scrolling timeline)
       ├─ AllSaunas            ("Partner Saunas" section)
       └─ Concierge            ("How It Works" + "VIP Extras")
```

### 7.2 Section Padding

| Section | Desktop | Mobile |
|---|---|---|
| AllSaunas | `6rem 1.5rem 8rem` | same |
| Concierge | `7rem 2rem 8rem` | `5rem 1.25rem 6rem` |
| Concierge extras block margin-top | `7rem` | `5rem` |

### 7.3 Hero Layout (DOM Tree)

```
ContainerScroll (h-[350vh] bg-black, relative)
  ├─ bento-right-zone (sticky top:0, h-screen, paddingLeft: 28vw)
  │   ├─ BentoFeaturedLabel (absolute, left: clamp, top:50%, translateY(-50%))
  │   └─ BentoGrid (8-col × 4-row, gap-4)
  │       ├─ Cell 0: 6col × 3row (md), 8col × 3row (mobile) — Manhao
  │       ├─ Cell 1: 2col × 2row (hidden mobile) — Number Nine
  │       ├─ Cell 2: 2col × 2row (hidden mobile) — Shang Pin
  │       ├─ Cell 3: 3col — Empire
  │       └─ Cell 4: 3col — Majesty
  └─ ContainerScale (fixed → absolute at 0.6, left: 0, top: 50%, translate: 0 -50%)
      ├─ Diamond mark + accent line
      ├─ YOUR NIGHT (SlotMachineText)
      ├─ Body text
      └─ CTA pair [Contact Us] [Find Your Match]
```

### 7.4 AllSaunas Grid

```
3 cols (desktop ≥1024px), 2 cols (tablet ≥540px), 1 col (mobile)

┌──────────────────────┬─────────────┬─────────────┐
│ Manhao (2×2 hero)    │ Number Nine │ Shang Pin   │
│                      ├─────────────┼─────────────┤
│                      │ Empire      │ Majesty     │
├──────────────────────┼─────────────┼─────────────┤
│ East Castle          │ The         │ Victoria    │
│                      │ Excellent   │             │
├──────────────────────┤ (1×2 tall)  ├─────────────┤
│ M CLUB (2×1 wide)    │             │ Oceanic     │
├──────────────────────┼─────────────┼─────────────┤
│ Number One           │ Familia     │             │
└──────────────────────┴─────────────┴─────────────┘

Gap: 0.75rem
Max width: 80rem (auto margins)
Auto rows: minmax(280px, auto) mobile / minmax(260px, auto) desktop
```

### 7.5 Concierge Layout

```                                  
Steps: 2-col grid (≥768px), single column (<768px)
  Final step centers across full width (grid-column: 1 / -1)
  Step item: flex row (number + content), gap: 2rem / 1.25rem mobile

Extras list: single column with internal borders
```

### 7.6 Responsive Breakpoints

| Breakpoint | Sections affected |
|---|---|
| `min-width: 540px` | AllSaunas → 2 cols |
| `min-width: 768px` | AllSaunas → 3 cols, Concierge steps → 2 cols |
| `max-width: 767px` | Hero → centered title, full-width images, `paddingLeft: 0` |
| `max-width: 640px` | Concierge → compact padding, vertical extra rows |

Typography uses `clamp()` for fluid scaling between breakpoints.

---

## 8. Smooth Scroll

**Library:** Lenis

```ts
new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  smoothWheel: true,
});
```

Initialized in `BaseLayout.astro` via a `<script>` tag at body level. Runs on `requestAnimationFrame`.

---

## 9. Global Base Styles

```css
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--color-bg);   /* #0A0A14 */
  color: var(--color-text);            /* #EDEDF5 */
  font-family: var(--font-body);       /* Inter */
  line-height: 1.65;
  overflow-x: hidden;
}

h1–h6 {
  font-family: 'Playfair Display', serif;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

a { color: var(--color-primary); }
a:hover { color: var(--color-primary-light); }

::selection {
  background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
  color: var(--color-text);
}
```

---

## 10. Key Architecture Decisions

| Decision | Why |
|---|---|
| React `useState` for TOP PICKS opacity | MotionValues revert when scroll target leaves viewport. Plain state stays. |
| `clamp: true` on useTransform | Prevents out-of-range extrapolation of opacity/x. |
| Label inside sticky bento container | Pinned WITH images, scrolls away together. No separate lifecycle. |
| `position: fixed→absolute` on ContainerScale | Viewport-fixed during hero, releases to not overlap next section. |
| `overflow-visible` + `paddingBlock` on title | Giant serif text needs breathing room to not clip ascenders/descenders. |
| No J/Q in SlotMachineText pool | Playfair Display J/Q tails extend past `clipPath` safety margins. |
| Near-black per-section backgrounds | `#0A0A0A` (sections) vs `#0A0A14` (body) vs `#000000` (hero) — slight tonal progression. |
| Lenis `easing` function | Decelerates smoothly, prevents jarring stops in scroll-linked animations. |
