// Kiosk layout now defers to root layout; only sets metadata and section wrapper.
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SikhAI Kiosk',
    description: 'Public kiosk mode for quick access to city information'
};

export default function KioskLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col bg-white text-neutral-900 kiosk-mode">{children}</div>
    );
}
