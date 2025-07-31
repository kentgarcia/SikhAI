
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Minus, Mic, ArrowUp, Cloudy, Calendar, ClipboardList, Hospital } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const suggestedPrompts = [
    { icon: Cloudy, text: "What's the weather and traffic like in Sta. Rosa today?" },
    { icon: Calendar, text: "What's happening in Sta. Rosa this weekend?" },
    { icon: ClipboardList, text: "What are the requirements for the city scholarship program?" },
    { icon: Hospital, text: "Is there a hospital nearby with available emergency services?" },
];

export default function AiChatPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center justify-between p-4 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Talk with Rosa</h1>
                <Button variant="ghost" size="icon">
                    <Minus className="h-6 w-6" />
                </Button>
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
                        <Button variant="ghost" size="icon" className="rounded-full">
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
}
