"use client";
import { useState, useRef, useEffect } from 'react';
import { KioskAccessibilityBar } from '@/components/kiosk/KioskAccessibilityBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Menu, Mic, ArrowUp, Cloudy, Calendar, ClipboardList, Hospital, MessageSquare, Search, X, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { getAIResponse } from '@/ai/responses';
import { intentComponentMap } from '@/components/ai/widgets';

const baseSuggestedPrompts = [
    { icon: Cloudy, text: "What's the weather and traffic like in Sta. Rosa today?" },
    { icon: Calendar, text: "What's happening in Sta. Rosa this weekend?" },
    { icon: ClipboardList, text: "What are the requirements for the city scholarship program?" },
    { icon: Hospital, text: "Is there a hospital nearby with available emergency services?" },
    { icon: Calendar, text: "Tell me something about Sta. Rosa's culture" },
];

const history = {
    "Last Week": [
        "Business Permit Renewal",
        "Job Fair Schedule - July 2025",
        "Scholarship Application Guide",
        "Nearest Health Center - Real-time",
        "Weather & Traffic Update - Sta. Rosa",
    ],
    "Older": [
        "Real Property Tax Payment Online",
        "Weekend Events in Sta. Rosa",
        "Medical Appointment Booking Help",
        "Barangay Clearance Requirements",
        "Lost Document Reporting Steps",
        "Lola Amour Concert Night",
    ]
}

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; intent?: string; data?: any };

export default function KioskAIPage() {
    const router = useRouter();
    const [lang, setLang] = useState<'en' | 'tl'>('en');
    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [showPromptPalette, setShowPromptPalette] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dynamicPrompts, setDynamicPrompts] = useState<string[]>(baseSuggestedPrompts.map(p => p.text));
    const [typingMsgId, setTypingMsgId] = useState<string | null>(null);
    const pendingWidgetRef = useRef<{ intent?: string; data?: any } | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const genId = () => {
        try {
            if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) {
                return (crypto as any).randomUUID();
            }
        } catch { }
        return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
    };

    function handlePromptSelect(text: string) {
        setShowPromptPalette(false);
        const userMsg: ChatMessage = { id: genId(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);
        setTimeout(() => {
            const ai = getAIResponse(text);
            const fullContent = ai.answer;
            const id = genId();
            setTypingMsgId(id);
            pendingWidgetRef.current = { intent: ai.intent, data: ai.data };
            const assistantMsg: ChatMessage = { id, role: 'assistant', content: '' };
            setMessages(prev => [...prev, assistantMsg]);
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setMessages(prev => prev.map(m => m.id === id ? { ...m, content: fullContent.slice(0, i) } : m));
                if (i >= fullContent.length) {
                    clearInterval(interval);
                    setTypingMsgId(null);
                    setLoading(false);
                    const pw = pendingWidgetRef.current;
                    if (pw?.intent) {
                        setMessages(prev => prev.map(m => m.id === id ? { ...m, intent: pw.intent, data: pw.data } : m));
                    }
                    pendingWidgetRef.current = null;
                    if (ai.nextPrompts && ai.nextPrompts.length) setDynamicPrompts(ai.nextPrompts);
                    else setDynamicPrompts([]);
                }
            }, Math.min(35, Math.max(10, 600 / fullContent.length)));
        }, 400);
    }

    function startNewConversation() {
        setMessages([]);
        setDynamicPrompts(baseSuggestedPrompts.map(p => p.text));
    }

    return (
        <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-black text-white' : 'bg-white text-black'} ${largeText ? 'text-2xl' : ''}`}
            aria-label={lang === 'tl' ? 'Tanungin si Rosa' : 'Ask Rosa'} lang={lang === 'tl' ? 'tl' : 'en'}>
            <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50">{lang === 'tl' ? 'Laktawan sa Nilalaman' : 'Skip to main content'}</a>
            <KioskAccessibilityBar lang={lang} setLang={setLang} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} />
            <header role="banner" className={`flex items-center justify-between p-4 flex-shrink-0 ${highContrast ? 'bg-black border-gray-700' : 'bg-white/80 border-gray-200'} border-b`}>
                <Button variant="ghost" size="icon" onClick={() => router.push('/kiosk/dashboard')}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className={`text-lg font-semibold ${largeText ? 'text-2xl' : ''}`}>{lang === 'tl' ? 'Makipag-usap kay Rosa' : 'Talk with Rosa'}</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full max-w-sm p-0">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="text-left">{lang === 'tl' ? 'Kasaysayan' : 'History'}</SheetTitle>
                            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </SheetHeader>
                        <div className="p-4 space-y-4">
                            <Button className="w-full justify-start text-base font-normal" onClick={startNewConversation}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                {lang === 'tl' ? 'Bagong Usapan' : 'New Conversation'}
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-base font-normal" onClick={() => { setMessages([]); setDynamicPrompts(baseSuggestedPrompts.map(p => p.text)); }}>
                                <Trash2 className="mr-2 h-4 w-4" /> {lang === 'tl' ? 'I-clear ang Kasaysayan' : 'Clear History'}
                            </Button>
                            <div className="relative">
                                <Input placeholder={lang === 'tl' ? 'Hanapin ang Usapan' : 'Search Conversation'} className="pl-10" />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="p-4 space-y-4 text-sm">
                            {Object.entries(history).map(([period, items]) => (
                                <div key={period}>
                                    <h3 className="font-semibold text-muted-foreground mb-2">{period}</h3>
                                    <ul className="space-y-2">
                                        {items.map((item, index) => (
                                            <li
                                                key={index}
                                                className="cursor-pointer hover:text-primary truncate"
                                                onClick={() => handlePromptSelect(item)}
                                            >{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </header>

            {messages.length === 0 ? (
                <main className="flex-1 flex flex-col items-center justify-center text-center p-4 overflow-y-auto no-scrollbar">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-primary/10 mb-4 animate-subtle-breathe">
                        <Image
                            src="/images/rosaWave.png"
                            alt="Rosa AI"
                            width={100}
                            height={100}
                            className="object-contain"
                            data-ai-hint="robot waving"
                        />
                    </div>
                    <h2 className={`text-2xl font-bold mb-1 ${largeText ? 'text-3xl' : ''}`}>{lang === 'tl' ? 'Kumusta! Ako si Rosa' : "Hi! I'm Rosa"}</h2>
                    <p className={`text-muted-foreground mb-8 ${largeText ? 'text-xl' : ''}`}>{lang === 'tl' ? 'Ang iyong AI companion, paano kita matutulungan?' : 'Your friendly AI companion, how can I help you?'}</p>
                    <div className="w-full max-w-sm">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-4">{lang === 'tl' ? 'Mga Mungkahi' : 'Suggested Prompts'}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {baseSuggestedPrompts.map((prompt, index) => {
                                const Icon = prompt.icon;
                                return (
                                    <Card key={index} className="p-3 text-left hover:bg-muted/50 cursor-pointer" onClick={() => handlePromptSelect(prompt.text)}>
                                        <Icon className="w-6 h-6 mb-2 text-primary/80" />
                                        <p className="text-xs text-gray-700">{prompt.text}</p>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </main>
            ) : (
                <main ref={scrollRef} className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto no-scrollbar">
                    {messages.map(m => {
                        const Widget = m.intent ? (intentComponentMap as any)[m.intent] : undefined;
                        return (
                            <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}>
                                    {m.content}
                                </div>
                                {Widget && (
                                    <div className="max-w-[80%] w-full">
                                        <Widget data={m.data} onAction={(payload: any) => {
                                            const bannerMsg: ChatMessage = { id: genId(), role: 'assistant', content: payload.title, intent: 'banner', data: { title: payload.title, description: payload.description, variant: payload.variant || 'info' } };
                                            setMessages(prev => [...prev, bannerMsg]);
                                        }} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-3 text-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {lang === 'tl' ? 'Nag-iisip...' : 'Thinking...'}
                            </div>
                        </div>
                    )}
                    {!loading && dynamicPrompts.length > 0 && !typingMsgId && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {dynamicPrompts.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePromptSelect(p)}
                                    className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                                >{p}</button>
                            ))}
                        </div>
                    )}
                </main>
            )}

            <footer className="p-4 flex-shrink-0 bg-background border-t">
                <div className="relative">
                    <button
                        className="w-full text-left pr-24 rounded-full h-12 text-base bg-muted/50 hover:bg-muted px-5 transition"
                        onClick={() => setShowPromptPalette(prev => !prev)}
                    >
                        {showPromptPalette ? (lang === 'tl' ? 'Itago ang mga mungkahi' : 'Hide prompt suggestions') : (lang === 'tl' ? 'Pumili o mag-type ng prompt...' : 'Tap to choose or type a prompt...')}
                    </button>
                    <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push('/kiosk/ai/voice')}>
                            <Mic className="w-5 h-5 text-muted-foreground" />
                        </Button>
                        <Button size="icon" className="rounded-full w-9 h-9 bg-muted hover:bg-muted/80" disabled>
                            <ArrowUp className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
                {showPromptPalette && (
                    <div className="mt-4 p-3 rounded-xl border bg-background/70 backdrop-blur-sm">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">{lang === 'tl' ? 'Mabilis na Mungkahi' : 'Quick Prompts'}</h4>
                        <div className="flex flex-wrap gap-2">
                            {baseSuggestedPrompts.map((p, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handlePromptSelect(p.text)}
                                    className="text-xs px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 whitespace-pre-line text-left"
                                >{p.text}</button>
                            ))}
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
}
