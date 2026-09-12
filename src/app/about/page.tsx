'use client';
export const dynamic = 'force-dynamic';
import { AnimatedSection } from '@/components/animated-section';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  BadgeCheck,
  Eye,
  HandCoins,
  ShieldCheck,
  Rocket,
  Globe,
  HandHeart,
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(
    (img) => img.id === 'about-us-hero'
  );

  const whyChooseUsItems = [
    {
      icon: BadgeCheck,
      title: 'Ready Title Deeds',
      description:
        'All our plots come with authentic and ready-to-transfer title deeds for your peace of mind.',
    },
    {
      icon: HandCoins,
      title: 'Affordable Pricing',
      description:
        'We offer the most competitive land prices in Kenya with flexible payment plans.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Land',
      description:
        'Every parcel we sell is thoroughly vetted and surveyed by certified professionals.',
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="relative h-[40vh] min-h-[300px] w-full">
          {aboutHeroImage && (
            <Image
              src={aboutHeroImage.imageUrl}
              alt="About Sunpak Estate"
              fill
              className="object-cover"
              priority
              data-ai-hint={aboutHeroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
              Who We Are
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-100">
              Trusted Excellence in Kenyan Real Estate
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Global Presence Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <Globe className="h-10 w-10" />
              </div>
            </div>
            <h2 className="mb-6 font-headline text-3xl font-bold md:text-4xl">Global Presence</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At Sunpak Estate, our footprint spans beyond borders. We connect discerning investors across the globe to Kenya’s most sought-after prime properties — all with verified, ready title deeds. Whether you’re in Kenya or a Kenyan in Diaspora our team delivers trusted real estate solutions with transparency, speed, and unmatched value. We make property ownership seamless, secure, and rewarding — wherever you are in the world.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Vision & Mission */}
      <AnimatedSection className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
              <CardContent className="pt-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <Eye className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-4 font-headline text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and innovative real estate partner, connecting the world to Kenya’s prime properties with ready title deeds. We envision a future where property ownership is transparent, secure and empowering — driving wealth creation and sustainable growth for individuals, families, and communities both locally and globally.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md transition-transform hover:-translate-y-1">
              <CardContent className="pt-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <Rocket className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-4 font-headline text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To simplify and secure the journey to property ownership by offering prime real estate with ready title deeds. We are dedicated to delivering exceptional value through transparency, professionalism, and personalized service — empowering our clients, building lasting trust, and contributing to the growth of thriving communities across Kenya and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Responsibility Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white/10 p-4">
                <HandHeart className="h-10 w-10 text-accent" />
              </div>
              <h2 className="mb-6 font-headline text-3xl font-bold">Our Responsibility</h2>
              <p className="text-lg leading-relaxed text-primary-foreground/90">
                Our responsibility goes beyond transactions. We uphold transparency, integrity, and sustainable development in every deal. We champion ethical land practices, empower communities, and ensure that every property sold contributes to a better tomorrow. Whether you’re buying from across the street or across the globe, we’re here to guide you home — the right way.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 font-headline text-3xl font-bold">Why Choose Us?</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {whyChooseUsItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-2 font-headline text-xl font-bold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
