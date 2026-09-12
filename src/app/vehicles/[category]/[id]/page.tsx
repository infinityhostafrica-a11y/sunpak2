'use client';
export const dynamic = 'force-dynamic';
import { getVehicleById } from '@/lib/vehicles';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import {
  CheckCircle,
  ChevronRight,
  Gauge,
  Palette,
  Droplets,
  Wrench,
  Cog,
  Paintbrush,
  Sparkles,
  Bot,
  Send,
  Loader2,
  User,
  Bolt,
  Calculator,
  Phone,
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
import type { Vehicle } from '@/types';
import { vehicleChat } from '@/ai/flows/vehicle-chat-flow';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { LoanCalculator } from '@/components/loan-calculator';
import { AnimatedSection } from '@/components/animated-section';

type VehiclePageProps = {
  params: Promise<{
    id: string;
    category: string;
  }>;
};

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});
type ChatFormData = z.infer<typeof chatSchema>;

function generateWhatsAppLinkForVehicle(vehicle: Vehicle, pageUrl: string) {
    const phoneNumber = '254790011042';
    
    let message = `Hello, I'm interested in the ${vehicle.name}.\n\n`;
    message += `Price: Ksh${vehicle.price.toLocaleString()}\n\n`;
    message += 'Key Specs:\n';
    vehicle.specs.forEach(specGroup => {
        specGroup.specs.slice(0, 3).forEach(spec => {
             message += `- ${spec.name}: ${spec.value}\n`;
        })
    });
    if (pageUrl) {
      message += `\nLink: ${pageUrl}`;
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}


function VehicleChatAssistant({ vehicle, pageUrl }: { vehicle: Vehicle, pageUrl: string }) {
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
      const assistantResponse = await vehicleChat({
        question: userMessage,
        vehicle,
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
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Ask AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                 <div className="flex items-start gap-4 text-sm">
                  <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg max-w-sm">
                    <p>Hello! I'm your AI car assistant. Ask me anything about the {vehicle.name}!</p>
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
                        <Button asChild className="w-full mt-3">
                             <Link href={generateWhatsAppLinkForVehicle(vehicle, pageUrl)} target="_blank">
                                <Phone className="mr-2 h-4 w-4" />
                                Contact Dealer
                             </Link>
                        </Button>
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
              placeholder={`e.g., "How does the towing capacity compare to other trucks?"`}
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
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}


export default function VehiclePage({ params: paramsProp }: VehiclePageProps) {
  const params = React.use(paramsProp);
  const vehicle = getVehicleById(params.id);
  const [mainImageId, setMainImageId] = React.useState<string | null>(
    vehicle?.images[0]?.id || null
  );

  const [pageUrl, setPageUrl] = React.useState('');

  React.useEffect(() => {
    setPageUrl(window.location.href);
  }, []);


  if (!vehicle) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find((img) => img.id === mainImageId);
  const specIcons: Record<string, React.ElementType> = {
    Range: Gauge,
    '0-100 km/h': Gauge,
    Battery: Gauge,
    'Cargo Space': Cog,
    Horsepower: Wrench,
    'Towing Capacity': Cog,
    Seating: Cog,
    'Fuel Economy': Droplets,
    'Combined MPGe': Droplets,
    'Total Horsepower': Wrench,
    'Electric Range': Gauge,
    'Fuel Tank': Droplets,
    'Top Speed': Gauge,
    Weight: Cog,
    'Charge Time': Gauge,
    Torque: Wrench,
    Payload: Cog,
    'Trunk Volume': Cog,
    Engine: Wrench,
    Motor: Bolt,
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedSection>
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/vehicles/${vehicle.categories[0]}`}
            className="hover:text-primary capitalize"
          >
            {vehicle.categoryDisplayName}s
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">{vehicle.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              {mainImage && (
                <Image
                  src={mainImage.imageUrl}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  data-ai-hint={mainImage.imageHint}
                />
              )}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-4">
              {vehicle.images.map((imageInfo) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === imageInfo.id
                );
                return image ? (
                  <button
                    key={image.id}
                    className={`relative aspect-video w-full overflow-hidden rounded-md transition-all hover:opacity-100 ${
                      mainImageId === image.id
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'opacity-70'
                    }`}
                    onClick={() => setMainImageId(image.id)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`${vehicle.name} thumbnail`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                      data-ai-hint={image.imageHint}
                    />
                  </button>
                ) : null;
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Badge>{vehicle.categoryDisplayName}</Badge>
            <h1 className="font-headline text-4xl font-bold mt-2">
              {vehicle.name}
            </h1>
            <p className="mt-2 text-3xl font-bold text-primary">
              Ksh{vehicle.price.toLocaleString()}
            </p>
            <p className="mt-4 text-muted-foreground">{vehicle.description}</p>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-muted-foreground" />
                <span>{vehicle.exteriorColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span>{vehicle.interiorColor} Interior</span>
              </div>
            </div>
            <Button size="lg" className="w-full mt-8" asChild>
              <Link href={generateWhatsAppLinkForVehicle(vehicle, pageUrl)} target="_blank">
                Contact Dealer
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                 <h2 className="font-headline text-3xl font-bold mb-6">Specifications</h2>
                 <div className="space-y-6">
                    {vehicle.specs.map(specGroup => (
                        <Card key={specGroup.groupName}>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{specGroup.groupName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                    {specGroup.specs.map((spec) => {
                                        const Icon =
                                        specIcons[spec.name as keyof typeof specIcons] || Cog;
                                        return (
                                        <TableRow key={spec.name}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                            {spec.name}
                                            </TableCell>
                                            <TableCell className="text-right">{spec.value}</TableCell>
                                        </TableRow>
                                        );
                                    })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>

          <div className="space-y-12">
             <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 columns-2">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6 flex items-center gap-3"><Calculator /> Loan Calculator</h2>
            <LoanCalculator vehicle={vehicle} />
          </div>
          <VehicleChatAssistant vehicle={vehicle} pageUrl={pageUrl} />
        </div>
      </AnimatedSection>
    </div>
  );
}
