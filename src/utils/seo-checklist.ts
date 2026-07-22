/**
 * SEO Checklist — Macau Sauna Booking
 *
 * Companion to seo-titles.ts.
 * Every page MUST pass this checklist before it's considered done.
 *
 * LEGEND:
 *   [AUTO]   = handled by BaseLayout / SEO.astro — nothing to do
 *   [PASS]   = pass as prop to <BaseLayout seo={{...}}>
 *   [MANUAL] = you must write it in the page component
 */

/* ═══════════════════════════════════════════════════════════════════
   1.  SEO PROPS — passed to <BaseLayout>
   ═══════════════════════════════════════════════════════════════════ */

export interface PageSeoChecklist {
  /** [PASS] Import from seo-titles.ts. Never hardcode. */
  title: boolean;
  /** [PASS] Unique description. 120-160 chars. Include primary keyword. */
  description: boolean;
  /** [PASS] Comma-separated. 10-15 keywords. Include "Macao" variant. */
  keywords: boolean;
  /** [PASS] Only set for /privacy, /terms — prevents Google indexing. */
  noindex: boolean;
  /** [PASS] ONLY if canonical differs from the real URL (rare). */
  canonical: string | null;
}

/* ═══════════════════════════════════════════════════════════════════
   2.  HEAD — auto-injected by BaseLayout + SEO.astro
   ═══════════════════════════════════════════════════════════════════ */

export const AUTO_HEAD = [
  "<meta charset='UTF-8'>",                               // [AUTO]
  "<meta name='viewport'>",                               // [AUTO]
  "<meta name='theme-color' content='#0A0A0A'>",           // [AUTO]
  "<link rel='icon' type='image/svg+xml'>",                // [AUTO]
  "<link rel='manifest'>",                                 // [AUTO]
  "<title>",                                               // [AUTO] from seo prop
  "<meta name='description'>",                             // [AUTO] from seo prop
  "<meta name='keywords'>",                                // [AUTO] from seo prop
  "<link rel='canonical'>",                                // [AUTO]
  "<meta name='robots'> (if noindex)",                     // [AUTO] conditional
  "<script type='application/ld+json'>",                   // [AUTO] WebSite + Organization
  "og:title, og:description, og:url, og:image",            // [AUTO]
  "og:image:width / og:image:height (64x64)",              // [AUTO]
  "og:type, og:site_name",                                 // [AUTO]
  "twitter:card, twitter:title, twitter:description",     // [AUTO]
  "Google Fonts preconnect (Inter + Playfair Display)",    // [AUTO]
] as const;

/* ═══════════════════════════════════════════════════════════════════
   3.  HTML SEMANTIC STRUCTURE — per-page rules
   ═══════════════════════════════════════════════════════════════════ */

export const HTML_RULES = [
  /** Exactly ONE <h1> per page. It IS the main topic. */
  "One <h1> only — contains the page's primary keyword phrase.",
  /** Heading hierarchy never skips levels. h1 → h2 → h3. */
  "Headings follow logical order: no h1→h3 jumps without an h2 between.",
  /** Every <img> has a meaningful alt="" text (or alt="" if purely decorative). */
  "All <img> tags have descriptive alt text.",
  /** Link text is descriptive, never "click here" or "learn more" alone. */
  "Anchor text is descriptive — no generic 'click here' or 'read more'.",
  /** Semantic HTML5 landmarks: <header>, <main>, <footer>, <nav>, <section>. */
  "Use semantic landmarks: <nav>, <main>, <section>, <footer>.",
] as const;

/* ═══════════════════════════════════════════════════════════════════
   4.  STRUCTURED DATA — per page type
   ═══════════════════════════════════════════════════════════════════ */

export const STRUCTURED_DATA: Record<
  string,
  { schema: string; note: string }
> = {
  /** The global ones are already in SEO.astro. These are extra schemas
      that specific pages SHOULD add via a <script type="application/ld+json"> block. */

  /* ── Pages with EXTRA structured data ─────────────────────── */

  "/": {
    schema: "LocalBusiness (optional)",
    note: "If the concierge has a physical office address, add LocalBusiness schema.",
  },
  "/venues": {
    schema: "ItemList",
    note: "Wrap the venue grid in an ItemList of LocalBusiness items. One per card.",
  },
  "/venues/[slug]": {
    schema: "LocalBusiness + Review + FAQ (if reviews exist)",
    note: "Per-venue schema: name, address, priceRange, image, aggregateRating.",
  },
  "/faq": {
    schema: "FAQPage",
    note: "Each Q&A pair gets a Question + Answer block. Critical for featured snippets.",
  },
  "/blog/[slug]": {
    schema: "Article",
    note: "datePublished, author, headline, image. Enables rich results for blog posts.",
  },
  "/ranking": {
    schema: "ItemList + Review",
    note: "Ordered list of venues with position, name, description, rating.",
  },
  "/contact": {
    schema: "ContactPage (optional)",
    note: "If it lists an address or phone beyond the chat links, add ContactPage.",
  },
};

/* ═══════════════════════════════════════════════════════════════════
   5.  CONTENT CHECKS — per page
   ═══════════════════════════════════════════════════════════════════ */

export const CONTENT_RULES = [
  "Minimum 300 words of unique content per page.",
  "Primary keyword appears in: title, h1, first 100 words, and at least 1 h2.",
  "Secondary keywords appear naturally in body text — never keyword-stuffed.",
  "Internal links: at least 2-3 contextual links to other relevant pages.",
  "No lorem ipsum or placeholder text in production.",
  "No duplicate content across pages — each page has a unique purpose.",
] as const;

/* ═══════════════════════════════════════════════════════════════════
   6.  PERFORMANCE — auto or manual
   ═══════════════════════════════════════════════════════════════════ */

export const PERF_RULES = [
  "[AUTO] Astro SSG — zero JS shipped for static pages.",     // Astro default
  "[AUTO] Google Fonts with display:swap + preconnect.",        // SEO.astro
  "[MANUAL] Images use <Image /> or loading='lazy' for below-fold.",
  "[MANUAL] No layout shift: every image / iframe has explicit width & height.",
  "[MANUAL] React only where interactive (Spin Wheel, Slot Extras). Static = .astro.",
] as const;

/* ═══════════════════════════════════════════════════════════════════
   7.  PAGE-SPECIFIC QUICK REFERENCE
   ═══════════════════════════════════════════════════════════════════ */

export interface PageSeoSpec {
  route: string;
  titleConstant: string;
  hasUniqueDescription: boolean;
  extraSchema?: string;
  contentMinWords: number;
  notes: string;
}

export const PAGE_SPECS: PageSeoSpec[] = [
  {
    route: "/",
    titleConstant: "TITLE_HOME",
    hasUniqueDescription: true,
    extraSchema: "LocalBusiness (optional)",
    contentMinWords: 500,
    notes: "Hero, featured venues, how it works, testimonials, spin wheel, CTA.",
  },
  {
    route: "/venues",
    titleConstant: "TITLE_VENUES",
    hasUniqueDescription: true,
    extraSchema: "ItemList",
    contentMinWords: 300,
    notes: "Filter tabs (All, Theme Rooms, Best Value, etc.) + venue card grid.",
  },
  {
    route: "/venues/[slug]",
    titleConstant: "titleVenueDetail(name)",
    hasUniqueDescription: true,
    extraSchema: "LocalBusiness",
    contentMinWords: 400,
    notes: "Gallery, description, features, pricing, location, CTA to book.",
  },
  {
    route: "/how-it-works",
    titleConstant: "TITLE_HOW_IT_WORKS",
    hasUniqueDescription: true,
    contentMinWords: 1200,
    notes: "Hero, what to expect, 10-step process, sauna recommendations, insider tips, testimonials, CTA.",
  },
  {
    route: "/blog",
    titleConstant: "TITLE_BLOG",
    hasUniqueDescription: true,
    contentMinWords: 200,
    notes: "Blog listing with cards: image, title, excerpt, date, read time.",
  },
  {
    route: "/blog/[slug]",
    titleConstant: "titleBlogDetail(blogTitle)",
    hasUniqueDescription: true,
    extraSchema: "Article",
    contentMinWords: 600,
    notes: "Full article. Markdown rendered. Related blog posts at bottom.",
  },
  {
    route: "/contact",
    titleConstant: "TITLE_CONTACT",
    hasUniqueDescription: true,
    extraSchema: "ContactPage (optional)",
    contentMinWords: 150,
    notes: "4 contact buttons (WhatsApp, Telegram, WeChat, LINE) + mini FAQ.",
  },
  {
    route: "/faq",
    titleConstant: "TITLE_FAQ",
    hasUniqueDescription: true,
    extraSchema: "FAQPage",
    contentMinWords: 400,
    notes: "Accordion or list of Q&A. Each question is an h2 or h3. FAQPage JSON-LD required.",
  },
  {
    route: "/about",
    titleConstant: "TITLE_ABOUT",
    hasUniqueDescription: true,
    contentMinWords: 300,
    notes: "Who we are, years of experience, why trust us. EEAT signals.",
  },
  {
    route: "/ranking",
    titleConstant: "TITLE_RANKING",
    hasUniqueDescription: true,
    extraSchema: "ItemList",
    contentMinWords: 500,
    notes: "Ordered list of 12 venues with position, name, description, rating, badge.",
  },
  {
    route: "/privacy",
    titleConstant: "TITLE_PRIVACY",
    hasUniqueDescription: true,
    contentMinWords: 500,
    notes: "Legal text. Set noindex: true. Full privacy + cookie policy.",
  },
  {
    route: "/terms",
    titleConstant: "TITLE_TERMS",
    hasUniqueDescription: true,
    contentMinWords: 400,
    notes: "Legal text. Set noindex: true. Terms of service + cancellations.",
  },
  {
    route: "/404",
    titleConstant: "TITLE_404",
    hasUniqueDescription: true,
    contentMinWords: 50,
    notes: "Friendly message + link back to home. No index issues.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   8.  FINAL SIGN-OFF CHECKLIST
   ═══════════════════════════════════════════════════════════════════ */

export const SIGN_OFF = [
  "[ ] Title imported from seo-titles.ts (no hardcoded strings)",
  "[ ] Unique meta description (120-160 chars, includes keyword)",
  "[ ] Keywords passed (10-15, includes 'Macao' variant)",
  "[ ] No extra JS shipped (React only on Spin Wheel & Slot Extras)",
  "[ ] All images have alt text + lazy loading below fold",
  "[ ] Heading hierarchy correct (h1→h2→h3, no skips)",
  "[ ] Internal links to 2-3 other pages",
  "[ ] 300+ words unique content (exceptions: 404=50, contact=150)",
  "[ ] Structured data added if page type requires it (see section 4)",
  "[ ] noindex: true on /privacy and /terms",
  "[ ] Page listed in robots.txt sitemap (auto via @astrojs/sitemap)",
  "[ ] Canonical URL is correct (auto, unless cross-domain needed)",
  "[ ] Open Graph / Twitter tags render correctly (check with browser devtools)",
  "[ ] No blue tones in any UI (#design.md rule)",
  "[ ] Copy uses active voice, no em-dashes, no lorem ipsum",
] as const;
