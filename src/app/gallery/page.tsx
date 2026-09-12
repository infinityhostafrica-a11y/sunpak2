'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Loader2, Camera, MapPin, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_GALLERY = [
  {
    id: 'g-award-1',
    url: '/app-assets/mizani ceo of the year 2025.jpeg',
    caption: 'Mizani CEO of the Year 2025 Award Ceremony',
    category: 'Awards & Honors',
  },
  {
    id: 'g-award-2',
    url: '/app-assets/starbrands CEO of the year.jpeg',
    caption: 'Starbrands Real Estate Leader of the Year',
    category: 'Awards & Honors',
  },
  {
    id: 'g-award-3',
    url: '/app-assets/starbrands awards group.jpeg',
    caption: 'Sunpak Estate Executive Leadership Team',
    category: 'Awards & Honors',
  },
  {
    id: 'g-award-4',
    url: '/app-assets/consumer awards.jpeg',
    caption: 'Consumer Choice Awards - Most Trusted Land Brand',
    category: 'Awards & Honors',
  },
  {
    id: 'g-proj-1',
    url: '/app-assets/Konza Gardens Phase 6.jpeg',
    caption: 'Konza Gardens Phase 6 - Beacons & Internal Roads',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-2',
    url: '/app-assets/Isinya Highway Sunpak.jpeg.png',
    caption: 'Isinya Highway Commercial & Residential Plots',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-3',
    url: '/app-assets/Kisaju Gardens Phase 4.jpeg',
    caption: 'Kisaju Gardens Phase 4 Site Groundbreaking',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-4',
    url: '/app-assets/Mbuni Gardens Kitengela.jpeg',
    caption: 'Mbuni Gardens Kitengela - Gated Community Layout',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-5',
    url: '/app-assets/makutano mwea (2).jpeg',
    caption: 'Makutano Mwea - Rich Fertile Agricultural Parcels',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-6',
    url: '/app-assets/Syokimau Viraj Gardens.jpeg',
    caption: 'Syokimau Viraj Gardens - Near Expressway & SGR',
    category: 'Project Developments',
  },
  {
    id: 'g-proj-7',
    url: '/app-assets/lenchani phase 4.jpeg',
    caption: 'Lenchani Phase 4 - Title Deed Verification Tour',
    category: 'Site Visits',
  },
  {
    id: 'g-proj-8',
    url: '/app-assets/WhatsApp Image 2026-04-17 at 1.45.40 PM.jpeg',
    caption: 'Clients on Guided Site Visit with Property Consultants',
    category: 'Site Visits',
  },
];

export default function GalleryPage() {
  const db = useFirestore();
  const galleryQuery = useMemoFirebase(() => query(collection(db, 'gallery'), orderBy('createdAt', 'desc')), [db]);
  const { data: dbImages, isLoading } = useCollection(galleryQuery);

  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const allGalleryItems = React.useMemo(() => {
    if (dbImages && dbImages.length > 0) {
      return dbImages;
    }
    return DEFAULT_GALLERY;
  }, [dbImages]);

  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'all') return allGalleryItems;
    return allGalleryItems.filter(
      (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [allGalleryItems, activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-950 py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-amber-400 text-slate-950 font-extrabold uppercase tracking-widest px-4 py-1 border-none">
            Visual Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            Sunpak Estate <span className="text-amber-400">Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 font-medium leading-relaxed">
            Real photos from our daily site visits, project developments, customer title deed handovers, and industry awards across Kenya.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'Project Developments', label: 'Projects & Beacons' },
            { id: 'Site Visits', label: 'Client Site Visits' },
            { id: 'Awards & Honors', label: 'Awards & Recognition' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Loading photo archive...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((img, idx) => (
                <AnimatedSection key={img.id || idx} delay={idx * 0.05}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-slate-200/80">
                    <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={img.url}
                        alt={img.caption || 'Sunpak Estate Photo'}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary uppercase tracking-wide mb-1">
                        <Camera className="h-3.5 w-3.5" />
                        <span>{img.category || 'Sunpak Estate'}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 leading-snug">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
