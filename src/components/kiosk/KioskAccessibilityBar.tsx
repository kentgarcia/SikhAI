import { Eye, Accessibility, Languages } from 'lucide-react';
import React from 'react';

interface KioskAccessibilityBarProps {
    lang: 'en' | 'tl';
    setLang: (lang: 'en' | 'tl') => void;
    highContrast: boolean;
    setHighContrast: (v: boolean) => void;
    largeText: boolean;
    setLargeText: (v: boolean) => void;
}

export function KioskAccessibilityBar({
    lang,
    setLang,
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
}: KioskAccessibilityBarProps) {
    return (
        <nav
            role="navigation"
            className={`flex items-center gap-4 px-4 py-2 border-b ${highContrast ? 'bg-black border-gray-700' : 'bg-gray-50 border-gray-200'} text-base`}
            aria-label={lang === 'tl' ? 'Mga Accessibility Option' : 'Accessibility Options'}
        >
            <span className="font-semibold mr-2">{lang === 'tl' ? 'Accessibility:' : 'Accessibility:'}</span>
            <button
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-black'} hover:bg-yellow-200 focus:outline-none`}
                aria-pressed={highContrast}
                aria-label={lang === 'tl' ? 'I-toggle ang mataas na contrast' : 'Toggle high contrast mode'}
                title={lang === 'tl' ? 'I-toggle ang mataas na contrast' : 'Toggle high contrast mode'}
                onClick={() => setHighContrast(!highContrast)}
            >
                <Eye className="w-5 h-5" aria-hidden="true" /> {lang === 'tl' ? 'Mataas na Contrast' : 'High Contrast'}
            </button>
            <button
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${largeText ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-black'} hover:bg-yellow-200 focus:outline-none`}
                aria-pressed={largeText}
                aria-label={lang === 'tl' ? 'I-toggle ang scalable text' : 'Toggle scalable text'}
                onClick={() => setLargeText(!largeText)}
                title={lang === 'tl' ? 'Naiiskal na Teksto – Opsyon na palakihin ang teksto nang hindi nasisira ang layout.' : 'Scalable Text – Option to enlarge text without breaking layout.'}
            >
                <Accessibility className="w-5 h-5" aria-hidden="true" /> {lang === 'tl' ? 'Naiiskal na Teksto' : 'Scalable Text'}
            </button>
            <button
                className={`flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none ml-auto`}
                aria-label={lang === 'tl' ? 'Baguhin ang Wika' : 'Change Language'}
                title={lang === 'tl' ? 'Baguhin ang Wika' : 'Change Language'}
                onClick={() => setLang(lang === 'en' ? 'tl' : 'en')}
            >
                <Languages className="w-5 h-5" aria-hidden="true" /> {lang === 'tl' ? 'English' : 'Tagalog'}
            </button>
        </nav>
    );
}
