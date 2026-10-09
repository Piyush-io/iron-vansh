export interface Person {
  name: string;
  title?: string;
  shortBio?: string;
  bio?: string;
  image: string;
  linkedin: string;
}

export const team: Person[] = [
  {
    name: 'Krishna Killa',
    title: 'Founder and Managing Partner',
    shortBio: 'Over 15 years across private equity, consulting and entrepreneurship, including Bain Capital.',
    bio: 'Krishna brings over 15 years of experience spanning private equity, consulting, and entrepreneurship. He has previously worked at Bain Capital.',
    image: '/images/t-krishna.jpg',
    linkedin: 'https://www.linkedin.com/in/krishna-killa-7a88b822/',
  },
  { name: 'Gaurav Kedia', image: '/images/t-gaurav.jpg', linkedin: 'https://www.linkedin.com/in/gaurav-kedia-49919542/' },
  { name: 'Yash Jindal', image: '/images/t-yash.jpg', linkedin: 'https://www.linkedin.com/in/yash-jindal-cfa-level-3-cleared/' },
  { name: 'Vansh Agarwala', image: '/images/t-vansh.jpg', linkedin: 'https://www.linkedin.com/in/vansh-agarwala-042295213/' },
  { name: 'Mohit Pal', image: '/images/t-mohit.jpg', linkedin: 'https://www.linkedin.com/in/mohit-pal-8bb444249/' },
];
