"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Mic, Square, Keyboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import Orb to avoid SSR issues; Orb already has "use client" but safe.
const Orb = dynamic(() => import("./Orb"), { ssr: false });

interface DemoLine {
    speaker: 'user' | 'ai';
    text: string;
}

// Scripted demo conversation sequence
const DEMO_SCRIPT: DemoLine[] = [
    { speaker: 'user', text: 'Hi Rosa, I need help finding the nearest hospital.' },
    { speaker: 'ai', text: 'Sure. Checking facilities nearby with emergency capability and short triage times.' },
    { speaker: 'ai', text: 'Found St. Rafael MedCenter 1.2 kilometers away. Current ER wait is approximately fifteen minutes.' },
    { speaker: 'user', text: 'Do they have a pediatric unit open now?' },
    { speaker: 'ai', text: 'Yes, their pediatric emergency bay shows green status—operational with two beds free.' },
    { speaker: 'user', text: 'Great. Any route issues?' },
    { speaker: 'ai', text: 'One minor road closure on 3rd Avenue. Fastest route shifts to Riverside Road adding two minutes. Want directions sent to your phone?' },
    { speaker: 'user', text: 'Yes, send it and log this in my health notes.' },
    { speaker: 'ai', text: 'Done. Directions shared and a note was added: “Hospital lookup – potential visit.” Anything else I can assist with?' },
];

export default function VoiceAssistantPage() {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(-1); // -1 idle
    const [displayedText, setDisplayedText] = useState<string>(""); // progressive text for current line
    const [isSpeaking, setIsSpeaking] = useState(false); // true while revealing words
    const [finished, setFinished] = useState(false);
    const lineTimerRef = useRef<any>(null);
    const wordTimerRef = useRef<any>(null);
    const initialDelayRef = useRef<any>(null);

    // Timing constants (easy tuning)
    const WORD_INTERVAL_USER = 380; // ms per word for user lines
    const WORD_INTERVAL_AI = 300;   // ms per word for AI lines
    const PAUSE_AFTER_USER = 1800;  // pause after a user finishes speaking
    const PAUSE_AFTER_AI = 2300;    // pause after an AI line to simulate processing
    const INITIAL_DELAY = 800;      // delay before first line starts after play

    const currentLine: DemoLine | null = currentIndex >= 0 && currentIndex < DEMO_SCRIPT.length ? DEMO_SCRIPT[currentIndex] : null;

    const startPlayback = useCallback(() => {
        // Clear any existing timers
        if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
        if (wordTimerRef.current) clearInterval(wordTimerRef.current);
        if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
        setDisplayedText("");
        setCurrentIndex(-1); // will advance to 0 after initial delay
        setIsPlaying(true);
        setFinished(false);
        initialDelayRef.current = setTimeout(() => {
            setCurrentIndex(0);
        }, INITIAL_DELAY);
    }, [INITIAL_DELAY]);

    const stopPlayback = useCallback(() => {
        setIsPlaying(false);
        setIsSpeaking(false);
        if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
        if (wordTimerRef.current) clearInterval(wordTimerRef.current);
        if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
    }, []);

    const advanceLine = useCallback(() => {
        if (currentIndex + 1 >= DEMO_SCRIPT.length) {
            setIsPlaying(false);
            setIsSpeaking(false);
            setFinished(true);
            return;
        }
        setCurrentIndex(i => i + 1);
    }, [currentIndex]);

    // Progressive word reveal for current line
    useEffect(() => {
        if (!isPlaying || !currentLine) return;
        setDisplayedText("");
        setIsSpeaking(true);
        if (wordTimerRef.current) clearInterval(wordTimerRef.current);
        const words = currentLine.text.split(/\s+/);
        let idx = 0;
        wordTimerRef.current = setInterval(() => {
            idx++;
            setDisplayedText(words.slice(0, idx).join(' '));
            if (idx >= words.length) {
                clearInterval(wordTimerRef.current);
                setIsSpeaking(false);
                // wait before next line (even slower pacing with distinct pauses)
                const pause = currentLine.speaker === 'ai' ? PAUSE_AFTER_AI : PAUSE_AFTER_USER;
                lineTimerRef.current = setTimeout(() => {
                    advanceLine();
                }, pause);
            }
        }, currentLine.speaker === 'user' ? WORD_INTERVAL_USER : WORD_INTERVAL_AI); // slower word reveal
        return () => {
            clearInterval(wordTimerRef.current);
        };
    }, [currentLine, isPlaying, advanceLine, WORD_INTERVAL_USER, WORD_INTERVAL_AI, PAUSE_AFTER_AI, PAUSE_AFTER_USER]);

    const handleToggle = useCallback(() => {
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    }, [isPlaying, startPlayback, stopPlayback]);

    const orbHue = useMemo(() => {
        if (isSpeaking && currentLine) return currentLine.speaker === 'user' ? 35 : 130;
        if (finished) return 210; // completed
        return 280; // idle
    }, [isSpeaking, currentLine, finished]);

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center justify-between p-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Rosa Voice Assistant</h1>
                <div className="w-10" />
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 overflow-y-auto no-scrollbar gap-8">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                    {/* Full circular status backdrop */}
                    <div className={
                        'absolute inset-0 rounded-full transition-all duration-700 blur-sm ' +
                        (isSpeaking && currentLine ?
                            (currentLine.speaker === 'user'
                                ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,0,0.55),rgba(255,200,0,0)_70%)]'
                                : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,120,0.55),rgba(0,200,120,0)_70%)]')
                            : finished
                                ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(120,140,255,0.45),rgba(120,140,255,0)_70%)]'
                                : 'bg-[radial-gradient(circle_at_50%_50%,rgba(140,110,255,0.35),rgba(140,110,255,0)_70%)]'
                        )}
                    />
                    <Orb hue={orbHue} forceHoverState={isSpeaking} rotateOnHover hoverIntensity={0.6} />
                    {/* Center avatar image overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        <div className={`transition-transform duration-700 ${isSpeaking ? 'scale-105' : 'scale-100'}`}>
                            <Image
                                src="/images/RosaHead.png"
                                alt="Rosa avatar"
                                width={240}
                                height={240}
                                priority
                                className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] opacity-95"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-lg min-h-32 flex flex-col items-center">
                    {!isPlaying && !currentLine && !finished && (
                        <p className="text-xl font-medium text-muted-foreground">Tap mic to start speaking</p>
                    )}
                    {currentLine && (
                        <div className="w-full">
                            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-1 text-left">
                                {isSpeaking ? (currentLine.speaker === 'user' ? 'You' : 'Rosa') + ' speaking...' : (currentLine.speaker === 'user' ? 'You' : 'Rosa')}
                            </p>
                            <p className={`text-2xl font-semibold break-words text-left leading-snug ${currentLine.speaker === 'user' ? 'text-primary' : 'text-emerald-500'}`}>{displayedText}</p>
                        </div>
                    )}
                    {/* Replay demo option removed per requirement */}
                </div>
            </main>

            <footer className="p-6 flex-shrink-0 bg-background">
                <div className="flex justify-center items-center gap-6">
                    <Button variant="outline" size="icon" className="rounded-full w-16 h-16 bg-amber-100 border-amber-200" onClick={() => router.push('/ai')}>
                        <Keyboard className="w-7 h-7 text-muted-foreground" />
                    </Button>
                    <Button size="icon" className={`rounded-full w-24 h-24 shadow-lg transition-colors ${isPlaying ? 'bg-red-400 hover:bg-red-500' : 'bg-amber-300 hover:bg-amber-400'}`} onClick={handleToggle}>
                        {isPlaying ? <Square className="w-12 h-12 text-black" /> : <Mic className="w-12 h-12 text-black" />}
                    </Button>
                    <div className="w-16" />
                </div>
            </footer>
        </div>
    );
}
