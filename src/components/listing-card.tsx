import type { LandListing } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { MapPin, Maximize, FileText, ArrowUpRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type ListingCardProps = {
  listing: LandListing;
  variant?: 'default' | 'featured';
};

export default function ListingCard({ listing, variant = 'default' }: ListingCardProps) {
  const firstImg = listing.images[0];
  const listingImageUrl = firstImg?.url || PlaceHolderImages.find((img) => img.id === firstImg?.id)?.imageUrl || '';
  const primaryCategory = listing.categories?.[0] || 'residential';
  const isFeatured = variant === 'featured';

  // 12-month installment estimate with 10% deposit
  const deposit = Math.round(listing.price * 0.10);
  const monthlyEstimate = Math.round((listing.price - deposit) / 12);

  return (
    <Card className={cn(
      "group flex flex-col overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30",
      isFeatured ? "h-full rounded-3xl" : "h-full rounded-2xl"
    )}>
      <CardHeader className="relative p-0 overflow-hidden">
        <Link href={`/plots-for-sale/${primaryCategory}/${listing.id}`}>
          <div className={cn(
            "relative w-full overflow-hidden bg-slate-100",
            isFeatured ? "h-[380px]" : "h-60"
          )}>
            {listingImageUrl ? (
              <Image
                src={listingImageUrl}
                alt={listing.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full bg-slate-100"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            
            <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
              <Badge className="bg-primary text-white border-none font-bold uppercase text-[10px] tracking-wider px-2.5 py-1 shadow-md">
                {listing.categoryDisplayName || 'Prime Plot'}
              </Badge>
              {isFeatured && (
                <Badge className="bg-amber-400 text-slate-950 border-none font-extrabold uppercase text-[9px] tracking-wider px-2.5 py-1 shadow-md flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Featured
                </Badge>
              )}
            </div>

            <div className="absolute right-4 top-4 z-10">
              <Badge className="bg-emerald-600/90 text-white border-none font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 backdrop-blur-sm flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Ready Title
              </Badge>
            </div>

            <div className="absolute bottom-4 right-4 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-lg">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white z-10">
              <span className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" /> {listing.location}
              </span>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-900 tracking-tight leading-snug uppercase group-hover:text-primary transition-colors line-clamp-1 mb-2">
            <Link href={`/plots-for-sale/${primaryCategory}/${listing.id}`}>
              {listing.name}
            </Link>
          </h3>

          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="text-2xl font-black text-slate-950 tracking-tight">
                Ksh {listing.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-medium ml-1.5">cash / bank</span>
            </div>
          </div>

          {/* Installment calculation pill */}
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 mb-4 flex items-center justify-between text-[11px]">
            <span className="text-amber-900 font-medium">10% Deposit (Ksh {deposit.toLocaleString()})</span>
            <span className="text-primary font-bold">~Ksh {monthlyEstimate.toLocaleString()}/mo</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-slate-600">
          <div className="flex items-center gap-1.5 text-xs">
            <Maximize className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="font-semibold text-slate-800">{listing.size}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="font-semibold text-slate-800">{listing.titleStatus || 'Freehold Title'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Button asChild className="w-full h-11 rounded-xl bg-slate-900 hover:bg-primary text-white font-bold uppercase text-[11px] tracking-wider transition-all">
          <Link href={`/plots-for-sale/${primaryCategory}/${listing.id}`}>
            View Plot Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
