
'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { AWARDS } from '@/lib/awards';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, Building2, ArrowLeft, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AwardDetailPage({ params: paramsProp }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsProp);
  const award = AWARDS.find(a => a.id === params.id);

  if (!award) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" asChild className="mb-8 text-white hover:bg-white/10 p-0 font-bold uppercase tracking-widest text-xs">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
          </Button>
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4 border-accent text-accent font-black uppercase tracking-widest px-4 py-1">
              Achievement & Recognition
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
              {award.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-white/80">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {award.year}</span>
              <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-accent" /> {award.organization}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Description & Details */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-muted border-4 border-white mb-12">
                  <Image 
                    src={award.imageUrl} 
                    alt={award.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="h-16 w-16 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Trophy className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="prose prose-xl max-w-none">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-6">About the Recognition</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {award.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                    This recognition serves as a testament to the hard work of the entire Comfort Homes team and the trust placed in us by our clients. We continue to strive for excellence in the Kenyan real estate sector, ensuring that land ownership is accessible, affordable, and, most importantly, secure for everyone.
                  </p>
                </div>
              </AnimatedSection>

              {/* Award Ceremony Gallery */}
              <AnimatedSection delay={0.1}>
                <div className="pt-12 border-t">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                    <ImageIcon className="text-primary h-6 w-6" /> Ceremony Moments
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {award.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                        <Image src={img} alt={`${award.title} gallery ${idx}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <AnimatedSection delay={0.2}>
                <Card className="border-none shadow-xl bg-card rounded-3xl overflow-hidden">
                  <div className="bg-secondary p-8 text-white">
                    <h3 className="text-xl font-black uppercase tracking-tight">Our Values</h3>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    {[
                      { title: "Transparency", desc: "Open and honest dealings." },
                      { title: "Integrity", desc: "Upholding ethical standards." },
                      { title: "Reliability", desc: "Consistent service delivery." },
                      { title: "Innovation", desc: "Modern property solutions." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                          <Trophy className="h-3 w-3" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-muted/30 p-8 rounded-3xl border border-dashed border-primary/20">
                  <h3 className="font-black uppercase tracking-tight mb-4">View More Evidence</h3>
                  <p className="text-sm text-muted-foreground mb-6">See our site visits, project launches, and client handover events in our main gallery.</p>
                  <Button asChild className="w-full bg-primary font-black uppercase tracking-widest h-12 shadow-lg">
                    <Link href="/gallery">Visit Full Gallery <ExternalLink className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
