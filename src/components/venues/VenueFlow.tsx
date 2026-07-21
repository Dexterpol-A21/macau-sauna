"use client";

interface FlowStep {
  num: number;
  title: string;
  description: string;
}

export default function VenueFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <>
      <div className="vf-timeline">
        {steps.map((step) => (
          <div key={step.num} className="vf-step">
            <div className="vf-step-marker">
              <span className="vf-step-num">{step.num}</span>
            </div>
            <div className="vf-step-body">
              <h3 className="vf-step-title">{step.title}</h3>
              <p className="vf-step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="vf-bonus-row">
        <a href="/vip-extras" class="vf-bonus-card vf-bonus-card--link">
          <span class="vf-bonus-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
              <path d="M22 7H2v5h20V7Z" />
              <path d="M12 22v-10" />
              <path d="M12 7V2l4 3-4 3V7Z" />
              <path d="M2 7l10-5 10 5" />
            </svg>
          </span>
          <h4 class="vf-bonus-title">Your VIP Extras from us</h4>
          <p class="vf-bonus-desc">
            Booking through us gets you 1 complimentary VIP Extra — served by pretty girls. Pick from Back Rubbing, thigh massage, head massage, reflexology, manicure, pedicure, hand massage, and ear cleaning. We let the venue know you&apos;re coming — simply pick what you want on arrival.
          </p>
          <span class="vf-bonus-link">
            See all 8
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>

        <div className="vf-bonus-card">
          <span className="vf-bonus-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </span>
          <h4 className="vf-bonus-title">Your free return ride is waiting</h4>
          <p className="vf-bonus-desc">
            When you&apos;re done — after your meal, right after your service, anytime — just text us. The same luxury vehicle takes you to your hotel, the airport, the ferry terminal, or anywhere in Macau. Same zero cost as the pickup.
          </p>
        </div>
      </div>

      <style>{`
        .vf-timeline {
          display: flex;
          flex-direction: column;
        }

        .vf-step {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .vf-step:first-child {
          padding-top: 0;
        }

        .vf-step-marker {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,77,166,0.1);
          border: 1px solid rgba(255,77,166,0.2);
          margin-top: 0.1rem;
        }

        .vf-step-num {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #FF4DA6;
          line-height: 1;
        }

        .vf-step-body {
          flex: 1;
          min-width: 0;
        }

        .vf-step-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFF8F0;
          margin: 0 0 0.35rem;
          line-height: 1.3;
        }

        .vf-step-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #807860;
          line-height: 1.7;
          margin: 0;
        }

        .vf-bonus-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .vf-bonus-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
        }

        .vf-bonus-card--link {
          text-decoration: none;
          display: block;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }

        .vf-bonus-card--link:hover {
          border-color: rgba(255,77,166,0.25);
          background: rgba(255,77,166,0.04);
          box-shadow: 0 0 20px rgba(255,77,166,0.06);
        }

        .vf-bonus-card--link:hover .vf-bonus-link {
          color: #FF85C2;
          gap: 0.55rem;
        }

        .vf-bonus-icon {
          display: flex;
          color: #FF4DA6;
          margin-bottom: 0.75rem;
        }

        .vf-bonus-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #FFF8F0;
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }

        .vf-bonus-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #807860;
          line-height: 1.7;
          margin: 0 0 0.85rem;
        }

        .vf-bonus-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #FF4DA6;
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }

        .vf-bonus-link:hover {
          color: #FF85C2;
          gap: 0.55rem;
        }

        @media (max-width: 600px) {
          .vf-bonus-row {
            grid-template-columns: 1fr;
          }

          .vf-step {
            gap: 1rem;
            padding: 1.25rem 0;
          }
        }
      `}</style>
    </>
  );
}
