"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cu-cta-btn"
      >
        Reach Out Now
      </button>

      <style>{`
        .cu-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          padding: 0.85rem 2rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          line-height: 1.25;
          text-transform: uppercase;
          white-space: nowrap;
          color: #FFF8F0;
          border: none;
          border-radius: 0.5em;
          cursor: pointer;
          transition: transform 0.25s ease, background-position 0.8s;
          background-size: 280% auto;
          background-image: linear-gradient(
            325deg,
            #9D7815 0%,
            #E8C96A 55%,
            #9D7815 90%
          );
          box-shadow:
            0px 0px 20px #DDB85580,
            0px 5px 5px -1px #DDB85540,
            inset 4px 4px 8px #E8C96A80,
            inset -4px -4px 8px #9D781559;
        }

        .cu-cta-btn:hover {
          transform: translateY(-2px);
          background-position: right top;
        }

        .cu-cta-btn:active {
          transform: translateY(0);
        }

        .cu-cta-btn:is(:focus, :focus-visible, :active) {
          outline: none;
          box-shadow:
            0 0 0 3px #0A0A0A,
            0 0 0 6px #9D7815;
        }

        @media (max-width: 639px) {
          .cu-cta-btn {
            min-width: 0;
            width: 100%;
            padding: 0.75rem 1.5rem;
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cu-cta-btn {
            transition: linear;
          }
        }
      `}</style>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
