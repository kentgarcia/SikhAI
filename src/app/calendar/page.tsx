
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, MapPin } from "lucide-react";
import { useRouter } from 'next/navigation';
import data from '@/lib/data.json';
import { format, parse, isSameDay } from 'date-fns';
import Image from 'next/image';

const eventItems = data.upcomingEvents.map(event => {
    // data.json date format is "AUG 05, 2025"
    const parsedDate = parse(event.date, 'MMM dd, yyyy', new Date());
    return {
        ...event,
        dateObj: parsedDate,
    };
});

export default function CalendarPage() {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const selectedEvents = date 
        ? eventItems.filter(event => isSameDay(event.dateObj, date))
        : [];

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Event Calendar</h1>
            </header>
            
            <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
                <div className="bg-white p-2">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md"
                        modifiers={{
                            hasEvent: eventItems.map(event => event.dateObj)
                        }}
                        modifiersStyles={{
                            hasEvent: {
                                textDecoration: 'underline',
                                textDecorationColor: 'hsl(var(--primary))',
                                textUnderlineOffset: '4px'
                            }
                        }}
                    />
                </div>

                <div className="p-4 space-y-4 flex-grow">
                    <h2 className="text-lg font-semibold">
                        Events for {date ? format(date, 'MMMM dd, yyyy') : '...'}
                    </h2>
                    {selectedEvents.length > 0 ? (
                        selectedEvents.map((item) => (
                            <Card key={item.id} className="overflow-hidden cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/events/${item.id}`)}>
                                <CardContent className="p-0 flex">
                                    <div className="w-1/3">
                                        <Image 
                                            src={item.image} 
                                            alt={item.title} 
                                            width={150} 
                                            height={150} 
                                            className="w-full h-full object-cover"
                                            data-ai-hint={item.title.toLowerCase().split(' ').slice(0,2).join(' ')}
                                        />
                                    </div>
                                    <div className="w-2/3 p-3">
                                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center pt-8">No events scheduled for this day.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
