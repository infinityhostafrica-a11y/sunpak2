'use client';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Users, Rocket, Heart, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const JOBS = [
  { title: "Land Consultant", type: "Full Time", location: "Nairobi", desc: "Expert in real estate sales and client relationship management." },
  { title: "Digital Marketer", type: "Full Time", location: "Nairobi", desc: "Content creator and social media strategist with experience in real estate." },
  { title: "Legal Officer", type: "Contract", location: "Nairobi", desc: "Assisting in land search, verification, and title deed processing." }
];

export default function CareersPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-widest px-4 py-1 text-xs">
            Join the Dream Team
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Build Your Career
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium leading-relaxed">
            We are looking for passionate individuals who want to redefine land ownership in Kenya. Grow with a trusted brand.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {[
               { title: "Inclusive Culture", icon: Users, desc: "A supportive environment where every voice is heard and celebrated." },
               { title: "Growth Potential", icon: Rocket, desc: "We invest in your development through training and mentorship programs." },
               { title: "Impactful Work", icon: Heart, desc: "Help thousands of Kenyans secure their future through land ownership." }
             ].map((item, i) => (
               <Card key={i} className="border-none shadow-xl text-center p-8 bg-card">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                     <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                  <p className="text-muted-foreground font-medium">{item.desc}</p>
               </Card>
             ))}
          </div>

          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-4xl font-black uppercase tracking-tight">Open Opportunities</h2>
                <p className="text-muted-foreground font-medium mt-2">Find your place in our growing family.</p>
             </div>

             <div className="space-y-6">
                {JOBS.map((job, i) => (
                  <AnimatedSection key={i}>
                    <Card className="border-none shadow-md hover:shadow-xl transition-all group overflow-hidden">
                       <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-2xl font-black uppercase tracking-tight">{job.title}</h4>
                                <Badge variant="secondary" className="text-[10px] font-black uppercase">{job.type}</Badge>
                             </div>
                             <p className="text-muted-foreground font-medium">{job.desc}</p>
                          </div>
                          <Button asChild className="bg-primary font-black uppercase tracking-widest text-xs h-12 px-8 shadow-lg group-hover:scale-105 transition-transform">
                             <Link href="mailto:careers@sunpakestate.co.ke">Apply Now <ArrowRight className="ml-2 h-4 w-4"/></Link>
                          </Button>
                       </div>
                    </Card>
                  </AnimatedSection>
                ))}
             </div>

             <div className="mt-20 text-center bg-muted/50 rounded-3xl p-12 border-2 border-dashed border-muted">
                <h3 className="text-2xl font-black uppercase mb-4">Don't see a match?</h3>
                <p className="text-muted-foreground font-medium mb-8">We're always looking for talent. Send your CV to our database and we'll reach out when a role opens.</p>
                <Button variant="link" className="text-primary font-black uppercase tracking-widest text-sm" asChild>
                   <Link href="mailto:careers@sunpakestate.co.ke" className="flex items-center gap-2">
                      <Mail size={18} /> General Applications
                   </Link>
                </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
