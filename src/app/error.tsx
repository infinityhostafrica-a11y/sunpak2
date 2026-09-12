'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-7xl font-extrabold tracking-tight text-destructive">Error</h1>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Something went wrong!
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          An unexpected error occurred. Please try reloading the page or go back home.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
