
'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import { AdminSidebar } from '@/components/admin/sidebar';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const ADMIN_EMAIL = 'eternetnetworkskenya@gmail.com';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading: isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isLoading) {
      const isAuthorized = user && user.email === ADMIN_EMAIL;
      const isLoginPage = pathname === '/admin/login';

      if (isLoginPage) {
        if (isAuthorized) {
          router.replace('/admin/dashboard');
        }
      } else {
        if (!isAuthorized) {
          router.replace('/admin/login');
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verifying Authorization...</p>
        </div>
      </div>
    );
  }

  const isAuthorized = user && user.email === ADMIN_EMAIL;
  const isLoginPage = pathname === '/admin/login';

  // Handle unauthorized access to protected routes
  if (!isAuthorized && !isLoginPage) {
    return null;
  }

  // Handle authorized users on login page (they will be redirected by useEffect)
  if (isAuthorized && isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Render the login page without the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Render the dashboard with responsive sidebar for authorized users
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
