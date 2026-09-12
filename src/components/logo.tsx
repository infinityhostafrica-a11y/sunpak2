import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  const logoData = PlaceHolderImages.find(img => img.id === 'site-logo');
  const hasCustomLogo = logoData && logoData.imageUrl && logoData.imageUrl.length > 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative flex shrink-0 items-center justify-center transition-all",
        hasCustomLogo 
          ? "h-14 w-48" // Prominent sizing for the custom logo
          : "h-10 w-10 rounded-xl bg-primary shadow-lg ring-2 ring-accent/20 overflow-hidden" 
      )}>
        {hasCustomLogo ? (
          <Image 
            src={logoData.imageUrl} 
            alt="Sunpak Estate Logo" 
            fill 
            className="object-contain object-left"
            priority
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-accent animate-pulse"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        )}
      </div>
      
      {!hasCustomLogo && (
        <div className="flex flex-col items-start leading-none">
          <span className="font-headline text-xl font-black tracking-tighter text-foreground uppercase">
            Sunpak
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">
            Estate
          </span>
        </div>
      )}
    </div>
  );
}
