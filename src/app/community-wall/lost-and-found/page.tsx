
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Search, Plus, MessageSquare, Share2 } from "lucide-react";
import { useRouter } from 'next/navigation';

const lostAndFoundPosts = [
    {
        user: "Maria Santos",
        avatar: "https://github.com/shadcn.png",
        fallback: "MS",
        time: "2 oras ang nakalipas",
        type: "NAWAWALA",
        content: "Nawawala po ang aso namin, isang Shih Tzu na may pangalang 'Kiko'. Huling nakita sa may parke ng Brgy. Dita. May suot siyang pulang collar. Paki-contact po ako sa 09123456789.",
        color: "text-red-600",
        bgColor: "bg-red-100"
    },
    {
        user: "Jose Rizal",
        avatar: "https://github.com/joserizal.png",
        fallback: "JR",
        time: "5 oras ang nakalipas",
        type: "NAKITA",
        content: "May nakita po akong pitaka sa may public market. Nasa loob po ang ID na may pangalang 'Clara T. Delos Reyes'. Mangyaring kunin ito sa City Hall, hanapin si Mang Teban.",
        color: "text-green-600",
        bgColor: "bg-green-100"
    },
    {
        user: "Juan Dela Cruz",
        avatar: "https://github.com/randomuser.png",
        fallback: "JC",
        time: "1 araw ang nakalipas",
        type: "NAWAWALA",
        content: "Naiwan ko po ang aking payong na kulay blue sa isang tricycle. Baka po may nakakita. Salamat po.",
        color: "text-red-600",
        bgColor: "bg-red-100"
    },
];

const PostCard = ({ post }: { post: typeof lostAndFoundPosts[0] }) => (
    <Card>
        <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage src={post.avatar} alt={post.user} />
                    <AvatarFallback>{post.fallback}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
                <div className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${post.bgColor} ${post.color}`}>
                    {post.type}
                </div>
            </div>
            <p className="text-sm pt-3">{post.content}</p>
        </CardHeader>
        <CardContent className="flex justify-end gap-4 border-t pt-3">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" /> Mag-iwan ng Komento
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <Share2 className="w-4 h-4" /> Ibahagi
            </Button>
        </CardContent>
    </Card>
);

export default function LostAndFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Lost and Found</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-4">
                <div className="text-center mb-4">
                     <p className="text-muted-foreground">"Missing something important? Let's help you find it."</p>
                </div>

                 <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Input placeholder="Maghanap ng posts..." className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Mag-post
                    </Button>
                </div>

                <div className="space-y-4">
                    {lostAndFoundPosts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            </main>
        </div>
    );
}
