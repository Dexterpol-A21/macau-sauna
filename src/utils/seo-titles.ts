/**
 * SEO Page Titles — Macau Sauna Booking
 *
 * PATTERN:  "Specific — Context | Brand"
 * Brand:    Macau Sauna Booking
 *
 * Dynamic helpers use template-literal functions so venue / blog names
 * stay consistent without duplicating the suffix everywhere.
 */

/* ── Brand Suffix ────────────────────────────────────────────────── */

const BRAND = "Macau Sauna Booking";

const _brand = (text: string) => `${text} | ${BRAND}`;

/* ── Static Pages ────────────────────────────────────────────────── */

/** / */
export const TITLE_HOME = `${BRAND} — VIP Experience | Luxury Spa & Entertainment in Macau`;

/** /venues */
export const TITLE_VENUES = _brand("All Saunas & Spas — Explore 12 Partner Venues");

/** /how-it-works */
export const TITLE_HOW_IT_WORKS = _brand("How It Works — Complete First-Timer Guide to Macau Saunas");

/** /blog */
export const TITLE_BLOG = _brand("Macau Sauna Blog — Tips, Prices & Recommendations");

/** /contact — removed; opens ContactModal site-wide */
export const TITLE_CONTACT = _brand("Contact Us — Book Your VIP Experience");

/** /faq */
export const TITLE_FAQ = _brand("FAQ — Frequently Asked Questions");

/** /about */
export const TITLE_ABOUT = _brand("About Us — Macau's Trusted Sauna Concierge");

/** /ranking */
export const TITLE_RANKING = _brand("Best Macau Saunas — Top 12 Ranked & Compared");

/** /shuttle */
export const TITLE_SHUTTLE = _brand(
  "Free Macau Sauna Shuttle — Private Pickup Across Macau & Taipa"
);

/** /privacy */
export const TITLE_PRIVACY = _brand("Privacy Policy & Cookies");

/** /terms */
export const TITLE_TERMS = _brand("Terms & Conditions");

/** /404 */
export const TITLE_404 = _brand("404 — Page Not Found");

/* ── Dynamic Pages (template helpers) ────────────────────────────── */

/** /venues/[slug] — e.g. "Manhao Spa — Sauna & Spa in Macau | Macau Sauna Booking" */
export const titleVenueDetail = (venueName: string) =>
  _brand(`${venueName} — Sauna & Spa in Macau`);

/** /blog/[slug] — e.g. "Macau Sauna Prices 2026 | Macau Sauna Booking Blog" */
export const titleBlogDetail = (blogTitle: string) =>
  _brand(blogTitle);

/* ── All Titles Index (for quick reference) ──────────────────────── */

/**
 * Master record.  Keys match Astro route paths; dynamic routes show
 * the template signature as a placeholder.
 */
export const PAGE_TITLES: Record<string, string | ((...args: string[]) => string)> = {
  "/": TITLE_HOME,
  "/venues": TITLE_VENUES,
  "/venues/[slug]": titleVenueDetail,
  "/how-it-works": TITLE_HOW_IT_WORKS,
  "/blog": TITLE_BLOG,
  "/blog/[slug]": titleBlogDetail,
  "/contact": TITLE_CONTACT,
  "/faq": TITLE_FAQ,
  "/about": TITLE_ABOUT,
  "/ranking": TITLE_RANKING,
  "/shuttle": TITLE_SHUTTLE,
  "/privacy": TITLE_PRIVACY,
  "/terms": TITLE_TERMS,
  "/404": TITLE_404,
};
