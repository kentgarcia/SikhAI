
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Search, Plus, ThumbsUp, ThumbsDown, Star, MessageSquare } from "lucide-react";
import { useRouter } from 'next/navigation';

const PollCard = () => {
    const [voted, setVoted] = useState(false);
    const pollOptions = [
        { text: "Public Park", votes: 45 },
        { text: "Sports Complex", votes: 28 },
        { text: "Library", votes: 17 },
        { text: "Clinic", votes: 10 },
    ];
    const totalVotes = pollOptions.reduce((acc, option) => acc + option.votes, 0);

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">City Planning Office</CardTitle>
                        <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                    </div>
                </div>
                <p className="text-sm pt-2">What new facility does your community need the most?</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {pollOptions.map(option => (
                        <div key={option.text} onClick={() => setVoted(true)} className="cursor-pointer">
                            {voted ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>{option.text}</span>
                                        <span>{((option.votes / totalVotes) * 100).toFixed(0)}%</span>
                                    </div>
                                    <Progress value={(option.votes / totalVotes) * 100} className="h-2" />
                                </div>
                            ) : (
                                <div className="border rounded-md p-3 text-sm hover:bg-muted/50">{option.text}</div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-right">{voted ? `${totalVotes} votes` : 'Click an option to vote.'}</p>
            </CardContent>
        </Card>
    );
};

const FeedbackCard = () => (
    <Card>
        <CardHeader className="pb-4">
            <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage src="https://github.com/randomuser.png" alt="User" />
                    <AvatarFallback>JU</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-base">Juan Dela Cruz</CardTitle>
                    <p className="text-xs text-muted-foreground">Rated the "Coastal Cleanup" event</p>
                </div>
                 <div className="ml-auto flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
            </div>
            <p className="text-sm pt-2 italic">"It was a well-organized and impactful event. I'm glad I could contribute to cleaning up our beautiful coastline. Hope to see more of these initiatives!"</p>
        </CardHeader>
        <CardContent className="flex justify-end gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" /> 2 Comments
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="w-4 h-4" /> 15 Likes
            </Button>
        </CardContent>
    </Card>
);

const EventInterestCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-base">Upcoming Event: Santa Rosa Music Festival</CardTitle>
            <p className="text-sm text-muted-foreground">Are you interested in attending this event?</p>
        </CardHeader>
        <CardContent className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ThumbsDown className="w-4 h-4" /> Not Interested
            </Button>
            <Button size="sm" className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" /> Interested
            </Button>
        </CardContent>
    </Card>
)

export default function PollsFeedbackPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Polls & Feedback</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-4">
                 <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Input placeholder="Search posts..." className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Post
                    </Button>
                </div>
                
                <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="polls">Polls</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                        <EventInterestCard />
                        <PollCard />
                        <FeedbackCard />
                    </TabsContent>
                    <TabsContent value="polls" className="space-y-4">
                        <PollCard />
                    </TabsContent>
                    <TabsContent value="feedback" className="space-y-4">
                        <FeedbackCard />
                    </TabsContent>
                    <TabsContent value="upcoming" className="space-y-4">
                        <EventInterestCard />
                    </TabsContent>
                </Tabs>


            </main>
        </div>
    );
}
