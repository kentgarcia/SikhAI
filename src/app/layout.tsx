import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SikhAI',
  description: 'Your one-stop app for real-time updates, local events, and public services in Sta. Rosa',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#A4040A" />
      </head>
      <body className={`${poppins.className} bg-muted/40`}>
        <main className="mx-auto max-w-md h-screen bg-background shadow-lg overflow-y-auto no-scrollbar">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
