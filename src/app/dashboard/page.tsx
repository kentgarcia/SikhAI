
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Bell, Home, Newspaper, Sparkles, User, Briefcase, Calendar, Heart, Shield, GraduationCap, Building, ArrowRight, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const quickActions = [
    { icon: Heart, label: "Health", href: "#" },
    { icon: Shield, label: "Safety", href: "#" },
    { icon: GraduationCap, label: "Education", href: "#" },
    { icon: Building, label: "e-Gov", href: "#" },
]

const newsItems = [
    { title: "City Opens New Community Park", image: "https://placehold.co/600x400.png", imageHint: "park community" },
    { title: "Annual Festival Dates Announced", image: "https://placehold.co/600x400.png", imageHint: "festival announcement" },
    { title: "New Traffic Scheme Implemented", image: "https://placehold.co/600x400.png", imageHint: "traffic road" },
    { title: "Tech Hub to Rise in Santa Rosa", image: "https://placehold.co/600x400.png", imageHint: "tech building" },
]

const eventItems = [
    { title: "Sikhayan Festival", date: "FEB 10-18, 2025", image: "https://placehold.co/600x400.png", imageHint: "festival parade" },
    { title: "Santa Rosa Cityhood Anniversary", date: "JUL 10, 2025", image: "https://placehold.co/600x400.png", imageHint: "city hall" },
    { title: "Christmas Lighting Ceremony", date: "DEC 01, 2024", image: "https://placehold.co/600x400.png", imageHint: "christmas lights" },
]


export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Juan Dela Cruz" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h2 className="text-lg font-bold">Juan Dela Cruz</h2>
            </div>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto space-y-8">
        {/* Custom Banner */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-rose-50 rounded-xl p-6 overflow-hidden flex items-center"
        >
            <motion.div 
                animate={{
                    x: [-20, 20, -20],
                    y: [-20, 20, -20],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-rose-200/50 rounded-full filter blur-3xl opacity-50"
            ></motion.div>
             <motion.div 
                animate={{
                    x: [20, -20, 20],
                    y: [20, -20, 20],
                }}
                transition={{
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-rose-200/50 rounded-full filter blur-3xl opacity-50"
            ></motion.div>
            <div className="relative z-10 w-2/3">
                <h3 className="text-xl font-bold text-gray-800">Meet Rosa, your AI companion!</h3>
                <p className="text-sm text-gray-600 mt-2">Ask anything about Santa Rosa and get instant answers.</p>
                <Button className="mt-4">
                    Ask Rosa
                    <ArrowRight className="ml-2" />
                </Button>
            </div>
            <div className="relative w-1/3 h-24">
                 <Image src="https://placehold.co/100x100.png" alt="AI companion" layout="fill" objectFit="contain" data-ai-hint="robot mascot" />
            </div>
        </motion.div>
          
        {/* News Carousel */}
        <div>
            <h3 className="text-lg font-bold mb-4">Local News & Announcements</h3>
            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {newsItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-2/3">
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-24 object-cover" data-ai-hint={item.imageHint} />
                                    <div className="p-3">
                                        <p className="font-semibold text-sm truncate">{item.title}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        {/* Quick Actions */}
        <div>
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
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

        {/* Events Carousel */}
        <div>
            <h3 className="text-lg font-bold mb-4">Santa Rosa Events</h3>
            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {eventItems.map((item, index) => (
                        <CarouselItem key={index} className="basis-4/5">
                            <Card className="overflow-hidden relative text-white">
                                <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-32 object-cover" data-ai-hint={item.imageHint} />
                                <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> {item.date}</p>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </main>

      <nav className="relative border-t bg-background">
        <div className="mx-auto max-w-sm flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
            <Newspaper className="h-6 w-6" />
            <span className="text-xs mt-1">News</span>
          </Button>
          
          <div className="w-16"></div>

          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
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
                <Sparkles className="h-8 w-8 text-primary-foreground" />
            </Button>
        </div>
      </nav>
    </div>
  );
}
