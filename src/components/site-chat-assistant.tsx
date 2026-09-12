'use client';
import React from 'react';
import { Bot, Loader2, Send, User, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  siteAssistantChat,
  type SiteAssistantChatInput,
  type SiteAssistantChatOutput,
} from '@/ai/flows/site-assistant-flow';
import { getListings } from '@/lib/listings';
import type { LandListing } from '@/types';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});
type ChatFormData = z.infer<typeof chatSchema>;

type RecommendedListing = SiteAssistantChatOutput['recommendedListings'];

type Message = {
  role: 'user' | 'assistant';
  content: string;
  recommendedListings?: RecommendedListing;
  showContactButton?: boolean;
};

function generateGeneralWhatsAppLink(message?: string) {
    const phoneNumber = '254790611601';
    const defaultMessage = "Hello Sunpak Estate, I'm interested in booking a site visit for your land projects.";
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

function PropertyRecommendationCard({ listing }: { listing: LandListing }) {
  const listingImage = PlaceHolderImages.find(
    (img) => img.id === listing.images[0]?.id
  );
  return (
    <Link href={`/plots-for-sale/${listing.categories[0]}/${listing.id}`}>
      <Card className="mt-2 overflow-hidden transition-shadow hover:shadow-md border-primary/20">
        <div className="flex">
          <div className="relative h-20 w-20 flex-shrink-0">
            {listingImage && (
              <Image
                src={listingImage.imageUrl || `https://picsum.photos/seed/${listing.id}/200/200`}
                alt={listing.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            )}
          </div>
          <div className="p-2">
            <h4 className="font-semibold text-xs">{listing.name}</h4>
            <p className="text-sm font-bold text-primary">
              Ksh {listing.price.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {listing.location} &bull; {listing.size}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function SiteChatAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const allListings = getListings();

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
    const newHistory: { role: 'user' | 'assistant'; content: string }[] = messages.map(m => ({ role: m.role, content: m.content }));
    newHistory.push({ role: 'user', content: userMessage });

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    form.reset();

    try {
      const assistantResponse = await siteAssistantChat({
        chatHistory: newHistory,
        listings: allListings,
      } as SiteAssistantChatInput);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantResponse.answer,
          recommendedListings: assistantResponse.recommendedListings,
          showContactButton: assistantResponse.showContactButton
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please reach out to us via WhatsApp for assistance.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-[350px] shadow-2xl border-primary/20">
              <CardHeader className="flex flex-row items-start justify-between bg-primary text-primary-foreground rounded-t-lg p-4">
                <div className="space-y-1">
                  <CardTitle className="font-headline flex items-center gap-2 text-lg">
                    <Bot className="h-5 w-5" />
                    Sunpak Estate Advisor
                  </CardTitle>
                  <CardDescription className="text-[10px] text-primary-foreground/80 leading-tight">
                    Ask about titles, site visits, and financing.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[380px] flex flex-col p-4">
                  <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                      {messages.length === 0 && (
                        <div className="flex items-start gap-4 text-sm">
                          <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                            <AvatarFallback>
                              <Bot size={18} />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg max-w-[240px]">
                            <p>
                              Hello! Welcome to Sunpak Estate. Are you looking for land for a home, business, or investment? I'm here to help!
                            </p>
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
                            className={`rounded-lg max-w-[240px] ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground p-3'
                                : 'bg-muted'
                            }`}
                          >
                             <div className={message.role === 'user' ? '' : 'p-3'}>
                                <p>{message.content}</p>
                            </div>
                            {message.recommendedListings &&
                              message.recommendedListings.length > 0 && (
                                <div className="mt-2 space-y-2 p-3 pt-0">
                                  {message.recommendedListings.map(
                                    (rec) => {
                                      const listing = allListings.find(l => l.id === rec.id);
                                      return listing ? <PropertyRecommendationCard key={rec.id} listing={listing}/> : null;
                                    }
                                  )}
                                </div>
                              )}
                             {message.showContactButton && (
                                <Button asChild className="w-full mt-3 bg-accent text-accent-foreground hover:bg-accent/90 h-9">
                                     <Link href={generateGeneralWhatsAppLink(messages[messages.length-2]?.content)} target="_blank">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Book Site Visit
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
                            <AvatarFallback>
                              <Bot size={18} />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg max-w-sm">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="mt-4 pt-4 border-t">
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex gap-2"
                    >
                      <Textarea
                        {...form.register('message')}
                        placeholder="Ask about titles or projects..."
                        className="min-h-0 flex-1 py-2 text-sm"
                        rows={1}
                        disabled={isLoading}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                      <Button type="submit" size="icon" disabled={isLoading} className="h-9 w-9 bg-primary hover:bg-primary/90">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-transform hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        <span className="sr-only">Toggle Chat</span>
      </Button>
    </>
  );
}
