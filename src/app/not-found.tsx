import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-extrabold tracking-widest text-primary">404</h1>
        <div className="bg-primary text-primary-foreground px-2 text-sm rounded rotate-12 absolute translate-y-[-2rem] translate-x-[5rem] inline-block">
          Page Not Found
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Looks like you're lost
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/listings" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              View Properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
