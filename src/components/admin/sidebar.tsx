
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  List, 
  Inbox, 
  MessageCircle, 
  PhoneCall, 
  Image as ImageIcon, 
  BarChart3, 
  Target, 
  LogOut,
  Moon,
  Sun,
  Monitor,
  Newspaper,
  Menu,
  X
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAuth } from '@/firebase';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: List, label: 'Manage Listings', href: '/admin/listings' },
  { icon: Inbox, label: 'Submissions', href: '/admin/submissions', badge: 'New' },
  { icon: Newspaper, label: 'Manage Blogs', href: '/admin/blogs' },
  { icon: MessageCircle, label: 'WhatsApp Leads', href: '/admin/whatsapp' },
  { icon: PhoneCall, label: 'Call Leads', href: '/admin/calls' },
  { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Target, label: 'Marketing', href: '/admin/marketing' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [liveChatEnabled, setLiveChatEnabled] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSignOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    router.push('/admin/login');
  };

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full bg-card">
      <div className="p-6">
        <Link href="/" onClick={() => mobile && setIsOpen(false)}>
          <Logo />
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <nav className="px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setIsOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.badge && pathname !== item.href && (
                <span className="bg-primary/20 text-primary text-[10px] px-1.5 rounded-sm font-black">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 space-y-4 border-t mt-auto">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest px-2">
          <span className="text-muted-foreground">Live Chat Status</span>
          <Switch 
            checked={liveChatEnabled} 
            onCheckedChange={setLiveChatEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Theme</p>
          <div className="flex gap-1 bg-muted p-1 rounded-md">
            <Button 
              size="icon" 
              variant={theme === 'light' ? 'secondary' : 'ghost'} 
              className="h-8 w-full rounded-sm"
              onClick={() => setTheme('light')}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant={theme === 'dark' ? 'secondary' : 'ghost'} 
              className="h-8 w-full rounded-sm"
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant={theme === 'system' ? 'secondary' : 'ghost'} 
              className="h-8 w-full rounded-sm"
              onClick={() => setTheme('system')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">SU</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">Super User</p>
            <p className="text-[10px] text-muted-foreground truncate font-medium">eternetnetworkskenya@gmail.com</p>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive font-bold"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-card flex-col h-screen sticky top-0 shrink-0">
        <NavContent />
      </aside>

      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background shadow-lg border-primary/20">
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SheetHeader className="sr-only">
              <SheetTitle>Admin Navigation</SheetTitle>
            </SheetHeader>
            <NavContent mobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
