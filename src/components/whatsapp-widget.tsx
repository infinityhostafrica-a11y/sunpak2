'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AGENTS = [
  {
    name: 'Val',
    role: 'Real Estate Consultant',
    number: '254790011042',
    avatar: 'https://picsum.photos/seed/val/100/100',
  },
  {
    name: 'James',
    role: 'Real Estate Consultant',
    number: '254790611601',
    avatar: 'https://picsum.photos/seed/james/100/100',
  },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    // Show a small prompt after 3 seconds if not open
    const timer = setTimeout(() => {
      if (!isOpen) setShowPrompt(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-100 mb-2"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-6 text-white relative">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight">Start a Conversation</h3>
                  <p className="text-sm text-white/90 mt-1">Hi! Click one of our members below to chat on <span className="font-bold">WhatsApp</span></p>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="p-4 bg-[#f0f2f5] space-y-3">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">The team typically replies in a few minutes.</p>
              
              {AGENTS.map((agent) => (
                <a
                  key={agent.number}
                  href={`https://wa.me/${agent.number}?text=${encodeURIComponent("Hello Sunpak Estate, I'm interested in your land projects.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-3 rounded-xl hover:bg-gray-50 transition-colors group shadow-sm border-l-4 border-l-[#25D366]"
                >
                  <Avatar className="h-12 w-12 border border-gray-100 shrink-0">
                    <Image src={agent.avatar} alt={agent.name} width={48} height={48} className="object-cover" />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">{agent.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{agent.role}</p>
                  </div>
                  <div className="text-[#25D366] opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 pointer-events-auto">
        <AnimatePresence>
          {showPrompt && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-full py-2 px-4 shadow-xl border border-gray-100 text-[10px] font-black uppercase tracking-tighter text-gray-800"
            >
              For Land Inquiry, <span className="text-primary">Chat With Us</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          onClick={toggleWidget}
          className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${
            isOpen ? 'bg-gray-800 hover:bg-gray-900' : 'bg-[#25D366] hover:bg-[#20bd5c]'
          }`}
          size="icon"
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}