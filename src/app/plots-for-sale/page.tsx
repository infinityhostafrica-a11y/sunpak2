'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import ListingCard from '@/components/listing-card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import {
  getListings,
  CATEGORIES,
  LOCATIONS,
} from '@/lib/listings';
import type { LandListing, ListingCategory, ListingLocation } from '@/types';
import { AnimatedSection } from '@/components/animated-section';
import { Button } from '@/components/ui/button';
import { categoryIcons } from '@/lib/category-icons';
import { Map, Globe, MapPin, Filter, X, Loader2, Wallet, Zap, Droplets, Shield, Landmark } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const AMENITY_OPTIONS = [
  { id: 'water', label: 'Water Connection', icon: Droplets },
  { id: 'electricity', label: 'Electricity Ready', icon: Zap },
  { id: 'fenced', label: 'Perimeter Fence', icon: Shield },
  { id: 'road', label: 'Graded Roads', icon: Landmark },
];

function ListingsContent() {
  const db = useFirestore();
  const searchParams = useSearchParams();
  const locationParam = searchParams.get('location');
  
  const listingsQuery = useMemoFirebase(() => query(collection(db, 'vehicles'), orderBy('createdAt', 'desc')), [db]);
  const { data: dbListings, isLoading: dbLoading } = useCollection<LandListing>(listingsQuery);
  
  const [activeFilters, setActiveFilters] = useState({ 
    location: 'all' as ListingLocation | 'all', 
    category: 'all' as ListingCategory | 'all',
    maxPrice: 10000000,
    amenities: [] as string[],
    titleStatus: 'all' as string,
  });
  
  const [filteredListings, setFilteredListings] = useState<LandListing[]>([]);

  // Initialize filters from URL
  useEffect(() => {
    if (locationParam) {
      setActiveFilters(prev => ({ ...prev, location: locationParam as any }));
    }
  }, [locationParam]);

  useEffect(() => {
    const staticList = getListings('all');
    const dbList = dbListings || [];
    const dbIds = new Set(dbList.map(l => l.id));
    const combined = [...dbList, ...staticList.filter(l => !dbIds.has(l.id))];

    let items = combined;
    if (activeFilters.category !== 'all') {
      items = items.filter((v) => v.categories.includes(activeFilters.category as ListingCategory));
    }
    if (activeFilters.location !== 'all') {
      items = items.filter((v) => v.location === activeFilters.location);
    }
    if (activeFilters.maxPrice < 10000000) {
      items = items.filter(v => v.price <= activeFilters.maxPrice);
    }
    if (activeFilters.titleStatus !== 'all') {
      items = items.filter(v => v.titleStatus === activeFilters.titleStatus);
    }
    if (activeFilters.amenities.length > 0) {
      items = items.filter(v => 
        activeFilters.amenities.every(amenity => 
          v.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase())) ||
          v.features.some(f => f.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    setFilteredListings(items);
  }, [activeFilters, dbListings]);

  const toggleCategory = (catId: ListingCategory | 'all') => {
    setActiveFilters(prev => ({ ...prev, category: catId }));
  };

  const toggleLocation = (locId: ListingLocation | 'all') => {
    setActiveFilters(prev => ({ ...prev, location: locId }));
  };

  const toggleAmenity = (amenityId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const resetFilters = () => {
    setActiveFilters({ 
      location: 'all', 
      category: 'all',
      maxPrice: 10000000,
      amenities: [],
      titleStatus: 'all'
    });
  };

  const locationDetails = LOCATIONS.find(l => l.id === activeFilters.location);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary py-16 text-primary-foreground lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground font-black uppercase text-[10px] tracking-widest px-3 py-1">
              Verified Properties
            </Badge>
            <h1 className="font-headline text-4xl font-black lg:text-7xl uppercase tracking-tight leading-none">
              {activeFilters.location !== 'all' ? `${locationDetails?.name} Projects` : 'Our Land Projects'}
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 font-medium leading-relaxed max-w-2xl">
              Explore our diverse portfolio of verified plots across Kenya's highest-growth regions. From prime residential hubs to strategic investment areas.
            </p>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b bg-background/95 py-4 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="default" className="gap-2 font-black uppercase text-xs tracking-widest h-12 bg-zinc-900 hover:bg-zinc-800 shadow-xl px-6">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                    { (activeFilters.maxPrice < 10000000 || activeFilters.amenities.length > 0 || activeFilters.titleStatus !== 'all') && (
                      <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-black">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[340px] sm:w-[400px] overflow-y-auto px-0">
                  <SheetHeader className="px-6 pb-4">
                    <SheetTitle className="font-headline uppercase font-black text-2xl tracking-tighter">Refine Search</SheetTitle>
                  </SheetHeader>
                  <div className="px-6 space-y-8 pb-20">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="font-black uppercase text-[11px] tracking-widest text-muted-foreground flex items-center gap-2">
                           <Wallet className="h-3 w-3" /> Max Price
                         </h3>
                         <span className="text-primary font-black text-xs">
                           Kes. {activeFilters.maxPrice >= 10000000 ? 'Any' : activeFilters.maxPrice.toLocaleString()}
                         </span>
                      </div>
                      <Slider 
                        value={[activeFilters.maxPrice]} 
                        onValueChange={(val) => setActiveFilters(prev => ({ ...prev, maxPrice: val[0] }))}
                        min={100000}
                        max={10000000}
                        step={50000}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-black uppercase text-[11px] tracking-widest text-muted-foreground">Location</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={activeFilters.location === 'all' ? 'secondary' : 'outline'} 
                          size="sm"
                          onClick={() => toggleLocation('all')}
                          className="justify-start font-bold h-10 border-muted"
                        >
                          <Globe className="mr-2 h-3.5 w-3.5" /> All
                        </Button>
                        {LOCATIONS.map(loc => (
                          <Button 
                            key={loc.id}
                            variant={activeFilters.location === loc.id ? 'secondary' : 'outline'} 
                            size="sm"
                            onClick={() => toggleLocation(loc.id)}
                            className="justify-start text-[11px] font-bold h-10 border-muted"
                          >
                            {loc.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-black uppercase text-[11px] tracking-widest text-muted-foreground">Intended Use</h3>
                      <div className="flex flex-col gap-2">
                        {CATEGORIES.map(cat => {
                          const Icon = categoryIcons[cat.id] || Map;
                          return (
                            <Button 
                              key={cat.id}
                              variant={activeFilters.category === cat.id ? 'secondary' : 'outline'} 
                              size="sm"
                              onClick={() => toggleCategory(cat.id)}
                              className="justify-start font-bold h-11 border-muted"
                            >
                              <Icon className="mr-3 h-4 w-4 text-primary" /> {cat.name}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-black uppercase text-[11px] tracking-widest text-muted-foreground">Key Amenities</h3>
                      <div className="space-y-3">
                        {AMENITY_OPTIONS.map((amenity) => (
                          <div key={amenity.id} className="flex items-center space-x-3">
                            <Checkbox 
                              id={amenity.id} 
                              checked={activeFilters.amenities.includes(amenity.id)}
                              onCheckedChange={() => toggleAmenity(amenity.id)}
                            />
                            <label 
                              htmlFor={amenity.id} 
                              className="text-sm font-bold leading-none cursor-pointer flex items-center gap-2"
                            >
                              <amenity.icon className="h-3.5 w-3.5 text-muted-foreground" />
                              {amenity.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-black uppercase text-[11px] tracking-widest text-muted-foreground">Title Status</h3>
                      <div className="flex gap-2">
                        {['all', 'Ready', 'Freehold'].map((status) => (
                          <Button 
                            key={status}
                            variant={activeFilters.titleStatus === status ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => setActiveFilters(prev => ({ ...prev, titleStatus: status }))}
                            className="flex-1 font-bold h-10 border-muted"
                          >
                            {status === 'all' ? 'Any' : status}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full text-muted-foreground font-black uppercase text-[10px] tracking-widest h-12 hover:bg-destructive/10 hover:text-destructive" onClick={resetFilters}>
                      <X className="mr-2 h-4 w-4" /> Reset All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="hidden items-center gap-2 lg:flex">
                <Badge 
                  variant={activeFilters.category === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 font-bold uppercase text-[10px] tracking-widest border-muted"
                  onClick={() => toggleCategory('all')}
                >
                  All Categories
                </Badge>
                {CATEGORIES.map(cat => (
                  <Badge 
                    key={cat.id}
                    variant={activeFilters.category === cat.id ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 font-bold uppercase text-[10px] tracking-widest border-muted"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted/40 px-3 py-2 rounded-lg">
                {dbLoading ? <Loader2 className="h-3 w-3 animate-spin inline mr-2 text-primary" /> : null}
                <span className="text-primary">{filteredListings.length}</span> Verified Results
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((listing, idx) => (
                <AnimatedSection key={listing.id} delay={idx * 0.05}>
                  <ListingCard listing={listing} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center rounded-[3rem] bg-muted/30 py-32 text-center border-2 border-dashed border-muted/50">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-inner mb-6">
                   <MapPin className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">No properties found</h2>
                <p className="mt-2 text-muted-foreground font-bold uppercase text-[10px] tracking-widest max-w-xs mx-auto">
                  We couldn't find any plots matching your specific filters. Try expanding your budget or location range.
                </p>
                <Button variant="outline" className="mt-10 font-black uppercase text-xs h-14 px-10 border-primary/20 hover:bg-primary hover:text-white shadow-lg transition-all" onClick={resetFilters}>
                  View All Available Plots
                </Button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="overflow-hidden rounded-[3rem] bg-secondary p-10 text-secondary-foreground lg:p-20 relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
            <div>
              <Badge className="bg-white text-secondary font-black uppercase tracking-widest text-[10px] px-4 py-1.5 mb-6">Personalized Consultation</Badge>
              <h2 className="font-headline text-4xl font-bold lg:text-6xl leading-tight">Need expert <span className="text-accent italic">guidance?</span></h2>
              <p className="mt-8 text-xl text-secondary-foreground/70 font-medium leading-relaxed">
                Our property consultants have access to upcoming projects and unlisted gems that might not be on the site yet. 
                Start your home ownership journey with a trusted partner who understands your vision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-start lg:justify-end gap-6">
              <Button size="lg" className="h-20 px-12 text-lg font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl transition-transform active:scale-95" asChild>
                <a href="https://wa.me/254790011042?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20plots%20for%20sale." target="_blank" rel="noopener noreferrer">Talk to an Agent</a>
              </Button>
              <Button size="lg" variant="outline" className="h-20 px-12 text-lg font-black uppercase tracking-widest border-white text-white hover:bg-white/10 shadow-2xl transition-transform active:scale-95" asChild>
                <a href="/contact">Book Site Visit</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AllListingsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Syncing Projects...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
