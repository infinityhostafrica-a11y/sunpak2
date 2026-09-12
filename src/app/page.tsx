'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Sparkles,
  Handshake,
  FileText,
  Calendar,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Wallet,
  Coins,
  MapPinned,
  CheckCircle,
  Clock,
  Star,
  Quote,
  ArrowRight,
  Calculator,
  Compass,
  Award,
  Building2,
  ChevronRight,
  HelpCircle,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ListingCard from '@/components/listing-card';
import { AnimatedSection } from '@/components/animated-section';
import { BookVisitDialog } from '@/components/book-visit-dialog';
import { getListings } from '@/lib/listings';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TESTIMONIALS } from '@/lib/testimonials';
import { AWARDS } from '@/lib/awards';
import type { LandListing } from '@/types';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

const POPULAR_LOCATIONS = [
  { name: 'Kitengela', count: '6 Projects', image: '/app-assets/Mbuni Gardens Kitengela.jpeg', highlight: 'Fast Growing & Ready for Settlement' },
  { name: 'Isinya', count: '4 Projects', image: '/app-assets/Isinya Highway Sunpak.jpeg.png', highlight: 'Ideal for Residential & Speculation' },
  { name: 'Kisaju', count: '3 Projects', image: '/app-assets/Kisaju Gardens Phase 4.jpeg', highlight: 'Along Namanga Highway Corridor' },
  { name: 'Konza Technopolis', count: '2 Projects', image: '/app-assets/Konza Gardens Phase 6.jpeg', highlight: 'Adjacent to Smart City Infrastructure' },
  { name: 'Juja Farm', count: '2 Projects', image: '/app-assets/Juja Farm Kwa Murage.jpeg', highlight: 'Near Thika Superhighway Corridor' },
  { name: 'Mwea / Karaba', count: '3 Projects', image: '/app-assets/makutano mwea (2).jpeg', highlight: 'High-Yield Agribusiness & Residential' },
];

export default function Home() {
  const db = useFirestore();
  const router = useRouter();

  // Firestore queries
  const slidesQuery = useMemoFirebase(() => query(collection(db, 'hero-slides'), orderBy('order', 'asc')), [db]);
  const vehiclesQuery = useMemoFirebase(() => query(collection(db, 'vehicles'), orderBy('createdAt', 'desc')), [db]);

  const { data: firestoreSlides } = useCollection(slidesQuery);
  const { data: dbVehicles } = useCollection<LandListing>(vehiclesQuery);

  const defaultHeroSlides = [
    {
      text: 'Verified Land in Kenya with Ready Title Deeds',
      subtext: 'Invest with absolute confidence in prime residential, commercial, and agricultural plots starting from Ksh 350,000.',
      imageId: 'hero-1',
    },
    {
      text: 'Daily Site Visits from Information House',
      subtext: 'Join our daily guided transport every Monday to Sunday at 9:00 AM from our Nairobi CBD offices.',
      imageId: 'hero-2',
    },
    {
      text: 'Flexible 10% Deposit & 12-Month Installments',
      subtext: 'Own titled land comfortably without financial strain through structured zero-interest monthly plans.',
      imageId: 'slider-main',
    },
  ];

  const heroSlides = React.useMemo(() => {
    return firestoreSlides && firestoreSlides.length > 0 ? firestoreSlides : defaultHeroSlides;
  }, [firestoreSlides]);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('all');
  const [maxBudget, setMaxBudget] = React.useState<number>(4500000);

  // Installment Calculator State
  const [calcPlotPrice, setCalcPlotPrice] = React.useState<number>(850000);
  const [calcDepositPct, setCalcDepositPct] = React.useState<number>(10);
  const [calcMonths, setCalcMonths] = React.useState<number>(12);

  const allProjects = React.useMemo(() => {
    const staticList = getListings();
    const dbList = dbVehicles || [];
    const dbIds = new Set(dbList.map((l) => l.id));
    return [...dbList, ...staticList.filter((l) => !dbIds.has(l.id))];
  }, [dbVehicles]);

  const maxListingPrice = React.useMemo(() => {
    if (allProjects.length === 0) return 5000000;
    return Math.max(...allProjects.map((p) => p.price));
  }, [allProjects]);

  React.useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];
  const bgImage = PlaceHolderImages.find((img) => img.id === (slide?.imageId || 'hero-1')) || PlaceHolderImages[0];

  // Filtered projects for showcase
  const filteredShowcase = React.useMemo(() => {
    return allProjects.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.categories.includes(selectedCategory);
      const matchLoc = selectedLocation === 'all' || p.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchPrice = p.price <= maxBudget;
      return matchCat && matchLoc && matchPrice;
    });
  }, [allProjects, selectedCategory, selectedLocation, maxBudget]);

  // Calculations for mortgage calculator
  const depositAmount = Math.round(calcPlotPrice * (calcDepositPct / 100));
  const loanBalance = calcPlotPrice - depositAmount;
  const monthlyPayment = Math.round(loanBalance / calcMonths);

  return (
    <div className="flex flex-col bg-slate-50">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center text-white overflow-hidden pb-44 lg:pb-56">
        <div className="w-full h-full absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={`bg-${currentSlide}-${bgImage.imageUrl}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Image
                src={bgImage.imageUrl}
                alt="Sunpak Estate Plots in Kenya"
                fill
                unoptimized
                className="object-cover scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 px-4 pt-16 lg:pt-24 flex flex-col items-center max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Kenya's Premier Titled Land Developer
          </div>

          <div className="min-h-[14rem] md:min-h-[16rem] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 uppercase text-white drop-shadow-lg">
                  {slide?.text}
                </h1>
                <p className="max-w-3xl text-base sm:text-xl text-slate-200 font-medium leading-relaxed">
                  {slide?.subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-sm font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white shadow-xl rounded-xl transition-transform active:scale-95"
            >
              <Link href="/plots-for-sale">
                Explore Available Plots <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <BookVisitDialog>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-sm bg-white/10 hover:bg-white hover:text-slate-950 text-white font-bold uppercase tracking-wider backdrop-blur-md border-white/30 rounded-xl transition-all active:scale-95"
              >
                <Calendar className="mr-2 h-4 w-4" /> Book Site Visit
              </Button>
            </BookVisitDialog>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                i === currentSlide ? 'w-10 bg-amber-400 shadow-md' : 'w-2.5 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. INTERACTIVE SEARCH & FILTER CARD */}
      <div className="relative z-30 -mt-24 lg:-mt-32 container mx-auto px-4">
        <Card className="max-w-6xl mx-auto border border-slate-200/80 shadow-2xl rounded-3xl bg-white overflow-hidden">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'residential', label: 'Residential' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'investment', label: 'Investment & Speculation' },
                  { id: 'agricultural', label: 'Agribusiness' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Location Select */}
                <div className="md:col-span-4 flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Location / Corridor
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12 rounded-xl border-slate-200 font-semibold text-slate-800">
                      <SelectValue placeholder="All Locations in Kenya" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations (Kenya)</SelectItem>
                      <SelectItem value="Kitengela">Kitengela</SelectItem>
                      <SelectItem value="Isinya">Isinya</SelectItem>
                      <SelectItem value="Kisaju">Kisaju</SelectItem>
                      <SelectItem value="Konza">Konza Technopolis</SelectItem>
                      <SelectItem value="Juja">Juja Farm</SelectItem>
                      <SelectItem value="Ruiru">Ruiru</SelectItem>
                      <SelectItem value="Syokimau">Syokimau</SelectItem>
                      <SelectItem value="Mwea">Mwea / Karaba</SelectItem>
                      <SelectItem value="Kiserian">Kiserian / Mai Mahiu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Slider */}
                <div className="md:col-span-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Coins className="h-3.5 w-3.5 text-primary" /> Max Budget
                    </span>
                    <span className="text-primary font-black text-sm">
                      Ksh {(maxBudget / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="py-2">
                    <Slider
                      value={[maxBudget]}
                      onValueChange={(val) => setMaxBudget(val[0])}
                      min={300000}
                      max={maxListingPrice > 0 ? maxListingPrice : 5000000}
                      step={50000}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="md:col-span-3">
                  <Button
                    asChild
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-primary text-white font-bold uppercase text-xs tracking-wider shadow-md transition-all group"
                  >
                    <Link href={`/plots-for-sale?category=${selectedCategory}&location=${selectedLocation}`}>
                      <Search className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      View ({filteredShowcase.length}) Plots
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. TRUST & STATS STRIP */}
      <AnimatedSection className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Verified Landowners', value: '8,000+', icon: Handshake, desc: 'Local & Diaspora Families' },
              { label: 'Completed Subdivisions', value: '25+', icon: CheckCircle2, desc: 'Across High-Growth Corridors' },
              { label: 'Title Deeds Handed Over', value: '5,000+', icon: FileText, desc: '100% Freehold Authenticity' },
              { label: 'Years of Market Integrity', value: '11+', icon: Calendar, desc: 'Headquartered in Nairobi' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. FEATURED & FILTERED PROPERTY INVENTORY */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="h-3.5 w-3.5" /> Prime Portfolio
              </div>
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-950 uppercase">
                Featured Land <span className="text-primary">Opportunities</span>
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl font-medium text-sm sm:text-base">
                Explore handpicked parcels with beacons in place, value-add infrastructure, and ready freehold title deeds.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-slate-300 font-bold uppercase text-xs tracking-wider hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <Link href="/plots-for-sale">
                Explore Full Directory ({allProjects.length}) <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {filteredShowcase.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShowcase.slice(0, 6).map((listing, idx) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  variant={idx === 0 ? 'featured' : 'default'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
              <Compass className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 uppercase">No plots match your exact filter</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                Try widening your budget range or clearing the location filter to see more available parcels.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                  setMaxBudget(5000000);
                }}
                className="mt-6 bg-primary text-white rounded-xl font-bold uppercase text-xs"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* 5. 4-STEP LAND ACQUISITION ROADMAP */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-amber-400 text-slate-950 font-extrabold uppercase text-[10px] tracking-widest px-3 py-1 mb-4 border-none">
              Simple & Transparent
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
              Your 4-Step Journey to <span className="text-amber-400">Land Ownership</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We have eliminated the complexities of buying land in Kenya. From selection to title deed issuance, your investment is safeguarded at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Select Your Parcel',
                desc: 'Browse our verified masterplans online or consult our property specialists to pick the ideal size and location.',
                icon: MapPin,
              },
              {
                step: '02',
                title: 'Guided Site Visit',
                desc: 'Board our scheduled daily company transport from Information House Nairobi (Mon - Sun at 9:00 AM) to inspect the land in person.',
                icon: Calendar,
              },
              {
                step: '03',
                title: '10% Deposit & Due Diligence',
                desc: 'Verify the green card and cadastral survey at the Ministry of Lands registry, then secure your parcel with a 10% commitment.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'Title Deed Handover',
                desc: 'Complete payments in 6 to 12 flexible monthly installments and receive your original freehold title deed in your name.',
                icon: FileText,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between group hover:border-amber-400/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-amber-400 font-mono tracking-tighter">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <BookVisitDialog>
              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black uppercase text-xs tracking-wider shadow-xl transition-transform active:scale-95"
              >
                Schedule Your Site Visit Now
              </Button>
            </BookVisitDialog>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. INTERACTIVE 0% INSTALLMENT CALCULATOR */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Calculator Inputs */}
              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    <Calculator className="h-3.5 w-3.5" /> Budget Planner
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight mb-3">
                    Flexible Installment <span className="text-primary">Calculator</span>
                  </h2>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Estimate your monthly payments with our structured 0% interest financing. Start with as low as a 10% down payment.
                  </p>

                  <div className="space-y-6">
                    {/* Plot Price Input */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-600 mb-2">
                        <span>Plot Cash Price</span>
                        <span className="text-primary font-black text-base">
                          Ksh {calcPlotPrice.toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        value={[calcPlotPrice]}
                        onValueChange={(val) => setCalcPlotPrice(val[0])}
                        min={350000}
                        max={4500000}
                        step={50000}
                      />
                    </div>

                    {/* Deposit Percentage */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-2">
                        Down Payment / Deposit
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 30, 50].map((pct) => (
                          <button
                            key={pct}
                            onClick={() => setCalcDepositPct(pct)}
                            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                              calcDepositPct === pct
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {pct}% (Ksh {Math.round(calcPlotPrice * (pct / 100)).toLocaleString()})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Repayment Period */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-2">
                        Installment Tenure
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { months: 6, label: '6 Months' },
                          { months: 12, label: '12 Months' },
                          { months: 24, label: '24 Months' },
                        ].map((plan) => (
                          <button
                            key={plan.months}
                            onClick={() => setCalcMonths(plan.months)}
                            className={`py-3 rounded-xl text-xs font-bold transition-all ${
                              calcMonths === plan.months
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {plan.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Summary Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-primary to-orange-700 text-white p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-orange-200 mb-6">
                    Payment Plan Breakdown
                  </h3>

                  <div className="space-y-4 border-b border-white/20 pb-6 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Total Plot Value</span>
                      <span className="font-bold">Ksh {calcPlotPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Initial Deposit ({calcDepositPct}%)</span>
                      <span className="font-bold">Ksh {depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Balance to Finance</span>
                      <span className="font-bold">Ksh {loanBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Interest Rate</span>
                      <span className="font-bold text-amber-300">0% (Zero Interest)</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span className="text-xs uppercase font-bold text-orange-200 block mb-1">
                      Estimated Monthly Payment
                    </span>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                      Ksh {monthlyPayment.toLocaleString()}
                      <span className="text-sm font-medium text-orange-200"> /mo</span>
                    </div>
                    <p className="text-xs text-orange-100 mt-2">
                      Spread over {calcMonths} monthly payments of Ksh {monthlyPayment.toLocaleString()}.
                    </p>
                  </div>
                </div>

                <BookVisitDialog>
                  <Button
                    size="lg"
                    className="w-full h-13 rounded-xl bg-white text-slate-950 hover:bg-amber-400 font-bold uppercase text-xs tracking-wider shadow-lg transition-all"
                  >
                    Lock In This Payment Plan
                  </Button>
                </BookVisitDialog>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. PRIME KENYA CORRIDORS SPOTLIGHT */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary font-bold uppercase text-[10px] tracking-widest px-3 py-1 mb-4">
              Strategic Growth Corridors
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight mb-4">
              Explore Land By <span className="text-primary">Prime Location</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We position our projects in Kenya's fastest-appreciating nodes, ensuring rapid capital appreciation and ready access to utilities and highways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_LOCATIONS.map((loc, idx) => (
              <Link
                key={idx}
                href={`/plots-for-sale?location=${loc.name}`}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-slate-900 font-bold text-[10px] uppercase tracking-wide backdrop-blur-sm">
                    {loc.count}
                  </Badge>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{loc.name}</span>
                    <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">{loc.highlight}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 8. INDUSTRY AWARDS & LEADERSHIP RECOGNITION */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-amber-400 text-slate-950 font-extrabold uppercase text-[10px] tracking-widest px-3 py-1 mb-4 border-none">
              Industry Excellence
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
              Awards & National <span className="text-amber-400">Recognition</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Consistently recognized by industry bodies for operational transparency, title deed authenticity, and customer-first land ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AWARDS.map((award) => (
              <div
                key={award.id}
                className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300"
              >
                <div className="relative h-64 w-full bg-slate-800">
                  <Image
                    src={award.imageUrl}
                    alt={award.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <Badge className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                    {award.year}
                  </Badge>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {award.organization}
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                      {award.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 9. TESTIMONIALS & VERIFIED CLIENT REVIEWS */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Verified Buyers
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight">
                What Landowners <span className="text-primary">Say About Us</span>
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl font-medium text-sm sm:text-base">
                Real accounts from Kenyan residents and diaspora investors who secured their plots and title deeds with Sunpak Estate.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-slate-300 font-bold uppercase text-xs tracking-wider hover:bg-primary hover:text-white transition-all"
            >
              <Link href="/testimonials">
                Read All Testimonials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                className="border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 bg-slate-50"
              >
                <div>
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase">{t.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <MapPin className="h-3 w-3 text-primary" /> {t.location}
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[9px] uppercase tracking-wider">
                    Verified Title
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 10. HIGH-IMPACT FINAL CTA & PICKUP DETAILS */}
      <AnimatedSection className="py-20 lg:py-28 bg-gradient-to-br from-primary via-orange-600 to-amber-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-white/20 text-white font-extrabold uppercase text-[10px] tracking-widest px-4 py-1.5 mb-6 backdrop-blur-sm border border-white/30">
            Daily Guided Site Tours
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Ready to Secure Your Plot in Kenya?
          </h2>
          <p className="text-white/90 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            Join our scheduled daily site visits. We depart daily from our Nairobi CBD offices at Information House, 2nd Floor, Suite A4.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <BookVisitDialog>
              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black uppercase text-xs tracking-wider shadow-2xl transition-transform active:scale-95"
              >
                <Calendar className="mr-2 h-4 w-4" /> Book Site Visit Now
              </Button>
            </BookVisitDialog>

            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black uppercase text-xs tracking-wider shadow-2xl transition-transform active:scale-95"
            >
              <Link href="https://wa.me/254790011042?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects." target="_blank">
                <Phone className="mr-2 h-4 w-4 text-primary" /> WhatsApp Val (0790 011 042)
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-14 px-10 rounded-xl bg-slate-900/90 text-white hover:bg-slate-950 font-black uppercase text-xs tracking-wider shadow-2xl transition-transform active:scale-95 border border-white/20"
            >
              <Link href="https://wa.me/254790611601?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects." target="_blank">
                <Phone className="mr-2 h-4 w-4 text-emerald-400" /> WhatsApp James (0790 611 601)
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-xs font-bold uppercase tracking-wider text-white/80">
            Information House, 2nd Floor, Suite A4 • Mfangano Street Opp. Quickmart • Tel: 0790 011 042 / 0790 611 601
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
