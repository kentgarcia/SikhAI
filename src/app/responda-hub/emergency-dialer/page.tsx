
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Phone, Ambulance, Shield, Flame, Siren, Plus } from "lucide-react";
import { useRouter } from 'next/navigation';

const emergencyContacts = [
    { name: "Ambulance", icon: Ambulance, color: "bg-green-100 text-green-700" },
    { name: "Fire", icon: Flame, color: "bg-orange-100 text-orange-700" },
    { name: "Police", icon: Shield, color: "bg-blue-100 text-blue-700" },
    { name: "Disaster Response", icon: Siren, color: "bg-yellow-100 text-yellow-700" },
    { name: "911", icon: Phone, color: "bg-red-100 text-red-700" },
    { name: "Add More", icon: Plus, color: "bg-gray-100 text-gray-700" },
]

export default function EmergencyDialerPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Emergency Dialer</h1>
            </header>
            
            <main className="flex-grow flex flex-col p-4 overflow-y-auto no-scrollbar">
                <p className="text-center text-muted-foreground mb-6">Quick access to emergency hotlines.</p>
                <div className="grid grid-cols-2 gap-4">
                    {emergencyContacts.map((contact) => {
                        const Icon = contact.icon;
                        return (
                            <Card key={contact.name} className="aspect-square hover:bg-muted/50 cursor-pointer">
                                <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${contact.color}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-semibold text-sm text-gray-800">{contact.name}</h3>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
                <div className="mt-auto pt-8 text-center">
                    <p className="text-sm text-muted-foreground">Stay safe, Santa Rosa. These hotlines are here to help.</p>
                </div>
            </main>
        </div>
    );
}
