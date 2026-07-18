"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ContainerScroll,
  BentoGrid,
  BentoCell,
  ContainerScale,
  useContainerScrollContext,
} from "@/components/blocks/hero-gallery-scroll-animation";
import { motion, useMotionValue, useTransform } from "motion/react";
import SlotMachineText from "@/components/ui/SlotMachineText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ContactModal from "@/components/home/ContactModal";

const IMAGES = [
  "/images/venues/sauna1/manhaospa.webp",   // Manhao Spa
  "/images/venues/sauna2/numbernine.webp",   // Number Nine Spa
  "/images/venues/sauna3/shangpin.webp",     // Shang Pin Spa
  "/images/venues/sauna6/empire.webp",       // Empire Sauna
  "/images/venues/sauna4/majesty.webp",      // Majesty Spa
];

const VENUES = [
  {
    slug: "manhao-spa",
    name: "Manhao Spa",
    subtitle: "Newest",
    location: "Taipa, Grandview Hotel",
    price: "MOP 2,299 – 6,999",
    cardAccent: "#FF1493", // New — pink neon
  },
  {
    slug: "number-nine-spa",
    name: "Number Nine Spa",
    subtitle: "JP & KR Staff",
    location: "Royal Dragon Hotel",
    price: "MOP 2,299 – 6,999",
    cardAccent: "#FF1493", // New — pink neon
  },
  {
    slug: "shang-pin-spa",
    name: "Shang Pin Spa",
    subtitle: "Best Value",
    location: "Cotai, Lisboeta Macau",
    price: "MOP 2,299 – 6,499",
    cardAccent: "#4ADE80", // Value — green
  },
  {
    slug: "empire-sauna",
    name: "Empire Sauna",
    subtitle: "Newest & Premium",
    location: "Macau Peninsula",
    price: "MOP 2,488 – 6,988",
    cardAccent: "#FF1493", // New — pink neon
  },
  {
    slug: "majesty-spa",
    name: "Majesty Spa",
    subtitle: "Most Luxurious",
    location: "Macau Peninsula",
    price: "MOP 2,799 – 6,699",
    cardAccent: "#F43F5E", // KTV — rose
  },
];

function FlipCard({
  imageUrl,
  venue,
  accent,
  cardAccent = accent,
  spotlightColor,
  priority = false,
  loading = "lazy",
}: {
  imageUrl: string;
  venue: (typeof VENUES)[number];
  accent: string;
  cardAccent?: string;
  spotlightColor: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}) {
  const [hovered, setHovered] = useState(false);
  const rotateY = useMotionValue(0);
  const frontOpacity = useTransform(rotateY, [0, 90], [1, 0]);
  const backOpacity = useTransform(rotateY, [90, 180], [0, 1]);

  return (
    <a
      href={`/venues/${venue.slug}`}
      className="block size-full cursor-pointer rounded-xl"
      style={{ perspective: 1200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SpotlightCard
        className="size-full"
        spotlightColor={spotlightColor}
      >
        <motion.div
          className="relative size-full overflow-hidden rounded-xl shadow-xl"
          style={{ rotateY, transformStyle: "preserve-3d" }}
          animate={{
            rotateY: hovered ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
        {/* Front */}
        <motion.img
          className="absolute inset-0 size-full object-cover object-center"
          style={{ opacity: frontOpacity, aspectRatio: "16/10" }}
          src={imageUrl}
          alt={venue.name}
          width={800}
          height={500}
          loading={loading as "lazy" | "eager"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
        />

        {/* Back */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-5 md:p-7 text-center"
          style={{
            opacity: backOpacity,
            rotateY: 180,
            background: "#0A0A0F",
          }}
        >
          <div
            className="mb-1 h-[2px] w-10 rounded-full"
            style={{ background: cardAccent }}
          />
          <h3
            className="font-black leading-[0.95] tracking-[-0.02em] text-2xl md:text-3xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFF8F0",
            }}
          >
            {venue.name}
          </h3>
          <p
            className="text-sm md:text-base font-semibold uppercase tracking-[0.15em]"
            style={{ color: cardAccent }}
          >
            {venue.subtitle}
          </p>
          <div className="mt-1 space-y-0.5 text-xs md:text-sm leading-relaxed" style={{ color: "#9E9E9E" }}>
            <p>{venue.location}</p>
            <p>{venue.price}</p>
          </div>
          <div
            className="mt-2 h-[1px] w-16"
            style={{ background: `linear-gradient(to right, transparent, ${cardAccent}66, transparent)` }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: cardAccent }}
          >
            Learn More
          </span>
        </motion.div>
        </motion.div>
      </SpotlightCard>
    </a>
  );
}

function BentoFeaturedLabel({
  accent,
  isMobile = false,
  onContact,
  ctaPairClass,
}: {
  accent: string;
  isMobile?: boolean;
  onContact?: () => void;
  ctaPairClass?: string;
}) {
  const { scrollYProgress } = useContainerScrollContext();
  const [mounted, setMounted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [x, setX] = useState(-24);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => {
      if (v > 0.55) setMounted(true);

      if (isMobile) {
        // Fully appeared → lock in place; never slide/move again until
        // the user scrolls back up past the appear threshold.
        if (v >= 0.7) setLocked(true);
        if (v < 0.55) setLocked(false);

        if (v >= 0.7) {
          // Stay pinned & fully visible; soft fade only at the very end of the hero
          setX(0);
          if (v > 0.93) {
            setOpacity(Math.max(0, 1 - (v - 0.93) / 0.07));
          } else {
            setOpacity(1);
          }
          return;
        }

        const t = Math.max(0, Math.min(1, (v - 0.55) / 0.15));
        setOpacity(t);
        setX(locked ? 0 : -24 + t * 24);
        return;
      }

      const t = Math.max(0, Math.min(1, (v - 0.55) / 0.15));
      setOpacity(t);
      setX(-24 + t * 24);
    });
    return () => unsub();
  }, [scrollYProgress, isMobile, locked]);

  const content = (
    <motion.div
      className="hero-featured-label"
      animate={{ opacity, x: locked ? 0 : x }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center gap-3" style={{ visibility: mounted ? "visible" : "hidden" }}>
        <svg viewBox="0 0 16 16" className="h-3 w-3 flex-shrink-0" style={{ fill: accent }}>
          <path d="M8 0l8 8-8 8L0 8z" />
        </svg>
        <span
          className="text-[0.65rem] font-bold uppercase tracking-[0.28em]"
          style={{ color: accent, fontFamily: "'Inter', sans-serif", visibility: mounted ? "visible" : "hidden" }}
        >
          Featured Saunas
        </span>
      </div>
      <h2
        className="font-black uppercase leading-[0.92] tracking-[-0.02em]"
        style={{
          color: "#FFF8F0",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontFamily: "'Playfair Display', serif",
          textShadow: "0 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {mounted ? (
          <>
            <SlotMachineText text="TOP" stripLength={8} />
            <br />
            <span style={{ color: accent }}>
              <SlotMachineText text="PICKS" stripLength={8} />
            </span>
          </>
        ) : (
          <>
            <span style={{ visibility: "hidden" }}>Top 5</span>
            <br />
            <span style={{ color: accent, visibility: "hidden" }}>Picks</span>
          </>
        )}
      </h2>
      <p
        style={{
          color: "rgba(176, 168, 144, 0.75)",
          fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: "0.03em",
          maxWidth: "16rem",
          marginTop: "0.75rem",
          lineHeight: 1.4,
          visibility: mounted ? "visible" : "hidden",
        }}
      >
        {isMobile ? "Tap each card to explore" : "Hover each card to explore"}
      </p>
      {isMobile && (
        <div
          className={`hero-featured-actions ${ctaPairClass ?? ""}`}
          style={{ pointerEvents: "auto" }}
        >
          <button type="button" className="cta cta--primary" onClick={onContact}>
            Contact Us
          </button>
          <a href="/ranking" className="cta--frame">
            <span className="slot-label">See Ranking</span>
            <span className="slot-icon-box">
              <span className="slot-icon-el slot-icon--in">{SLOT_ICONS[0]}</span>
            </span>
          </a>
        </div>
      )}
    </motion.div>
  );

  // Mobile: pin to the real viewport via portal so sticky/scroll ancestors
  // can never drag TOP PICKS down over the venue cards.
  if (isMobile && portalReady) {
    return createPortal(
      <div
        style={{
          position: "fixed",
          left: "1.25rem",
          right: "1.25rem",
          top: "1.5rem",
          width: "calc(100vw - 2.5rem)",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        {content}
      </div>,
      document.body,
    );
  }

  return content;
}

const SLOT_ICONS = [
  <svg key="spade" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M12 2C8.5 6.5 4 10 4 13c0 2.2 1.8 4 4 4 .7 0 1.4-.2 2-.5V18l-2 2v1h8v-1l-2-2v-1.5c.6.3 1.3.5 2 .5 2.2 0 4-1.8 4-4 0-3-4.5-6.5-8-11z" />
  </svg>,
  <svg key="heart" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>,
  <svg key="diamond" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M12 2l10 10-10 10L2 12z" />
  </svg>,
  <svg key="club" viewBox="0 0 512 512" fill="currentColor" stroke="none" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z" />
  </svg>,
  <svg key="dice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>,
  <svg key="chip" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
  </svg>,
  <svg key="martini" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <path d="M8 22h8" />
    <path d="M12 11v11" />
    <path d="m19 3-7 8-7-8Z" />
  </svg>,
  <svg key="slot-machine" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" style={{ position: "absolute", inset: 0 }}>
    <rect width="14" height="20" x="3" y="2" rx="2" />
    <line x1="17" x2="21" y1="8" y2="8" />
    <line x1="21" x2="21" y1="8" y2="12" />
    <circle cx="21" cy="7" r="1" fill="currentColor" stroke="none" />
    <rect width="8" height="6" x="6" y="6" rx="1" />
    <line x1="6" x2="14" y1="16" y2="16" />
    <line x1="8" x2="8" y1="6" y2="12" />
    <line x1="12" x2="12" y1="6" y2="12" />
    <path d="M7 9h.01" />
    <path d="M10 9h.01" />
    <path d="M13 9h.01" />
  </svg>,
];

interface Props {
  accent: string;
  accentLight: string;
  titleColor?: string;
  bodyColor?: string;
  label?: string;
}

export default function HeroGallery({
  accent,
  accentLight,
  titleColor = "#FFF8F0",
  bodyColor = "#B0A890",
  label,
}: Props) {
  const darkenHex = (hex: string, amount: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const clamp = (v: number) => Math.max(0, Math.min(255, v));
    const r = clamp(((num >> 16) & 0xff) - Math.round(amount * 255));
    const g = clamp(((num >> 8) & 0xff) - Math.round(amount * 255));
    const b = clamp((num & 0xff) - Math.round(amount * 255));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };
  const dark = darkenHex(accent, 0.25);

  const [hovered, setHovered] = useState(false);
  const [iconIdx, setIconIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setIconIdx(i => (i + 1) % SLOT_ICONS.length);
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIconIdx(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  const css = `
    /* ── Mobile: grid & content overrides (inline styles handle positioning) ── */
    @media (max-width: 767px) {
      /* BentoGrid child cells layout */
      .hero-bento-grid {
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: 1fr 1fr !important;
        gap: 8px !important;
        padding-top: 0 !important;
      }
      .hero-bento-grid > :nth-child(1) {
        grid-column: 1 / -1 !important;
        grid-row: 1 !important;
      }
      .hero-bento-grid > :nth-child(2),
      .hero-bento-grid > :nth-child(3) {
        display: block !important;
      }
      .hero-bento-grid > :nth-child(2) {
        grid-column: 1 !important;
        grid-row: 2 !important;
      }
      .hero-bento-grid > :nth-child(3) {
        grid-column: 2 !important;
        grid-row: 2 !important;
      }
      .hero-bento-grid > :nth-child(4),
      .hero-bento-grid > :nth-child(5) {
        display: none !important;
      }
      .container-scale-title h1 {
        font-size: clamp(3.25rem, 16vw, 5.5rem) !important;
        line-height: 0.92 !important;
      }
      .container-scale-title p.my-6 {
        font-size: 0.78rem !important;
        max-width: 16rem !important;
        margin-top: 0.5rem !important;
        margin-bottom: 1rem !important;
      }
      .container-scale-title .flex.items-center.gap-4 {
        flex-direction: column;
        align-items: stretch;
      }
      .container-scale-title .mb-8 { margin-bottom: 1rem !important; }

      .hero-featured-label h2 {
        font-size: clamp(4rem, 20vw, 6rem) !important;
        line-height: 0.86 !important;
      }
      .hero-featured-label > div > div {
        margin-bottom: 1rem !important;
      }
      .hero-featured-label p {
        font-size: 0.8rem !important;
        margin-top: 1rem !important;
      }
      .hero-featured-label {
        right: 1.25rem !important;
        width: calc(100vw - 2.5rem) !important;
      }
      .hero-featured-actions {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        width: 100%;
        margin-top: 1.25rem;
      }
      .hero-featured-actions .cta--primary,
      .hero-featured-actions .cta--frame {
        width: 100% !important;
        min-width: 0 !important;
        max-width: none !important;
        box-sizing: border-box;
      }
    }
    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.85rem 2rem;
      font-size: 0.88rem;
      font-weight: 600;
      letter-spacing: 0.10em;
      line-height: 1.25;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: transform 0.25s ease;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta:hover {
      transform: translateY(-2px);
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta:active {
      transform: translateY(0);
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--primary {
      position: relative;
      min-width: 120px;
      transition: 0.8s;
      background-size: 280% auto;
      background-image: linear-gradient(
        325deg,
        ${dark} 0%,
        ${accentLight} 55%,
        ${dark} 90%
      );
      border: none;
      border-radius: 0.5em;
      color: #FFF8F0;
      box-shadow:
        0px 0px 20px ${accent}80,
        0px 5px 5px -1px ${accent}40,
        inset 4px 4px 8px ${accentLight}80,
        inset -4px -4px 8px ${dark}59;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--primary:hover {
      background-position: right top;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--primary:is(:focus, :focus-visible, :active) {
      outline: none;
      box-shadow:
        0 0 0 3px #0A0A0A,
        0 0 0 6px ${dark};
    }

    @media (prefers-reduced-motion: reduce) {
      .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--primary {
        transition: linear;
      }
    }

    /* ═══ Secondary CTA — Slot-Machine Icons ═══ */
    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--frame {
      position: relative;
      z-index: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      min-width: 190px;
      height: 50px;
      box-sizing: border-box;
      padding: 0 1.6rem;
      font-size: 0.88rem;
      font-weight: 600;
      letter-spacing: 0.10em;
      line-height: 1.25;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      color: ${accent};
      background: transparent;
      border: 1px solid ${accent}73;
      border-radius: 0.5em;
      transition: transform 0.25s ease;
      overflow: visible;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--frame:hover {
      transform: translateY(-2px);
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .cta--frame:active {
      transform: translateY(0);
    }

    /* Icon box */
    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .slot-icon-box {
      position: relative;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      order: 1;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .slot-label {
      order: 0;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .slot-icon-el {
      position: absolute;
      inset: 0;
      width: 22px;
      height: 22px;
      color: ${accent};
      transition: opacity 0.15s, transform 0.15s;
      opacity: 0;
      transform: translateY(6px) scale(0.4);
      pointer-events: none;
    }

    .cta-pair-${label ? label.replace(/\s/g, '') : 'default'} .slot-icon-el.slot-icon--in {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `;

  return (
    <ContainerScroll className="h-[350vh] bg-black">
      {/* Mobile host stays in scroll context; label portals to document.body. */}
      {isMobile && (
        <BentoFeaturedLabel
          accent={accent}
          isMobile
          onContact={() => setContactOpen(true)}
          ctaPairClass={`cta-pair-${label ? label.replace(/\s/g, "") : "default"}`}
        />
      )}

      {/* Right zone — bento grid pushed past the title. */}
      <div className="sticky left-0 top-0 z-0 h-screen w-full py-4 pr-2 bento-right-zone"
        style={isMobile
          ? { paddingLeft: "0.5rem", paddingRight: "0.5rem", top: "48vh", height: "52vh" }
          : { paddingLeft: "clamp(22rem, 40vw, 42rem)" }
        }
      >
        {!isMobile && (
          <div
            className="hero-featured-label"
            style={{
              position: "absolute",
              left: "clamp(1.5rem, 5vw, 5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <BentoFeaturedLabel accent={accent} />
          </div>
        )}
        <BentoGrid className="hero-bento-grid h-full w-full p-0">
          {IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="hero-bento-cell overflow-visible"
              compactMotion={isMobile}
            >
              <FlipCard
                imageUrl={imageUrl}
                venue={VENUES[index]}
                accent={accent}
                cardAccent={VENUES[index].cardAccent}
                spotlightColor={`${VENUES[index].cardAccent}33`}
                priority={index === 0}
                loading={index < 3 ? "eager" : "lazy"}
              />
            </BentoCell>
          ))}
        </BentoGrid>
      </div>

      <ContainerScale
        className="relative z-20 !overflow-visible container-scale-title"
        style={isMobile
          ? {
              left: 0, top: "1.5rem", translate: "0 0",
              maxWidth: "100vw", width: "100%",
              paddingLeft: "1.25rem", paddingRight: "1.25rem",
              height: "fit-content", pointerEvents: "none",
            }
          : {
              left: "0", top: "50%", translate: "0 -50%",
              maxWidth: "clamp(250px, 30vw, 550px)",
              paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
              paddingRight: "clamp(1rem, 2vw, 2rem)",
              width: "fit-content", height: "fit-content",
              pointerEvents: "none",
            }
        }
      >
        <div style={{ pointerEvents: "auto" }}>
        {/* Gold accent mark + line */}
        <div className="mb-8 flex items-center gap-3">
          {/* Diamond mark */}
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3 flex-shrink-0"
            style={{ fill: accent }}
          >
            <path d="M8 0l8 8-8 8L0 8z" />
          </svg>
          <div className="h-[3px] flex-1" style={{ background: accent }} />
        </div>

        <h1
          className="font-black uppercase tracking-[-0.03em] leading-[0.95] overflow-visible"
          style={{
            color: titleColor,
            fontSize: "clamp(2.75rem, 9.5vw, 10rem)",
            paddingBlock: "0.06em",
            textShadow: "0 0 80px rgba(0,0,0,0.6)",
          }}
        >
          <SlotMachineText text="YOUR" stripLength={12} />
          <br />
          <SlotMachineText text="NIGHT" stripLength={12} />
        </h1>
        <p
          className="my-6 max-w-md text-sm md:text-base"
          style={{ color: bodyColor }}
        >
          Free private shuttle, VIP entry, and insider pricing across 12
          hand-picked partner venues. One message is all it takes.
        </p>
        <div className={`flex items-center gap-4 cta-pair-${label ? label.replace(/\s/g, '') : 'default'}`}>
          <button
            type="button"
            className="cta cta--primary"
            onClick={() => setContactOpen(true)}
          >
            Contact Us
          </button>
          <a
            href="/ranking"
            className="cta--frame"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="slot-label">See Ranking</span>
            <span className="slot-icon-box">
              {SLOT_ICONS.map((icon, i) => (
                <span key={i} className={`slot-icon-el${i === iconIdx && hovered ? ' slot-icon--in' : ''}${!hovered && i === 0 ? ' slot-icon--in' : ''}`}>
                  {icon}
                </span>
              ))}
            </span>
          </a>
        </div>

        <style>{css}</style>
        </div>
      </ContainerScale>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </ContainerScroll>
  );
}
