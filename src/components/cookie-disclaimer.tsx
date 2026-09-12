'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export function CookieDisclaimer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // useEffect ensures this runs only on the client, after hydration
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === null) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Could not access local storage for cookie consent', error);
      // If localStorage is not available, don't show the banner.
    }
  }, []);

  const handleConsent = (hasConsented: boolean) => {
    try {
      localStorage.setItem('cookie_consent', String(hasConsented));
      setIsVisible(false);
    } catch (error)      {
        console.error('Could not set cookie consent in local storage', error);
        setIsVisible(false); // Hide banner even if localStorage fails
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4"
        >
          <Card className="max-w-4xl mx-auto p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-start gap-3">
                 <Cookie className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
                 <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  <Link href="/privacy-policy" className="underline hover:text-primary ml-1">
                    Read our policy
                  </Link>.
                </p>
               </div>
               <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                  <Button onClick={() => handleConsent(false)} variant="outline" className="w-full sm:w-auto">
                    Decline
                  </Button>
                  <Button onClick={() => handleConsent(true)} className="w-full sm:w-auto">
                    Accept All
                  </Button>
               </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
