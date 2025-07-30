
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Lightbulb, Building as BuildingIcon } from "lucide-react";
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';

const services = [
    {
        title: "RespondaHub",
        description: "Health booking, live clinic queues, emergency dialer, and calamity map.",
        icon: Heart,
        color: "bg-[#0057A0]",
        href: "#"
    },
    {
        title: "Community Wall",
        description: "Join volunteer drives, share feedback, report lost items, and explore local job openings.",
        icon: Users,
        color: "bg-[#4CAF50]",
        href: "#"
    },
    {
        title: "EduConnect",
        description: "Explore scholarships, access learning, resources, and join skills training to boost your future.",
        icon: Lightbulb,
        color: "bg-[#009688]",
        href: "#"
    },
    {
        title: "e-Government Services",
        description: "Apply for documents request services, or get business permit support.",
        icon: BuildingIcon,
        color: "bg-[#A4040A]",
        href: "#"
    }
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="Services" />
      
      <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar flex flex-col">
        <h2 className="text-lg font-semibold text-center mb-2">How can we help you today?</h2>

        <div className="flex-grow grid grid-cols-2 gap-4">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <Card key={index} className="overflow-hidden flex flex-col" onClick={() => {}}>
                        <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-3 flex-grow">
                            <div className={`p-3 rounded-lg flex items-center justify-center text-white ${service.color}`}>
                                <Icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                                <p className="text-xs text-muted-foreground leading-tight">{service.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
      </main>

      <Navbar activePage="services" />
    </div>
  );
}
