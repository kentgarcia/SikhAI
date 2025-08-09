"use client";
import { KioskAccessibilityBar } from '@/components/kiosk/KioskAccessibilityBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import data from '@/lib/data.json';

export default function KioskEventsPage() {
    const router = useRouter();
    const [lang, setLang] = React.useState<'en' | 'tl'>('en');
    const [highContrast, setHighContrast] = React.useState(false);
    const [largeText, setLargeText] = React.useState(false);
    const events = data.upcomingEvents;

    return (
        <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} ${largeText ? 'text-2xl' : ''}`}
            aria-label={lang === 'tl' ? 'Mga Kaganapan' : 'Events'} lang={lang === 'tl' ? 'tl' : 'en'}>
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50">{lang === 'tl' ? 'Laktawan sa Nilalaman' : 'Skip to main content'}</a>
            <KioskAccessibilityBar lang={lang} setLang={setLang} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} />
            <header role="banner" className={`flex items-center gap-4 px-8 py-6 border-b ${highContrast ? 'bg-black border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push('/kiosk/dashboard')}>
                    <ArrowLeft className="w-4 h-4" /> {lang === 'tl' ? 'Bumalik' : 'Back'}
                </Button>
                <h1 className={`ml-4 font-bold tracking-tight ${largeText ? 'text-4xl' : 'text-2xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{lang === 'tl' ? 'Mga Kaganapan' : 'Events'}</h1>
            </header>
            <main id="main-content" role="main" className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-3xl grid gap-8">
                    {events.map(event => (
                        <article
                            key={event.id}
                            className={`rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden ${highContrast ? 'bg-black border border-yellow-400' : 'bg-white border border-gray-200'}`}
                            tabIndex={0}
                            aria-label={event.title}
                        >
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={220}
                                height={160}
                                className="object-cover w-full md:w-56 h-40 md:h-auto"
                                priority
                            />
                            <div className="flex-1 p-6 flex flex-col gap-2 justify-center">
                                <h2 className={`font-bold ${largeText ? 'text-2xl' : 'text-xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{event.title}</h2>
                                <div className="flex items-center text-sm mb-2">
                                    <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                                    <span className={highContrast ? 'text-yellow-200' : 'text-gray-600'}>{event.date}</span>
                                </div>
                                <p className={`${largeText ? 'text-lg' : 'text-base'} ${highContrast ? 'text-yellow-200' : 'text-gray-700'}`}>{event.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}
