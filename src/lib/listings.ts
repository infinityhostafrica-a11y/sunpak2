import type { LandListing, ListingCategory, ListingLocation } from '@/types';

export const CATEGORIES: {
  id: ListingCategory;
  name: string;
  description: string;
}[] = [
  {
    id: 'residential',
    name: 'Residential Plots',
    description: 'Perfect for building your family home.',
  },
  {
    id: 'commercial',
    name: 'Commercial Land',
    description: 'Prime locations for business and development.',
  },
  {
    id: 'agricultural',
    name: 'Agricultural Land',
    description: 'Fertile land for farming and agribusiness.',
  },
  {
    id: 'industrial',
    name: 'Industrial Parcels',
    description: 'Strategic zones for warehouses and factories.',
  },
  {
    id: 'investment',
    name: 'Investment Projects',
    description: 'High-growth areas with great ROI potential.',
  }
];

export const LOCATIONS: {
  id: ListingLocation;
  name: string;
}[] = [
  { id: 'kitengela', name: 'Kitengela' },
  { id: 'isinya', name: 'Isinya' },
  { id: 'kisaju', name: 'Kisaju' },
  { id: 'mwea', name: 'Mwea' },
  { id: 'juja', name: 'Juja' },
  { id: 'mai-mahiu', name: 'Mai Mahiu' },
  { id: 'ruiru', name: 'Ruiru' },
  { id: 'konza', name: 'Konza' },
  { id: 'nakuru', name: 'Nakuru' },
  { id: 'kajiado', name: 'Kajiado' },
];

const listings: LandListing[] = [
  {
    id: 'konza-prime',
    name: 'Konza',
    location: 'konza',
    categories: ['investment'],
    categoryDisplayName: 'Investment',
    price: 370000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Water & Electricity nearby', 'Access Roads'],
    features: ['High Growth Area', 'Near Konza Technopolis'],
    images: [{ id: 'listing-Konza', hint: 'konza land' }],
    description: 'Strategic investment plots in Konza, perfect for long-term capital appreciation near the Silicon Savannah.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '370K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'isinya-highway-prime',
    name: 'Isinya Highway',
    location: 'isinya',
    categories: ['commercial'],
    categoryDisplayName: 'Commercial',
    price: 1260000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Highway Frontage', 'Electricity'],
    features: ['Along Namanga Road', 'Business Potential'],
    images: [{ id: 'listing-isinya-hwy', hint: 'highway plots' }],
    description: 'Premium commercial plots with direct access to the Namanga Highway, ideal for business setups.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '1.26M' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'kisaju-gardens-ph4',
    name: 'Kisaju Gardens Phase 4',
    location: 'kisaju',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 1050000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Water & Electricity', 'Gated Community'],
    features: ['Developed Neighborhood', 'Ready for Settlement'],
    images: [{ id: 'listing-kisaju-4', hint: 'kisaju gardens' }],
    description: 'Secure and developed residential plots in the heart of Kisaju, perfect for a family home.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '1.05M' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'lenchani-gardens-kitengela',
    name: 'Lenchani Gardens Kitengela',
    location: 'kitengela',
    categories: ['investment'],
    categoryDisplayName: 'Investment',
    price: 370000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Access Roads'],
    features: ['Affordable', 'Rapidly Growing Area'],
    images: [{ id: 'listing-lenchani-4', hint: 'kitengela plots' }],
    description: 'Highly affordable plots in Kitengela Lenchani, offering great value for first-time investors.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '370K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'mbuni-gardens-kitengela',
    name: 'Mbuni Gardens Kitengela',
    location: 'kitengela',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 890000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Water & Electricity'],
    features: ['Serene Environment', 'Proximity to Schools'],
    images: [{ id: 'listing-mbuni', hint: 'kitengela plots' }],
    description: 'Beautiful residential plots in Kitengela Mbuni, offering a peaceful living space for your family.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '890K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'diaspora-isinya-ph3-4',
    name: 'Diaspora - Isinya Phase 3 & 4',
    location: 'isinya',
    categories: ['residential'],
    categoryDisplayName: 'Diaspora Special',
    price: 630000,
    size: '50 × 100',
    titleStatus: 'Freehold',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Secure Perimeter', 'Electricity'],
    features: ['Ready Titles', 'Secure Investment'],
    images: [{ id: 'listing-diaspora', hint: 'isinya plots' }],
    description: 'Tailored for Kenyans in the diaspora, these plots offer security and peace of mind with ready titles.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '630K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'amani-mooi-kisaju',
    name: 'Amani Mooi Kisaju',
    location: 'kisaju',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 790000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Developed Area'],
    features: ['Prime Location', 'Installments Available'],
    images: [{ id: 'listing-amani', hint: 'kisaju plots' }],
    description: 'Prime residential plots in the growing Kisaju Mooi area, ideal for immediate development.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '790K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'maai-mahiu-plots',
    name: 'Maai Mahiu',
    location: 'mai-mahiu',
    categories: ['investment'],
    categoryDisplayName: 'Investment',
    price: 630000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Scenic Views'],
    features: ['High Appreciation', 'Near Tourist Circuits'],
    images: [{ id: 'listing-hotsprings', hint: 'maai mahiu plots' }],
    description: 'Secure your future with these high-potential investment plots in the scenic Maai Mahiu area.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '630K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'juja-plots',
    name: 'Juja',
    location: 'juja',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 630000,
    size: '40 × 80',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Water & Electricity'],
    features: ['Gated Community Potential', 'Near Thika Road'],
    images: [{ id: 'listing-juja-farm', hint: 'juja plots' }],
    description: 'Well-located residential plots in Juja, offering easy access to Thika Road and social amenities.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '630K' }, { name: 'Size', value: '40x80' }] }]
  },
  {
    id: 'makutano-mwea-pi-plots',
    name: 'Makutano Mwea PI',
    location: 'mwea',
    categories: ['commercial'],
    categoryDisplayName: 'Commercial',
    price: 790000,
    size: '50 × 100',
    titleStatus: 'Freehold',
    topography: 'Flat',
    soilType: 'Rich Loam',
    amenities: ['Highway Access'],
    features: ['Business Center Proximity', 'Agribusiness Potential'],
    images: [{ id: 'listing-makutano', hint: 'mwea plots' }],
    description: 'Highly strategic commercial plots in Makutano, Mwea, perfect for retail or hospitality ventures.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '790K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'lenchani-ph9-isinya',
    name: 'Lenchani Phase 9',
    location: 'isinya',
    categories: ['investment'],
    categoryDisplayName: 'Investment',
    price: 470000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Road Access'],
    features: ['Affordable Installments', 'Rapid Growth'],
    images: [{ id: 'listing-lenchani-9', hint: 'isinya land' }],
    description: 'A promising investment project in Isinya offering great returns as the area develops.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '470K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'mwea-karaba-plots',
    name: 'Mwea Karaba',
    location: 'mwea',
    categories: ['agricultural'],
    categoryDisplayName: 'Agricultural',
    price: 420000,
    size: '50 × 100',
    titleStatus: 'Freehold',
    topography: 'Flat',
    soilType: 'Rich Loam',
    amenities: ['Water for Farming'],
    features: ['Agribusiness Ready', 'Fertile Soil'],
    images: [{ id: 'listing-karaba', hint: 'mwea plots' }],
    description: 'Fertile agricultural land in Karaba, Mwea, perfect for small-scale farming and agribusiness.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '420K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'ruiru-prime',
    name: 'Ruiru',
    location: 'ruiru',
    categories: ['residential', 'commercial'],
    categoryDisplayName: 'Prime Residential',
    price: 5250000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Full Infrastructure', 'Developed Area'],
    features: ['Near Bypass', 'Elite Neighborhood'],
    images: [{ id: 'listing-crystal', hint: 'ruiru land' }],
    description: 'Elite residential plots in Ruiru, offering the best of urban living with full infrastructure and security.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '5.25M' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'syokimau-viraj-gardens',
    name: 'Syokimau Viraj Gardens',
    location: 'ruiru',
    categories: ['residential', 'commercial'],
    categoryDisplayName: 'Prime Residential',
    price: 3200000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Paved Roads', 'Water & Electricity', 'Gated Community'],
    features: ['Near Mombasa Road & Expressway', 'Fast Developing Hub'],
    images: [{ id: 'listing-syokimau', hint: 'syokimau plots' }],
    description: 'Executive plots in Syokimau with immediate access to the Expressway and Jomo Kenyatta International Airport.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '3.2M' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'vintage-gardens-kiserian',
    name: 'Vintage Gardens Kiserian',
    location: 'kajiado',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 850000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Gentle Slope',
    soilType: 'Red Soil',
    amenities: ['Water & Power', 'All-weather Road Access'],
    features: ['Scenic Views of Ngong Hills', 'Peaceful Neighborhood'],
    images: [{ id: 'listing-kiserian', hint: 'kiserian plots' }],
    description: 'Picturesque plots in Kiserian surrounded by tranquil green landscapes with quick connection to Nairobi.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '850K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'goodhope-gardens-kitengela',
    name: 'Goodhope Gardens Kitengela',
    location: 'kitengela',
    categories: ['residential', 'investment'],
    categoryDisplayName: 'Residential & Investment',
    price: 680000,
    size: '50 × 100',
    titleStatus: 'Freehold',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Borehole Water', 'Perimeter Fence', 'Electricity'],
    features: ['Near Kitengela Town', 'Ready For Immediate Building'],
    images: [{ id: 'listing-goodhope', hint: 'kitengela goodhope' }],
    description: 'Prime plots located within minutes of Kitengela town center, ideal for residential homes and rental developments.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '680K' }, { name: 'Size', value: '50x100' }] }]
  },
  {
    id: 'empakasi-gardens-ph2',
    name: 'Empakasi Gardens Phase 2',
    location: 'kitengela',
    categories: ['residential'],
    categoryDisplayName: 'Residential',
    price: 750000,
    size: '50 × 100',
    titleStatus: 'Ready',
    topography: 'Flat',
    soilType: 'Red Soil',
    amenities: ['Graded Access Roads', 'Community Security', 'Power'],
    features: ['Controlled Development', 'High Capital Gains'],
    images: [{ id: 'listing-empakasi', hint: 'empakasi plots' }],
    description: 'Sought-after gated community plots in Empakasi offering guaranteed peace of mind and rapid property appreciation.',
    specs: [{ groupName: 'Details', specs: [{ name: 'Price', value: '750K' }, { name: 'Size', value: '50x100' }] }]
  }
];

export const getListings = (category?: ListingCategory | 'all'): LandListing[] => {
  if (!category || category === 'all') {
    return listings;
  }
  return listings.filter((l) => l.categories.includes(category));
};

export const getListingById = (id: string): LandListing | undefined => {
  return listings.find((l) => l.id === id);
};

export const getFeaturedListings = (count: number): LandListing[] => {
    return [...listings].sort(() => 0.5 - Math.random()).slice(0, count);
}