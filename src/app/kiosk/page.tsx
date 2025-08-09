"use client";

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Bot, Heart, Shield, X } from 'lucide-react';

import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Feature list for icons and speech bubble
const featureList = [
    { key: 'events', icon: Calendar, label: 'Events', message: 'Stay updated with the latest city events and happenings!' },
    { key: 'map', icon: MapPin, label: 'Map', message: 'View the disaster map for real-time calamity impact.' },
    { key: 'rosa', icon: Bot, label: 'Ask Rosa', message: 'Ask me anything about city services or emergencies!' },
    { key: 'health', icon: Heart, label: 'Health', message: 'Find health resources and emergency contacts.' },
    { key: 'safety', icon: Shield, label: 'Safety', message: 'Get safety tips and report incidents quickly.' },
];

export default function KioskHome() {
    // Feature selection state
    const [selectedFeature, setSelectedFeature] = React.useState<null | typeof featureList[0]>(null);
    const router = useRouter();
    // Example images for the carousel

    const images = [
        { src: '/images/events/event-1.jpg', alt: 'Event 1' },
        { src: '/images/events/event-3.jpg', alt: 'Event 3' },
        { src: '/images/events/event-6.png', alt: 'Event 6' },
        { src: '/images/events/event-5.jpg', alt: 'Event 5' },
    ];


    // Embla carousel autoplay logic
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const emblaApiRef = React.useRef<any>(null);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    // Only set emblaApiRef once
    // useCallback with empty deps to ensure stable reference
    const handleSetApi = React.useCallback((api: any) => {
        if (api && emblaApiRef.current !== api) {
            emblaApiRef.current = api;
            setSelectedIndex(api.selectedScrollSnap());
        }
    }, []);

    // Listen for slide changes
    React.useEffect(() => {
        const api = emblaApiRef.current;
        if (!api) return;
        const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [emblaApiRef.current]);

    // Autoplay interval
    React.useEffect(() => {
        const api = emblaApiRef.current;
        if (!api) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (api) api.scrollNext();
        }, 3500);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [emblaApiRef.current]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Carousel as fullscreen background */}
            <div className="absolute inset-0 z-0">
                <Carousel opts={{ loop: true }} setApi={handleSetApi} className="w-full h-full">
                    <CarouselContent className="h-full">
                        {images.map((img, idx) => (
                            <CarouselItem key={idx} className="relative h-screen w-full" style={{ minWidth: '100%', minHeight: '100%' }}>
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover w-full h-full"
                                        priority={idx === 0}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    {/* Debug border for troubleshooting */}
                                    <div className="absolute inset-0 border-4 border-dashed border-red-500 pointer-events-none" style={{ opacity: idx === 1 ? 0.5 : 0 }} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Top bar */}
            <header className="relative z-10 flex items-center justify-between px-10 py-6">
                <div className="flex items-center gap-3">
                    <Image src="/images/icon_logo.png" alt="Logo" width={40} height={40} className="rounded" />
                    <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow">SikhAI Kiosk</h1>
                </div>
                <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white/90" onClick={() => router.push('/')}>Exit</Button>
            </header>

            {/* Feature icons row above bottom bar */}
            <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-none">
                <div className="h-48 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-32 left-0 w-full flex items-center justify-center gap-6 pointer-events-auto">
                    <div className="flex gap-6">
                        {featureList.map((feature, idx) => (
                            <button
                                key={feature.key}
                                className="flex flex-col items-center group focus:outline-none"
                                onClick={() => setSelectedFeature(featureList[idx])}
                                tabIndex={0}
                                type="button"
                            >
                                <div className="bg-white/90 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                                <span className="text-white text-xs font-medium drop-shadow group-hover:underline">{feature.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Speech bubble overlay - center, Framer Motion, Rosa left, pointer-events only on bubble */}
                <AnimatePresence>
                    {selectedFeature && (
                        <motion.div
                            className="fixed inset-0 z-40 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ pointerEvents: 'none' }}
                        >
                            <motion.div
                                className="relative flex items-center bg-transparent"
                                initial={{ scale: 0.85, opacity: 0, x: -40 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                exit={{ scale: 0.85, opacity: 0, x: -40 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                style={{ minWidth: 340, maxWidth: 520, pointerEvents: 'auto' }}
                            >
                                <img src="/images/rosaIdle.png" alt="Rosa" className="w-44 h-44 object-contain -mr-8 md:-mr-12 drop-shadow-xl z-30" style={{ marginRight: '-2.5rem' }} />
                                <div className="relative bg-white rounded-3xl shadow-2xl px-7 py-6 w-full border-2 border-primary flex flex-col items-center z-20">
                                    <button
                                        className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
                                        onClick={() => setSelectedFeature(null)}
                                        aria-label="Close"
                                        type="button"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="text-lg font-semibold text-primary mb-1">Rosa says:</div>
                                    <div className="text-base text-gray-800 text-center">{selectedFeature.message}</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 w-full flex items-center justify-center px-6 py-8 pointer-events-auto">
                    <Button size="lg" className="w-full max-w-md text-lg font-semibold py-6 shadow-xl" onClick={() => router.push('/kiosk/dashboard')}>
                        Start a Transaction
                    </Button>
                </div>
            </div>
        </div>
    );
}
