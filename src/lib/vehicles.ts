
import type { Vehicle, VehicleCategory, VehicleBrand, VehicleSpecGroup } from '@/types';
import {
  ToyotaLogo,
  HondaLogo,
  BmwLogo,
  MazdaLogo,
  FordLogo,
  AxiomLogo,
} from '@/components/icons/brand-logos';

export const CATEGORIES: {
  id: VehicleCategory;
  name: string;
  description: string;
}[] = [
  {
    id: 'ev',
    name: 'Electric',
    description: '100% electric, zero emissions.',
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    description: 'Efficient and eco-friendly.',
  },
  { id: 'suv', name: 'SUV', description: 'Spacious and versatile.' },
  { id: 'truck', name: 'Trucks', description: 'Powerful and rugged.' },
  { id: 'sedan', name: 'Sedan', description: 'Stylish and comfortable.' },
  { id: 'ebike', name: 'E-Bikes', description: 'Fun and agile urban transport.' },
  { id: 'compact', name: 'Compact', description: 'Small, efficient city cars.'},
  { id: 'wagon', name: 'Wagon', description: 'Practical with ample cargo.'}
];

export const BRANDS: {
  id: VehicleBrand;
  name: string;
  logo: React.ElementType;
}[] = [
  { id: 'toyota', name: 'Toyota', logo: ToyotaLogo },
  { id: 'honda', name: 'Honda', logo: HondaLogo },
  { id: 'bmw', name: 'BMW', logo: BmwLogo },
  { id: 'mazda', name: 'Mazda', logo: MazdaLogo },
  { id: 'ford', name: 'Ford', logo: FordLogo },
  { id: 'axiom', name: 'Axiom', logo: AxiomLogo },
  { id: 'nomad', name: 'Nomad', logo: AxiomLogo },
  { id: 'titan', name: 'Titan', logo: AxiomLogo },
  { id: 'pinnacle', name: 'Pinnacle', logo: AxiomLogo },
  { id: 'nissan', name: 'Nissan', logo: AxiomLogo },
];


export const getVehicleCategoryDetails = (categoryId: VehicleCategory | 'all') => {
  const categoryImageMap: Record<VehicleCategory, string> = {
    ev: 'category-ev',
    hybrid: 'category-hybrid',
    suv: 'category-suv',
    truck: 'category-truck',
    sedan: 'category-sedan',
    ebike: 'category-ebike',
    compact: 'yaris-1',
    wagon: 'suv-1-1'
  };

  if (categoryId === 'all') {
    return {
        name: 'All Vehicles',
        imageId: 'hero-1'
    }
  }

  const category = CATEGORIES.find(c => c.id === categoryId);
  return {
    name: category?.name ?? 'Unknown Category',
    imageId: categoryImageMap[categoryId],
  };
};

const vehicles: Vehicle[] = [
  {
    id: 'toyota-yaris-2020',
    name: 'Toyota Yaris',
    brand: 'toyota',
    categories: ['hybrid', 'compact'],
    categoryDisplayName: 'Hybrid',
    price: 1590000,
    year: 2020,
    mileage: 12000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'White',
    interiorColor: 'Black Fabric',
    description: 'The 2020 Toyota Yaris Hybrid is a reliable, efficient, and stylish hatchback, perfect for city driving. It offers excellent fuel economy and a comfortable, practical interior.',
    features: [
      'Hybrid Synergy Drive',
      'Excellent fuel economy',
      'Reliable Toyota build quality',
      'Modern exterior styling',
      'Practical interior',
    ],
    images: [
      { id: 'yaris-1', hint: 'silver hatchback' },
      { id: 'yaris-2', hint: 'silver hatchback side' },
      { id: 'yaris-3', hint: 'silver hatchback back' },
      { id: 'yaris-4', hint: 'car interior' },
    ],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '116 hp' },
          { name: 'Fuel Economy', value: '30.8 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '286 Liters' },
          { name: 'Weight', value: '1,134 kg' },
        ]
      }
    ],
  },
  {
    id: 'toyota-corolla-2021',
    name: 'Toyota Corolla',
    brand: 'toyota',
    categories: ['sedan', 'hybrid'],
    categoryDisplayName: 'Sedan',
    price: 2100000,
    year: 2021,
    mileage: 18000,
    engine: '1.8L Hybrid',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Classic Silver Metallic',
    interiorColor: 'Black SofTex',
    description: 'A global bestseller, the Toyota Corolla is renowned for its reliability, fuel efficiency, and safety. This 2021 model offers a comfortable ride and modern tech features, making it a smart choice for any driver.',
    features: [
      'Toyota Safety Sense 2.0',
      '8-inch Touchscreen Display',
      'Apple CarPlay & Android Auto',
      'Automatic Climate Control',
      'LED Headlights'
    ],
    images: [
      { "id": "corolla-1", "hint": "white sedan" },
      { "id": "corolla-2", "hint": "white sedan side" },
      { "id": "corolla-3", "hint": "sedan dashboard" }
    ],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { "name": "Engine", "value": "1.8L Hybrid" },
          { "name": "Horsepower", "value": "121 hp" },
          { "name": "Fuel Economy", "value": "22.5 Km/L" },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { "name": "Seating", "value": "5 passengers" },
          { "name": "Trunk Volume", "value": "371 Liters" }
        ]
      }
    ]
  },
  {
    id: 'toyota-corolla-fielder-2018',
    name: 'Toyota Corolla Fielder',
    brand: 'toyota',
    categories: ['hybrid', 'wagon'],
    categoryDisplayName: 'Hybrid',
    price: 1980000,
    year: 2018,
    mileage: 55000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'The Toyota Corolla Fielder is a practical and fuel-efficient station wagon, offering the reliability of a Corolla with the extra cargo space of a wagon. This hybrid version provides excellent mileage.',
    features: ['Spacious cargo area', 'Toyota Safety Sense P', 'Fold-flat rear seats', 'Automatic climate control', 'Smart entry & start system'],
    images: [{ id: 'corolla-fielder-1', hint: 'silver wagon' }],
    specs: [
      {
        groupName: 'Engine',
        specs: [
          { name: 'Model', value: '1NZ-FXE' },
          { name: 'Type', value: 'Inline-4 DOHC + Motor' },
          { name: 'Displacement', value: '1496cc' },
          { name: 'Bore x Stroke', value: '75.0 x 84.7 mm' },
          { name: 'Max Power', value: '74ps / 4800rpm' },
          { name: 'Max Torque', value: '11.3kg-m / 3600-4400rpm' },
          { name: 'Fuel System', value: 'EFI' },
          { name: 'Fuel', value: 'Unleaded regular gasoline' },
          { name: 'Fuel Tank', value: '36 Liters' },
          { name: 'Fuel Economy', value: '34.4 Km/L' },
        ],
      },
      {
        groupName: 'Dimensions',
        specs: [
          { name: 'Body', value: '4400 x 1695 x 1475 mm' },
          { name: 'Interior', value: '1945 x 1430 x 1200 mm' },
          { name: 'Wheelbase', value: '2600mm' },
          { name: 'Tread (Front/Rear)', value: '1480mm / 1475mm' },
          { name: 'Ground Clearance', value: '155mm' },
          { name: 'Curb Weight', value: '1140 kg' },
          { name: 'Seating', value: '5 passengers' },
        ],
      },
      {
        groupName: 'Steering & Suspension',
        specs: [
          { name: 'Steering', value: 'Power-assisted rack-and-pinion' },
          { name: 'Front Suspension', value: 'MacPherson strut with coil spring' },
          { name: 'Rear Suspension', value: 'Torsion beam with coil spring' },
          { name: 'Front Brakes', value: 'Ventilated discs' },
          { name: 'Rear Brakes', value: 'Drum' },
          { name: 'Minimum Turning Radius', value: '4.9m' },
        ],
      },
      {
        groupName: 'Transmission',
        specs: [
          { name: 'Type', value: 'e-CVT (Electronically-controlled CVT)' },
          { name: 'Drive System', value: 'FWD' },
        ],
      },
    ],
  },
  {
    id: 'honda-shuttle-2019',
    name: 'Honda Shuttle',
    brand: 'honda',
    categories: ['hybrid', 'wagon'],
    categoryDisplayName: 'Hybrid',
    price: 1950000,
    year: 2019,
    mileage: 32000,
    engine: '1.5L 4-cylinder Hybrid',
    transmission: '7-speed DCT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'The Honda Shuttle Hybrid is a spacious and incredibly efficient station wagon. Based on the Fit platform, it offers huge cargo capacity and a comfortable ride, perfect for families or businesses.',
    features: ['Large cargo area', 'Advanced safety features', 'Keyless entry', 'Automatic air conditioning', 'Rearview camera'],
    images: [{ id: 'honda-shuttle-1', hint: 'grey minivan' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '135 hp' },
          { name: 'Fuel Economy', value: '25 Km/L' },
          { name: 'Transmission', value: '7-Speed DCT'},
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '570 Liters' },
        ]
      }
    ]
  },
  {
    id: 'honda-vezel-2017',
    name: 'Honda Vezel',
    brand: 'honda',
    categories: ['hybrid', 'suv'],
    categoryDisplayName: 'Hybrid',
    price: 2200000,
    year: 2017,
    mileage: 48000,
    engine: '1.5L Hybrid',
    transmission: '7-speed DCT',
    drivetrain: 'AWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Black',
    interiorColor: 'Black Leatherette',
    description: 'The Honda Vezel is a stylish and versatile compact SUV with a sporty feel. Its hybrid powertrain delivers a great balance of performance and fuel efficiency, and this model includes all-wheel drive for added capability.',
    features: ['Sport Hybrid i-DCD system', 'Paddle shifters', 'LED headlights', 'City-Brake Active System', '17-inch alloy wheels'],
    images: [{ id: 'honda-vezel-1', hint: 'black suv' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '130 hp' },
          { name: 'Fuel Economy', value: '21.6 Km/L' },
          { name: 'Drivetrain', value: 'AWD'},
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '404 Liters' },
        ]
      }
    ]
  },
  {
    id: 'toyota-prius-2018',
    name: 'Toyota Prius',
    brand: 'toyota',
    categories: ['hybrid', 'sedan'],
    categoryDisplayName: 'Hybrid',
    price: 2350000,
    year: 2018,
    mileage: 42000,
    engine: '1.8L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'White',
    interiorColor: 'Gray Fabric',
    description: 'The iconic Toyota Prius is the standard-bearer for hybrid technology. This 2018 model features a futuristic design, outstanding fuel economy, and a comfortable, tech-forward interior.',
    features: ['Hybrid Synergy Drive', 'Toyota Safety Sense P', 'Qi-compatible wireless charging', 'Heads-up display', 'Push Button Start'],
    images: [{ id: 'toyota-prius-1', hint: 'white prius' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.8L Hybrid' },
          { name: 'Total Horsepower', value: '121 hp' },
          { name: 'Fuel Economy', value: '23.4 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '697 Liters' },
          { name: 'Curb Weight', value: '1,370 kg'}
        ]
      }
    ]
  },
  {
    id: 'toyota-aqua-2018',
    name: 'Toyota Aqua',
    brand: 'toyota',
    categories: ['hybrid', 'compact'],
    categoryDisplayName: 'Hybrid',
    price: 1450000,
    year: 2018,
    mileage: 52000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Black',
    interiorColor: 'Black Fabric',
    description: 'Also known as the Prius c, the Toyota Aqua is a compact and affordable hybrid that delivers exceptional fuel economy. It\'s perfect for navigating busy city streets while saving on fuel costs.',
    features: ['Toyota Safety Sense C', 'Compact and easy to maneuver', 'Excellent fuel efficiency', 'Push-button start', 'Eco-drive mode'],
    images: [{ id: 'toyota-aqua-1', hint: 'black hatchback' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '99 hp' },
          { name: 'Fuel Economy', value: '34.4 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '260 Liters' },
          { name: 'Turning Radius', value: '4.8m'}
        ]
      }
    ]
  },
  {
    id: 'toyota-corolla-fielder-2019',
    name: 'Toyota Corolla Fielder',
    brand: 'toyota',
    categories: ['hybrid', 'wagon'],
    categoryDisplayName: 'Hybrid',
    price: 2050000,
    year: 2019,
    mileage: 48000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'A newer model of the practical and fuel-efficient station wagon. The 2019 Corolla Fielder Hybrid combines reliability with ample cargo space and modern safety features.',
    features: ['Spacious cargo area', 'Toyota Safety Sense P', 'Fold-flat rear seats', 'Automatic climate control', 'Smart entry & start system'],
    images: [{ id: 'corolla-fielder-1', hint: 'silver wagon' }],
    specs: [
      {
        groupName: 'Engine',
        specs: [
          { name: 'Model', value: '1NZ-FXE' },
          { name: 'Type', value: 'Inline-4 DOHC + Motor' },
          { name: 'Displacement', value: '1496cc' },
          { name: 'Bore x Stroke', value: '75.0 x 84.7 mm' },
          { name: 'Max Power', value: '74ps / 4800rpm' },
          { name: 'Max Torque', value: '11.3kg-m / 3600-4400rpm' },
          { name: 'Fuel System', value: 'EFI' },
          { name: 'Fuel', value: 'Unleaded regular gasoline' },
          { name: 'Fuel Tank', value: '36 Liters' },
          { name: 'Fuel Economy', value: '34.4 Km/L' },
        ],
      },
      {
        groupName: 'Dimensions',
        specs: [
          { name: 'Body', value: '4400 x 1695 x 1475 mm' },
          { name: 'Interior', value: '1945 x 1430 x 1200 mm' },
          { name: 'Wheelbase', value: '2600mm' },
          { name: 'Tread (Front/Rear)', value: '1480mm / 1475mm' },
          { name: 'Ground Clearance', value: '155mm' },
          { name: 'Curb Weight', value: '1140 kg' },
          { name: 'Seating', value: '5 passengers' },
        ],
      },
      {
        groupName: 'Steering & Suspension',
        specs: [
          { name: 'Steering', value: 'Power-assisted rack-and-pinion' },
          { name: 'Front Suspension', value: 'MacPherson strut with coil spring' },
          { name: 'Rear Suspension', value: 'Torsion beam with coil spring' },
          { name: 'Front Brakes', value: 'Ventilated discs' },
          { name: 'Rear Brakes', value: 'Drum' },
          { name: 'Minimum Turning Radius', value: '4.9m' },
        ],
      },
      {
        groupName: 'Transmission',
        specs: [
          { name: 'Type', value: 'e-CVT (Electronically-controlled CVT)' },
          { name: 'Drive System', value: 'FWD' },
        ],
      },
    ],
  },
  {
    id: 'toyota-axio-2019',
    name: 'Toyota Corolla Axio',
    brand: 'toyota',
    categories: ['hybrid', 'sedan'],
    categoryDisplayName: 'Hybrid',
    price: 1850000,
    year: 2019,
    mileage: 35000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Beige Fabric',
    description: 'The 2019 Corolla Axio Hybrid continues its legacy of being a compact, ultra-reliable sedan with top-tier fuel efficiency. A smart, economical choice for any driver.',
    features: ['Toyota Safety Sense', 'Automatic Emergency Braking', 'Lane Departure Alert', 'Automatic High Beams', 'Eco-Drive Mode'],
    images: [{ id: 'toyota-axio-1', hint: 'white sedan' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '100 hp' },
          { name: 'Fuel Economy', value: '33.8 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Trunk Volume', value: '461 Liters' }
        ]
      }
    ]
  },
  {
    id: 'toyota-corolla-sports-2018',
    name: 'Toyota Corolla Sports',
    brand: 'toyota',
    categories: ['compact', 'wagon'],
    categoryDisplayName: 'Compact',
    price: 2400000,
    year: 2018,
    mileage: 62000,
    engine: '1.2L Turbo',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Black',
    interiorColor: 'Black Sport Fabric',
    description: 'The Toyota Corolla Sports brings a dynamic and aggressive design to the reliable Corolla platform. This 2018 hatchback offers a spirited driving experience with a turbocharged engine and sporty handling.',
    features: ['Sport-tuned suspension', '18-inch alloy wheels', 'Toyota Safety Sense', 'Bi-Beam LED headlamps', 'Sport bucket seats'],
    images: [{ id: 'corolla-sports-1', hint: 'black hatchback' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.2L Turbo 4-Cylinder' },
          { name: 'Horsepower', value: '114 hp' },
          { name: 'Torque', value: '185 Nm' },
          { name: 'Fuel Economy', value: '16.4 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '352 Liters' }
        ]
      }
    ]
  },
  {
    id: 'nissan-march-2018',
    name: 'Nissan March',
    brand: 'nissan',
    categories: ['compact'],
    categoryDisplayName: 'Compact',
    price: 950000,
    year: 2018,
    mileage: 41000,
    engine: '1.2L 3-cylinder',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Silver',
    interiorColor: 'Gray Fabric',
    description: 'The Nissan March is a quintessential city car, known for its tight turning radius, ease of parking, and excellent fuel efficiency. A practical and affordable choice for urban mobility.',
    features: ['Compact and agile', 'Excellent fuel economy', 'Power windows and mirrors', 'Air conditioning', 'ABS brakes'],
    images: [{ id: 'nissan-march-1', hint: 'silver compact' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.2L 3-Cylinder' },
          { name: 'Horsepower', value: '79 hp' },
          { name: 'Fuel Economy', value: '21.0 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '265 Liters' },
          { name: 'Turning Radius', value: '4.5m'}
        ]
      }
    ]
  },
  {
    id: 'toyota-passo-2019',
    name: 'Toyota Passo',
    brand: 'toyota',
    categories: ['compact'],
    categoryDisplayName: 'Compact',
    price: 1100000,
    year: 2019,
    mileage: 34000,
    engine: '1.0L 3-cylinder',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Beige',
    interiorColor: 'Brown Fabric',
    description: 'The Toyota Passo is a smart and stylish compact car that maximizes interior space. It\'s incredibly fuel-efficient and easy to drive, making it a popular choice for city dwellers in Kenya.',
    features: ['Spacious interior for its class', 'Toyota Safety Sense', 'Keyless entry and push-start', 'Idling stop function', 'Excellent visibility'],
    images: [{ id: 'toyota-passo-1', hint: 'beige compact' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.0L 3-Cylinder' },
          { name: 'Horsepower', value: '68 hp' },
          { name: 'Fuel Economy', value: '28.0 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '205 Liters' },
          { name: 'Weight', value: '910 kg'}
        ]
      }
    ]
  },
  {
    id: 'honda-fit-2020',
    name: 'Honda Fit',
    brand: 'honda',
    categories: ['hybrid', 'compact'],
    categoryDisplayName: 'Hybrid',
    price: 1850000,
    year: 2020,
    mileage: 25000,
    engine: '1.5L 4-cylinder Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'The 2020 Honda Fit Hybrid offers exceptional fuel economy in a versatile and surprisingly spacious compact package. Its clever "Magic Seat" system provides unrivaled cargo flexibility.',
    features: ['Honda SENSING safety suite', '7-inch Touchscreen', 'Magic Seat system', 'LED Headlights', 'Push-button start'],
    images: [{ id: 'honda-fit-1', hint: 'silver compact' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '107 hp' },
          { name: 'Fuel Economy', value: '29.4 Km/L' },
          { name: 'Transmission', value: 'e-CVT'}
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '379 Liters (seats up)' },
        ]
      }
    ]
  },
  {
    id: 'nissan-note-2018',
    name: 'Nissan Note e-Power',
    brand: 'nissan',
    categories: ['hybrid', 'compact'],
    categoryDisplayName: 'Hybrid',
    price: 1480000,
    year: 2018,
    mileage: 38000,
    engine: '1.2L 3-cylinder (Generator)',
    transmission: 'Single Speed',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'The Nissan Note e-Power offers a unique driving experience where the gasoline engine only charges the battery, and an electric motor drives the wheels. This results in instant acceleration and excellent fuel economy.',
    features: ['e-Power series hybrid system', 'One-Pedal driving mode', '360-degree Around View Monitor', 'Intelligent Emergency Braking', 'Compact and easy to park'],
    images: [{ id: 'nissan-note-1', hint: 'silver hatchback' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Motor', value: 'EM57 Electric Motor' },
          { name: 'Horsepower', value: '109 hp' },
          { name: 'Torque', value: '254 Nm' },
          { name: 'Fuel Economy', value: '34 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '330 Liters' }
        ]
      }
    ]
  },
  {
    id: 'mazda-cx-3-2018',
    name: 'Mazda CX-3',
    brand: 'mazda',
    categories: ['suv'],
    categoryDisplayName: 'SUV',
    price: 2350000,
    year: 2018,
    mileage: 45000,
    engine: '2.0L 4-Cylinder',
    transmission: '6-Speed Automatic',
    drivetrain: 'AWD',
    fuelType: 'Gasoline',
    exteriorColor: 'White',
    interiorColor: 'Black Leatherette',
    description: 'The Mazda CX-3 is a subcompact SUV that offers a sporty driving experience, premium interior, and stylish design. This 2018 model comes with all-wheel drive for enhanced traction and handling.',
    features: ['KODO design language', 'G-Vectoring Control', '7-inch touchscreen display', 'Advanced safety features', 'LED headlights'],
    images: [{ id: 'mazda-cx-3', hint: 'white suv' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '2.0L 4-Cylinder' },
          { name: 'Horsepower', value: '148 hp' },
          { name: 'Fuel Economy', value: '12.3 Km/L' },
          { name: 'Drivetrain', value: 'AWD'}
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '350 Liters' },
        ]
      }
    ]
  },
  {
    id: 'mazda-cx-5-2019',
    name: 'Mazda CX-5',
    brand: 'mazda',
    categories: ['suv'],
    categoryDisplayName: 'SUV',
    price: 3200000,
    year: 2019,
    mileage: 39000,
    engine: '2.5L 4-Cylinder',
    transmission: '6-Speed Automatic',
    drivetrain: 'AWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Deep Crystal Blue',
    interiorColor: 'Black Leather',
    description: 'The Mazda CX-5 stands out in the compact SUV class with its elegant styling, upscale interior, and engaging driving dynamics. This 2019 model is well-equipped with premium features and all-wheel drive.',
    features: ['Signature KODO Design', 'Premium Nappa leather seats', 'Bose 10-speaker audio system', '360° View Monitor', 'i-ACTIVSENSE safety technology'],
    images: [{ id: 'mazda-cx-5', hint: 'blue suv' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '2.5L 4-Cylinder' },
          { name: 'Horsepower', value: '187 hp' },
          { name: 'Torque', value: '252 Nm' },
          { name: 'Fuel Economy', value: '10.6 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '875 Liters' }
        ]
      }
    ]
  },
  {
    id: 'toyota-corolla-axio-2020',
    name: 'Toyota Corolla Axio',
    brand: 'toyota',
    categories: ['sedan', 'hybrid'],
    categoryDisplayName: 'Hybrid',
    price: 2050000,
    year: 2020,
    mileage: 22000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: '4WD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'This 2020 Corolla Axio offers the perfect blend of modern features, exceptional fuel economy, and the added security of 4WD. A compact and reliable sedan for all conditions.',
    features: ['Toyota Safety Sense', '4WD System', 'Eco-Drive Mode', 'Smart Key System', 'Automatic Climate Control'],
    images: [{ id: 'corolla-axio-2020-1', hint: 'silver sedan' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Horsepower', value: '100 hp' },
          { name: 'Fuel Economy', value: '27.8 Km/L' },
          { name: 'Drivetrain', value: '4WD'}
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Trunk Volume', value: '461 Liters' },
        ]
      }
    ]
  },
  {
    id: 'toyota-corolla-axio-2018',
    name: 'Toyota Corolla Axio',
    brand: 'toyota',
    categories: ['sedan', 'hybrid'],
    categoryDisplayName: 'Hybrid',
    price: 1780000,
    year: 2018,
    mileage: 61000,
    engine: '1.5L Hybrid',
    transmission: 'e-CVT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'White',
    interiorColor: 'Beige Fabric',
    description: 'A well-maintained 2018 Toyota Corolla Axio with very low mileage. Renowned for its fuel efficiency and reliability, this hybrid sedan is an excellent choice for a practical daily driver.',
    features: ['Low Mileage', 'Hybrid Synergy Drive', 'Toyota Safety Sense', 'Excellent Fuel Economy', 'Smart Entry'],
    images: [{ id: 'corolla-axio-2018-1', hint: 'white sedan hybrid' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Horsepower', value: '100 hp' },
          { name: 'Fuel Economy', value: '33.8 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Trunk Volume', value: '461 Liters' }
        ]
      }
    ]
  },
  {
    id: 'nissan-nv150ad-2018',
    name: 'Nissan NV150AD',
    brand: 'nissan',
    categories: ['wagon'],
    categoryDisplayName: 'Wagon',
    price: 1350000,
    year: 2018,
    mileage: 78000,
    engine: '1.5L 4-Cylinder',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    exteriorColor: 'White',
    interiorColor: 'Gray Vinyl',
    description: 'The Nissan NV150AD is a durable and practical commercial wagon, perfect for business use. It offers a large, versatile cargo area and a reliable, fuel-efficient engine.',
    features: ['Large cargo capacity', 'Durable interior', 'Air Conditioning', 'Power Steering', 'ABS'],
    images: [{ id: 'nissan-nv150ad-1', hint: 'white van' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L 4-Cylinder' },
          { name: 'Horsepower', value: '109 hp' },
          { name: 'Fuel Economy', value: '17.2 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '2 passengers' },
          { name: 'Payload', value: '450 kg' }
        ]
      }
    ]
  },
  {
    id: 'honda-shuttle-2017',
    name: 'Honda Shuttle',
    brand: 'honda',
    categories: ['hybrid', 'wagon'],
    categoryDisplayName: 'Hybrid',
    price: 1800000,
    year: 2017,
    mileage: 65000,
    engine: '1.5L 4-cylinder Hybrid',
    transmission: '7-speed DCT',
    drivetrain: 'FWD',
    fuelType: 'Hybrid',
    exteriorColor: 'Silver',
    interiorColor: 'Black Fabric',
    description: 'The Honda Shuttle Hybrid is a spacious and incredibly efficient station wagon. Based on the Fit platform, it offers huge cargo capacity and a comfortable ride, perfect for families or businesses.',
    features: ['Large cargo area', 'Advanced safety features', 'Keyless entry', 'Automatic air conditioning', 'Rearview camera'],
    images: [{ id: 'honda-shuttle-1', hint: 'grey minivan' }],
    specs: [
      {
        groupName: 'Engine & Performance',
        specs: [
          { name: 'Engine', value: '1.5L Hybrid' },
          { name: 'Total Horsepower', value: '135 hp' },
          { name: 'Fuel Economy', value: '25 Km/L' },
        ]
      },
      {
        groupName: 'Dimensions & Capacity',
        specs: [
          { name: 'Seating', value: '5 passengers' },
          { name: 'Cargo Space', value: '570 Liters' },
          { name: 'Weight', value: '1210 kg'}
        ]
      }
    ]
  }
];

export const getVehicles = (category?: VehicleCategory | 'all'): Vehicle[] => {
  if (!category || category === 'all') {
    return vehicles;
  }
  return vehicles.filter((v) => v.categories.includes(category));
};

export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find((v) => v.id === id);
};

export const getFeaturedVehicles = (count: number): Vehicle[] => {
    return [...vehicles].sort(() => 0.5 - Math.random()).slice(0, count);
}

    
