
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Newspaper, Briefcase, User, Languages, Bell, Heart, Users, Lightbulb, Building as BuildingIcon } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
            <Image src="/images/icon_logo.png" alt="Logo" width={32} height={32} />
            <h1 className="text-xl font-semibold">Services</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Languages className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
        </div>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar flex flex-col">
        <h2 className="text-lg font-semibold text-center mb-2">How can we help you today?</h2>

        <div className="flex-grow grid grid-cols-1 gap-4">
            {services.map((service, index) => {
                const Icon = service.icon;
                return (
                    <Card key={index} className="overflow-hidden" onClick={() => {}}>
                        <CardContent className="p-0 flex items-stretch">
                            <div className={`w-1/4 flex items-center justify-center text-white ${service.color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <div className="w-3/4 p-3">
                                <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                                <p className="text-xs text-muted-foreground">{service.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
      </main>

      <nav className="relative border-t bg-background">
        <div className="mx-auto max-w-sm flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground" onClick={() => router.push('/dashboard')}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground" onClick={() => router.push('/news')}>
            <Newspaper className="h-6 w-6" />
            <span className="text-xs mt-1">News</span>
          </Button>
          
          <div className="w-16"></div>

          <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
            <Briefcase className="h-6 w-6" />
            <span className="text-xs mt-1">Services</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Account</span>
          </Button>
        </div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full w-16 h-16 shadow-lg">
                 <Image src="/images/icon_logo.png" alt="AI" width={40} height={40} />
            </Button>
        </div>
      </nav>
    </div>
  );
}
