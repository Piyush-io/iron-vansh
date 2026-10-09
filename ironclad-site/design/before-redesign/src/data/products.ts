export interface Seg {
  cls: 'c' | 's' | 'e' | 'l';
  flex: number;
  strong: string;
  label: string;
}

export interface Product {
  slug: 'pms' | 'ventures' | 'latius';
  name: string;
  navSub: string;
  where: string;
  reg?: string;
  status?: string;
  image?: string;
  imagePos?: string;
  metaDescription: string;
  heroSummary: string;
  panelBlurb: string;
  tags: string[];
  invest: string[];
  focusHeading: string;
  focus: string[];
  buildIntro: string;
  alloc: { sub: string; aria: string; segs: Seg[] };
  keyPoints: { title: string; text: string }[];
  /** Performance / return claims. Rendered only by PerformanceNote, and only when SHOW_PERFORMANCE_CLAIMS is true. */
  claims: string[];
}

export const products: Product[] = [
  {
    slug: 'pms',
    name: 'Ironclad PMS',
    navSub: 'Listed Indian equities, flexicap',
    where: 'India, listed equities',
    reg: 'SEBI Portfolio Management Service (INP000009074)',
    image: '/images/g-pms.jpg',
    imagePos: 'center 40%',
    metaDescription:
      'Ironclad PMS is a SEBI-registered Portfolio Management Service following a flexicap strategy across small-, mid- and large-cap Indian companies.',
    heroSummary:
      'A flexicap strategy investing across small-, mid- and large-cap companies positioned to benefit from India’s long-term economic growth.',
    panelBlurb:
      'A flexicap portfolio of small-, mid- and large-cap companies positioned to benefit from India’s long-term growth.',
    tags: ['Financial services', 'Branded consumer', 'Technology and IP-led', 'Niche manufacturing'],
    invest: [
      'We concentrate on four areas where we see long runways for growth: financial services, branded consumer businesses, technology and IP-led businesses, and niche manufacturing.',
      'We look for businesses we would be glad to own for a decade, and we size positions as if the money were ours.',
    ],
    focusHeading: 'Focus areas',
    focus: ['Financial services', 'Branded consumer businesses', 'Technology and IP-led businesses', 'Niche manufacturing'],
    buildIntro:
      'Approximately 70% of the portfolio is allocated to compounders, while around 30% is allocated to special situations.',
    alloc: {
      sub: 'Listed Indian equities',
      aria: 'About 70 percent compounders, 30 percent special situations',
      segs: [
        { cls: 'c', flex: 70, strong: '~70%', label: 'Compounders' },
        { cls: 's', flex: 30, strong: '~30%', label: 'Special situations' },
      ],
    },
    keyPoints: [
      {
        title: 'A flexicap mandate',
        text: 'The portfolio can move across small-, mid- and large-cap companies, so capital goes where we find the best businesses rather than into a fixed size band.',
      },
      {
        title: 'Compounders and special situations',
        text: 'Most of the portfolio sits in businesses that can compound for years. A smaller share goes to specific situations where a catalyst can unlock value.',
      },
      {
        title: 'Four focus areas',
        text: 'Financial services, branded consumer businesses, technology and IP-led businesses, and niche manufacturing.',
      },
      {
        title: 'Regulated by SEBI',
        text: 'Ironclad PMS is a SEBI Portfolio Management Service, registration INP000009074.',
      },
    ],
    claims: [
      'Compounders: businesses with the potential to compound earnings at approximately 18–25% over the long term.',
      'Special situations: opportunities with the potential to generate 2x+ returns over a 2–3 year period.',
      'The strategy aims to generate approximately 3–5% annualised outperformance over the broader market over the long term.',
    ],
  },
  {
    slug: 'ventures',
    name: 'Ironclad Ventures',
    navSub: 'Indian private companies',
    where: 'India, unlisted and venture investments',
    reg: 'SEBI Category I AIF (IN/AIF/25-26/1899)',
    image: '/images/g-ventures.jpg',
    imagePos: 'center 45%',
    metaDescription:
      'Ironclad Ventures is a SEBI Category I AIF investing mainly in secondary stakes in venture-backed Indian companies with proven product-market fit.',
    heroSummary:
      'A Category I AIF investing in high-growth, privately held Indian companies that already have the backing of leading venture capital funds.',
    panelBlurb:
      'Mostly secondary stakes in VC-backed companies with proven product-market fit, offering partial liquidity to angels, founders and ESOP holders.',
    tags: ['Fintech', 'Consumer', 'AI and deeptech', 'Defence'],
    invest: [
      'We back companies that have already demonstrated meaningful product-market fit, mostly at Series A, alongside selective Seed and Series B investments.',
      'The fund predominantly participates as a secondary investor, providing partial liquidity to early angel investors, founders, or ESOP holders while gaining exposure to established, high-potential businesses.',
    ],
    focusHeading: 'Focus sectors',
    focus: ['Fintech', 'Consumer', 'AI and deeptech', 'Defence'],
    buildIntro:
      'The portfolio is primarily Series A, with approximately 15–20% in earlier-stage Seed and another 15–20% in later-stage Series B.',
    alloc: {
      sub: 'Indian private companies',
      aria: 'About 15 to 20 percent seed, the majority Series A, 15 to 20 percent Series B',
      segs: [
        { cls: 'e', flex: 17.5, strong: '15–20%', label: 'Seed' },
        { cls: 'c', flex: 65, strong: 'Majority', label: 'Series A' },
        { cls: 'l', flex: 17.5, strong: '15–20%', label: 'Series B' },
      ],
    },
    keyPoints: [
      {
        title: 'Backed by leading funds',
        text: 'We invest in companies that have already attracted backing from leading Indian venture capital funds and shown meaningful product-market fit.',
      },
      {
        title: 'Mostly secondary',
        text: 'The fund predominantly participates as a secondary investor, giving partial liquidity to early angel investors, founders or ESOP holders.',
      },
      {
        title: 'Mainly Series A',
        text: 'Primarily Series A, with some earlier-stage Seed and some later-stage Series B.',
      },
      {
        title: 'Sector-agnostic',
        text: 'Focus areas are fintech, consumer, AI and deeptech, and defence. The fund is sector-agnostic and may invest opportunistically elsewhere.',
      },
      {
        title: 'Regulated by SEBI',
        text: 'Ironclad Ventures is a SEBI Category I AIF, registration IN/AIF/25-26/1899.',
      },
    ],
    claims: ['The strategy targets 25–30%+ IRRs over the long term.'],
  },
  {
    slug: 'latius',
    name: 'Ironclad Latius',
    navSub: 'Global equities from GIFT City',
    where: 'Global equities, from GIFT City',
    status: 'IFSCA licence under application',
    metaDescription:
      'Ironclad Latius is a GIFT City-based global investment strategy for diversification beyond Indian markets. IFSCA licence under application.',
    heroSummary:
      'A GIFT City–based global investment strategy designed to provide diversification beyond Indian markets and access to global growth opportunities.',
    panelBlurb:
      'A global portfolio that diversifies beyond India: access to the world’s leading companies, exposure to the US dollar, and less concentration in India-specific risk.',
    tags: ['Global compounders', 'Special situations', 'Dollar exposure'],
    invest: [
      'The portfolio invests in the world’s leading companies, giving Indian investors exposure to global growth and to the US dollar.',
      'Compounders are businesses with strong fundamentals and the potential for sustained growth. Special situations seek to capture value-creation opportunities arising from specific catalysts or corporate developments.',
    ],
    focusHeading: 'Portfolio sleeves',
    focus: ['Global compounders', 'Special situations'],
    buildIntro: 'The portfolio follows a 70:30 allocation between compounders and special situations.',
    alloc: {
      sub: 'Global equities, IFSCA licence under application',
      aria: 'About 70 percent compounders, 30 percent special situations',
      segs: [
        { cls: 'c', flex: 70, strong: '~70%', label: 'Compounders' },
        { cls: 's', flex: 30, strong: '~30%', label: 'Special situations' },
      ],
    },
    keyPoints: [
      {
        title: 'Global growth potential',
        text: 'Global markets, particularly the US, give access to growth opportunities beyond those available in India.',
      },
      {
        title: 'Currency diversification',
        text: 'Exposure to global assets provides a natural hedge against the long-term depreciation of the Indian Rupee against the US Dollar, historically around 4% annually.',
      },
      {
        title: 'Reduced India-specific risk',
        text: 'Global diversification can help reduce concentration in India-specific events such as demonetisation (2016), the IL&FS crisis (2018–19), and periods of significant FII selling.',
      },
      {
        title: 'Asset-liability matching',
        text: 'Dollar exposure can help offset future expenses that are effectively dollar-linked, including international travel and imported goods.',
      },
      {
        title: 'Status',
        text: 'IFSCA licence under application.',
      },
    ],
    claims: [
      'Over 15 years, ₹1 crore invested in Indian equities would have grown to approximately ₹6 crore, versus approximately ₹11 crore in US equities.',
      'The strategy aims to outperform its relevant global benchmark, which has delivered approximately 16% p.a. in INR terms over the past 15 years.',
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)!;
