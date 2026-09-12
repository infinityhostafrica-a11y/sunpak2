"use client";

import Link from 'next/link';
import { Logo } from '../logo';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  Menu,
  Search,
  LayoutDashboard,
  Lock,
  ImageIcon,
  PhoneCall,
  HelpCircle,
  Megaphone,
  Briefcase,
  PlayCircle,
  Newspaper,
  ShieldCheck,
  CalendarCheck,
  Award,
  Phone,
  Sparkles,
} from 'lucide-react';
import React from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { useUser } from '@/firebase';
import { BookVisitDialog } from '../book-visit-dialog';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const infoCenterLinks = [
  { href: '/blogs', label: 'Blogs & Insights', icon: Newspaper, description: 'Land acquisition guides, property market trends, and updates.' },
  { href: '/gallery', label: 'Gallery & Site Visits', icon: ImageIcon, description: 'Visual archive of client site visits and plot title handovers.' },
  { href: '/testimonials', label: 'Client Testimonials', icon: Award, description: 'Hear from local and diaspora landowners.' },
  { href: '/info/faqs', label: 'Title Deed & FAQ', icon: HelpCircle, description: 'Common inquiries on registry verification, payment plans, and transfers.' },
  { href: '/info/virtual-tours', label: 'Virtual Plot Tours', icon: PlayCircle, description: 'Inspect prime parcels remotely before booking your site visit.' },
  { href: '/info/updates-and-events', label: 'Company News', icon: Megaphone, description: 'New project launches, price drops, and title deed events.' },
  { href: '/contact', label: 'Contact Us', icon: PhoneCall, description: 'Visit Information House, 2nd Floor, Suite A4, Nairobi.' },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plots-for-sale', label: 'All Projects' },
  { href: '/about', label: 'About Us' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isAdmin = user?.email === 'eternetnetworkskenya@gmail.com';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-white border-b border-white/10 text-[11px] py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="flex items-center gap-1.5 font-bold text-amber-400 shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              100% Ready Freehold Title Deeds
            </span>
            <span className="hidden md:inline-block text-white/30">•</span>
            <span className="hidden md:flex items-center gap-1 text-white/80 font-medium">
              <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" />
              Daily Site Visits (Mon - Sun, 9:00 AM)
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="tel:0790011042" 
              className="flex items-center gap-1.5 font-black text-amber-400 hover:text-white transition-colors text-xs"
            >
              <Phone className="h-3 w-3" />
              <span>0790 011 042</span>
            </Link>
            <span className="text-white/30">•</span>
            <Link 
              href="tel:0790611601" 
              className="flex items-center gap-1 font-black text-amber-400 hover:text-white transition-colors text-xs"
            >
              <span>0790 611 601</span>
            </Link>
            <span className="text-white/30 hidden sm:inline-block">•</span>
            <span className="hidden sm:inline-block text-white/60 text-[10px]">
              Information House, Nairobi
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuLink asChild>
                      <Link 
                        href={link.href} 
                        className={cn(
                          navigationMenuTriggerStyle(), 
                          "font-bold text-sm text-slate-700 hover:text-primary hover:bg-primary/5 transition-colors rounded-xl px-4 py-2"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-sm text-slate-700 hover:text-primary hover:bg-primary/5 rounded-xl px-4 py-2">
                    Information Center
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[480px] gap-2 p-4 md:w-[600px] md:grid-cols-2">
                      {infoCenterLinks.map((link) => (
                        <ListItem
                          key={link.label}
                          title={link.label}
                          href={link.href}
                          icon={link.icon}
                        >
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="ghost" asChild size="icon" className="text-slate-500 hover:text-primary hover:bg-primary/10 ml-2 rounded-xl">
              <Link href="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search Land</span>
              </Link>
            </Button>

            {isAdmin ? (
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white font-bold ml-2 rounded-xl text-xs">
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" asChild size="icon" className="text-slate-400 hover:text-primary rounded-xl">
                <Link href="/admin/login">
                  <Lock className="h-4 w-4" />
                  <span className="sr-only">Admin Login</span>
                </Link>
              </Button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <BookVisitDialog>
              <Button 
                variant="default" 
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-black shadow-lg uppercase text-xs tracking-wider px-6 h-11 rounded-xl transition-transform active:scale-95"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Book Site Visit
              </Button>
            </BookVisitDialog>

            <div className="lg:hidden flex items-center gap-2">
              <Button variant="outline" asChild size="icon" className="rounded-xl border-slate-200">
                <Link href="/search">
                  <Search className="h-4 w-4 text-slate-700" />
                </Link>
              </Button>
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6 text-slate-800" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-md">
                  <SheetHeader className="mb-6 border-b pb-4">
                    <SheetTitle>
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full pb-24">
                    <div className="flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <Button 
                          key={link.label} 
                          variant="ghost" 
                          className="justify-start hover:text-primary font-bold text-base h-12" 
                          asChild
                          onClick={closeMenu}
                        >
                          <Link href={link.href}>{link.label}</Link>
                        </Button>
                      ))}
                      
                      <div className="my-2 border-t pt-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 mb-3">
                          Information Center
                        </p>
                        <div className="grid grid-cols-1 gap-1 pl-2">
                          {infoCenterLinks.map((link) => (
                            <Button 
                              key={link.label} 
                              variant="ghost" 
                              className="justify-start hover:text-primary font-medium text-sm h-auto py-2.5 rounded-lg" 
                              asChild
                              onClick={closeMenu}
                            >
                              <Link href={link.href} className="flex items-center gap-3">
                                <link.icon className="h-4 w-4 text-primary shrink-0" />
                                <span>{link.label}</span>
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-3">
                        {isAdmin ? (
                          <Button 
                            variant="outline" 
                            className="w-full justify-center border-primary text-primary font-bold" 
                            asChild
                            onClick={closeMenu}
                          >
                            <Link href="/admin/dashboard">
                              <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                            </Link>
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-slate-400 font-bold text-xs" 
                            asChild
                            onClick={closeMenu}
                          >
                            <Link href="/admin/login">
                              <Lock className="mr-2 h-3.5 w-3.5" /> Staff Login
                            </Link>
                          </Button>
                        )}
                        <BookVisitDialog>
                          <Button 
                            variant="default" 
                            className="bg-primary text-white font-black uppercase text-xs w-full h-12 shadow-lg rounded-xl"
                            onClick={closeMenu}
                          >
                            Book Site Visit
                          </Button>
                        </BookVisitDialog>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLinkPrimitive asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-primary/5 focus:bg-primary/5",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-primary">
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-slate-500 font-medium mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLinkPrimitive>
    </li>
  );
});
ListItem.displayName = "ListItem";
