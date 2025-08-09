"use client";
import { KioskAccessibilityBar } from '@/components/kiosk/KioskAccessibilityBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Droplet, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

export default function KioskCalamityImpactMapPage() {
    const router = useRouter();
    const [lang, setLang] = React.useState<'en' | 'tl'>('en');
    const [highContrast, setHighContrast] = React.useState(false);
    const [largeText, setLargeText] = React.useState(false);
    return (
        <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} ${largeText ? 'text-2xl' : ''}`}
            aria-label={lang === 'tl' ? 'Mapa' : 'Map'} lang={lang === 'tl' ? 'tl' : 'en'}>
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50">{lang === 'tl' ? 'Laktawan sa Nilalaman' : 'Skip to main content'}</a>
            <KioskAccessibilityBar lang={lang} setLang={setLang} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} />
            <header role="banner" className={`flex items-center gap-4 px-8 py-6 border-b ${highContrast ? 'bg-black border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push('/kiosk/dashboard')}>
                    <ArrowLeft className="w-4 h-4" /> {lang === 'tl' ? 'Bumalik' : 'Back'}
                </Button>
                <h1 className={`ml-4 font-bold tracking-tight ${largeText ? 'text-4xl' : 'text-2xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{lang === 'tl' ? 'Mapa' : 'Map'}</h1>
            </header>
            <main id="main-content" role="main" className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
                <div className="w-full max-w-3xl flex flex-col items-center">
                    <h2 className={`mb-4 font-semibold ${largeText ? 'text-2xl' : 'text-xl'} ${highContrast ? 'text-yellow-400' : 'text-primary'}`}>{lang === 'tl' ? 'Sample Calamity Impact Map' : 'Sample Calamity Impact Map'}</h2>
                    <div className="w-full rounded-lg overflow-hidden border border-gray-300 mb-4" style={{ background: highContrast ? '#222' : '#fff' }}>
                        <Image
                            src="/images/mapbg.jpg"
                            alt={lang === 'tl' ? 'Mapa ng epekto ng kalamidad' : 'Calamity impact map'}
                            width={800}
                            height={400}
                            className="w-full h-64 object-cover"
                            priority
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-center mb-2" aria-label={lang === 'tl' ? 'Legend ng Mapa' : 'Map Legend'}>
                        <span className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" aria-hidden="true" /> {lang === 'tl' ? 'Landslide' : 'Landslide'}</span>
                        <span className="flex items-center gap-2"><Droplet className="text-blue-500" aria-hidden="true" /> {lang === 'tl' ? 'Baha' : 'Flood'}</span>
                        <span className="flex items-center gap-2"><Flame className="text-red-500" aria-hidden="true" /> {lang === 'tl' ? 'Sunog' : 'Fire'}</span>
                    </div>
                    <p className={`${largeText ? 'text-xl' : 'text-base'} ${highContrast ? 'text-yellow-200' : 'text-gray-600'} text-center max-w-2xl`}>
                        {lang === 'tl'
                            ? 'Tingnan ang sample map na ito para sa real-time na impormasyon sa kalamidad. Ang mga marker ay nagpapakita ng mga lugar na apektado ng landslide, baha, at sunog.'
                            : 'View this sample map for real-time calamity information. Markers show areas affected by landslide, flood, and fire.'}
                    </p>
                </div>
            </main>
        </div>
    );
}
