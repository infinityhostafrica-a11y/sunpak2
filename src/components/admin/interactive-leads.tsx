'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquareOff, MessageCircle, MousePointer2, Phone } from 'lucide-react';

const interactions: any[] = [];

export function InteractiveLeads() {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Interactive Leads</CardTitle>
        <CardDescription>
          The 5 most recent WhatsApp or Phone call redirects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {interactions.length > 0 ? (
          <div className="space-y-6">
            {interactions.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className={`${item.bgColor} h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0 border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm truncate">{item.title}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
            <MessageSquareOff className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">No interactive leads yet.</p>
            <p className="text-xs text-muted-foreground/60">WhatsApp and call clicks are tracked here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
