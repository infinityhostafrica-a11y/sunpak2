
'use client';

import React from 'react';
import { StatsCards } from '@/components/admin/stats-cards';
import { RecentInquiries } from '@/components/admin/recent-inquiries';
import { InteractiveLeads } from '@/components/admin/interactive-leads';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Phone, 
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">A high-level overview of all site activity.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Site
          </Link>
        </Button>
      </div>

      <AnimatedSection>
        <StatsCards />
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatedSection delay={0.1}>
            <RecentInquiries />
          </AnimatedSection>
        </div>
        <div>
          <AnimatedSection delay={0.2}>
            <InteractiveLeads />
          </AnimatedSection>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="secondary" className="h-16 text-md font-semibold" asChild>
          <Link href="/admin/submissions">
            <FileText className="mr-2 h-5 w-5" />
            All Submissions
          </Link>
        </Button>
        <Button variant="secondary" className="h-16 text-md font-semibold" asChild>
          <Link href="/admin/whatsapp">
            <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
            WhatsApp Leads
          </Link>
        </Button>
        <Button variant="secondary" className="h-16 text-md font-semibold" asChild>
          <Link href="/admin/calls">
            <Phone className="mr-2 h-5 w-5 text-blue-500" />
            Phone Leads
          </Link>
        </Button>
        <Button variant="secondary" className="h-16 text-md font-semibold" asChild>
          <Link href="/admin/listings">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Manage Listings
          </Link>
        </Button>
      </div>
    </div>
  );
}
