
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Hospital, CalendarPlus, Phone, AlertTriangle } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
    { icon: Hospital, label: "Hospital & Clinic Locator", href: "/responda-hub/hospital-locator" },
    { icon: CalendarPlus, label: "Book Appointment", href: "/responda-hub/book-appointment" },
    { icon: Phone, label: "Emergency Dialer", href: "/responda-hub/emergency-dialer" },
    { icon: AlertTriangle, label: "Calamity Impact Map", href: "/responda-hub/calamity-impact-map" },
];

export default function RespondaHubPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">RespondaHub</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto">
                <p className="text-muted-foreground mb-6">Access health, emergencies, and calamity support services.</p>
                <Card className="p-2 rounded-2xl">
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={item.label}>
                            <div>
                                <div className="flex items-center p-4 hover:bg-muted/50 rounded-lg cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 mr-4">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="flex-grow font-medium text-gray-700">{item.label}</span>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                                {index < menuItems.length - 1 && <Separator />}
                            </div>
                        </Link>
                    ))}
                </Card>
            </main>
        </div>
    );
}
