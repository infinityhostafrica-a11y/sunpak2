'use client';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, FileText, CheckCircle2, ShieldCheck, Map, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AWARDS } from '@/lib/awards';

export default function AwardsAndTitlesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-[0.2em] px-4 py-1 text-xs">
            Excellence & Authenticity
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Awards & Title Deeds
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium leading-relaxed">
            Recognized for our integrity and committed to absolute security. We ensure every client receives a verified, freehold title deed.
          </p>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Our Track Record</h2>
             <p className="text-muted-foreground font-medium max-w-xl mx-auto">Multiple awards reflecting our commitment to transparent real estate practices in Kenya.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AWARDS.map((award) => (
              <AnimatedSection key={award.id}>
                <Link href={`/awards/${award.id}`}>
                  <Card className="border-none shadow-xl group cursor-pointer overflow-hidden h-full flex flex-col">
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image src={award.imageUrl} alt={award.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-lg">
                        <Trophy className="h-5 w-5" />
                      </div>
                    </div>
                    <CardContent className="p-8 flex-1">
                      <p className="text-primary font-black text-xl mb-2">{award.year}</p>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{award.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {award.description}
                      </p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        View Details <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Title Deeds Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop" 
                  alt="Title Deed Handover" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
                <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                   <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="text-secondary h-6 w-6" />
                      <span className="font-black text-lg">Verified</span>
                   </div>
                   <p className="text-xs text-muted-foreground font-medium">Over 5,000 title deeds successfully issued to our clients.</p>
                </div>
              </div>
            </AnimatedSection>

            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-6 leading-tight">Title Deed <span className="text-primary">Assurance</span></h2>
                <p className="text-lg text-muted-foreground font-medium">At Comfort Homes, we believe that land ownership is only complete when the title deed is in your hands. We handle the complex legal processes to ensure a smooth transfer.</p>
              </div>

              <div className="space-y-8">
                {[
                  { title: "Due Diligence", desc: "We conduct thorough searches at the land registry before any acquisition.", icon: ShieldCheck },
                  { title: "Surveying & Beaconing", desc: "Every plot is accurately surveyed by certified professionals.", icon: Map },
                  { title: "Legal Transfer", desc: "Our legal team facilitates the transfer of freehold titles to your name.", icon: FileText }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-xl mb-1">{item.title}</h4>
                      <p className="text-muted-foreground font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}