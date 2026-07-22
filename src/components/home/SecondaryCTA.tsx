"use client";

import { useState, useRef, useEffect } from "react";

const ICONS = [
  <svg key="spade" viewBox="0 0 24 24" fill="currentColor" stroke="none" width="20" height="20">
    <path d="M12 2C8.5 6.5 4 10 4 13c0 2.2 1.8 4 4 4 .7 0 1.4-.2 2-.5V18l-2 2v1h8v-1l-2-2v-1.5c.6.3 1.3.5 2 .5 2.2 0 4-1.8 4-4 0-3-4.5-6.5-8-11z" />
  </svg>,
  <svg key="heart" viewBox="0 0 24 24" fill="currentColor" stroke="none" width="20" height="20">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>,
  <svg key="diamond" viewBox="0 0 24 24" fill="currentColor" stroke="none" width="20" height="20">
    <path d="M12 2l10 10-10 10L2 12z" />
  </svg>,
  <svg key="club" viewBox="0 0 512 512" fill="currentColor" stroke="none" width="20" height="20">
    <path d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z" />
  </svg>,
  <svg key="dice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="crown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>,
  <svg key="chip" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
  </svg>,
  <svg key="martini" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M8 22h8" />
    <path d="M12 11v11" />
    <path d="m19 3-7 8-7-8Z" />
  </svg>,
  <svg key="slot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
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
  href: string;
  label: string;
}

export default function SecondaryCTA({ href, label }: Props) {
  const [hovered, setHovered] = useState(false);
  const [iconIdx, setIconIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        setIconIdx((i) => (i + 1) % ICONS.length);
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIconIdx(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  return (
    <>
      <a
        href={href}
        className="sc-cta-link"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="sc-cta-label">{label}</span>
        <span className="sc-cta-icon-box">
          {ICONS.map((icon, i) => (
            <span
              key={i}
              className={`sc-cta-icon${i === iconIdx && hovered ? " sc-cta-icon--on" : ""}${!hovered && i === 0 ? " sc-cta-icon--on" : ""}`}
            >
              {icon}
            </span>
          ))}
        </span>
      </a>

      <style>{`
        .sc-cta-link {
          position: relative;
          z-index: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          min-width: 180px;
          height: 48px;
          box-sizing: border-box;
          padding: 0 1.5rem;
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          line-height: 1.25;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          color: #FF2D55;
          background: transparent;
          border: 1px solid rgba(255,45,85, 0.45);
          border-radius: 0.5em;
          transition: transform 0.25s ease, border-color 0.25s;
          overflow: visible;
        }

        .sc-cta-link:hover {
          transform: translateY(-2px);
          border-color: rgba(255,45,85, 0.7);
        }

        .sc-cta-link:active {
          transform: translateY(0);
        }

        .sc-cta-icon-box {
          position: relative;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          order: 1;
          color: #FF2D55;
        }

        .sc-cta-label {
          order: 0;
        }

        .sc-cta-icon {
          position: absolute;
          inset: 0;
          width: 20px;
          height: 20px;
          color: #FF2D55;
          transition: opacity 0.15s, transform 0.15s;
          opacity: 0;
          transform: translateY(6px) scale(0.4);
          pointer-events: none;
        }

        .sc-cta-icon--on {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 639px) {
          .sc-cta-link {
            min-width: 0;
            width: 100%;
            height: 46px;
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-cta-link {
            transition: none;
          }
          .sc-cta-icon {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
