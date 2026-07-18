export interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  canonical?: string;
  noindex?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Venue {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  category: VenueCategory[];
  features: string[];
  priceRange: string;
  hours: string;
  location: string;
  rating: number;
  badge?: 'new' | 'popular' | 'value' | 'paused';
  referencePrice?: string;
  staffNationalities?: string;
  staffHours?: string;
  website?: string;
  overnight?: string;
  highlights?: string[];
  bestFor?: string;
  payment?: string[];
}

export type VenueCategory =
  | 'all'
  | 'theme-rooms'
  | 'best-value'
  | 'newest'
  | 'ktv'
  | 'jpk-staff'
  | 'classic';

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export interface MatchQuestion {
  id: string;
  question: string;
  options: MatchOption[];
}

export interface MatchOption {
  id: string;
  label: string;
  icon?: string;
}

export interface MatchResult {
  venueSlug: string;
  matchPercentage: number;
  reason: string;
}
