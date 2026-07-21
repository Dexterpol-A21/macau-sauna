"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";
import SecondaryCTA from "./SecondaryCTA";

export default function HowItWorksCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hiw-cta-row">
        <button
          onClick={() => setOpen(true)}
          className="hiw-cta-primary"
        >
          Contact Us
        </button>
        <SecondaryCTA href="/blog" label="Explore Blog" client:load />
      </div>

      <style>{`
        .hiw-cta-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 4rem;
        }

        .hiw-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 2rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          line-height: 1.25;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          border-radius: 0.5em;
          transition: transform 0.25s ease;
          position: relative;
          min-width: 120px;
          color: #FFF8F0;
          border: none;
          background-size: 280% auto;
          background-image: linear-gradient(
            325deg,
            #E0187A 0%,
            #FF85C2 55%,
            #E0187A 90%
          );
          box-shadow:
            0px 0px 20px #FF4DA680,
            0px 5px 5px -1px #FF4DA640,
            inset 4px 4px 8px #FF85C280,
            inset -4px -4px 8px #E0187A59;
          transition: transform 0.25s ease, background-position 0.8s;
        }

        .hiw-cta-primary:hover {
          transform: translateY(-2px);
          background-position: right top;
        }

        .hiw-cta-primary:active {
          transform: translateY(0);
        }

        .hiw-cta-primary:is(:focus, :focus-visible, :active) {
          outline: none;
          box-shadow:
            0 0 0 3px #000000,
            0 0 0 6px #E0187A;
        }

        @media (max-width: 639px) {
          .hiw-cta-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.65rem;
          }
          .hiw-cta-primary {
            min-width: 0;
            width: 100%;
            padding: 0.75rem 1.25rem;
            font-size: 0.78rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hiw-cta-primary {
            transition: linear;
          }
        }
      `}</style>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
