
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { ChevronLeft, MapPin, Bell, Calendar as CalendarIcon, SlidersHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';
import data from '@/lib/data.json';
import { format, parse, isSameDay } from 'date-fns';
import Navbar from '@/components/layout/Navbar';

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
    const [events, setEvents] = useState(allEvents);

    const selectedEvents = date
        ? events.filter(event => isSameDay(event.dateObj, date))
        : [];


    function handleDeleteEvent(id: string) {
        setEvents(prev => prev.filter(e => e.id !== id));
    }

    function goToToday() {
        setDate(new Date());
    }

    return (
        <div className="relative flex flex-col h-full bg-slate-50">
            <header className="flex items-center justify-between p-4 bg-primary text-white flex-shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6" />
                    <h1 className="text-xl font-semibold">Calendar</h1>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/90">
                    <Bell className="h-6 w-6" />
                </Button>
            </header>

            {/* Gradient background, not scrollable */}
            <div className="absolute top-[64px] left-0 w-full h-[260px] bg-gradient-to-b from-primary to-rose-200 z-0 pointer-events-none" />

            <main className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
                <div className="p-4 pt-0">
                    <Card className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                        <div className="w-full flex justify-center items-center" style={{ minHeight: '360px' }}>
                            <ShadcnCalendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg w-full max-w-md"
                                buttonVariant="ghost"
                                modifiers={{
                                    hasEvent: events.map(event => event.dateObj),
                                    today: [new Date()]
                                }}
                                modifiersClassNames={{
                                    hasEvent: 'relative after:content-[\" \"] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary',
                                    today: 'ring-2 ring-primary'
                                }}
                                classNames={{
                                    root: 'w-full',
                                    months: 'flex flex-col w-full',
                                    month: 'w-full',
                                    table: 'w-full',
                                    caption: 'flex justify-center items-center mb-2 text-base font-semibold',
                                    caption_label: 'text-lg font-bold',
                                    head_row: 'flex w-full mb-1',
                                    head_cell: 'text-gray-600 flex-1 text-center text-xs font-medium tracking-wide px-1',
                                    row: 'flex w-full',
                                    cell: 'flex-1',
                                    day: 'w-full h-9 flex items-center justify-center',
                                    day_selected: 'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
                                    day_today: 'bg-primary/20 text-primary-foreground',
                                    day_hidden: 'invisible',
                                    nav_button: 'text-gray-700'
                                }}
                            />
                        </div>
                    </Card>
                </div>

                <div className="p-4 space-y-4 flex-grow bg-slate-50">
                    <div className="flex justify-between items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {date ? format(date, 'EEEE, dd MMMM yyyy') : '...'}
                        </h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
                            <Button variant="ghost" size="icon">
                                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    {selectedEvents.length > 0 ? (
                        selectedEvents.map((item) => (
                            <Card key={item.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow group" onClick={() => router.push(`/events/${item.id}`)}>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-semibold text-primary">{item.time}</p>
                                            <h3 className="font-semibold text-base text-gray-800 mt-1">{item.title}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => { e.stopPropagation(); handleDeleteEvent(item.id); }} title="Delete event">
                                        ×
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center pt-8">No events scheduled for this day.</p>
                    )}
                </div>
            </main>
            <Navbar activePage="home" />

        </div>
    );
}
