import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteChatAssistant } from '@/components/site-chat-assistant';
import { PageLoader } from '@/components/page-loader';
import { CookieDisclaimer } from '@/components/cookie-disclaimer';
import { WhatsAppWidget } from '@/components/whatsapp-widget';
import { FirebaseClientProvider } from '@/firebase';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export const metadata: Metadata = {
  title: 'Sunpak 2 Final',
  description:
    'Sunpak Estate Kenya - Verified prime residential, commercial, and agricultural land in Kenya with ready freehold title deeds and flexible installment plans.',
  openGraph: {
    title: 'Sunpak 2 Final',
    description:
      'Sunpak Estate Kenya - Verified prime residential, commercial, and agricultural land in Kenya with ready freehold title deeds and flexible installment plans.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <PageLoader />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <WhatsAppWidget />
            <SiteChatAssistant />
            <FirebaseErrorListener />
            <Toaster />
            <CookieDisclaimer />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
