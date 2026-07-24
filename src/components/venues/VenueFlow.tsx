"use client";

interface FlowStep {
  num: number;
  title: string;
  description: string;
}

export default function VenueFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div
      data-testid="spa-flow"
      className="fade-up rounded-2xl border border-white/5 bg-[#141414] p-6 sm:p-8"
    >
      <h2 className="mb-2 text-xl font-semibold text-[var(--color-primary)]">Detailed Flow</h2>

      <div className="relative max-w-2xl">
        <div className="absolute bottom-2 left-5 top-2 w-px bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]" />

        <div className="space-y-5">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="fade-up relative flex items-start gap-5"
              style={{ ["--fade-delay" as string]: `${0.05 + i * 0.07}s` }}
            >
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]">
                <span className="text-sm font-bold text-[var(--color-primary)]">{step.num}</span>
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{step.description}</p>
              </div>
            </div>
          ))}

          <div
            data-testid="spa-flow-concierge-reminder"
            className="fade-up relative flex items-start gap-5"
            style={{ ["--fade-delay" as string]: `${0.05 + steps.length * 0.07}s` }}
          >
            <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_20px_rgba(255,45,85,0.35)]">
              <span className="text-base" aria-hidden="true">
                🎁
              </span>
            </div>
            <div className="pt-1.5">
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                Don&apos;t forget — your VIP Extras from us
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Booking through us gets you 1 complimentary VIP Extra — served by pretty girls. Pick
                from Back Rubbing, thigh massage, head massage, reflexology, manicure, pedicure, hand
                massage, and ear cleaning. We let the venue know you&apos;re coming — simply pick what
                you want on arrival.
              </p>
              <button
                type="button"
                data-open-vip-extras
                className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-[0_0_16px_rgba(255,45,85,0.18)] transition-all hover:border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] hover:shadow-[0_0_22px_rgba(255,45,85,0.32)]"
              >
                See all 8 →
              </button>
            </div>
          </div>

          <div
            data-testid="spa-flow-concierge-reminder"
            className="fade-up relative flex items-start gap-5"
            style={{ ["--fade-delay" as string]: `${0.05 + (steps.length + 1) * 0.07}s` }}
          >
            <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_20px_rgba(255,45,85,0.35)]">
              <span className="text-base" aria-hidden="true">
                🚗
              </span>
            </div>
            <div className="pt-1.5">
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                And your free return ride is waiting
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                When you&apos;re done — after your meal, right after your service, anytime — just text
                us. The same luxury vehicle takes you to your hotel, the airport, the ferry terminal, or
                anywhere in Macau. Same zero cost as the pickup.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up mt-8 border-t border-white/5 pt-6 text-center">
        <p className="text-sm text-white/40">Want to know more? Contact us for detailed info</p>
      </div>
    </div>
  );
}
