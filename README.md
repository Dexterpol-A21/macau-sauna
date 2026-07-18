# Macau Sauna Booking — Delivery

The website is finished. Live preview: https://macau-sauna.pages.dev
Repository: https://github.com/Dexterpol-A21/macau-sauna

The temporary site and public repo will be available for 30 days — I highly recommend forking the repo as soon as possible. When uploading to your Cloudflare account, select **Astro** as the framework. Let me know if you need any help.

---

## What Changed From the Original Plan

A few strategic decisions were made during development to improve conversion, narrative flow, and overall polish:

### Spin Wheel Replaced Smart Match

The original Smart Match was a self-service questionnaire: users answered a few questions, got a venue recommendation, and could leave if it didn't convince them. **It was silently killing leads.** Every drop-off was a lost conversation no one could recover.

The Spin Wheel flips that psychology entirely. Users engage with a game-like interaction, receive a reward (a complimentary VIP Extra), and are naturally guided toward contacting you directly. The concierge closes the sale — not an algorithm. More leads, more conversations, better conversion.

### Shuttle Moved Into Guides and How It Works

A standalone shuttle page broke the reading flow. The free pickup and return service now lives inside `/guides` and `/how-it-works`, positioned right after the step-by-step process where it actually makes sense: *you don't need to figure anything out — we come to you.* Context over clutter.

### Design Language: High-End, Elegant, Discreet

Every visual choice was deliberate:

- **Restrained palette.** Black and near-black backgrounds alternate through every section. Gold accents signal exclusivity without screaming luxury. Zero blue tones — the palette is intentionally warm and grounded.
- **Typography with authority.** Playfair Display for headlines, Inter for body. Classic serif confidence backed by clean modern readability. Nothing trendy, nothing that ages.
- **Slot-machine text animations on every section title.** These aren't decoration — they create a micro-moment of anticipation that mirrors the experience your client is about to book. Gamification replaces passive scrolling.
- **Parallax hero for each venue** with ambient floating images, full lightbox gallery, and detailed flow steps — every venue page tells its own complete story.

---

## Pages Built

| Route | What's there |
|---|---|
| `/` | Hero with bento card gallery, Spin Wheel, How It Works, All 12 Saunas, Testimonials carousel |
| `/venues` | Full directory with category filters and search |
| `/venues/[slug]` | Individual venue: parallax hero, image gallery with lightbox, detailed info cards (price, staff, hours, payment, highlights), VIP flow steps, related venues cross-sell |
| `/how-it-works` | 10-step process, sauna recommendations, insider tips, shuttle info, testimonials |
| `/guides` | Free shuttle service explained in detail |
| `/about` | Brand story and trust signals |
| `/vip-extras` | Slot machine game + full complimentary extras list |
| `/spin-wheel` | Spin Wheel as its own page |
| `/ranking` | Sauna ranking |
| `/faq` | Frequently asked questions |
| `/contact` | Direct contact channels — WhatsApp, Telegram, WeChat, LINE |
| `/terms` / `/privacy` | Legal pages |

---

## Tech Stack

Astro 7 + React 19 + Tailwind CSS v4 + GSAP + Motion (Framer Motion) + Lenis smooth scroll. Fully static, deploys instantly to Cloudflare Pages.

---

## Getting Started

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Production build in dist/
```

Deploy to Cloudflare Pages: select **Astro** as framework, point build output to `dist/`. Done.
