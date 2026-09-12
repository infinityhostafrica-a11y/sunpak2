'use client';
export const dynamic = 'force-dynamic';
import { getListingById } from '@/lib/listings';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import {
  CheckCircle,
  ChevronRight,
  MapPin,
  Maximize,
  FileText,
  Bot,
  Send,
  Loader2,
  User,
  Phone,
  Landmark,
  ShieldCheck,
  TreePine,
  Layers,
  Calculator,
  ZoomIn,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import type { LandListing } from '@/types';
import { propertyChat } from '@/ai/flows/property-chat-flow';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AnimatedSection } from '@/components/animated-section';
import { LoanCalculator } from '@/components/loan-calculator';
import { BookVisitDialog } from '@/components/book-visit-dialog';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ListingPageProps = {
  params: Promise<{
    id: string;
    category: string;
  }>;
};

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});
type ChatFormData = z.infer<typeof chatSchema>;

function ListingChatAssistant({ listing, pageUrl }: { listing: LandListing, pageUrl: string }) {
  const [messages, setMessages] = React.useState<
    { role: 'user' | 'assistant'; content: string; showContactButton?: boolean; }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  async function onSubmit(data: ChatFormData) {
    const userMessage = data.message;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    form.reset();

    try {
      const assistantResponse = await propertyChat({
        question: userMessage,
        listing: listing,
      });
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantResponse.answer,
          showContactButton: assistantResponse.showContactButton,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please contact us directly for more information.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="h-full border-primary/20">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="font-headline flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5" />
          Land Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[400px] flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                 <div className="flex items-start gap-4 text-sm">
                  <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg max-w-sm">
                    <p>Hello! I'm the Sunpak Estate advisor. Ask me anything about the {listing.name} project, payment plans, or site visits!</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 text-sm ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                      <AvatarFallback>
                        <Bot size={18} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg max-w-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground p-3'
                        : 'bg-muted'
                    }`}
                  >
                     <div className={message.role === 'user' ? '' : 'p-3'}>
                        <p>{message.content}</p>
                     </div>
                     {message.showContactButton && (
                        <BookVisitDialog propertyId={listing.id} propertyName={listing.name}>
                          <Button className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90">
                            <Phone className="mr-2 h-4 w-4" />
                            Book Site Visit
                          </Button>
                        </BookVisitDialog>
                     )}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback>
                        <User size={18} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4 text-sm">
                  <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg max-w-sm">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
           <Separator className="my-4" />
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <Textarea
              {...form.register('message')}
              placeholder={`Ask about financing or titles...`}
              className="min-h-0 flex-1"
              rows={1}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ListingDetailPage({ params: paramsProp }: ListingPageProps) {
  const params = React.use(paramsProp);
  const db = useFirestore();
  const listingRef = useMemoFirebase(() => doc(db, 'vehicles', params.id), [db, params.id]);
  const { data: dbListing, isLoading: dbLoading } = useDoc(listingRef);
  
  const staticListing = getListingById(params.id);
  const listing = dbListing || staticListing;

  const [mainImageIndex, setMainImageIndex] = React.useState(0);
  const [pageUrl, setPageUrl] = React.useState('');

  React.useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  if (dbLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!listing) {
    notFound();
  }

  const specIcons: Record<string, React.ElementType> = {
    'Size': Maximize,
    'Title Status': FileText,
    'Distance from Road': MapPin,
    'Water': Layers,
    'Electricity': ShieldCheck,
    'Soil Type': TreePine,
    'Topography': Layers,
  };

  const currentImage = listing.images[mainImageIndex];
  const currentImageUrl = currentImage?.url || PlaceHolderImages.find(p => p.id === currentImage?.id)?.imageUrl || '';
  
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection>
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/listings" className="hover:text-primary">Projects</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">{listing.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl bg-muted cursor-zoom-in group">
                  {currentImageUrl && (
                    <Image
                      src={currentImageUrl}
                      alt={listing.name}
                      fill
                      unoptimized
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden flex flex-col border-none bg-zinc-950">
                <DialogHeader className="p-6 border-b border-white/10 shrink-0 bg-zinc-900 text-white">
                  <DialogTitle className="font-headline text-2xl font-black uppercase tracking-tight">
                    {listing.name} - Project Gallery
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12">
                  {listing.images.map((img: any, idx: number) => {
                    const url = img.url || PlaceHolderImages.find(p => p.id === img.id)?.imageUrl;
                    return url ? (
                      <div key={idx} className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <img 
                          src={url} 
                          alt={`${listing.name} - View ${idx + 1}`} 
                          className="w-full h-auto rounded-xl shadow-2xl bg-zinc-900 ring-1 ring-white/10"
                        />
                        <Badge variant="outline" className="text-white border-white/20 bg-white/5 px-4 py-1 font-bold">
                          View {idx + 1} of {listing.images.length}
                        </Badge>
                      </div>
                    ) : null;
                  })}
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-4">
              {listing.images.map((img: any, idx: number) => {
                const url = img.url || PlaceHolderImages.find(p => p.id === img.id)?.imageUrl;
                return url ? (
                  <button
                    key={idx}
                    className={`relative aspect-video w-full overflow-hidden rounded-md transition-all ${
                      mainImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setMainImageIndex(idx)}
                  >
                    <Image src={url} alt="Thumbnail" fill unoptimized className="object-cover" />
                  </button>
                ) : null;
              })}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <Badge className="w-fit bg-primary text-white font-black px-3 py-1 mb-2">
              {listing.categoryDisplayName}
            </Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tight mt-2">{listing.name}</h1>
            <p className="mt-4 text-3xl font-black text-primary">Kes. {listing.price.toLocaleString()}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed font-medium">{listing.description}</p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-primary/5">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-black uppercase text-sm tracking-tight capitalize">{listing.location}</span>
              </div>
              <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-primary/5">
                <Maximize className="h-5 w-5 text-primary" />
                <span className="font-black uppercase text-sm tracking-tight">{listing.size}</span>
              </div>
              <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-primary/5">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="font-black uppercase text-sm tracking-tight">{listing.titleStatus} Title Deed</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <BookVisitDialog propertyId={listing.id} propertyName={listing.name}>
                <Button size="lg" className="flex-1 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 h-14 shadow-lg">
                  Book Site Visit
                </Button>
              </BookVisitDialog>
              <Button size="lg" variant="outline" className="flex-1 font-black uppercase tracking-widest h-14 border-primary/20" asChild>
                <Link href="https://wa.me/254790611601?text=I'd like to discuss financing for Sunpak Estate land projects." target="_blank">
                  Request Financing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <AnimatedSection className="lg:col-span-2">
          <h2 className="font-headline text-3xl font-black uppercase tracking-tight mb-8">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listing.specs.map((specGroup: any) => (
              <Card key={specGroup.groupName} className="h-full border-primary/10 shadow-sm">
                <CardHeader className="pb-3 border-b bg-muted/20">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">{specGroup.groupName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Table>
                    <TableBody>
                      {specGroup.specs.map((spec: any) => {
                        const Icon = specIcons[spec.name] || Layers;
                        return (
                          <TableRow key={spec.name} className="hover:bg-transparent border-none">
                            <TableCell className="font-bold flex items-center gap-2 text-muted-foreground py-2">
                              <Icon className="h-4 w-4 text-primary/60" />
                              {spec.name}
                            </TableCell>
                            <TableCell className="text-right font-black py-2">{spec.value}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
            
            <Card className="h-full border-primary/10 shadow-sm">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-sm font-black uppercase tracking-widest">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="grid grid-cols-1 gap-y-3">
                  {listing.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2 text-sm font-bold">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="font-headline text-3xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <Calculator className="text-primary h-8 w-8" /> 
                Financing Calculator
            </h2>
            <LoanCalculator listing={listing} />
          </div>
        </AnimatedSection>

        <AnimatedSection className="lg:col-span-1">
          <ListingChatAssistant listing={listing} pageUrl={pageUrl} />
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-24 bg-primary text-white rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <Landmark className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Flexible Installment Plans Available</h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Own this plot with a down payment as low as 10% and pay the balance in up to 12 monthly installments.
            Our financing options are designed to help every Kenyan become a land owner.
          </p>
          <BookVisitDialog propertyId={listing.id} propertyName={listing.name}>
            <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 h-16 px-12 text-lg font-black uppercase tracking-widest shadow-xl">
              Book Site Visit
            </Button>
          </BookVisitDialog>
        </div>
      </AnimatedSection>
    </div>
  );
}
