'use client';

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Inbox, 
  FileText, 
  Flame, 
  Calendar, 
  Mail, 
  Phone,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AnimatedSection } from '@/components/animated-section';

export default function SubmissionsPage() {
  const db = useFirestore();
  const bookingsQuery = useMemoFirebase(() => query(collection(db, 'bookings'), orderBy('createdAt', 'desc')), [db]);
  const { data: bookings, isLoading } = useCollection(bookingsQuery);

  const stats = React.useMemo(() => {
    if (!bookings) return { contact: 0, loans: 0, hot: 0, total: 0 };
    return {
      contact: bookings.length,
      loans: 0,
      hot: bookings.filter((b: any) => b.leadType === 'Hot').length,
      total: bookings.length
    };
  }, [bookings]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground mt-1 text-sm">View incoming site visit bookings and inquiries.</p>
        </div>
        <Select defaultValue="all-time">
          <SelectTrigger className="w-[180px] bg-card border shadow-sm font-bold text-xs uppercase">
            <SelectValue placeholder="Filter period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Booking Inquiries', value: stats.contact, icon: Inbox, color: 'text-primary' },
          { label: 'Financing Apps', value: stats.loans, icon: FileText, color: 'text-muted-foreground' },
          { label: 'Hot Leads', value: stats.hot, icon: Flame, color: 'text-orange-500' },
          { label: 'Total Volume', value: stats.total, icon: Calendar, color: 'text-blue-500' },
        ].map((stat, i) => (
          <Card key={i} className="bg-card border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="bg-muted/50 p-1 border h-auto mb-8">
          <TabsTrigger value="contact" className="px-6 py-2 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-card">
            Site Visit Bookings
          </TabsTrigger>
          <TabsTrigger value="loans" className="px-6 py-2 font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-card">
            Financing Leads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-0">
          <Card className="border-none shadow-xl bg-card overflow-hidden">
            <CardHeader className="pb-4 bg-muted/20 border-b">
              <CardTitle className="text-xl font-black uppercase tracking-tight">Active Inquiries</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Incoming site visit requests captured from project pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : bookings && bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12">Date</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12">Customer</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12">Contact Info</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12">Property Interested</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12 text-center">Lead Status</TableHead>
                        <TableHead className="text-[10px] font-black uppercase tracking-wider h-12">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking: any) => (
                        <TableRow key={booking.id} className="cursor-pointer group hover:bg-muted/30 transition-colors">
                          <TableCell className="py-4">
                            <div className="text-xs font-black">
                              {booking.createdAt ? format(new Date(booking.createdAt), 'MMM d, yyyy') : 'N/A'}
                            </div>
                            <div className="text-[10px] text-muted-foreground font-bold">
                              {booking.createdAt ? format(new Date(booking.createdAt), 'h:mm a') : ''}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs font-black text-primary uppercase leading-tight">
                              {booking.fullName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-[11px] font-bold flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {booking.email}
                            </div>
                            <div className="text-[11px] font-black flex items-center gap-1.5 mt-1 text-foreground">
                              <Phone className="h-3 w-3 text-primary" />
                              {booking.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">
                                {booking.propertyName || 'General Inquiry'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm",
                                booking.leadType === 'Hot' ? "bg-red-600 hover:bg-red-700 text-white" :
                                booking.leadType === 'Warm' ? "bg-primary hover:bg-primary/90 text-white" :
                                "bg-zinc-800 hover:bg-zinc-900 text-white"
                              )}
                            >
                              {booking.leadType || 'Warm'} Lead
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded border inline-block">
                              Visit: {booking.visitDate}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="bg-muted p-6 rounded-full mb-4">
                    <Inbox className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">No Inquiries Found</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto font-bold uppercase tracking-wider mt-2">
                    New site visit bookings from your property pages will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="mt-0">
          <Card className="border-none shadow-xl bg-card py-32 text-center">
            <CardContent>
              <FileText className="h-16 w-16 text-muted-foreground/10 mx-auto mb-6" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Financing Dashboard</h3>
              <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto font-bold uppercase tracking-widest leading-relaxed">
                This secure portal is being integrated with our financing partners to allow for seamless credit vetting and installment tracking.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
