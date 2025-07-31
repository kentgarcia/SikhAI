"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, BookOpen, Globe, Calendar } from 'lucide-react'; // Added icons
import { useRouter } from 'next/navigation';

const EduConnectPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const services = [
        { title: "Scholarship Application", icon: BookOpen, href: "#" }, // Replace # with actual href
        { title: "Online Modules & Resource Hub", icon: Globe, href: "#" }, // Replace # with actual href
        { title: "Skills Training Events", icon: Calendar, href: "#" }, // Replace # with actual href
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">EduConnect</h1>
            </div>

            <main className="flex-grow p-4 flex flex-col items-center">
                 <p className="text-gray-600 mb-6 text-center">Choose a EduConnect service</p>
                <div className="w-full max-w-md space-y-3">
                    {services.map((service, index) => (
                        <Card key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 rounded-full bg-blue-100">
                                     <service.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardContent className="p-0 text-lg font-medium">
                                    {service.title}
                                </CardContent>
                            </div>
                            <ChevronLeft className="h-5 w-5 text-gray-400 transform rotate-180" />
                        </Card>
                    ))}
                </div>
            </main>

            {/* Assuming a Navbar component exists */}
            {/* <Navbar activePage="services" /> */}
        </div>
    );
};

export default EduConnectPage;
