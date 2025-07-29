import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, Phone, Map, ShieldAlert, HeartPulse, Ambulance } from "lucide-react";
import Image from "next/image";

const emergencyHotlines = [
    { name: "City Emergency Hotline", number: "161", icon: Phone },
    { name: "Police Department", number: "(049) 534-1234", icon: ShieldAlert },
    { name: "Fire Department", number: "(049) 534-5678", icon: Ambulance },
    { name: "City Health Office", number: "(049) 530-9876", icon: HeartPulse },
]

export default function RespondaHubPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline text-primary">RespondaHub</h1>
                <p className="text-lg text-muted-foreground">Your centralized hub for safety and health services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent">
                            <Phone size={24} />
                            Emergency Hotlines
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {emergencyHotlines.map((hotline, index) => (
                                <li key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <hotline.icon className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{hotline.name}</span>
                                    </div>
                                    <span className="font-semibold font-mono text-primary">{hotline.number}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent">
                            <Hospital size={24} />
                            Hospital & Clinic Locator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-4 text-muted-foreground">Find the nearest medical facilities in Santa Rosa.</p>
                        <Button className="w-full bg-accent hover:bg-accent/90">
                            <Map className="mr-2 h-4 w-4" />
                            Open Locator
                        </Button>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent">
                            <HeartPulse size={24} />
                            Book an Appointment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-4 text-muted-foreground">Schedule a consultation at a city health center.</p>
                        <Button className="w-full">
                            Book Now
                        </Button>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent">
                            <ShieldAlert size={24} />
                            Calamity Impact Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-primary/20">
                             <Image src="https://placehold.co/800x450.png" data-ai-hint="map city" alt="Calamity Impact Map" layout="fill" objectFit="cover" />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                 <p className="text-white text-xl font-bold">Live Map Data Currently Unavailable</p>
                             </div>
                        </div>
                        <p className="mt-4 text-center text-muted-foreground">Stay informed about real-time conditions during emergencies. This map shows affected areas, evacuation centers, and relief operation points.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
