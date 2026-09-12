'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...data,
        leadType: 'Contact Inquiry',
        createdAt: new Date().toISOString(),
        propertyName: 'General Contact',
      });
      
      toast({
        title: 'Message Sent',
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-headline text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium">
            Have questions about land ownership in Kenya? Our team is ready to guide you through every step of your investment journey.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <AnimatedSection>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Our Office</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Information House, 2nd Floor, Suite A4<br />
                        Mfangano Street Opposite Quickmart Supermarket,<br />
                        Nairobi, Kenya.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Call Us</h3>
                      <div className="space-y-1 text-sm font-medium mt-1">
                        <div>
                          <a href="tel:0790011042" className="text-foreground hover:text-primary transition-colors font-bold">
                            0790 011 042
                          </a>
                          <span className="text-muted-foreground text-xs ml-1.5">(Val - Consultant)</span>
                        </div>
                        <div>
                          <a href="tel:0790611601" className="text-foreground hover:text-primary transition-colors font-bold">
                            0790 611 601
                          </a>
                          <span className="text-muted-foreground text-xs ml-1.5">(James - Consultant)</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 uppercase font-bold tracking-widest">Available Mon - Sat, 8am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">WhatsApp Support</h3>
                      <p className="text-muted-foreground text-sm">Chat directly with our property consultants for instant assistance:</p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button asChild variant="outline" size="sm" className="rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-xs">
                          <Link href="https://wa.me/254790011042?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects." target="_blank">
                            Val: 0790 011 042 <Send className="ml-1.5 h-3 w-3"/>
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-xs">
                          <Link href="https://wa.me/254790611601?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects." target="_blank">
                            James: 0790 611 601 <Send className="ml-1.5 h-3 w-3"/>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Site Visits</h3>
                      <p className="text-muted-foreground">Daily (Mon - Sun)</p>
                      <p className="text-xs text-muted-foreground mt-1 font-bold">Pick up at 9:00 AM from our Office.</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Card className="bg-muted/30 border-none shadow-inner p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="text-primary h-5 w-5" />
                    <h3 className="font-black uppercase tracking-widest text-xs">Sunpak Estate HQ</h3>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "We are strategically located in the heart of Nairobi to serve you better. Visit us for title deed verification and property consultations at Information House."
                  </p>
                </Card>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
                  <div className="bg-secondary p-8 text-white">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Send a Message</h2>
                    <p className="text-secondary-foreground/80 font-medium">Fill out the form below and an expert will reach out to you.</p>
                  </div>
                  <CardContent className="p-8">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                          <Input 
                            {...form.register('fullName')} 
                            placeholder="e.g. John Doe" 
                            className="h-12 border-gray-200 focus:ring-primary"
                          />
                          {form.formState.errors.fullName && (
                            <p className="text-xs text-destructive font-bold">{form.formState.errors.fullName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</label>
                          <Input 
                            {...form.register('phone')} 
                            placeholder="07..." 
                            className="h-12 border-gray-200 focus:ring-primary"
                          />
                          {form.formState.errors.phone && (
                            <p className="text-xs text-destructive font-bold">{form.formState.errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                          <Input 
                            {...form.register('email')} 
                            type="email" 
                            placeholder="john@example.com" 
                            className="h-12 border-gray-200 focus:ring-primary"
                          />
                          {form.formState.errors.email && (
                            <p className="text-xs text-destructive font-bold">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</label>
                          <Input 
                            {...form.register('subject')} 
                            placeholder="e.g. Kitengela Plots Inquiry" 
                            className="h-12 border-gray-200 focus:ring-primary"
                          />
                          {form.formState.errors.subject && (
                            <p className="text-xs text-destructive font-bold">{form.formState.errors.subject.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">How can we help?</label>
                        <Textarea 
                          {...form.register('message')} 
                          placeholder="Tell us about your property needs..." 
                          className="min-h-[150px] border-gray-200 focus:ring-primary"
                        />
                        {form.formState.errors.message && (
                          <p className="text-xs text-destructive font-bold">{form.formState.errors.message.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Inquiry Now'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <AnimatedSection className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-video relative bg-muted">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <MapPin className="h-16 w-16 text-primary/20 mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight">Nairobi HQ Location</h3>
              <p className="text-muted-foreground mt-2 font-medium">Information House, 2nd Floor, Suite A4, Mfangano Street</p>
              <Button asChild className="mt-8 bg-primary">
                <Link href="https://maps.google.com/?q=Information+House+Mfangano+Street+Nairobi" target="_blank">
                  Open in Google Maps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
