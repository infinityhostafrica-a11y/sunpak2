'use client';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FAQS = [
  {
    question: "Do all plots have ready title deeds?",
    answer: "Yes, all Sunpak Estate projects come with ready freehold title deeds. We ensure that all legal processes are completed before we offer any property to the public."
  },
  {
    question: "What is the minimum deposit required to secure a plot?",
    answer: "You can secure any of our plots with a commitment deposit as low as 10% of the total purchase price. The balance can be paid in flexible installments."
  },
  {
    question: "How long is the payment period for installments?",
    answer: "We offer flexible payment plans extending up to 12 months. This allows you to comfortably secure your future without financial strain."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. The price we quote includes all legal fees, title deed processing, and transfer costs. Transparency is one of our core values."
  },
  {
    question: "Do you organize site visits?",
    answer: "Yes! We organize site visits on a daily basis (Monday - Monday). Our pick-up point is at our Nairobi HQ, Information House, 2nd Floor, Suite A4 at 9:00 AM."
  },
  {
    question: "Can Kenyans in the diaspora buy land from Sunpak Estate?",
    answer: "Absolutely. We have a dedicated Diaspora Special package and a secure process that allows you to identify, verify, and purchase land while abroad with absolute peace of mind."
  }
];

export default function FAQsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 border-white/40 text-white font-black uppercase tracking-widest px-4 py-1 text-xs">
            How Can We Help?
          </Badge>
          <h1 className="font-headline text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium">
            Everything you need to know about buying land with Sunpak Estate. If your question isn't here, reach out to us!
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-card shadow-sm overflow-hidden">
                  <AccordionTrigger className="text-left font-black uppercase tracking-tight hover:no-underline py-6">
                    <div className="flex gap-4 items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <span className="text-xs font-black">?</span>
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed font-medium pb-8 pl-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-24 text-center bg-secondary/5 rounded-3xl p-12 border border-dashed border-secondary/20">
             <h3 className="text-2xl font-black uppercase mb-4">Still have questions?</h3>
             <p className="text-muted-foreground font-medium mb-10 max-w-md mx-auto">Our land consultants are available to guide you through any aspect of property ownership at our Suite A4 office.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-primary h-14 px-8 font-black uppercase text-xs tracking-widest">
                   <Link href="/contact"><Mail className="mr-2 h-4 w-4" /> Send Inquiry</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 border-primary text-primary hover:bg-primary hover:text-white font-black uppercase text-xs tracking-widest">
                   <Link href="https://wa.me/254790611601"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us</Link>
                </Button>
             </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
