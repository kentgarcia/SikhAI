
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Shield, GraduationCap, Building, MapPin, Cloudy, Wind, Sunset, CloudRain, Calendar } from "lucide-react";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import data from '@/lib/data.json';
import { formatDistanceToNow, format } from 'date-fns';
import { useRouter } from "next/navigation";
import Link from "next/link";

const quickActions = [
    { icon: Heart, label: "Health", href: "#" },
    { icon: Shield, label: "Safety", href: "#" },
    { icon: GraduationCap, label: "Education", href: "#" },
    { icon: Building, label: "e-Gov", href: "#" },
]

const newsItems = data.news.slice(0, 4).map(item => ({
    ...item,
    imageHint: item.category.toLowerCase()
}));

const eventItems = data.upcomingEvents.map(event => {
    // The date in data.json is "AUG 05, 2025", which is not a standard format.
    // We'll parse it manually for format() to work correctly.
    // A more robust solution would be to standardize date formats in the JSON.
    const dateStr = event.date.replace(',', ''); // "AUG 05 2025"
    const eventDate = new Date(dateStr);
    
    return {
        ...event,
        day: format(eventDate, 'dd'),
        month: format(eventDate, 'MMM'),
        imageHint: event.title.toLowerCase().split(' ').slice(0,2).join(' ')
    };
});


const hourlyForecast = [
    { time: "4PM", icon: Cloudy, temp: "30°C", condition: "Mostly Cloudy" },
    { time: "5PM", icon: Wind, temp: "29°C", condition: "Windy" },
    { time: "6PM", icon: Cloudy, temp: "29°C", condition: "Overcast" },
    { time: "6:25PM", icon: Sunset, temp: "29°C", condition: "Sunset" },
    { time: "7PM", icon: Cloudy, temp: "29°C", condition: "Overcast" },
    { time: "7:25PM", icon: Cloudy, temp: "29°C", condition: "Overcast" },
]

export default function DashboardPage() {
    const router = useRouter();
  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="Dashboard" />
      
      <main className="flex-grow p-4 overflow-y-auto space-y-8 no-scrollbar">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-transparent rounded-xl p-6 overflow-hidden flex items-center border border-[#E7E7E7]"
        >
            <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full flex items-center justify-center animate-subtle-breathe" style={{backgroundColor: '#FFF2F3'}}>
              <div className="w-20 h-20 rounded-full" style={{backgroundColor: '#FEE2E3'}}></div>
            </div>
            <div className="absolute -bottom-12 -right-6 w-28 h-28 rounded-full flex items-center justify-center animate-subtle-breathe [animation-delay:500ms]" style={{backgroundColor: '#FFF2F3'}}>
              <div className="w-20 h-20 rounded-full" style={{backgroundColor: '#FEE2E3'}}></div>
            </div>

            <div className="relative z-10 w-1/2">
                <h3 className="text-lg font-semibold text-gray-800">Good day, Juan!</h3>
                <p className="text-xs text-gray-600 mt-2">I'm <span className="text-primary">Rosa</span>, your smart and caring companion from Sta. Rosa, ready to guide you trough your day!</p>
                <Button variant="outline" className="mt-4 rounded-full border-primary text-primary bg-transparent hover:bg-primary/10 hover:text-primary" onClick={() => router.push('/ai')}>
                    Start talking
                </Button>
            </div>
            <div className="relative w-1/2 h-32">
                 <Image src="/images/rosaWave.png" alt="AI companion" layout="fill" objectFit="contain" data-ai-hint="robot waving" />
            </div>
        </motion.div>
          
        <div>
            <h3 className="text-lg font-semibold mb-4">Local News & Announcements</h3>
            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
                <CarouselContent>
                    {newsItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-2/3">
                           <Link href={`/news/${item.id}`}>
                                <Card className="overflow-hidden rounded-xl cursor-pointer hover:shadow-md transition-shadow">
                                    <CardContent className="p-0">
                                        <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-28 object-cover" data-ai-hint={item.imageHint} />
                                        <div className="p-3">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-xs leading-snug flex-1 pr-2">
                                                    <span className="line-clamp-3">
                                                        {item.title}
                                                    </span>
                                                </h4>
                                                <p className="text-xs text-muted-foreground whitespace-nowrap">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <div key={index} className="flex flex-col items-center space-y-2">
                             <Button variant="outline" size="icon" className="w-16 h-16 rounded-full bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
                                <Icon className="w-8 h-8"/>
                            </Button>
                            <span className="text-xs font-medium">{action.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Santa Rosa Events</h3>
                 <Button variant="link" className="text-primary" onClick={() => router.push('/calendar')}>
                    <Calendar className="w-4 h-4 mr-2"/>
                    View calendar
                </Button>
            </div>
            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {eventItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-4/5">
                            <Link href={`/events/${item.id}`}>
                                <Card className="overflow-hidden rounded-xl cursor-pointer hover:shadow-md transition-shadow">
                                    <CardContent className="p-0">
                                        <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-32 object-cover" data-ai-hint={item.imageHint} />
                                        <div className="p-4 flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-xl font-bold">{item.day}</p>
                                                <p className="text-sm text-muted-foreground">{item.month}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-4">Weather Updates</h3>
            <Card className="bg-gradient-to-br from-white to-blue-50 text-gray-800 p-4">
                <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <p className="font-medium">Sta. Rosa, Laguna</p>
                            </div>
                            <p className="text-5xl font-semibold">27°C</p>
                            <p className="text-sm">Today, Mon</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold mb-1">Mostly Rainy</p>
                            <div className="relative">
                               <CloudRain className="w-16 h-16 text-gray-500" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2 text-center overflow-x-auto no-scrollbar -mx-4 px-4">
                        {hourlyForecast.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={index} className="flex flex-col items-center space-y-1 min-w-[60px]">
                                    <p className="text-xs">{item.time}</p>
                                    <Icon className="w-6 h-6 text-gray-600" />
                                    <p className="text-xs truncate">{item.condition}</p>
                                    <p className="text-xs font-semibold">{item.temp}</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>

      <Navbar activePage="home" />
    </div>
  );
}
