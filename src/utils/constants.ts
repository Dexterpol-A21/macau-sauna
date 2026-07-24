import type { NavLink } from '../types';
export { FEATURED_VENUES } from './parseVenues';

export const SITE_TITLE = 'Macau Sauna Booking';
export const SITE_DESCRIPTION =
  'Book Macau\'s best spas & saunas with VIP concierge. Free shuttle, skip-the-line entry, insider pricing, and 24/7 English support — Macau sauna booking made simple.';

export const SEO_KEYWORDS =
  'Macau sauna, Macau spa, Macau sauna booking, Macao spa, Macau nightlife, Macau VIP experience, Macau sauna prices 2026, Macau sauna recommendation, Macau free shuttle spa, luxury spa Macau, Macau entertainment, Macau KTV, Macau theme rooms, best Macau sauna, top Macau spa';

export const RANKING_DESCRIPTION =
  'Compare all 12 Macau saunas side by side: pricing, hours, therapists, theme rooms, KTV, overnight stays, and ratings. Find the best Macau spa for your budget.';

export const RANKING_KEYWORDS =
  'Macau sauna ranking, best Macau spa, Macau sauna comparison, top Macau saunas 2026, Macau spa prices, Macau sauna price list, Macau sauna features, Macau sauna comparison table, Macau sauna review, Macau spa review';

export const FAQ_DESCRIPTION =
  'Frequently asked questions about Macau saunas and spas. Pricing, booking, shuttle, massages, payments, overnight stays — everything first-timers need to know.';

export const FAQ_KEYWORDS =
  'Macau sauna FAQ, Macau spa questions, Macau sauna first time, Macau sauna prices, Macau sauna booking questions, Macau spa how to, Macau sauna guide, Macau nightlife FAQ, Macau sauna tips';

export const ABOUT_DESCRIPTION =
  'Meet the Macau Sauna Booking team. Taiwanese, Hong Konger, and Macau locals curating 12 licensed saunas. Free shuttle, VIP extras, 24/7 chat support — 1,000+ guests served.';

export const ABOUT_KEYWORDS =
  'Macau sauna concierge, about Macau Sauna Booking, Macau spa booking team, Macau VIP concierge, Macau sauna service, Macau nightlife concierge, Macau sauna guide team, who we are Macau sauna';

export const CONTACT = {
  whatsapp: '+000XXXXXXXX',
  whatsappMessage: 'Hi! I\'d like to book a VIP experience in Macau.',
  telegram: 'macausauna',
  wechat: 'AN99348',
  line: '@macausauna',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Venues', href: '/venues' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Ranking', href: '/ranking' },
  { label: 'FAQ', href: '/faq' },
];

export const HERO_BADGES = [
  { label: 'Free Shuttle', icon: 'car' },
  { label: 'VIP Entry', icon: 'crown' },
  { label: '24/7 Support', icon: 'message-circle' },
  { label: '12 Partner Venues', icon: 'building' },
];

export const VIP_EXTRAS = [
  { name: 'Back Rub', price: '298 MOP', icon: 'user' },
  { name: 'Thigh Massage', price: '288 MOP', icon: 'user' },
  { name: 'Head Massage', price: '230 MOP', icon: 'user' },
  { name: 'Reflexology', price: '230 MOP', icon: 'user' },
  { name: 'Manicure', price: '220 MOP', icon: 'hand' },
  { name: 'Pedicure', price: '220 MOP', icon: 'hand' },
  { name: 'Hand Massage', price: '200 MOP', icon: 'hand' },
  { name: 'Ear Cleaning', price: '200 MOP', icon: 'ear' },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Selection Show',
    description: 'See therapists live and pick your match — the widest selection in Macau.',
    icon: 'eye',
  },
  {
    title: 'Private 1-on-1 Sessions',
    description: 'Private room, completely undisturbed — just you and your therapist.',
    icon: 'lock',
  },
  {
    title: 'Themed Rooms',
    description: '20+ themed scenarios with fully customizable atmosphere.',
    icon: 'palette',
  },
  {
    title: 'Overnight at No Extra Cost',
    description: '12–15 hours of free stay including breakfast and bathing.',
    icon: 'moon',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Let Us Recommend',
    description:
      'Tell us your flight time, budget, and preferences. Our team matches you to the perfect venue — no guesswork.',
  },
  {
    step: 2,
    title: 'Free Private Shuttle',
    description:
      'Airport, hotel, pier, or street corner — our 7-seater picks you up anywhere in Macau. Zero cost.',
  },
  {
    step: 3,
    title: 'VIP Entry + Special Pricing',
    description:
      'Skip the front desk. Walk straight in with internal-network pricing secured just for you.',
  },
  {
    step: 4,
    title: 'Pick 1 VIP Extra',
    description:
      'Choose a complimentary service on arrival — head massage, reflexology, manicure, and more.',
  },
  {
    step: 5,
    title: 'Complimentary Return Ride',
    description:
      'Text us when you\'re done. Same shuttle takes you back to your hotel, airport, or anywhere in Macau.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Flew in from Taipei and had no idea where to go. They matched me to Number Nine Spa, and a private car was waiting at the airport. The whole experience was flawless.',
    author: 'Taipei Visitor',
    location: 'Taiwan',
    rating: 5,
  },
  {
    quote:
      'Was nervous about language barriers as a first-timer. The concierge walked me through everything in perfect English. Went to Majesty Spa — unbelievably luxurious.',
    author: 'First-time Guest',
    location: 'Singapore',
    rating: 5,
  },
  {
    quote:
      'Third time booking through them. They know each venue inside out and saved me from picking the wrong one on a busy Saturday night.',
    author: 'Returning Guest',
    location: 'Hong Kong',
    rating: 5,
  },
  {
    quote:
      'Business trip with only a 3-hour window. They arranged Shang Pin Spa — pickup, entry, service, return to hotel. Zero time wasted.',
    author: 'Business Traveler',
    location: 'Japan',
    rating: 5,
  },
  {
    quote:
      'Three of us flew from Kaohsiung together. The 7-seater handled everyone easily, and we all got the same VIP treatment. Not a single person was left out.',
    author: 'Group Visitor',
    location: 'Taiwan',
    rating: 5,
  },
];
