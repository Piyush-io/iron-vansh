// Flip to false to remove every performance / return claim from the site.
export const SHOW_PERFORMANCE_CLAIMS = true;

export const site = {
  name: 'Ironclad Asset Management',
  legalName: 'Ironclad Asset Management LLP',
  url: 'https://ironcladamc.com',
  tagline:
    'Independent investment management across Indian public and private markets and global equities.',
  description:
    'Ironclad Asset Management: a SEBI-registered portfolio manager and Category I AIF investing across listed Indian equities, Indian private companies and global markets.',
  address: '3rd Floor, C-175, Block C, Sector 100, Noida, Uttar Pradesh 201301',
  addressShort: ['3rd Floor, C-175, Block C', 'Sector 100, Noida 201301'],
  phone: '+91 93195 27524',
  phoneHref: 'tel:+919319527524',
  email: 'info@ironcladamc.com',
  investorLoginUrl: 'https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in',
  registrations: {
    pms: 'INP000009074',
    aif: 'IN/AIF/25-26/1899',
    gst: '09AAJFI1094H1Z7',
    pan: 'AAJFI1094H',
  },
  sebiLine:
    'Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Investments in securities markets are subject to market risks. Read all related documents carefully before investing.',
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
