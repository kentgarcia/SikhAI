
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { ChevronLeft, MapPin, Bell, Calendar as CalendarIcon, SlidersHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';
import data from '@/lib/data.json';
import { format, parse, isSameDay } from 'date-fns';

const eventItems = data.upcomingEvents.map(event => {
    // data.json date format is "AUG 05, 2025"
    const parsedDate = parse(event.date, 'MMM dd, yyyy', new Date());
    return {
        ...event,
        dateObj: parsedDate,
        time: "9:00 - 12:00", // Sample time
        location: "Gabaldon, Central II, City of Santa Rosa, Laguna" // Sample location
    };
});

const allEvents = [
    ...eventItems,
    {
        id: "event-4",
        title: "Nutri TikTok Drama Dance",
        image: "/images/events/event-9.jpg",
        date: "SEP 25, 2025",
        dateObj: parse("SEP 25, 2025", 'MMM dd, yyyy', new Date()),
        description: "Another exciting event.",
        time: "13:00 - 15:00",
        location: "Brgy. Kanluran Covered Court, City of Santa Rosa, Laguna"
    },
    {
        id: "event-5",
        title: "Nutri TikTok Drama Dance",
        image: "/images/events/event-9.jpg",
        date: "SEP 25, 2025",
        dateObj: parse("SEP 25, 2025", 'MMM dd, yyyy', new Date()),
        description: "Another exciting event.",
        time: "9:00 - 12:00",
        location: "Gabaldon, Central, City of Santa Rosa, Laguna"
    },
     {
        id: "event-6",
        title: "Nutri TikTok Drama Dance",
        image: "/images/events/event-9.jpg",
        date: "SEP 25, 2025",
        dateObj: parse("SEP 25, 2025", 'MMM dd, yyyy', new Date()),
        description: "Another exciting event.",
        time: "11:00 - 12:00",
        location: "Gabaldon, Central, City of Santa Rosa, Laguna"
    }
];

export default function CalendarPage() {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(new Date('2025-09-25'));

    const selectedEvents = date 
        ? allEvents.filter(event => isSameDay(event.dateObj, date))
        : [];

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center justify-between p-4 bg-amber-400 text-white flex-shrink-0">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6" />
                    <h1 className="text-xl font-semibold">Calendar</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/90">
                    <Bell className="h-6 w-6" />
                </Button>
            </header>
            
            <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
                <div className="bg-gradient-to-b from-amber-400 to-amber-100 p-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                        <ShadcnCalendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md"
                            modifiers={{
                                hasEvent: allEvents.map(event => event.dateObj)
                            }}
                             classNames={{
                                day_selected: 'bg-amber-500 text-white hover:bg-amber-500 hover:text-white focus:bg-amber-500 focus:text-white',
                                day_today: 'bg-amber-100 text-amber-900',
                                day_hidden: 'invisible',
                              }}
                            components={{
                                DayContent: ({ date, ...props }) => {
                                    const hasEvent = allEvents.some(event => isSameDay(event.dateObj, date));
                                    return (
                                        <div className="relative">
                                            {props.children}
                                            {hasEvent && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"></div>}
                                        </div>
                                    )
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="p-4 space-y-4 flex-grow bg-slate-50">
                     <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {date ? format(date, 'EEEE, dd MMMM yyyy') : '...'}
                        </h2>
                        <Button variant="ghost" size="icon">
                            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>

                    {selectedEvents.length > 0 ? (
                        selectedEvents.map((item) => (
                            <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/events/${item.id}`)}>
                                <CardContent className="p-4">
                                     <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-semibold text-amber-600">{item.time}</p>
                                            <h3 className="font-semibold text-base text-gray-800 mt-1">{item.title}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
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
