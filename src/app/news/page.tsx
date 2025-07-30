
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';

const announcements = [
    { title: "New Traffic Scheme Implemented This Week", image: "https://placehold.co/600x400.png", imageHint: "traffic road" },
    { title: "City-wide Cleanup Drive on Saturday", image: "https://placehold.co/600x400.png", imageHint: "cleanup community" },
    { title: "Holiday Market Opens at City Plaza", image: "https://placehold.co/600x400.png", imageHint: "market holiday" },
];

const newsItems = [
    { title: "City Opens New Community Park", description: "The new park features a playground, a jogging path, and a picnic area for families to enjoy.", image: "https://placehold.co/600x400.png", imageHint: "park community", category: "Community", date: "2 days ago" },
    { title: "Annual Festival Dates Announced", description: "The much-awaited Sikhayan Festival will be held from February 10-18, featuring various events.", image: "https://placehold.co/600x400.png", imageHint: "festival announcement", category: "Events", date: "3 days ago" },
    { title: "Tech Hub to Rise in Santa Rosa", description: "A new technology park is set to begin construction, promising thousands of jobs for residents.", image: "https://placehold.co/600x400.png", imageHint: "tech building", category: "Business", date: "5 days ago" },
    { title: "Public Library Launches Reading Program", description: "The new program aims to encourage reading among children and young adults with weekly activities.", image: "https://placehold.co/600x400.png", imageHint: "library books", category: "Education", date: "6 days ago" },
];

export default function NewsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <Header title="News and Events" />
      
      <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar">
        <div className="relative">
            <Input placeholder="Search News or Events" className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-4">Announcements</h3>
            <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {announcements.map((item, index) => (
                        <CarouselItem key={index} className="basis-3/4">
                            <Card className="overflow-hidden relative text-white">
                                <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-40 object-cover" data-ai-hint={item.imageHint} />
                                <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                                    <h4 className="font-semibold text-md">{item.title}</h4>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted/60">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="top">Top News</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
             {newsItems.map((item, index) => (
                <Card key={index} className="overflow-hidden" onClick={() => {}}>
                    <CardContent className="p-0 flex">
                        <div className="w-1/3">
                            <Image src={item.image} alt={item.title} width={150} height={150} className="w-full h-full object-cover" data-ai-hint={item.imageHint} />
                        </div>
                        <div className="w-2/3 p-3">
                            <h3 className="font-semibold text-sm mb-1 leading-tight">{item.title}</h3>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
          </TabsContent>
        </Tabs>

      </main>

      <Navbar activePage="news" />
    </div>
  );
}
