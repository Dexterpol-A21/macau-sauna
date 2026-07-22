"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  { quote: 'Traveled from Seoul, worried about the language barrier. They communicated in English throughout, recommended Number One Sauna, pickup was on time. Amazing experience!', author: 'Korean visitor' },
  { quote: 'Was really hesitant at first — worried about safety and whether it\'s legit. Asked tons of questions and they answered everything patiently. Went to Majesty Spa, super luxurious, completely legal. Wish I\'d come sooner 😊', author: 'First-timer' },
  { quote: 'A friend recommended Number Nine Spa, brand new in 2026. Everything felt fresh and modern, the stage show had great atmosphere. Definitely worth trying!', author: 'Macau local' },
  { quote: 'First time visiting Macau saunas and had no idea where to go. They recommended the perfect spa, arranged free pickup, and the price was much better than walking in.', author: 'Hong Kong visitor' },
  { quote: 'Great arrangement, punctual pickup, hassle-free 👍', author: 'First-timer' },
  { quote: 'Third time booking through them. Always go to Familia Nobre, they let me know staff availability in advance so I never waste a trip.', author: 'Returning guest' },
  { quote: 'A friend recommended them. Transparent pricing with no hidden fees, punctual pickup, and excellent overall experience.', author: 'Shenzhen visitor' },
  { quote: 'Asked many questions and they answered patiently without any pressure. Will definitely come back 😊', author: 'Taiwan visitor' },
  { quote: 'Saved a few hundred MOP compared to walking in, plus no queuing 👍', author: 'Guangzhou visitor' },
  { quote: 'Was in Macau on business with limited time. They recommended Shang Pin Spa with quick pickup. Smooth process, no time wasted.', author: 'Business traveler' },
  { quote: 'The discounted price is real, not a gimmick.', author: 'Returning guest' },
  { quote: 'Was a bit nervous my first time. The concierge walked me through every step. The experience exceeded expectations — happily recommended to friends 🙏', author: 'First-timer' },
  { quote: 'Staying in Taipa, they recommended Oceanic Royal nearby — pickup took five minutes. Professional service, fair price, very satisfied 😊', author: 'Taipa guest' },
  { quote: 'Arrived in Macau at 2 AM and they still arranged a spa and pickup. Great service attitude.', author: 'Late-night visitor' },
  { quote: 'Got charged a service fee going on my own last time. Booked through them this time and saved it entirely — wish I\'d contacted them sooner 😅', author: 'Returning guest' },
  { quote: 'Went with a friend, Oceanic Royal Spa\'s dual service price was much cheaper than expected 👍', author: 'Group visitor' },
  { quote: 'Customer service replies instantly, answers every question.', author: 'Zhuhai visitor' },
  { quote: 'Brought a friend to Macau for his first time. They arranged everything — he said it was amazing and wants to contact them himself next time 😊', author: 'Referral' },
];

const ROW1 = TESTIMONIALS.slice(0, 9);
const ROW2 = TESTIMONIALS.slice(9);

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="t-section" id="testimonials">
      <style>{`
        .t-section {
          background: #0a0a0a;
          padding: 5rem 0 6rem;
          overflow: hidden;
        }
        .t-head {
          text-align: center;
          margin-bottom: 3.5rem;
          padding: 0 1.5rem;
        }
        .t-title {
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 1rem;
        }
        @media (min-width: 640px) {
          .t-title { font-size: 2.25rem; }
        }
        .t-rule {
          width: 5rem;
          height: 2px;
          background: var(--color-primary);
          margin: 0 auto;
        }
        .t-row {
          display: flex;
          gap: 1rem;
          padding: 0 1rem;
        }
        .t-card {
          flex-shrink: 0;
          width: 320px;
          padding: 1.5rem 1.5rem 1.25rem;
          background: #0F0F0F;
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 0.5rem;
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        .t-card:hover {
          border-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
          background: #121212;
        }
        .t-quote-mark {
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          color: color-mix(in srgb, var(--color-primary) 8%, transparent);
          line-height: 0.6;
          pointer-events: none;
          user-select: none;
          display: block;
          margin-bottom: 0.25rem;
        }
        .t-quote {
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
          margin: 0 0 0.85rem;
        }
        .t-divider {
          width: 1.75rem;
          height: 1px;
          background: color-mix(in srgb, var(--color-primary) 35%, transparent);
          margin-bottom: 0.75rem;
        }
        .t-author {
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.06em;
        }
        .t-total {
          text-align: center;
          margin-top: 3.5rem;
          font-family: 'Noto Sans TC', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: color-mix(in srgb, var(--color-primary) 50%, transparent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        @media (max-width: 767px) {
          .t-section { padding: 4rem 0 5rem; }
          .t-head { margin-bottom: 2.5rem; }
          .t-card { width: 280px; }
          .t-total { margin-top: 2.5rem; }
        }
      `}</style>

      <div className="t-head">
        <h2 className="t-title">What Our Guests Say</h2>
        <div className="t-rule" aria-hidden="true" />
      </div>

      {/* Row 1 — slides right → */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <div style={{
          position: "absolute", inset: "0 0 0 0", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, rgba(0,0,0,1) 100%)",
        }} />
        <motion.div
          className="t-row"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: isMobile ? 25 : 60, ease: "linear", repeat: Infinity } }}
        >
          {[...ROW1, ...ROW1].map((t, i) => (
            <div key={i} className="t-card">
              <span className="t-quote-mark">&ldquo;</span>
              <p className="t-quote">{t.quote}</p>
              <div className="t-divider" />
              <span className="t-author">{t.author}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — slides left ← */}
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", inset: "0 0 0 0", zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 93%, rgba(0,0,0,1) 100%)",
        }} />
        <motion.div
          className="t-row"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ x: { duration: isMobile ? 20 : 50, ease: "linear", repeat: Infinity } }}
        >
          {[...ROW2, ...ROW2].map((t, i) => (
            <div key={i} className="t-card">
              <span className="t-quote-mark">&ldquo;</span>
              <p className="t-quote">{t.quote}</p>
              <div className="t-divider" />
              <span className="t-author">{t.author}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="t-total">1,000+ guests served</p>
    </section>
  );
}
