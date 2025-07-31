
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Menu, Mic, ArrowUp, Cloudy, Calendar, ClipboardList, Hospital, MessageSquare, Search, X, Keyboard, Square } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const suggestedPrompts = [
    { icon: Cloudy, text: "What's the weather and traffic like in Sta. Rosa today?" },
    { icon: Calendar, text: "What's happening in Sta. Rosa this weekend?" },
    { icon: ClipboardList, text: "What are the requirements for the city scholarship program?" },
    { icon: Hospital, text: "Is there a hospital nearby with available emergency services?" },
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

export default function AiChatPage() {
    const router = useRouter();
    const [isVoiceMode, setIsVoiceMode] = useState(false);

    const textMode = (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center justify-between p-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Talk with Rosa</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full max-w-sm p-0">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="text-left">History</SheetTitle>
                            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </SheetHeader>
                        <div className="p-4 space-y-4">
                            <Button className="w-full justify-start text-base font-normal">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                New Conversation
                            </Button>
                            <div className="relative">
                                <Input placeholder="Search Conversation" className="pl-10" />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="p-4 space-y-4 text-sm">
                            {Object.entries(history).map(([period, items]) => (
                                <div key={period}>
                                    <h3 className="font-semibold text-muted-foreground mb-2">{period}</h3>
                                    <ul className="space-y-2">
                                        {items.map((item, index) => (
                                            <li key={index} className="cursor-pointer hover:text-primary truncate">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </header>

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
                <h2 className="text-2xl font-bold mb-1">Hi! I'm Rosa</h2>
                <p className="text-muted-foreground mb-8">Your friendly AI companion, how can I help you?</p>

                <div className="w-full max-w-sm">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">Suggested Prompts</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {suggestedPrompts.map((prompt, index) => {
                            const Icon = prompt.icon;
                            return (
                                <Card key={index} className="p-3 text-left hover:bg-muted/50 cursor-pointer">
                                    <Icon className="w-6 h-6 mb-2 text-primary/80" />
                                    <p className="text-xs text-gray-700">{prompt.text}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </main>

            <footer className="p-4 flex-shrink-0 bg-background border-t">
                <div className="relative">
                    <Input placeholder="Ask Rosa anything..." className="pr-24 rounded-full h-12 text-base" />
                    <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsVoiceMode(true)}>
                            <Mic className="w-5 h-5 text-muted-foreground" />
                        </Button>
                         <Button size="icon" className="rounded-full w-9 h-9 bg-muted hover:bg-muted/80">
                            <ArrowUp className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );

    const voiceMode = (
        <div className="flex flex-col h-full bg-background">
             <header className="flex items-center justify-between p-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Talk with Rosa</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                     <SheetContent className="w-full max-w-sm p-0">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="text-left">History</SheetTitle>
                            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </SheetClose>
                        </SheetHeader>
                     </SheetContent>
                </Sheet>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center text-center p-4 overflow-y-auto no-scrollbar">
                 <div className="w-56 h-56 rounded-full flex items-center justify-center bg-amber-100 mb-8">
                    <Image
                        src="/images/onboarding2.png"
                        alt="Rosa AI"
                        width={200}
                        height={200}
                        className="object-contain"
                        data-ai-hint="lion mascot"
                    />
                </div>
                <div className="relative w-full max-w-sm h-24">
                    <p className="text-2xl font-medium text-center">
                        Could you help me find a nearby hospital that offers <span className="text-muted-foreground">emergency services?</span>
                    </p>
                    <div className="absolute -bottom-4 right-10 flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-amber-200"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-200"></div>
                    </div>
                </div>
            </main>

            <footer className="p-4 flex-shrink-0 bg-background">
                <div className="flex justify-center items-center gap-4">
                     <Button variant="outline" size="icon" className="rounded-full w-14 h-14 bg-amber-100 border-amber-200" onClick={() => setIsVoiceMode(false)}>
                        <Keyboard className="w-7 h-7 text-muted-foreground" />
                    </Button>
                     <Button size="icon" className="rounded-full w-20 h-20 bg-amber-300 hover:bg-amber-400 shadow-lg">
                        <Mic className="w-10 h-10 text-black" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full w-14 h-14 bg-amber-100 border-amber-200" onClick={() => setIsVoiceMode(false)}>
                        <Square className="w-7 h-7 text-muted-foreground" />
                    </Button>
                </div>
            </footer>
        </div>
    );

    return isVoiceMode ? voiceMode : textMode;
}
