import type { Venue } from "../types";

/** Same vibe → slug ranking lists as relaxmacau QuickMatch */
export const VIBE_MAP: Record<string, string[]> = {
  stage: ["manhao-spa", "oceanic-royal-spa", "number-one-sauna"],
  theme: ["east-castle-spa", "majesty-spa", "the-excellent-sauna"],
  jpkr: ["oceanic-royal-spa", "victoria-sauna", "number-nine-spa"],
  new: ["manhao-spa", "empire-sauna", "number-nine-spa"],
  ktv: ["majesty-spa", "m-club"],
  classic: ["familia-nobre", "number-one-sauna", "oceanic-royal-spa"],
};

export type MatchDistrict = "澳門半島" | "氹仔";

/** Flags the reference scorer reads on each venue */
export type MatchVenue = Venue & {
  overnightAllowed: boolean;
  freeOvernightRoom: boolean;
  isNew: boolean;
  ktv: boolean;
  themeRooms: boolean;
  open24h: boolean;
  recommendedShow: boolean;
  district: MatchDistrict;
};

const SHOW_SLUGS = new Set([
  "manhao-spa",
  "number-one-sauna",
  "oceanic-royal-spa",
  "number-nine-spa",
  "empire-sauna",
]);

export function toMatchVenue(v: Venue): MatchVenue {
  const overnight = v.overnight ?? "";
  const overnightAllowed = Boolean(overnight) && !/not available/i.test(overnight);
  const freeOvernightRoom =
    overnightAllowed &&
    /free|lobby|recliner|reclining|lounge/i.test(overnight);
  const cats = v.category ?? [];
  const location = v.location ?? "";

  return {
    ...v,
    overnightAllowed,
    freeOvernightRoom,
    isNew: cats.includes("newest") || v.badge === "new",
    ktv: cats.includes("ktv"),
    themeRooms: cats.includes("theme-rooms"),
    open24h: /24/i.test(v.hours ?? ""),
    recommendedShow: SHOW_SLUGS.has(v.slug),
    district: /taipa|cotai/i.test(location) ? "氹仔" : "澳門半島",
  };
}

/**
 * Exact scoring from relaxmacau QuickMatch (`function X`):
 * vibe rank + overnight + group + time + pickup + tiny index tie-break.
 */
export function scoreMatches(
  venues: MatchVenue[],
  vibe: string,
  group: string,
  time: string,
  pickup: string,
  overnight: boolean,
): { venue: MatchVenue; score: number }[] {
  return venues
    .map((n, u) => {
      let r = 50;
      const h = (VIBE_MAP[vibe] || []).indexOf(n.slug);
      if (h === 0) r += 40;
      else if (h === 1) r += 30;
      else if (h === 2) r += 20;
      else r += 6;

      if (overnight) {
        if (n.overnightAllowed) {
          if (n.freeOvernightRoom) r += 22;
          else if (n.rating >= 5 || n.themeRooms) r += 8;
          else r -= 2;
        } else {
          r -= 12;
        }
      }

      if (group === "5+" || group === "3-4") {
        if (n.isNew || n.ktv || n.recommendedShow) r += 6;
      } else if (group === "1") {
        if (n.themeRooms || n.freeOvernightRoom) r += 4;
      }

      if (time === "now") {
        if (n.open24h || n.isNew || n.themeRooms) r += 4;
      } else if (time === "tonight" || time === "tomorrow") {
        if (n.open24h || n.isNew) r += 3;
      } else if (time === "sat" || time === "sun") {
        if (n.isNew || n.ktv || n.recommendedShow) r += 4;
      }

      if (pickup === "border") {
        if (n.district === "澳門半島") r += 3;
      } else if (pickup === "airport") {
        if (n.district === "氹仔") r += 5;
        else r -= 1;
      }

      r -= u * 0.01;
      r = Math.min(100, Math.round(r));
      return { venue: n, score: r };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
