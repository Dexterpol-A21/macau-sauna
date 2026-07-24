"use client";

import { useMemo, useState } from "react";
import { FEATURED_VENUES } from "@/utils/constants";
import { scoreMatches, toMatchVenue } from "@/utils/smartMatch";

const GROUPS = [
  { id: "1", label: "1 person" },
  { id: "2", label: "2 people" },
  { id: "3-4", label: "3-4 people" },
  { id: "5+", label: "5+ people" },
] as const;

const VIBES = [
  { id: "stage", label: "Main Stage Show" },
  { id: "theme", label: "Theme Rooms" },
  { id: "jpkr", label: "JP / KR Staff" },
  { id: "new", label: "Newest" },
  { id: "ktv", label: "KTV Rooms" },
  { id: "classic", label: "Classic Names" },
] as const;

const TIMES = [
  { id: "now", label: "Right now" },
  { id: "tonight", label: "Tonight" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "sat", label: "Sat night" },
  { id: "sun", label: "Sun night" },
  { id: "other", label: "Other" },
] as const;

const PICKUPS = [
  { id: "border", label: "Border" },
  { id: "hotel", label: "Hotel" },
  { id: "airport", label: "Airport" },
  { id: "other", label: "Other" },
] as const;

const MATCH_VENUES = FEATURED_VENUES.map(toMatchVenue);

const chipIdle =
  "cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-bold transition-colors border border-white/12 bg-white/[0.04] text-white/75 hover:bg-white/[0.08]";
const chipOn =
  "cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-bold transition-colors bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary-dark)] text-black";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={selected ? chipOn : chipIdle}
    >
      {children}
    </button>
  );
}

export default function QuickMatch() {
  const [grp, setGrp] = useState("2");
  const [vibe, setVibe] = useState("stage");
  const [time, setTime] = useState("tonight");
  const [pickup, setPickup] = useState("hotel");
  const [overnight, setOvernight] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);

  const ranked = useMemo(
    () => scoreMatches(MATCH_VENUES, vibe, grp, time, pickup, overnight),
    [grp, vibe, time, pickup, overnight],
  );

  const best = ranked[0];
  const vibeLabel = VIBES.find((v) => v.id === vibe)?.label ?? vibe;
  const grpLabel = GROUPS.find((g) => g.id === grp)?.label ?? grp;
  const timeLabel = TIMES.find((t) => t.id === time)?.label ?? time;
  const pickupLabel = PICKUPS.find((p) => p.id === pickup)?.label ?? pickup;

  const prefill = [
    `Hi, I matched a venue on your site. Experience: ${vibeLabel}`,
    `· Group: ${grpLabel}`,
    `· Time: ${timeLabel}`,
    `· Coming from: ${pickupLabel}`,
    overnight
      ? "· Overnight: yes (comfortable overnight setup preferred)"
      : "· Overnight: no",
    best ? `· Interested in: ${best.venue.name}` : "",
    "Please confirm pricing and VIP arrangements. Thanks!",
  ]
    .filter(Boolean)
    .join("\n");

  const waHref = `https://wa.me/85365670348?text=${encodeURIComponent(prefill)}`;
  const tgHref = `https://t.me/Aomensauna?text=${encodeURIComponent(prefill)}`;

  return (
    <section id="quickmatch" className="scroll-mt-6 overflow-x-clip px-4 pb-20 sm:pb-28">
      <div className="qm-root mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] bg-gradient-to-b from-[color-mix(in_srgb,var(--color-primary)_7%,transparent)] to-white/[0.02] p-5 sm:p-8">
        <div className="fade-up mb-6 text-center sm:mb-8">
          <span className="mb-3 inline-block text-xs font-bold tracking-[0.18em] text-[var(--color-primary)] sm:text-sm">
            ★ Smart Match
          </span>
          <h2 className="text-balance text-2xl font-bold leading-tight text-white sm:text-4xl">
            Find your perfect <span className="text-[var(--color-primary)]">sauna in a minute</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-white/55 sm:text-base">
            Answer a few questions — we instantly match you to the best of our 12 venues.
          </p>
        </div>

        <div className="grid min-w-0 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="fade-up min-w-0 space-y-4" style={{ ["--fade-delay" as string]: "0.08s" }}>
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                How many?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {GROUPS.map((g) => (
                  <Chip key={g.id} selected={grp === g.id} onClick={() => setGrp(g.id)}>
                    {g.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                What experience?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VIBES.map((v) => (
                  <Chip key={v.id} selected={vibe === v.id} onClick={() => setVibe(v.id)}>
                    {v.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                When?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TIMES.map((t) => (
                  <Chip key={t.id} selected={time === t.id} onClick={() => setTime(t.id)}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                Coming from?
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PICKUPS.map((p) => (
                  <Chip key={p.id} selected={pickup === p.id} onClick={() => setPickup(p.id)}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={overnight}
              onClick={() => setOvernight((v) => !v)}
              className="flex w-full cursor-pointer flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:bg-white/[0.05]"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full border transition-colors ${
                    overnight
                      ? "border-transparent bg-[var(--color-primary)]"
                      : "border-white/15 bg-white/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
                      overnight ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </span>
                <span
                  className={`text-sm font-bold ${overnight ? "text-white" : "text-white/55"}`}
                >
                  {overnight ? "Overnight" : "No overnight"}
                </span>
              </span>
              <span className="text-xs text-white/45">Comfortable overnight setups first</span>
            </button>
          </div>

          {best && (
            <div className="fade-up min-w-0" style={{ ["--fade-delay" as string]: "0.14s" }}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                  Recommended for you
                </span>
                <span className="text-xs text-white/45">picked from 12 venues</span>
              </div>

              <div className="qm-hero relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] bg-black/40">
                <div className="relative h-44 w-full overflow-hidden sm:h-52">
                  <img
                    key={best.venue.slug}
                    src={best.venue.image}
                    alt={best.venue.name}
                    className="qm-hero-img h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <span className="qm-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
                  <span className="absolute left-3 top-3 z-[1] rounded-md bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)] px-2.5 py-1 text-[11px] font-black tracking-wider text-black shadow">
                    BEST MATCH
                  </span>
                  <span className="absolute right-3 top-3 z-[1] rounded-md bg-black/55 px-2.5 py-1 text-sm font-extrabold text-[var(--color-primary)] backdrop-blur-sm">
                    {best.score}% match
                  </span>
                  <div className="absolute inset-x-0 bottom-0 z-[1] flex items-end justify-between gap-3 p-4">
                    <h3 className="min-w-0 flex-1 truncate text-xl font-black text-white sm:text-2xl">
                      {best.venue.name}
                    </h3>
                    <a
                      href={`/venues/${best.venue.slug}`}
                      className="relative z-[1] flex-shrink-0 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
                    >
                      Details →
                    </a>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="mb-2.5 text-[11px] font-bold tracking-[0.08em] text-white/55">
                    Book now · pick your channel
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-3 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={tgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#229ed9] px-3 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Telegram
                    </a>
                  </div>
                  <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setWechatOpen(true)}
                      className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      WeChat
                    </button>
                    <a
                      href="https://line.me/ti/p/VZHFDSZnq9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                    >
                      LINE
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                {ranked.slice(1).map((item) => (
                  <a
                    key={item.venue.slug}
                    href={`/venues/${item.venue.slug}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-2 text-left transition-colors hover:border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] hover:bg-white/[0.05]"
                  >
                    <img
                      src={item.venue.image}
                      alt={item.venue.name}
                      className="h-11 w-11 flex-shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-white">
                        {item.venue.name}
                      </span>
                      <span className="block text-[11px] font-semibold text-[var(--color-primary)]">
                        {item.score}% match
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {wechatOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="Close"
            onClick={() => setWechatOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#141414] p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-white">WeChat</h3>
            <p className="mb-4 text-sm text-white/55">Add us on WeChat with this ID:</p>
            <p className="mb-5 font-mono text-2xl font-bold tracking-wider text-[var(--color-primary)]">
              AN99348
            </p>
            <button
              type="button"
              className="rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-black"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("AN99348");
                } catch {
                  /* ignore */
                }
                setWechatOpen(false);
              }}
            >
              Copy ID
            </button>
          </div>
        </div>
      )}

      <style>{`
        .qm-hero-img { animation: qm-fade .45s ease; }
        @keyframes qm-fade {
          from { opacity: .25; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        .qm-sweep {
          background: linear-gradient(105deg, transparent 35%, color-mix(in srgb, var(--color-primary) 35%, transparent) 50%, transparent 65%);
          transform: translateX(-120%);
          animation: qm-sweep .7s ease;
        }
        @keyframes qm-sweep { to { transform: translateX(120%); } }
        @media (prefers-reduced-motion: reduce) {
          .qm-hero-img, .qm-sweep { animation: none; }
          .qm-sweep { display: none; }
        }
      `}</style>
    </section>
  );
}
