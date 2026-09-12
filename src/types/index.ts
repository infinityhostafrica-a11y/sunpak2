
export type ListingCategory =
  | 'residential'
  | 'commercial'
  | 'agricultural'
  | 'industrial'
  | 'investment';

export type ListingLocation =
  | 'kitengela'
  | 'isinya'
  | 'kisaju'
  | 'mwea'
  | 'juja'
  | 'ruiru'
  | 'konza'
  | 'nakuru'
  | 'kajiado'
  | 'kiserian'
  | 'syokimau'
  | 'mai-mahiu';

export type ListingSpec = {
  name: string;
  value: string;
};

export type ListingSpecGroup = {
  groupName: string;
  specs: ListingSpec[];
};

export type LandListing = {
  id: string;
  name: string;
  location: ListingLocation;
  categories: ListingCategory[];
  categoryDisplayName: string;
  price: number;
  size: string; // e.g. "1/8 Acre", "5 Acres"
  titleStatus: 'Ready' | 'In Process' | 'Freehold';
  topography: string;
  soilType: string;
  amenities: string[];
  features: string[];
  images: { id: string; hint: string; url?: string }[];
  description: string;
  specs: ListingSpecGroup[];
  createdAt?: string;
  updatedAt?: string;
};

export type VehicleCategory =
  | 'ev'
  | 'hybrid'
  | 'suv'
  | 'truck'
  | 'sedan'
  | 'ebike'
  | 'compact'
  | 'wagon';

export type VehicleBrand =
  | 'toyota'
  | 'honda'
  | 'bmw'
  | 'mazda'
  | 'ford'
  | 'axiom'
  | 'nomad'
  | 'titan'
  | 'pinnacle'
  | 'nissan';

export type VehicleSpec = {
  name: string;
  value: string;
};

export type VehicleSpecGroup = {
  groupName: string;
  specs: VehicleSpec[];
};

export type Vehicle = {
  id: string;
  name: string;
  brand: VehicleBrand;
  categories: VehicleCategory[];
  categoryDisplayName: string;
  price: number;
  year: number;
  mileage: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  features: string[];
  images: { id: string; hint: string; url?: string }[];
  specs: VehicleSpecGroup[];
};
