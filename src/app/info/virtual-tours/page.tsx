'use client';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, MapPin, Eye, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const TOURS = [
  {
    title: "Konza Prime Virtual Walkthrough",
    location: "Konza",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    title: "Kitengela Prime Aerial Tour",
    location: "Kitengela",
    duration: "2:20",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    title: "Nakuru Plots 360° Experience",
    location: "Nakuru",
    duration: "4:15",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export default function VirtualToursPage() {
  const [activeTour, setActiveTour] = React.useState<null | typeof TOURS[0]>(null);

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-widest px-4 py-1 text-xs">
            Visit From Anywhere
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Virtual Tours
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium leading-relaxed">
            Can't make it to a site visit? Explore our premium plots in 4K resolution through our immersive virtual tours.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          {activeTour && (
            <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-black">
                  <video 
                    src={activeTour.videoUrl} 
                    className="w-full h-full object-contain" 
                    controls 
                    autoPlay
                  />
                  <button 
                    onClick={() => setActiveTour(null)}
                    className="absolute top-8 right-8 bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-black uppercase text-xs hover:bg-white/40 transition-colors"
                  >
                    Close Player
                  </button>
               </div>
               <div className="text-center mt-12">
                  <h2 className="text-3xl font-black uppercase tracking-tight">{activeTour.title}</h2>
                  <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs mt-2">{activeTour.location} &bull; Sunpak Estate</p>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {TOURS.map((tour, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
                 <Card className="border-none shadow-xl overflow-hidden rounded-[2rem] group h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                       <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setActiveTour(tour)}
                            className="bg-white text-primary h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"
                          >
                             <PlayCircle size={32} />
                          </button>
                       </div>
                       <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 font-black text-[10px]">{tour.duration}</Badge>
                       </div>
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                             <MapPin size={14} /> {tour.location}
                          </div>
                          <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{tour.title}</h3>
                       </div>
                       <Button 
                         onClick={() => setActiveTour(tour)}
                         className="w-full bg-muted text-foreground hover:bg-primary hover:text-white font-black uppercase text-xs tracking-widest h-12 shadow-sm transition-all"
                       >
                         Start Tour <Eye className="ml-2 h-4 w-4" />
                       </Button>
                    </CardContent>
                 </Card>
               </AnimatedSection>
             ))}
          </div>

          <AnimatedSection className="mt-32 bg-secondary text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10">
                <Globe className="h-16 w-16 text-accent mx-auto mb-8" />
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Experience It In Person</h2>
                <p className="text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto font-medium">
                  While virtual tours are great, nothing beats the feeling of standing on your future plot. Join our site visits, available daily (Mon - Sun).
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Button asChild size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 font-black uppercase tracking-widest shadow-xl">
                      <Link href="/plots-for-sale">Browse All Plots</Link>
                   </Button>
                   <Link href="/contact" className="h-16 px-10 border-2 border-white rounded-md text-white font-black uppercase tracking-widest flex items-center justify-center hover:bg-white/10 transition-colors">
                      Book Site Visit
                   </Link>
                </div>
             </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
