import venuesRaw from '../content/venues.md?raw';
import type { Venue, VenueCategory } from '../types';

function parseVenues(raw: string): Venue[] {
  // Normalize Windows \r\n → \n so splits work on any OS
  const norm = raw.replace(/\r\n/g, '\n');

  const blocks = norm
    .split('\n---')
    .map((b) => b.trim())
    .filter((b) => b.length > 0 && !b.startsWith('# Venues') && !b.startsWith('Edit this file'));

  return blocks.map((block) => {
    const venue: Partial<Venue> = { fullDescription: '' };
    const lines = block.split('\n').map((l) => l.replace(/\r/g, '').trim()).filter((l) => l.length > 0);

    // First line starting with ## is the venue name
    const nameLine = lines.find((l) => l.startsWith('## '));
    if (nameLine) {
      venue.name = nameLine.replace('## ', '').trim();
    }

    lines.forEach((line) => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (!match) return;
      const [, key, value] = match;

      switch (key) {
        case 'slug':
          venue.slug = value.trim();
          break;
        case 'subtitle':
          venue.subtitle = value.trim();
          break;
        case 'description':
          venue.description = value.trim();
          break;
        case 'fullDescription':
          venue.fullDescription = value.trim();
          break;
        case 'image':
          venue.image = value.trim();
          break;
        case 'category':
          venue.category = value.split(',').map((c) => c.trim()) as VenueCategory[];
          break;
        case 'features':
          venue.features = value.split(',').map((f) => f.trim());
          break;
        case 'priceRange':
          venue.priceRange = value.trim();
          break;
        case 'hours':
          venue.hours = value.trim();
          break;
        case 'location':
          venue.location = value.trim();
          break;
        case 'rating':
          venue.rating = Number(value.trim());
          break;
        case 'badge': {
          const b = value.trim();
          if (b === 'new' || b === 'popular' || b === 'value' || b === 'paused') {
            venue.badge = b;
          }
          break;
        }
        case 'referencePrice':
          venue.referencePrice = value.trim();
          break;
        case 'staffNationalities':
          venue.staffNationalities = value.trim();
          break;
        case 'staffHours':
          venue.staffHours = value.trim();
          break;
        case 'website':
          venue.website = value.trim();
          break;
        case 'overnight':
          venue.overnight = value.trim();
          break;
        case 'highlights':
          venue.highlights = value.split(',').map((h) => h.trim());
          break;
        case 'bestFor':
          venue.bestFor = value.trim();
          break;
        case 'payment':
          venue.payment = value.split(',').map((p) => p.trim());
          break;
      }
    });

    return venue as Venue;
  });
}

export const FEATURED_VENUES: Venue[] = parseVenues(venuesRaw);
