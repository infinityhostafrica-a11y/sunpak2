
'use client';
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import VehicleCard from '@/components/vehicle-card';
import {
  getVehicleCategoryDetails,
  getVehicles,
  CATEGORIES,
  BRANDS,
} from '@/lib/vehicles';
import type { Vehicle, VehicleCategory, VehicleBrand } from '@/types';
import { notFound } from 'next/navigation';
import { AnimatedSection } from '@/components/animated-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Car, Globe, Zap, Leaf, Truck, Bike } from 'lucide-react';

const vehicleCategoryIcons: Record<VehicleCategory, React.ElementType> = {
  ev: Zap,
  hybrid: Leaf,
  suv: Car,
  truck: Truck,
  sedan: Car,
  ebike: Bike,
  compact: Car,
  wagon: Car,
};

type CategoryPageProps = {
  params: Promise<{
    category: VehicleCategory | 'all';
  }>;
};

function Filters({
  onFilterChange,
  initialCategory,
}: {
  onFilterChange: (filters: {
    brand: VehicleBrand | 'all';
    category: VehicleCategory | 'all';
  }) => void;
  initialCategory: VehicleCategory | 'all';
}) {
  const [selectedBrand, setSelectedBrand] = useState<VehicleBrand | 'all'>(
    'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<
    VehicleCategory | 'all'
  >(initialCategory);

  const handleBrandSelect = (brand: VehicleBrand | 'all') => {
    const newBrand = brand;
    setSelectedBrand(newBrand);
    onFilterChange({ brand: newBrand, category: selectedCategory });
  };

  const handleCategorySelect = (category: VehicleCategory | 'all') => {
    const newCategory = category;
    setSelectedCategory(newCategory);
    onFilterChange({ brand: selectedBrand, category: newCategory });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-center font-headline text-2xl font-bold">
          Filter by Brand
        </h3>
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="mx-auto w-full max-w-4xl"
        >
          <CarouselContent>
            <CarouselItem className="basis-1/4 md:basis-1/6 lg:basis-1/8">
                  <Button
                    variant="outline"
                    className={cn(
                      'flex h-20 w-full flex-col items-center justify-center gap-2 border-2',
                      selectedBrand === 'all' &&
                        'border-primary bg-primary/10'
                    )}
                    onClick={() => handleBrandSelect('all')}
                  >
                    <Globe className="h-8 w-8" />
                    <span className="text-xs">All Brands</span>
                  </Button>
            </CarouselItem>
            {BRANDS.map((brand) => {
              const Icon = brand.logo;
              return (
                <CarouselItem key={brand.id} className="basis-1/4 md:basis-1/6 lg:basis-1/8">
                  <Button
                    variant="outline"
                    className={cn(
                      'flex h-20 w-full flex-col items-center justify-center gap-2 border-2',
                      selectedBrand === brand.id &&
                        'border-primary bg-primary/10'
                    )}
                    onClick={() => handleBrandSelect(brand.id)}
                  >
                    <Icon className="h-8 w-8" />
                    <span className="text-xs">{brand.name}</span>
                  </Button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
      <div>
        <h3 className="mb-4 text-center font-headline text-2xl font-bold">
          Filter by Type
        </h3>
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent>
             <CarouselItem
                  className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <Button
                    variant="outline"
                    className={cn(
                      'flex h-24 w-full flex-col items-center justify-center gap-2 border-2',
                      selectedCategory === 'all' &&
                        'border-primary bg-primary/10'
                    )}
                    onClick={() => handleCategorySelect('all')}
                  >
                    <Globe className="h-8 w-8 text-primary" />
                    <span className="text-sm">All Types</span>
                  </Button>
                </CarouselItem>
            {CATEGORIES.map((category) => {
              const Icon = vehicleCategoryIcons[category.id] || Car;
              return (
                <CarouselItem
                  key={category.id}
                  className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <Button
                    variant="outline"
                    className={cn(
                      'flex h-24 w-full flex-col items-center justify-center gap-2 border-2',
                      selectedCategory === category.id &&
                        'border-primary bg-primary/10'
                    )}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-sm">{category.name}</span>
                  </Button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}

export default function CategoryPage({ params: paramsProp }: CategoryPageProps) {
  const params = React.use(paramsProp);
  const initialCategory = params.category;
  const allVehicles = getVehicles('all');

  const [filteredVehicles, setFilteredVehicles] = useState(() => {
    if (initialCategory === 'all') return allVehicles;
    return allVehicles.filter(v => v.categories.includes(initialCategory as VehicleCategory));
  });
  
  const [activeFilters, setActiveFilters] = useState({ brand: 'all', category: initialCategory });

  if (!allVehicles.length) {
    notFound();
  }
  
  const categoryDetails = getVehicleCategoryDetails(activeFilters.category);
  const brandDetails = BRANDS.find(b => b.id === activeFilters.brand);

  let title = "Vehicles";
  if (activeFilters.brand !== 'all' && activeFilters.category !== 'all') {
    title = `${brandDetails?.name} ${categoryDetails.name}`;
  } else if (activeFilters.brand !== 'all') {
    title = `${brandDetails?.name} Vehicles`;
  } else if (activeFilters.category !== 'all') {
    title = categoryDetails.name;
  } else {
    title = 'All Vehicles';
  }


  const handleFilterChange = (filters: {
    brand: VehicleBrand | 'all';
    category: VehicleCategory | 'all';
  }) => {
    setActiveFilters(filters);
    let vehicles = allVehicles;
    if (filters.category !== 'all') {
      const cat = filters.category as VehicleCategory;
      vehicles = vehicles.filter((v) => v.categories.includes(cat));
    }
    if (filters.brand !== 'all') {
      vehicles = vehicles.filter((v) => v.brand === filters.brand);
    }
    setFilteredVehicles(vehicles);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection>
        <h1 className="mb-8 text-center font-headline text-4xl font-bold">
          {title}
        </h1>
        <Filters onFilterChange={handleFilterChange} initialCategory={initialCategory} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mt-16">
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16">
                <p className="text-2xl font-semibold text-muted-foreground">No vehicles match your criteria.</p>
                <p className="mt-2 text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
