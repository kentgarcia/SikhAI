
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Search, Map, Clock, Navigation } from "lucide-react";
import { useRouter } from 'next/navigation';

const facilities = [
    {
        name: "The Medical City South Luzon",
        location: "Greenfield City, Sta. Rosa, Laguna",
        distance: "2.5km",
        time: "Open 24 hours",
        active: true,
        specialty: "Multi-specialty"
    },
    {
        name: "QualiMed Hospital Sta. Rosa",
        location: "Nuvali, Sta. Rosa, Laguna",
        distance: "5.1km",
        time: "Open 24 hours",
        active: true,
        specialty: "General"
    },
    {
        name: "Sta. Rosa Hospital and Medical Center",
        location: "Balibago, Sta. Rosa, Laguna",
        distance: "3.2km",
        time: "8:00 AM - 10:00 PM",
        active: true,
        specialty: "General"
    },
    {
        name: "St. James Hospital",
        location: "Dita, Sta. Rosa, Laguna",
        distance: "4.8km",
        time: "Open 24 hours",
        active: true,
        specialty: "General"
    },
    {
        name: "New Sinai MDI Hospital",
        location: "Tagapo, Sta. Rosa, Laguna",
        distance: "1.8km",
        time: "9:00 AM - 9:00 PM",
        active: false,
        specialty: "Cardiology"
    }
];

export default function HospitalLocatorPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Hospital & Clinic Locator</h1>
            </header>
            
            <div className="p-4 space-y-4 bg-white flex-shrink-0">
                <div className="relative">
                    <Input placeholder="Search Clinics or Hospitals" className="pl-10" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Specialties</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="dental">Dental</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any Distance</SelectItem>
                            <SelectItem value="1km">Within 1 km</SelectItem>
                            <SelectItem value="5km">Within 5 km</SelectItem>
                            <SelectItem value="10km">Within 10 km</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <main className="flex-grow p-4 overflow-y-auto no-scrollbar">
                <div className="space-y-4">
                    {facilities.map((facility, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-base flex-1 pr-2">{facility.name}</h3>
                                    <div className={`w-3 h-3 rounded-full mt-1 ${facility.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">{facility.location}</p>
                                <div className="flex items-center text-xs text-muted-foreground mb-3">
                                    <Navigation className="w-3 h-3 mr-1.5" /> {facility.distance} away
                                    <Clock className="w-3 h-3 mr-1.5 ml-4" /> {facility.time}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1">Book</Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <Map className="w-4 h-4 mr-2" />
                                        Map View
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
