'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  Building2,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Users,
} from 'lucide-react';


const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rosa-ai', label: 'Rosa AI', icon: Bot },
  { href: '/responda-hub', label: 'RespondaHub', icon: HeartPulse },
  { href: '/community-wall', label: 'Community Wall', icon: Users },
  { href: '/edu-connect', label: 'EduConnect', icon: GraduationCap },
  { href: '/e-gov-services', label: 'e-Gov Services', icon: Building2 },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 shrink-0">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-8 w-8 text-primary"
            >
              <path
                fill="currentColor"
                d="M228.1,79.15a44.3,44.3,0,0,0-58.21-17.51L128,88.19,86.11,61.64A44.3,44.3,0,0,0,27.9,79.15a43.9,43.9,0,0,0,16.24,58.34l76.2,69.27a8,8,0,0,0,9.32,0l76.2-69.27A43.9,43.9,0,0,0,228.1,79.15Z"
              ></path>
            </svg>
            <h1 className="text-xl font-bold text-foreground">
              Rosa Ciudad
            </h1>
          </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      <nav className="border-t">
        <div className="grid grid-cols-6 gap-1 p-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center p-2 rounded-md text-xs gap-1 ${pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
