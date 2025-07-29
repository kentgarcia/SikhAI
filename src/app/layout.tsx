import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'New App',
  description: 'A new app built in Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-muted/40`}>
        <main className="mx-auto max-w-sm h-screen bg-background shadow-lg overflow-y-auto no-scrollbar">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
