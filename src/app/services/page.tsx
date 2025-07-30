
"use client";

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Users, Lightbulb, Building, MapPin, ChevronRight, MessageSquareQuote, BookOpen } from "lucide-react";
import Image from 'next/image';

const quickActions = [
    { title: "RespondaHub", description: "Health, emergencies, and calamity support.", icon: Heart, bgColor: "#E6F0FF", color: "#0057A0" },
    { title: "Community Wall", description: "Jobs, volunteering, and local reports.", icon: Users, bgColor: "#E8F5E9", color: "#4CAF50" },
    { title: "EduConnect", description: "Scholarships, e-learning, and trainings.", icon: Lightbulb, bgColor: "#E0F7FA", color: "#009688" },
    { title: "e-Gov Services", description: "Documents, permits, and other services.", icon: Building, bgColor: "#FDE7E7", color: "#A4040A" },
]

const queueItems = [
    { name: "City Hall", distance: "1.2 km away", queue: 22, waitTime: "15-20 min" },
    { name: "Satelite Office", distance: "3.5 km away", queue: 15, waitTime: "10-15 min" },
    { name: "Social Services", distance: "2.8 km away", queue: 31, waitTime: "25-30 min" },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="Services" />
      
      <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar">
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">How Can We Help You Today?</h2>
            <div className="grid grid-cols-2 gap-4">
                {quickActions.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Card key={item.title} className="overflow-hidden">
                           <CardContent className="p-4">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: item.bgColor }}>
                                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                                </div>
                                <h3 className="font-semibold text-sm text-gray-800">{item.title}</h3>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                           </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>

        <Separator />
        
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20 text-primary-800">
                <CardContent className="p-4 flex flex-col items-center text-center">
                    <BookOpen className="w-8 h-8 mb-2 text-primary" />
                    <h3 className="font-semibold text-sm">Quick Guide</h3>
                    <p className="text-xs text-primary/80">Learn how to use the app.</p>
                </CardContent>
            </Card>
            <Card className="bg-secondary/60">
                <CardContent className="p-4 flex flex-col items-center text-center">
                    <MessageSquareQuote className="w-8 h-8 mb-2 text-secondary-foreground" />
                    <h3 className="font-semibold text-sm">Need Help?</h3>
                    <p className="text-xs text-muted-foreground">Contact our support team.</p>
                </CardContent>
            </Card>
        </div>

        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Nearby Queues</h2>
            <div className="space-y-3">
                {queueItems.map((item) => (
                     <Card key={item.name}>
                        <CardContent className="p-4 flex items-center">
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.distance}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-primary">{item.queue}</p>
                                <p className="text-xs text-muted-foreground">in queue</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-2">
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </CardContent>
                     </Card>
                ))}
            </div>
        </div>

      </main>

      <Navbar activePage="services" />
    </div>
  );
}
