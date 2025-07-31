
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, MapPin } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const impactLevels = [
    { level: "Low", color: "bg-green-500" },
    { level: "Medium", color: "bg-yellow-500" },
    { level: "High", color: "bg-orange-500" },
    { level: "Severe", color: "bg-red-500" },
];

const locations = [
    { name: "Brgy. Dita", top: '25%', left: '30%', level: 'High' },
    { name: "Brgy. Malitlit", top: '45%', left: '55%', level: 'Medium' },
    { name: "Brgy. Ibaba", top: '60%', left: '40%', level: 'Low' },
    { name: "City Center", top: '50%', left: '45%', level: 'Severe' },
]

export default function CalamityImpactMapPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Calamity Impact Map</h1>
            </header>
            
            <main className="flex-grow flex flex-col">
                <div className="p-4 bg-white border-b">
                     <Select defaultValue="flood">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Calamity Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flood">Flood</SelectItem>
                            <SelectItem value="fire">Fire</SelectItem>
                            <SelectItem value="earthquake">Earthquake</SelectItem>
                            <SelectItem value="typhoon">Typhoon</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-grow relative overflow-hidden">
                    <Image 
                        src="/images/mapbg.jpg" 
                        alt="Santa Rosa Map" 
                        layout="fill" 
                        objectFit="cover" 
                        className="opacity-70"
                        data-ai-hint="city map"
                    />
                    <div className="absolute inset-0 bg-white/30"></div>

                    {locations.map(loc => {
                        const impact = impactLevels.find(il => il.level === loc.level);
                        return (
                            <div key={loc.name} className="absolute" style={{ top: loc.top, left: loc.left }}>
                                <div className="relative flex flex-col items-center">
                                    <div className="bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-semibold shadow-lg whitespace-nowrap">{loc.name}</div>
                                    <MapPin className="w-8 h-8 -mt-1" style={{ color: impact ? impact.color.replace('bg-', 'var(--color-') : 'gray' }} />
                                </div>
                            </div>
                        )
                    })}
                   
                </div>
                <div className="p-4 bg-white border-t">
                    <Card>
                        <CardHeader className="p-3">
                            <CardTitle className="text-base">Legend</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                            <div className="flex justify-around">
                                {impactLevels.map(item => (
                                    <div key={item.level} className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                                        <span className="text-sm">{item.level}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
