// Responsive Unsplash originals, including 4K for large displays.
// Local photographs remain available when the image CDN cannot be reached.
export const photos = {
  pavilion: { file: '/images/ironclad-pavilion-v3', width: 1672, height: 941, alt: 'Conceptual emerald and bronze architectural pavilion overlooking still water at sunrise' },
  mumbai: { id: 'photo-1753806390462-580d7a625f76', fallback: '/images/g-waterfront.jpg', alt: 'Marine Drive and the South Mumbai skyline across the Arabian Sea', fallbackAlt: 'City buildings along a waterfront' },
  architecture: { id: 'photo-1486406146926-c627a92ad1ab', fallback: '/images/g-waterfront.jpg', alt: 'Glass towers rising into the sky, seen from below' },
  ventures: { id: 'photo-1497366754035-f200968a6e72', fallback: '/images/g-ventures.jpg', alt: 'A light-filled contemporary workspace' },
  global: { id: 'photo-1519501025264-65ba15a82390', fallback: '/images/g-waterfront.jpg', alt: 'New York skyline stretching towards the horizon' },
} as const;
export type PhotoName = keyof typeof photos;
export const photoUrl = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=max&w=${width}&q=85`;
