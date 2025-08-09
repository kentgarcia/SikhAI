"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Newspaper, MapPin, Bot, Heart, Shield, ArrowLeft } from 'lucide-react';
import { KioskAccessibilityBar } from '@/components/kiosk/KioskAccessibilityBar';
import React from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const [lang, setLang] = React.useState<'en' | 'tl'>('en');
    const [highContrast, setHighContrast] = React.useState(false);
    const [largeText, setLargeText] = React.useState(false);

    const features = [
        {
            icon: Calendar,
            label: lang === 'tl' ? 'Mga Kaganapan' : 'Events',
            href: '/kiosk/events',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Tingnan ang mga paparating na event, seminar, at aktibidad sa Sta. Rosa.'
                    : 'See upcoming events, seminars, and activities in Sta. Rosa.'
        },
        {
            icon: Newspaper,
            label: lang === 'tl' ? 'Balita' : 'News',
            href: '/kiosk/news',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Basahin ang pinakabagong balita, anunsyo, at update mula sa lokal na pamahalaan.'
                    : 'Read the latest news, announcements, and updates from the local government.'
        },
        {
            icon: MapPin,
            label: lang === 'tl' ? 'Mapa' : 'Map',
            href: '/kiosk/calamity-impact-map',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Tingnan ang disaster map para sa real-time na impormasyon sa kalamidad.'
                    : 'View the disaster map for real-time calamity and emergency information.'
        },
        {
            icon: Bot,
            label: lang === 'tl' ? 'Tanungin si Rosa' : 'Ask Rosa',
            href: '/kiosk/ai',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Makipag-chat kay Rosa para sa tulong, impormasyon, at gabay sa serbisyo.'
                    : 'Chat with Rosa for help, information, and guidance on city services.'
        },
        {
            icon: Heart,
            label: lang === 'tl' ? 'Kalusugan' : 'Health',
            href: '/kiosk/ai',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Alamin ang tungkol sa health services, emergency hotlines, at clinics.'
                    : 'Find health services, emergency hotlines, and clinics.'
        },
        {
            icon: Shield,
            label: lang === 'tl' ? 'Seguridad' : 'Safety',
            href: '/kiosk/safety',
            color: 'bg-primary/10',
            desc:
                lang === 'tl'
                    ? 'Kumuha ng safety tips, mag-report ng insidente, at tumawag ng tulong.'
                    : 'Get safety tips, report incidents, and call for help.'
        },
    ];

    return (
        <div
            className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} ${largeText ? 'text-2xl' : ''}`}
            aria-label={lang === 'tl' ? 'Dashboard ng Kiosk' : 'Kiosk Dashboard'}
            lang={lang === 'tl' ? 'tl' : 'en'}
        >
            {/* Skip to Content Link for Keyboard Users */}
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50">{lang === 'tl' ? 'Laktawan sa Nilalaman' : 'Skip to main content'}</a>
            {/* Accessibility Bar */}
            <KioskAccessibilityBar
                lang={lang}
                setLang={setLang}
                highContrast={highContrast}
                setHighContrast={setHighContrast}
                largeText={largeText}
                setLargeText={setLargeText}
            />

            {/* Header */}
            <header role="banner" className={`flex items-center justify-between px-8 py-6 border-b ${highContrast ? 'bg-black border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <div className="flex items-center gap-4">
                    <Image src="/images/icon_logo.png" alt="Logo" width={56} height={56} className="rounded" />
                    <h1 className={`font-bold tracking-tight ${largeText ? 'text-4xl' : 'text-2xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{lang === 'tl' ? 'Dashboard ng Kiosk' : 'Kiosk Dashboard'}</h1>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push('/kiosk')}>
                    <ArrowLeft className="w-4 h-4" /> {lang === 'tl' ? 'Bumalik' : 'Back'}
                </Button>
            </header>

            {/* Feature grid */}
            <main id="main-content" role="main" className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    {features.map((f) => (
                        <button
                            key={f.label}
                            onClick={() => router.push(f.href)}
                            className={`flex flex-col items-center justify-center rounded-2xl shadow-lg p-8 ${f.color} hover:bg-primary/20 transition min-h-[180px] focus:outline-none`}
                            style={{ minWidth: 0 }}
                            aria-label={f.label + '. ' + f.desc}
                            title={f.desc}
                            tabIndex={0}
                        >
                            <f.icon className={`w-14 h-14 mb-4 ${highContrast ? 'text-yellow-400' : 'text-primary'}`} aria-hidden="true" />
                            <span className={`font-semibold mb-1 ${largeText ? 'text-2xl' : 'text-xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{f.label}</span>
                            <span className={`${largeText ? 'text-xl' : 'text-base'} ${highContrast ? 'text-yellow-200' : 'text-gray-600'}`}>{f.desc}</span>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}