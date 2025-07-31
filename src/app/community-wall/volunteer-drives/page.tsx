
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, Calendar, MapPin, Users, Heart } from "lucide-react";
import { useRouter } from 'next/navigation';

const drives = [
    {
        title: "Coastal Cleanup Challenge",
        organization: "Santa Rosa Environmental Group",
        date: "August 15, 2025",
        location: "Santa Rosa Bay Area",
        cause: "Environment",
        volunteersNeeded: 50,
        volunteersJoined: 23,
    },
    {
        title: "Community Kitchen Support",
        organization: "Lions Club Santa Rosa",
        date: "August 20, 2025",
        location: "City Social Hall",
        cause: "Community Support",
        volunteersNeeded: 20,
        volunteersJoined: 18,
    },
    {
        title: "Animal Shelter Assistance",
        organization: "PAWS Santa Rosa Chapter",
        date: "August 22, 2025",
        location: "City Animal Shelter",
        cause: "Animal Welfare",
        volunteersNeeded: 15,
        volunteersJoined: 7,
    },
];

export default function VolunteerDrivesPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Volunteer Drives</h1>
            </header>
            
            <main className="flex-grow flex flex-col p-4 overflow-y-auto no-scrollbar space-y-6">
                <Card>
                    <CardContent className="p-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="how-to-join">
                                <AccordionTrigger className="font-semibold text-primary">How to Join a Community Drive?</AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-2 text-muted-foreground">
                                    <div>
                                        <p className="font-semibold text-gray-700">Step 1: Browse Available Drives</p>
                                        <p className="text-sm">Scroll through the list of volunteer opportunities below. Use the filters to find drives that match your interests and availability.</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700">Step 2: Choose & Join</p>
                                        <p className="text-sm">Once you find a drive you're passionate about, click the "Join Drive" button to sign up.</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700">Step 3: Show Up & Make an Impact</p>
                                        <p className="text-sm">Attend the drive on the specified date and time. Your contribution makes a real difference in our community!</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Find a Drive</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Cause" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Causes</SelectItem>
                                <SelectItem value="environment">Environment</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
                                <SelectItem value="community-support">Community Support</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Date</SelectItem>
                                <SelectItem value="this-week">This Week</SelectItem>
                                <SelectItem value="this-month">This Month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4">
                    {drives.map((drive, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-2">
                                     <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                                        <Heart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-base">{drive.title}</h3>
                                        <p className="text-xs text-muted-foreground">{drive.organization}</p>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-muted-foreground space-y-1 my-3">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" /> {drive.date}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" /> {drive.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-2" /> {drive.volunteersJoined} / {drive.volunteersNeeded} joined
                                    </div>
                                </div>
                                <Button className="w-full">Join Drive</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
