"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, BookOpen, Globe, Calendar, ChevronRight } from 'lucide-react'; // Added icons
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link
import { Separator } from '@radix-ui/react-separator';
import Navbar from '@/components/layout/Navbar';

const EduConnectPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const services = [
        { title: "Scholarship Application", icon: BookOpen, href: "/edu-connect/scholarships" }, // Updated href
        { title: "Online Modules & Resource Hub", icon: Globe, href: "/edu-connect/online-modules" }, // Updated href
        { title: "Skills Training Events", icon: Calendar, href: "/edu-connect/skills-training" }, // Replace # with actual href
    ];

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center p-4 border-b">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">EduConnect</h1>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                <p className="text-muted-foreground mb-6">Choose an EduConnect service</p>
                <Card className="p-2 rounded-2xl">
                    {services.map((service, index) => (
                        <Link href={service.href} key={service.title}>
                            <div>
                                <div className="flex items-center p-4 hover:bg-muted/50 rounded-lg cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 mr-4">
                                        <service.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="flex-grow font-medium text-gray-700">{service.title}</span>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                                {index < services.length - 1 && <Separator />}
                            </div>
                        </Link>
                    ))}
                </Card>
            </main>

            <Navbar activePage="services" />
        </div>
    );
};

export default EduConnectPage;
