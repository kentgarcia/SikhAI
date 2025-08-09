"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * Shell chooses container styling based on route.
 * - /kiosk => wide light container
 * - default => mobile-sized app shell
 */
export default function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isKiosk = pathname?.startsWith('/kiosk');

    const className = isKiosk
        ? 'h-screen w-full max-w-4xl mx-auto bg-white overflow-hidden flex flex-col kiosk-shell'
        : 'mx-auto max-w-md h-screen bg-background shadow-lg overflow-y-auto no-scrollbar';

    return <main className={className}>{children}</main>;
}
