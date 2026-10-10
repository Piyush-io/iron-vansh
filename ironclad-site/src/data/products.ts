// Product page content. Copy supplied by Ironclad (Vansh Agarwala, 10 Sep 2026); keep wording as given.

export interface Seg {
  cls: 'c' | 's' | 'e' | 'l';
  flex: number;
  strong: string;
  label: string;
}

export interface Item { title: string; text?: string; bullets?: string[] }
export interface ItemSection { title: string; items: Item[] }

export interface Product {
  slug: 'pms' | 'ventures' | 'latius';
  name: string;
  navSub: string;
  /** Line under the name, e.g. "Indian Equity Portfolio Management Services". */
  kicker: string;
  /** Hero sub-headline. */
  headline: string;
  where: string;
  reg?: string;
  metaDescription: string;
  panelBlurb: string;
  intro: { title: string; paras: string[] };
  /** One or more titled groups of points ("Our investment approach", "Why global investing?"). */
  sections: ItemSection[];
  /** Short facts for the comparison table on the homepage. */
  portfolioSummary: string;
  compare: { figure: string; figureLabel: string; detail: string; stages?: string[]; regShort: string };
  alloc?: { title: string; sub: string; aria: string; segs: Seg[]; note?: string };
  construction?: { title: string; bullets: string[] };
  chips?: { title: string; items: string[] };
  why: { title: string; bullets: string[] };
  philosophy: string;
  risk: string;
  /** Performance / return claims. Rendered only by PerformanceNote, and only when SHOW_PERFORMANCE_CLAIMS is true. */
  claims: string[];
}

export const products: Product[] = [
  {
    slug: 'pms',
    name: 'Ironclad Flexicap+',
    navSub: 'Indian listed equities, PMS',
    kicker: 'Indian Equity Portfolio Management Services',
    headline: 'Disciplined investing. Long-term wealth creation.',
    where: 'Indian listed equities',
    reg: 'SEBI Portfolio Management Service (INP000009074)',
    metaDescription:
      'Ironclad Flexicap+ is a SEBI-registered Portfolio Management Service investing in a concentrated portfolio of high-quality Indian listed businesses across market capitalisations.',
    panelBlurb:
      'A concentrated portfolio of high-quality Indian listed businesses across market capitalisations, combining long-term compounders with special situations.',
    intro: {
      title: 'Invest in India’s growth story',
      paras: [
        'Ironclad Flexicap+ is a SEBI-registered Portfolio Management Service focused on long-term wealth creation through a concentrated portfolio of high-quality Indian listed businesses across market capitalisations.',
        'Our investment philosophy combines long-term compounders with carefully selected special situations, seeking to identify businesses with sustainable earnings growth and opportunities where market perceptions diverge from underlying fundamentals.',
      ],
    },
    sections: [
      {
        title: 'Our investment approach',
        items: [
          { title: 'Fundamental Research', text: 'We evaluate business quality, industry structure, revenue and earnings growth, competitive positioning, management quality, promoter track record and valuations before investing.' },
          { title: 'Concentrated Portfolio Construction', text: 'We typically invest in 15–20 carefully selected companies across large-, mid- and small-cap segments, with an emphasis on attractive entry valuations and a margin of safety.' },
          {
            title: 'Compounders + Special Situations',
            bullets: [
              '60–70% Compounders: Businesses with durable competitive advantages, strong fundamentals and the potential to compound earnings over the long term.',
              '20–30% Special Situations: Opportunities arising from temporary concerns, market mispricing or changing business perceptions that may create attractive risk-reward opportunities.',
            ],
          },
          { title: 'Continuous Portfolio Monitoring', text: 'We regularly monitor company performance, financial results, management commentary, valuations and developments affecting the original investment thesis.' },
        ],
      },
    ],
    portfolioSummary: '15–20 companies across large-, mid- and small-cap',
    compare: { figure: '15–20', figureLabel: 'companies', detail: 'A concentrated portfolio across large-, mid- and small-cap.', regShort: 'SEBI PMS · INP000009074' },
    alloc: {
      title: 'Portfolio construction',
      sub: 'Indicative allocation',
      aria: '60 to 70 percent compounders, 20 to 30 percent special situations',
      segs: [
        { cls: 'c', flex: 65, strong: '60–70%', label: 'Compounders' },
        { cls: 's', flex: 25, strong: '20–30%', label: 'Special situations' },
      ],
    },
    chips: {
      title: 'Investment universe',
      items: ['Financial Services', 'Consumer & Healthcare', 'Pharmaceuticals', 'Technology & New-Age Businesses', 'Niche Manufacturing'],
    },
    why: {
      title: 'Why Ironclad Flexicap+?',
      bullets: [
        'Research-led stock selection grounded in business fundamentals.',
        'Flexibility to invest across market capitalisations and sectors.',
        'A concentrated portfolio designed to participate in long-term business growth.',
        'A combination of structural growth opportunities and special situations.',
        'A disciplined focus on valuation, risk assessment and continuous monitoring.',
      ],
    },
    philosophy: 'Own quality businesses, invest with a margin of safety and remain focused on long-term compounding.',
    risk: 'Equity investments are subject to market risks, including the possible loss of capital. Returns are not guaranteed. Please refer to the applicable scheme and regulatory disclosures.',
    claims: [],
  },
  {
    slug: 'ventures',
    name: 'Ironclad Ventures Fund',
    navSub: 'Early-stage secondaries, Category I AIF',
    kicker: 'Early-Stage Secondaries | Category I AIF',
    headline: 'Access to venture-backed startups through a differentiated investment strategy.',
    where: 'Indian venture-backed startups',
    reg: 'SEBI Category I AIF (IN/AIF/25-26/1899)',
    metaDescription:
      'Ironclad Ventures Fund is a SEBI Category I AIF giving investors exposure to India’s venture-backed startups through early-stage secondary transactions and selective primary co-investments.',
    panelBlurb:
      'Exposure to India’s venture-backed startups through early-stage secondaries and selective primary co-investments.',
    intro: {
      title: 'Access the next generation of Indian businesses',
      paras: [
        'Ironclad Ventures Fund provides investors with exposure to India’s venture-backed startup ecosystem through early-stage secondary transactions and selective primary co-investments.',
        'The fund focuses on startups that have already attracted institutional venture capital, seeking opportunities to participate in their growth while addressing the liquidity needs of early employees and investors.',
      ],
    },
    sections: [
      {
        title: 'A different approach to venture investing',
        items: [
          { title: 'Early-Stage Secondary Opportunities', text: 'We acquire selected stakes from employees holding vested ESOPs, angel investors and other early stakeholders, providing partial liquidity before a conventional exit event.' },
          { title: 'Institutionally Backed Startups', text: 'The strategy targets companies backed by established venture capital funds, with a stated focus on approximately 10–15 leading VC ecosystems and an objective of allocating more than 80% of the portfolio to startups backed by top-tier VCs.' },
          { title: 'Selective Investment Underwriting', text: 'Each opportunity is evaluated on segment leadership, product-market fit, business traction, post-funding growth, founder quality, valuation and risk-adjusted entry price.' },
          { title: 'Defined Exit Orientation', text: 'The fund seeks liquidity through subsequent funding rounds, later-stage secondary transactions, pre-IPO opportunities, public listings and strategic acquisitions. It aims to exit investments earlier than the traditional venture capital cycle where market conditions permit.' },
        ],
      },
    ],
    portfolioSummary: '25–40 companies, mainly Series A and early Series B',
    compare: { figure: '25–40', figureLabel: 'companies', detail: 'Diversified across startups backed by established VC funds.', stages: ['Series A', 'Early Series B', 'Selective seed'], regShort: 'SEBI Category I AIF · IN/AIF/25-26/1899' },
    construction: {
      title: 'Portfolio construction',
      bullets: [
        'Target portfolio of approximately 25–40 companies.',
        'Typical focus on Series A and early Series B opportunities, with selective seed-stage investments.',
        'Exposure across fintech, consumer technology, D2C, AI/SaaS, deeptech and defence.',
        'Diversification across multiple businesses to reduce dependence on any single startup outcome.',
      ],
    },
    chips: { title: 'Sectors', items: ['Fintech', 'Consumer technology', 'D2C', 'AI/SaaS', 'Deeptech', 'Defence'] },
    why: {
      title: 'Why Ironclad Ventures?',
      bullets: [
        'Access to venture-backed businesses through secondary transactions.',
        'Exposure to private-market opportunities that may otherwise be difficult to access directly.',
        'A strategy addressing liquidity needs of early employees and investors.',
        'Institutional VC backing as one input into investment selection, alongside independent diligence.',
        'An exit-oriented approach designed around the potential for earlier liquidity.',
      ],
    },
    philosophy: 'Access promising private businesses through differentiated entry routes, disciplined underwriting and a clear focus on value realisation.',
    risk: 'Private-market investments are high risk and illiquid. Investors may lose some or all of their capital, and exits may take longer than anticipated. Target returns are not assured. Please refer to the fund’s offering documents and regulatory disclosures.',
    claims: [],
  },
  {
    slug: 'latius',
    name: 'Ironclad Latius',
    navSub: 'Global investments, GIFT City',
    kicker: 'Global Investments | GIFT City',
    headline: 'Global opportunities. Broader diversification. Long-term growth.',
    where: 'Global equities, from GIFT City',
    metaDescription:
      'Ironclad Latius offers a route to international equity markets through GIFT City, focusing on globally competitive businesses and long-term structural growth themes.',
    panelBlurb:
      'A route to international equity markets through GIFT City: global industry leaders, technology-led innovation and long-term structural growth themes.',
    intro: {
      title: 'Invest beyond borders',
      paras: [
        'Ironclad Latius provides investors with a route to international equity markets, focusing on globally competitive businesses, technology-led innovation and long-term structural growth themes.',
        'The strategy seeks to complement domestic portfolios with exposure to international markets, global industry leaders and businesses operating at the forefront of innovation.',
      ],
    },
    sections: [
      {
        title: 'Why global investing?',
        items: [
          { title: 'Participate in Global Innovation', text: 'Gain exposure to businesses operating across artificial intelligence, cloud computing, semiconductors, cybersecurity, biotechnology and other evolving industries.' },
          { title: 'Diversify Across Geographies', text: 'Build exposure beyond the Indian market, with a primary focus on the United States and opportunities across Europe, Japan and selected Asian markets.' },
          { title: 'Access Global Market Leaders', text: 'The investment universe spans technology platforms, semiconductor infrastructure, consumer and luxury brands, healthcare, defence and other globally competitive sectors.' },
          { title: 'Add Foreign-Currency Exposure', text: 'International investments provide exposure to foreign-currency movements alongside underlying equity returns. Currency movements can enhance or reduce returns measured in Indian rupees.' },
        ],
      },
      {
        title: 'Our investment approach',
        items: [
          { title: 'Geographic Allocation', text: 'Indicative allocation of 50–70% to the United States, 10–20% to Europe and 5–20% to other Asian markets excluding India. Actual allocations may vary with market conditions.' },
          { title: 'Thematic Investing', text: 'Focus on global technology, AI, semiconductors, cybersecurity, luxury, healthcare and other selected long-term growth themes.' },
          { title: 'Flexible Portfolio Implementation', text: 'A combination of direct equities and exchange-traded funds may be used to achieve appropriate geographic, sectoral and thematic exposure.' },
          { title: 'Long-Term Orientation', text: 'A suggested investment horizon of 3–5 years, allowing investors to participate in the potential of global business growth while recognising market volatility.' },
        ],
      },
    ],
    portfolioSummary: 'US-led global equities and ETFs, 3–5 year horizon',
    compare: { figure: '3–5', figureLabel: 'year suggested horizon', detail: 'Direct equities and ETFs, led by the United States.', regShort: 'GIFT City' },
    alloc: {
      title: 'Geographic allocation',
      sub: 'Indicative; actual allocations may vary with market conditions',
      aria: '50 to 70 percent United States, 10 to 20 percent Europe, 5 to 20 percent other Asian markets excluding India',
      segs: [
        { cls: 'c', flex: 60, strong: '50–70%', label: 'United States' },
        { cls: 's', flex: 15, strong: '10–20%', label: 'Europe' },
        { cls: 'e', flex: 12.5, strong: '5–20%', label: 'Asia ex-India' },
      ],
    },
    chips: { title: 'Themes', items: ['Global technology', 'AI', 'Semiconductors', 'Cybersecurity', 'Luxury', 'Healthcare'] },
    why: {
      title: 'Why Ironclad Latius?',
      bullets: [
        'Access to international equity markets through a GIFT City investment structure.',
        'Geographic diversification beyond domestic equities.',
        'Exposure to global innovation and structural growth themes.',
        'Flexible allocation across markets, sectors and investment instruments.',
        'A long-term approach to global portfolio construction.',
      ],
    },
    philosophy: 'Complement your Indian portfolio with exposure to global businesses, international markets and the next wave of innovation.',
    risk: 'International investments involve market, currency, geopolitical, liquidity and tax risks. Returns in Indian rupees may be affected by exchange-rate movements. Investments are subject to applicable regulatory requirements and market risks. Returns are not guaranteed.',
    claims: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)!;
