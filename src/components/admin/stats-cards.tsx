'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Flame, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      title: 'TOTAL INQUIRIES',
      value: '0',
      description: 'View all submissions',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    {
      title: 'HOT LEADS',
      value: '0',
      description: 'From booking forms',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/5',
    },
    {
      title: 'WHATSAPP CLICKS',
      value: '0',
      description: 'Go to WhatsApp log',
      icon: MessageCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/5',
    },
    {
      title: 'PHONE CALLS',
      value: '0',
      description: 'Go to call log',
      icon: Phone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`${stat.bgColor} p-1.5 rounded-md`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-2 text-[10px] font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">
              {stat.description}
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
