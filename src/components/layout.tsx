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

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-8 w-8 text-sidebar-primary"
            >
              <path
                fill="currentColor"
                d="M228.1,79.15a44.3,44.3,0,0,0-58.21-17.51L128,88.19,86.11,61.64A44.3,44.3,0,0,0,27.9,79.15a43.9,43.9,0,0,0,16.24,58.34l76.2,69.27a8,8,0,0,0,9.32,0l76.2-69.27A43.9,43.9,0,0,0,228.1,79.15Z"
              ></path>
            </svg>
            <h1 className="text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Rosa Ciudad
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
              <SidebarTrigger />
              <div className="flex-1 text-center">
                  <h1 className="text-lg font-semibold text-foreground">{navItems.find(item => item.href === pathname)?.label || 'Rosa Ciudad'}</h1>
              </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
