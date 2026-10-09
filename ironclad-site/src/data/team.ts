// People. Copy from website_details.docx (Ironclad, Oct 2026); bios keep the document's emphasis as <strong>.
export interface Person {
  name: string;
  title: string;
  group: 'founder' | 'team';
  /** Trusted static HTML: plain text with <strong> emphasis only. */
  bio: string;
  image?: string;
  initials: string;
  linkedin?: string;
}

export const team: Person[] = [
  {
    name: 'Krishna Killa',
    title: 'Founder & Fund Manager',
    group: 'founder',
    initials: 'KK',
    image: '/images/t-krishna.jpg',
    linkedin: 'https://www.linkedin.com/in/krishna-killa-7a88b822/',
    bio: 'Krishna Killa is the Founder and Fund Manager at Ironclad Asset Management, bringing experience across private equity, entrepreneurship and strategy consulting. Prior to Ironclad, he worked with <strong>Bain Capital Private Equity</strong>, one of the world’s leading private equity investors, and founded and scaled LifCare, a healthcare technology company backed by <strong>Elevation Capital and Nexus Venture Partners</strong>. He began his career with <strong>Boston Consulting Group (BCG)</strong>, where he advised businesses on strategy and growth. A <strong>Chartered Accountant with All India Rank 14</strong>, Krishna combines rigorous financial analysis with strategic thinking and an entrepreneurial understanding of building businesses.',
  },
  {
    name: 'Aritra Baksi, CFA',
    title: 'Co-Founder & Fund Manager',
    group: 'founder',
    initials: 'AB',
    bio: 'Aritra Baksi is the Co-Founder and Fund Manager at Ironclad Asset Management, bringing nearly a decade of experience across global capital markets. Prior to Ironclad, he spent close to a decade at <strong>Bank of America Securities in Hong Kong as an Equity Strategist</strong>. His experience includes managing exposure across global capital markets, working on macro and economic factors and analysing special situations across the region, providing him with a deep understanding of global markets, liquidity, risk and capital flows. A CFA charterholder and <strong>IIM Bangalore</strong> alumnus, Aritra combines a global markets perspective with rigorous analytical thinking to assess investment opportunities and navigate changing market environments.',
  },
  {
    name: 'Vansh Agarwala',
    title: 'Investment Associate',
    group: 'team',
    initials: 'VA',
    image: '/images/t-vansh.jpg',
    linkedin: 'https://www.linkedin.com/in/vansh-agarwala-042295213/',
    bio: 'Vansh is part of Ironclad’s investment team, contributing across the firm’s investment strategies. His work spans <strong>fundamental research, business and industry analysis, portfolio monitoring, startup evaluation and investment diligence</strong>, supporting the team in identifying and evaluating opportunities at Ironclad.',
  },
  {
    name: 'Yash Jindal',
    title: 'Investment Associate',
    group: 'team',
    initials: 'YJ',
    image: '/images/t-yash.jpg',
    linkedin: 'https://www.linkedin.com/in/yash-jindal-cfa-level-3-cleared/',
    bio: 'Yash is a CFA Level 3 cleared investment professional at Ironclad Asset Management, focused on <strong>investment research and deal evaluation at Ironclad AMC</strong>. He supports fundamental analysis and diligence across investment opportunities, bringing a research-driven approach to evaluating businesses and transactions.',
  },
  {
    name: 'Mohit Kumar',
    title: 'Compliance Officer',
    group: 'team',
    initials: 'MK',
    image: '/images/t-mohit.jpg',
    linkedin: 'https://www.linkedin.com/in/mohit-pal-8bb444249/',
    bio: 'Mohit oversees <strong>compliance and investor onboarding</strong> at Ironclad Asset Management. With over seven years of experience across finance and compliance, he supports the firm’s regulatory framework and ensures that investor processes and operations adhere to applicable <strong>SEBI and regulatory requirements</strong>.',
  },
];

export const founders = team.filter((p) => p.group === 'founder');
export const associates = team.filter((p) => p.group === 'team');
