'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getListings } from '@/lib/listings';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const visitFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  propertyId: z.string().min(1, 'Please select a property'),
  visitDate: z.string().min(1, "A date of visit is required."),
});

type VisitFormValues = z.infer<typeof visitFormSchema>;

interface BookVisitDialogProps {
  children: React.ReactNode;
  propertyId?: string;
  propertyName?: string;
}

export function BookVisitDialog({ children, propertyId, propertyName }: BookVisitDialogProps) {
  const [open, setOpen] = React.useState(false);
  const db = useFirestore();
  const { toast } = useToast();
  const listings = getListings();

  const form = useForm<VisitFormValues>({
    resolver: zodResolver(visitFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      propertyId: propertyId || '',
      visitDate: '',
    },
  });

  function onSubmit(data: VisitFormValues) {
    const selectedListing = listings.find(l => l.id === data.propertyId);
    const bookingPayload = {
      ...data,
      visitTime: '9:00 AM',
      propertyName: selectedListing?.name || propertyName || 'General Inquiry',
      status: 'New',
      leadType: 'Warm',
      createdAt: new Date().toISOString(),
    };
    
    const colRef = collection(db, 'bookings');
    addDoc(colRef, bookingPayload)
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: bookingPayload,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({
      title: 'Booking Initiated',
      description: 'Your request is being synchronized with our team.',
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 border-none rounded-none shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">
        <DialogHeader className="bg-primary p-8 pb-6 shrink-0 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <DialogTitle className="text-3xl font-black uppercase tracking-tight relative z-10">
            Schedule Site Visit
          </DialogTitle>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1 relative z-10">
            Site visits daily (Monday - Monday) at 9:00 AM.
          </p>
        </DialogHeader>
        <div className="bg-white px-8 pb-12 pt-8 overflow-y-auto flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="h-12 border-gray-200 focus:ring-primary rounded-lg font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="07..." {...field} className="h-12 border-gray-200 focus:ring-primary rounded-lg font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} className="h-12 border-gray-200 focus:ring-primary rounded-lg font-bold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-14 border-gray-200 rounded-lg">
                          <SelectValue placeholder="Which project shall we visit?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listings.map((listing) => {
                          const image = PlaceHolderImages.find(img => img.id === listing.images[0]?.id);
                          return (
                            <SelectItem key={listing.id} value={listing.id} className="py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                                  {image && (
                                    <Image 
                                      src={image.imageUrl} 
                                      alt={listing.name} 
                                      fill 
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm uppercase tracking-tight">{listing.name}</span>
                                  <span className="text-[10px] text-primary font-black">Ksh {listing.price.toLocaleString()}</span>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Preferred Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary pointer-events-none z-10" />
                          <input
                            type="date"
                            {...field}
                            className={cn(
                              "flex h-14 w-full rounded-lg border border-gray-200 bg-muted/30 pl-12 pr-4 py-2 text-sm font-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
                              !field.value && "text-muted-foreground"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex-1 bg-muted/50 p-4 rounded-lg border border-dashed flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Pick up Point</p>
                    <p className="text-xs font-bold">Suite A4, Info House</p>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-16 bg-primary text-white hover:bg-primary/90 font-black uppercase text-sm tracking-[0.2em] rounded-lg mt-4 shadow-xl transition-all active:scale-[0.98]"
              >
                Book Site Visit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
