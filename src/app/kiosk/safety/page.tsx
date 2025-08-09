"use client";
import { KioskAccessibilityBar } from '@/components/kiosk/KioskAccessibilityBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const safetyTips = [
    {
        icon: AlertTriangle,
        title: {
            en: 'Report an Incident',
            tl: 'I-report ang Insidente'
        },
        desc: {
            en: 'Quickly report accidents, crimes, or emergencies to local authorities.',
            tl: 'Agad na i-report ang aksidente, krimen, o emergency sa mga awtoridad.'
        }
    },
    {
        icon: Phone,
        title: {
            en: 'Emergency Hotlines',
            tl: 'Mga Emergency Hotline'
        },
        desc: {
            en: 'Call 911 or your local emergency numbers for immediate help.',
            tl: 'Tumawag sa 911 o lokal na emergency number para sa agarang tulong.'
        }
    },
    {
        icon: ShieldCheck,
        title: {
            en: 'Safety Tips',
            tl: 'Mga Tip sa Kaligtasan'
        },
        desc: {
            en: 'Stay alert, keep emergency contacts handy, and know your evacuation routes.',
            tl: 'Maging alerto, itabi ang emergency contacts, at alamin ang evacuation routes.'
        }
    }
];

export default function KioskSafetyPage() {
    const router = useRouter();
    const [lang, setLang] = React.useState<'en' | 'tl'>('en');
    const [highContrast, setHighContrast] = React.useState(false);
    const [largeText, setLargeText] = React.useState(false);
    return (
        <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} ${largeText ? 'text-2xl' : ''}`}
            aria-label={lang === 'tl' ? 'Seguridad' : 'Safety'} lang={lang === 'tl' ? 'tl' : 'en'}>
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50">{lang === 'tl' ? 'Laktawan sa Nilalaman' : 'Skip to main content'}</a>
            <KioskAccessibilityBar lang={lang} setLang={setLang} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} />
            <header role="banner" className={`flex items-center gap-4 px-8 py-6 border-b ${highContrast ? 'bg-black border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push('/kiosk/dashboard')}>
                    <ArrowLeft className="w-4 h-4" /> {lang === 'tl' ? 'Bumalik' : 'Back'}
                </Button>
                <h1 className={`ml-4 font-bold tracking-tight ${largeText ? 'text-4xl' : 'text-2xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{lang === 'tl' ? 'Seguridad' : 'Safety'}</h1>
            </header>
            <main id="main-content" role="main" className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
                <div className="w-full max-w-2xl grid gap-8">
                    {safetyTips.map((tip, i) => {
                        const Icon = tip.icon;
                        return (
                            <section
                                key={i}
                                className={`rounded-2xl shadow-lg flex items-center gap-6 p-6 ${highContrast ? 'bg-black border border-yellow-400' : 'bg-white border border-gray-200'}`}
                                tabIndex={0}
                                aria-label={tip.title[lang]}
                            >
                                <Icon className={`w-12 h-12 flex-shrink-0 ${highContrast ? 'text-yellow-400' : 'text-primary'}`} aria-hidden="true" />
                                <div>
                                    <h2 className={`font-bold mb-1 ${largeText ? 'text-2xl' : 'text-xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{tip.title[lang]}</h2>
                                    <p className={`${largeText ? 'text-lg' : 'text-base'} ${highContrast ? 'text-yellow-200' : 'text-gray-700'}`}>{tip.desc[lang]}</p>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
