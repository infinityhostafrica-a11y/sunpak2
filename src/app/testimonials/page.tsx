
'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, PlayCircle, Star, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { TESTIMONIALS } from '@/lib/testimonials';

function TestimonialMedia({ media }: { media: { type: string, url: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative group overflow-hidden rounded-2xl bg-black">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {media.map((item, idx) => (
            <div key={idx} className="relative flex-[0_0_100%] min-w-0 aspect-video">
              {item.type === 'image' ? (
                <Image 
                  src={item.url} 
                  alt="Testimonial Proof" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover" 
                    controls 
                    playsInline
                  />
                  <div className="absolute top-4 right-4 pointer-events-none">
                    <PlayCircle className="h-8 w-8 text-white/80" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {media.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-[0.2em] px-4 py-1 text-xs">
            Success Stories
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Our Happy Investors
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium leading-relaxed">
            Real stories from real people who secured their future with Sunpak Estate. See their journey from site visits to title deed collection.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              {TESTIMONIALS.map((t, idx) => (
                <AnimatedSection key={t.id} delay={idx * 0.1}>
                  <Card className="border-none shadow-2xl overflow-hidden group hover:ring-2 ring-primary/20 transition-all rounded-[2.5rem]">
                    <CardContent className="p-0">
                      <TestimonialMedia media={t.media} />
                      <div className="p-8">
                        <div className="flex gap-1 text-accent mb-4">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                        <Quote className="h-10 w-10 text-primary/10 mb-4" />
                        <p className="text-xl font-bold text-foreground/90 leading-relaxed mb-8 italic">
                          "{t.text}"
                        </p>
                        <div className="flex items-center justify-between border-t pt-6">
                          <div>
                            <h4 className="font-black uppercase tracking-tight text-lg">{t.name}</h4>
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase mt-1">
                              <MapPin className="h-3 w-3 text-primary" /> {t.location}
                            </div>
                          </div>
                          <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10 border-none font-black text-[10px]">
                            Purchased: {t.property}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 space-y-8">
              <AnimatedSection delay={0.3}>
                <div className="bg-muted/30 p-10 rounded-[2.5rem] border border-dashed border-primary/20">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-6 leading-none">Why they <span className="text-primary">trust us?</span></h2>
                  <ul className="space-y-6">
                    {[
                      { title: "Ready Title Deeds", desc: "Every client gets an authentic freehold title deed." },
                      { title: "Verified Ownership", desc: "Transparent verification process with land registries." },
                      { title: "Flexible Payment Plans", desc: "Affordable installments for up to 12 months." },
                      { title: "Strategic Locations", desc: "Projects in high-growth areas with infrastructure." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-white">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-xl font-black uppercase mb-4">Join 8,000+ Land Owners</h3>
                    <p className="text-muted-foreground mb-8 text-sm">Become the next success story. Secure your plot today with a simple 10% deposit.</p>
                    <Button size="lg" className="w-full bg-primary font-black uppercase tracking-widest h-14 shadow-lg rounded-xl" asChild>
                      <Link href="/plots-for-sale">Start Your Journey</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <Card className="bg-secondary p-8 text-white border-none shadow-xl rounded-3xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                   <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Site Visit Booking</h3>
                   <p className="text-secondary-foreground/80 font-medium mb-6">
                     Want to see for yourself? We conduct site visits daily from Monday to Monday.
                   </p>
                   <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 font-black uppercase tracking-widest h-14 shadow-lg rounded-xl" asChild>
                     <Link href="/contact">Book Site Visit</Link>
                   </Button>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
