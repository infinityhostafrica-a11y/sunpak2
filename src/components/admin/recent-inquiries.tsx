'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Inbox } from 'lucide-react';

const inquiries: any[] = [];

export function RecentInquiries() {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Inquiries</CardTitle>
        <CardDescription>
          The 5 most recent site visit booking submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {inquiries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold text-xs uppercase">Name</TableHead>
                <TableHead className="font-bold text-xs uppercase">Product</TableHead>
                <TableHead className="font-bold text-xs uppercase">Lead</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="font-bold text-sm">{inquiry.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{inquiry.date}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold rounded-md bg-muted/30">
                      {inquiry.product}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[9px] font-bold uppercase rounded-md px-2",
                        inquiry.leadStatus === 'Hot Lead' ? "bg-red-500 hover:bg-red-600" :
                        inquiry.leadStatus === 'Warm Lead' ? "bg-blue-500 hover:bg-blue-600" :
                        "bg-slate-500 hover:bg-slate-600"
                      )}
                    >
                      {inquiry.leadStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
            <Inbox className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">No recent inquiries found.</p>
            <p className="text-xs text-muted-foreground/60">New submissions will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
