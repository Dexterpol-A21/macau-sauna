"use client";

import { cn } from "@/lib/utils";

interface CubeButtonProps {
  label: string;
  href: string;
  className?: string;
}

export default function CubeButton({ label, href, className }: CubeButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "scene inline-flex justify-center items-center",
        className,
      )}
    >
      <div className="cube" role="button" aria-label={label}>
        <span className="side top">{label}</span>
        <span className="side front">{label}</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

        .scene {
          width: 10.5em;
          perspective: 600px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .cube {
          color: #DDB855;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          transition: transform 0.55s cubic-bezier(.17,.67,.14,.93);
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          width: 10.5em;
          height: 3.2em;
        }

        .cube:hover {
          transform: rotateX(-90deg);
        }

        .side {
          box-sizing: border-box;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3.2em;
          width: 10.5em;
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.08em;
          user-select: none;
        }

        .top {
          background: linear-gradient(180deg, #F0D060 0%, #DDB855 100%);
          color: #FFF8F0;
          transform: rotateX(90deg) translate3d(0, 0, 1.6em);
        }

        .front {
          background: #111111;
          color: #DDB855;
          border: 1px solid rgba(221, 184, 85, 0.4);
          transform: translate3d(0, 0, 1.6em);
        }
      `}</style>
    </a>
  );
}
