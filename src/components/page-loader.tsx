'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './logo';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Branded loading experience duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-primary/5 blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, filter: "blur(8px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <Logo className="scale-150" />
            </motion.div>
            
            {/* Elegant Expansion Ring */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full border border-primary/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.8, 2],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
