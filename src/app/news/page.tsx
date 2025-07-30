
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search, Home, Newspaper, Briefcase, User } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const newsItems = [
    { title: "City Opens New Community Park", image: "https://placehold.co/600x400.png", imageHint: "park community", category: "Community", date: "2 days ago" },
    { title: "Annual Festival Dates Announced", image: "https://placehold.co/600x400.png", imageHint: "festival announcement", category: "Events", date: "3 days ago" },
    { title: "New Traffic Scheme Implemented", image: "https://placehold.co/600x400.png", imageHint: "traffic road", category: "Government", date: "4 days ago" },
    { title: "Tech Hub to Rise in Santa Rosa", image: "https://placehold.co/600x400.png", imageHint: "tech building", category: "Business", date: "5 days ago" },
    { title: "Public Library Launches Reading Program", image: "https://placehold.co/600x400.png", imageHint: "library books", category: "Education", date: "6 days ago" },
    { title: "City-wide Vaccination Drive Continues", image: "https://placehold.co/600x400.png", imageHint: "vaccination health", category: "Health", date: "1 week ago" },
];

export default function NewsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">News & Announcements</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto space-y-4 no-scrollbar">
        {newsItems.map((item, index) => (
            <Card key={index} className="overflow-hidden" onClick={() => {}}>
                <CardContent className="p-0 flex">
                    <div className="w-2/3 p-4">
                        <p className="text-xs text-primary font-semibold mb-1">{item.category}</p>
                        <h3 className="font-semibold text-base mb-2 leading-tight">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="w-1/3">
                        <Image src={item.image} alt={item.title} width={150} height={150} className="w-full h-full object-cover" data-ai-hint={item.imageHint} />
                    </div>
                </CardContent>
            </Card>
        ))}
      </main>

      <nav className="relative border-t bg-background">
        <div className="mx-auto max-w-sm flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground" onClick={() => router.push('/dashboard')}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
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
                 <Image src="/images/icon_logo.png" alt="AI" width={40} height={40} />
            </Button>
        </div>
      </nav>
    </div>
  );
}
