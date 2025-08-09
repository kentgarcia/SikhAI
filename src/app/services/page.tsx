
"use client";

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Users, Lightbulb, Building, MapPin, Clock, ArrowRightCircle, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const quickActions = [
    { title: "RespondaHub", description: "Health, emergencies, and calamity support.", icon: Heart, bgColor: "#E6F0FF", color: "#0057A0", href: "/responda-hub" },
    { title: "Community Wall", description: "Jobs, volunteering, and local reports.", icon: Users, bgColor: "#E8F5E9", color: "#4CAF50", href: "/community-wall" },
    { title: "EduConnect", description: "Scholarships, e-learning, and trainings.", icon: Lightbulb, bgColor: "#E0F7FA", color: "#009688", href: "/edu-connect" },
    { title: "e-Gov Services", description: "Documents, permits, and other services.", icon: Building, bgColor: "#FDE7E7", color: "#A4040A", href: "#" },
]

const queueItems = [
    { name: "Sta. Rosa Health Center", queue: 4, waitTime: "15 mins" },
    { name: "Satelite Office", queue: 15, waitTime: "10-15 min" },
    { name: "Social Services", queue: 31, waitTime: "25-30 min" },
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
                                <Link href={item.href} key={item.title}>
                                    <Card className="overflow-hidden h-full hover:bg-muted/50 cursor-pointer">
                                        <CardContent className="p-4">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: item.bgColor }}>
                                                <Icon className="w-6 h-6" style={{ color: item.color }} />
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-800">{item.title}</h3>
                                            <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                    <Card className="aspect-square" style={{ backgroundColor: '#FFF5E7' }}>
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-xl">📌</p>
                                    <h3 className="font-semibold text-xs">Quick Guide</h3>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Need to renew your business permit soon?</p>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-xs justify-start" style={{ color: '#A4040A' }}>
                                <span className="italic text-left">Check e-Gov <br></br> Services now!</span>
                                <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="aspect-square">
                        <CardContent className="p-4 flex flex-col justify-between h-full">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-xs">Need help with a service?</h3>
                                <p className="text-xl font-semibold" style={{ color: '#A4040A' }}>Ask Rosa!</p>
                            </div>
                            <div className="flex items-end justify-between">
                                <Button size="sm" className="h-8 text-xs" style={{ backgroundColor: '#A4040A' }}>Ask Rosa</Button>
                                <div className="w-16 h-16 relative">
                                    <Image src="/images/rosaWave.png" alt="Rosa AI" layout="fill" objectFit="contain" data-ai-hint="robot waving" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div
                    className="relative rounded-lg p-4 overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/mapbg.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/50"></div>
                    <div className="relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <MapPin className="w-5 h-5" /> Nearby Queues
                            </h2>
                            <Button variant="link" className="text-primary text-sm">View all</Button>
                        </div>
                        <div className="space-y-3">
                            {queueItems.map((item, index) => (
                                <Card key={index} className="bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-3 flex items-center">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4">
                                                <Clock className="w-3 h-3" />
                                                <span>Queue: {item.queue} waiting ({item.waitTime})</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                                            <ArrowRightCircle className="w-6 h-6" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

            </main>

            <Navbar activePage="services" />
        </div>
    );
}
