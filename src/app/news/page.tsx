
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import data from '@/lib/data.json';

import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

const announcements = data.news.map(item => ({
    ...item,
    imageHint: item.title.toLowerCase().split(' ').slice(0, 2).join(' ')
}));

const newsItems = data.news.map(item => ({
    ...item,
    imageHint: item.category.toLowerCase()
}));


export default function NewsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState("all");

    // Filtering logic for news items
    const filteredNews = useMemo(() => {
        let items = newsItems;
        // Tab filtering
        if (tab === "top") {
            items = items.slice(0, 3); // Top 3 news
        } else if (tab === "recent") {
            items = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (tab === "videos") {
            items = items.filter(item => item.category.toLowerCase() === "videos" || item.title.toLowerCase().includes("video"));
        } else if (tab === "others") {
            items = items.filter(item => !["community", "education", "events", "health", "videos", "top news", "recent"].includes(item.category.toLowerCase()));
        }
        // Search filtering
        if (search.trim() !== "") {
            const q = search.toLowerCase();
            items = items.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
            );
        }
        return items;
    }, [search, tab]);

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="News and Events" />

            <main className="flex-grow p-4 overflow-y-auto space-y-6 no-scrollbar">
                <div className="relative">
                    <Input
                        placeholder="Search News or Events"
                        className="pl-10"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        aria-label="Search News or Events"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Announcements</h3>
                    <Carousel opts={{ loop: true }} className="w-full">
                        <CarouselContent>
                            {announcements.map((item, index) => (
                                <CarouselItem key={index} className="basis-3/4">
                                    <Card className="overflow-hidden relative text-white cursor-pointer" onClick={() => router.push(`/news/${item.id}`)}>
                                        <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-40 object-cover" data-ai-hint={item.imageHint} />
                                        <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                                            <h4 className="font-semibold text-sm leading-snug">{item.title}</h4>
                                        </div>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-muted/60">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="top" className="text-xs">Top News</TabsTrigger>
                        <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
                        <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
                        <TabsTrigger value="others" className="text-xs">Others</TabsTrigger>
                    </TabsList>
                    <TabsContent value={tab} className="space-y-4">
                        {filteredNews.length === 0 ? (
                            <div className="text-center text-muted-foreground text-sm py-8">No news found.</div>
                        ) : (
                            filteredNews.map((item, index) => (
                                <Card key={index} className="overflow-hidden cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/news/${item.id}`)}>
                                    <CardContent className="p-0 flex">
                                        <div className="w-1/3">
                                            <Image src={item.image} alt={item.title} width={150} height={150} className="w-full h-full object-cover" data-ai-hint={item.imageHint} />
                                        </div>
                                        <div className="w-2/3 p-3 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-xs mb-1 leading-tight line-clamp-2">{item.title}</h3>
                                                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>
                </Tabs>

            </main>

            <Navbar activePage="news" />
        </div>
    );
}
