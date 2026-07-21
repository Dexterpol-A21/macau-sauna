export interface FilterDef {
  key: string;
  label: string;
  color: string;
}

export const FILTERS: FilterDef[] = [
  { key: 'all',          label: 'All',          color: '#FF4DA6' },  // gold
  { key: 'newest',       label: 'New',          color: '#FF1493' },  // pink neon
  { key: 'theme-rooms',  label: 'Theme',        color: '#C026FF' },  // violet
  { key: 'best-value',   label: 'Value',        color: '#4ADE80' },  // green
  { key: 'ktv',          label: 'KTV',          color: '#F43F5E' },  // rose
  { key: 'jpk-staff',    label: 'Japan-Korea',  color: '#FB923C' },  // orange
];

export const FILTER_COLOR: Record<string, string> = {};
FILTERS.forEach((f) => { FILTER_COLOR[f.key] = f.color; });

export const BADGE_FILTER: Record<string, string> = {
  new:   'newest',
  value: 'best-value',
};

/** Build category pills for a venue — same logic used by AllSaunas and SpinWheel */
export function buildVenueTags(venue: {
  category: string[];
  badge?: string;
}): { key: string; label: string; color: string; primary: boolean }[] {
  const seen = new Set<string>();
  const tags: { key: string; label: string; color: string; primary: boolean }[] = [];

  const add = (key: string, label: string) => {
    if (seen.has(key)) return;
    seen.add(key);
    tags.push({
      key,
      label,
      color: FILTER_COLOR[key] ?? '#555',
      primary: tags.length === 0,
    });
  };

  (venue.category ?? []).forEach((c) => {
    if (c === 'all') return;
    const f = FILTERS.find((f) => f.key === c);
    if (f) add(c, f.label);
  });

  if (venue.badge && BADGE_FILTER[venue.badge]) {
    const key = BADGE_FILTER[venue.badge];
    const f = FILTERS.find((f) => f.key === key);
    if (f) add(key, f.label);
  }

  return tags;
}
