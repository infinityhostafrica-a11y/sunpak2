export type Award = {
  id: string;
  title: string;
  year: string;
  organization: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
};

export const AWARDS: Award[] = [
  {
    id: 'mizani-ceo-2025',
    title: 'CEO of the Year 2025',
    year: '2025',
    organization: 'Mizani Africa Awards',
    description: 'Honored for exceptional leadership, operational integrity, and transformative real estate development across Kenya.',
    imageUrl: '/app-assets/mizani ceo of the year 2025.jpeg',
    galleryImages: ['/app-assets/mizani ceo of the year 2025.jpeg', '/app-assets/starbrands awards group.jpeg']
  },
  {
    id: 'starbrands-ceo-award',
    title: 'Top Real Estate Leader of the Year',
    year: '2024',
    organization: 'Starbrands East Africa',
    description: 'Recognized as the premier brand and visionary executive in accessible and titled land ownership.',
    imageUrl: '/app-assets/starbrands CEO of the year.jpeg',
    galleryImages: ['/app-assets/starbrands CEO of the year.jpeg', '/app-assets/starbrands awards group.jpeg']
  },
  {
    id: 'consumer-choice-awards',
    title: 'Most Trusted Land Developer',
    year: '2024',
    organization: 'Consumer Choice Awards Kenya',
    description: 'Voted by thousands of Kenyan homeowners and investors for consistent title deed delivery and transparency.',
    imageUrl: '/app-assets/consumer awards.jpeg',
    galleryImages: ['/app-assets/consumer awards.jpeg', '/app-assets/WhatsApp Image 2026-04-17 at 1.45.40 PM.jpeg']
  }
];
