
"use client";

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';

export default function ServicesPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="Services" />
      
      <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar">
        {/* Page content goes here */}
      </main>

      <Navbar activePage="services" />
    </div>
  );
}
