"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import ContactModal from "../home/ContactModal";

interface NavItem {
  label: string;
  href: string;
  desc: string;
  logo?: boolean;
  icon?: "help" | "info" | "contact";
}

const NAV_ITEMS: NavItem[] = [
  { label: "Ranking", href: "/ranking", desc: "Top venues by rating" },
  { label: "Spas", href: "/venues", desc: "12 hand-picked partner venues" },
  { label: "Guide", href: "/how-it-works", desc: "First-timer guide to Macau saunas" },
  { label: "Blog", href: "/blog", desc: "Tips, prices & first-timer advice" },
  { label: "Macau Sauna Booking", href: "/", logo: true, desc: "Your VIP concierge" },
  { label: "About", href: "/about", icon: "info", desc: "Who we are & what we do" },
  { label: "FAQ", href: "/faq", icon: "help", desc: "Instant answers, 24/7" },
  { label: "Contact", href: "#contact", icon: "contact", desc: "Discover how to reach us" },
];

const SUITS = ["♠", "♥", "♦", "♣"] as const;

function CornerIcon({ type, size = 20 }: { type: string; size?: number }) {
  if (type === "help") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-55" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (type === "contact") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-55" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-55" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function LogoIcon({ size = 10 }: { size?: number }) {
  const px = size * 4;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={px} height={px} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#FF2D55" />
      <g fill="#0a0a0a" stroke="#FF2D55" strokeWidth="1.5" strokeLinejoin="round" transform="translate(32 47)">
        <path d="M 0 -33 Q 11 -17 0 0 Q -11 -17 0 -33 Z" />
        <path transform="rotate(-36)" d="M 0 -27 Q 10 -14 0 0 Q -10 -14 0 -27 Z" />
        <path transform="rotate(36)" d="M 0 -27 Q 10 -14 0 0 Q -10 -14 0 -27 Z" />
        <path transform="rotate(-72)" d="M 0 -23 Q 10 -12 0 0 Q -10 -12 0 -23 Z" />
        <path transform="rotate(72)" d="M 0 -23 Q 10 -12 0 0 Q -10 -12 0 -23 Z" />
      </g>
    </svg>
  );
}

function useResponsive() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("is-mobile");
    }
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return true; // SSR = mobile-first to avoid hydration CLS
  });
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function PokerHandNavigation() {
  const reduceMotion = useReducedMotion();
  const isMobile = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchHasMoved = useRef(false);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const activeIndex = hoveredIndex ?? pressedIndex;

  const MAX_ROTATION = isMobile ? 16 : 22;
  const CARD_WIDTH = isMobile ? 100 : 140;
  const LOGO_CARD_WIDTH = isMobile ? 110 : 154;
  const CARD_HEIGHT = isMobile ? 170 : 196;
  const SPREAD = isMobile ? 180 : 300;
  const VISIBLE_PEEK = isMobile ? 56 : 72;
  const CARD_CORNER_SIZE = isMobile ? 18 : 20;
  const LOGO_CORNER_SIZE = isMobile ? 4 : 9;

  function getCardTransform(index: number, total: number) {
    const t = index / (total - 1);
    const rotation = (t - 0.5) * 2 * MAX_ROTATION;
    const translateX = (t - 0.5) * SPREAD;
    return { rotation, translateX };
  }

  const getCardIndexFromX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const { translateX } = getCardTransform(i, NAV_ITEMS.length);
        const dist = Math.abs(clientX - (centerX + translateX));
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      return closest;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile, SPREAD, MAX_ROTATION],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchHasMoved.current = false;
      setPressedIndex(getCardIndexFromX(e.touches[0].clientX));
    },
    [getCardIndexFromX],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      if (dx > 6) touchHasMoved.current = true;
      setPressedIndex(getCardIndexFromX(e.touches[0].clientX));
    },
    [getCardIndexFromX],
  );

  const handleTouchEnd = useCallback(() => {
    const idx = pressedIndex;
    setPressedIndex(null);
    if (idx !== null) {
      if (NAV_ITEMS[idx].icon === "contact") {
        setIsContactOpen(true);
      } else {
        window.location.assign(NAV_ITEMS[idx].href);
      }
    }
  }, [pressedIndex]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      setHoveredIndex(getCardIndexFromX(e.clientX));
    },
    [getCardIndexFromX],
  );

  const handleClick = useCallback(() => {
    if (hoveredIndex === null) return;
    const item = NAV_ITEMS[hoveredIndex];
    if (item.icon === "contact") {
      setIsContactOpen(true);
    } else {
      window.location.assign(item.href);
    }
  }, [hoveredIndex]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center touch-none select-none"
      aria-label="Bottom navigation"
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setPressedIndex(null)}
    >
      <div
        ref={containerRef}
        className="relative flex items-end justify-center cursor-pointer"
        style={{
          width: isMobile ? SPREAD + LOGO_CARD_WIDTH + 30 : SPREAD + LOGO_CARD_WIDTH + 40,
          minWidth: isMobile ? SPREAD + LOGO_CARD_WIDTH + 30 : 620,
          height: VISIBLE_PEEK + 4,
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {NAV_ITEMS.map((item, i) => {
          const isLogo = item.logo;
          const hasCustomIcon = !!item.icon;
          const suit = SUITS[i % SUITS.length];
          const { rotation, translateX } = getCardTransform(i, NAV_ITEMS.length);
          const width = isLogo ? LOGO_CARD_WIDTH : CARD_WIDTH;
          const offsetTop = 4;
          const isActive = activeIndex === i;
          const textScale = isMobile && isActive ? 1.25 : 1;

          return (
            <motion.a
              key={`card-${item.label}`}
              href={item.href}
              aria-label={item.label}
              className="absolute flex flex-col items-center justify-center rounded-xl border select-none pointer-events-none"
              style={{
                left: "50%",
                marginLeft: -(width / 2),
                width,
                height: CARD_HEIGHT,
                paddingTop: isMobile ? 18 : 24,
                paddingBottom: isMobile ? 18 : 24,
                paddingLeft: isMobile ? 10 : 12,
                paddingRight: isMobile ? 10 : 12,
                gap: isMobile ? "0.625rem" : "0.875rem",
                top: offsetTop,
                transformOrigin: "bottom center",
                background:
                  "linear-gradient(180deg, rgba(20,20,20,0.96) 0%, rgba(22,22,22,0.92) 20%, rgba(16,16,16,0.88) 50%, rgba(8,8,8,0.94) 100%)",
                backdropFilter: "blur(16px)",
                borderColor: isActive
                  ? "rgba(255,45,85,0.7)"
                  : isLogo
                    ? "rgba(255,45,85,0.5)"
                    : "rgba(255,45,85,0.32)",
                borderWidth: 1.5,
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.7), 0 0 32px rgba(255,45,85,0.3)"
                  : isLogo
                    ? "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255,45,85,0.15)"
                    : "0 8px 40px rgba(0,0,0,0.6)",
              }}
              initial={
                reduceMotion || isMobile ? false : { y: 60, opacity: 0, rotate: rotation }
              }
              animate={{
                y: isActive ? -(CARD_HEIGHT + 40) : 0,
                opacity: 1,
                rotate: isActive ? 0 : rotation,
                scale: isActive ? 1.05 : 1,
                zIndex: isActive ? 50 : 1,
                x: translateX,
              }}
              transition={
                reduceMotion
                  ? undefined
                  : { type: "spring", stiffness: 110, damping: 22, mass: 0.8 }
              }
            >
              {isLogo ? (
                <div className="absolute" style={{ top: isMobile ? 10 : 12, left: isMobile ? 10 : 12 }}>
                  <LogoIcon size={LOGO_CORNER_SIZE * textScale} />
                </div>
              ) : hasCustomIcon ? (
                <div className="absolute" style={{ top: isMobile ? 6 : 6, left: isMobile ? 6 : 6 }}>
                  <CornerIcon type={item.icon!} size={CARD_CORNER_SIZE * textScale} />
                </div>
              ) : (
                <span
                  className="absolute leading-none opacity-55 text-primary select-none font-medium"
                  style={{
                    top: isMobile ? 3 : 4,
                    left: isMobile ? 6 : 8,
                    fontSize: `${(isMobile ? 1.2 : 1.5) * textScale}rem`,
                  }}
                >
                  {suit}
                </span>
              )}

              <span className="font-semibold tracking-tight text-text select-none text-center leading-none font-heading w-full transition-transform duration-200"
                style={{ fontSize: `${(isMobile ? 0.95 : 1.125) * textScale}rem` }}>
                {item.label}
              </span>

              <div className="bg-primary/50 rounded-full select-none"
                style={{ width: (isMobile ? 34 : 40) * textScale, height: 2 }} />

              <span className="text-text-muted select-none text-center leading-tight w-full transition-transform duration-200"
                style={{ fontSize: `${(isMobile ? 0.7 : 0.6875) * textScale}rem` }}>
                {item.desc}
              </span>

              {isLogo ? (
                <div className="absolute" style={{ bottom: isMobile ? 10 : 12, right: isMobile ? 10 : 12, transform: "rotate(180deg)" }}>
                  <LogoIcon size={LOGO_CORNER_SIZE * textScale} />
                </div>
              ) : hasCustomIcon ? (
                <div className="absolute" style={{ bottom: isMobile ? 6 : 6, right: isMobile ? 6 : 6, transform: "rotate(180deg)" }}>
                  <CornerIcon type={item.icon!} size={CARD_CORNER_SIZE * textScale} />
                </div>
              ) : (
                <span
                  className="absolute leading-none opacity-55 text-primary select-none font-medium"
                  style={{
                    bottom: isMobile ? 3 : 4,
                    right: isMobile ? 6 : 8,
                    transform: "rotate(180deg)",
                    fontSize: `${(isMobile ? 1.2 : 1.5) * textScale}rem`,
                  }}
                >
                  {suit}
                </span>
              )}

              <div
                className="absolute rounded-[10px] pointer-events-none"
                style={{
                  inset: 4,
                  border: `1px solid rgba(255,45,85,${isLogo ? "0.12" : "0.06"})`,
                }}
              />
            </motion.a>
          );
        })}
      </div>
      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </nav>
  );
}
