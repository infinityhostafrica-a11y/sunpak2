'use client';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, Calendar, Users, MapPin, ArrowRight, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EVENTS = [
  {
    title: "Kitengela Prime Project Launch",
    date: "March 15, 2024",
    location: "Kitengela",
    desc: "Join us as we unveil 500+ plots in our newest high-growth project in Kitengela. Site visits and early-bird discounts available.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop"
  },
  {
    title: "Title Deed Handover Ceremony",
    date: "February 28, 2024",
    location: "Nairobi HQ",
    desc: "Celebrating 200 happy clients as they receive their freehold title deeds for their investments in Konza and Isinya.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
  },
  {
    title: "Community Outreach: Nakuru",
    date: "January 12, 2024",
    location: "Nakuru",
    desc: "Sunpak Estate team engaging with the local community and supporting education initiatives in the Nakuru region.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function UpdatesAndEventsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-widest px-4 py-1 text-xs">
            Stay Connected
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Updates & Events
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium">
            Be the first to know about new projects, handover ceremonies, and community initiatives at Sunpak Estate.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
             {EVENTS.map((event, i) => (
               <AnimatedSection key={i} delay={i * 0.1}>
                 <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] group">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                       <div className="relative h-64 md:h-auto overflow-hidden">
                          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-6 left-6">
                             <Badge className="bg-primary text-white font-black uppercase text-[10px] shadow-lg">Event</Badge>
                          </div>
                       </div>
                       <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                             <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {event.date}</span>
                             <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {event.location}</span>
                          </div>
                          <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight">{event.title}</h3>
                          <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-8">{event.desc}</p>
                          <Button asChild variant="outline" className="w-fit font-black uppercase text-xs tracking-widest border-primary text-primary hover:bg-primary hover:text-white h-12 px-8">
                             <Link href="/gallery">View Photos <Camera className="ml-2 h-4 w-4" /></Link>
                          </Button>
                       </div>
                    </div>
                 </Card>
               </AnimatedSection>
             ))}
          </div>

          <AnimatedSection className="mt-24 text-center">
             <h3 className="text-2xl font-black uppercase mb-8">Follow Our Story on Social Media</h3>
             <div className="flex justify-center gap-6">
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-primary/20"><Users size={20} className="text-primary"/></Button>
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-primary/20"><Megaphone size={20} className="text-primary"/></Button>
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-primary/20"><Camera size={20} className="text-primary"/></Button>
             </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
