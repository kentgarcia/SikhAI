import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Poppins } from 'next/font/google';
import React from 'react';
// Update the import path below if the actual path is different, for example:
import Shell from '../components/layout/Shell';
// Or, if the correct path is './components/layout/Shell', use:
// import Shell from './components/layout/Shell';
// Make sure the file 'Shell.tsx' or 'Shell/index.tsx' exists at the specified location.

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
        <Shell>{children}</Shell>
        <Toaster />
      </body>
    </html>
  );
}
