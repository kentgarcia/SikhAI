
"use client";

import { useParams, useRouter } from 'next/navigation';
import data from '@/lib/data.json';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

export default function NewsArticlePage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const article = data.news.find(item => item.id === id);

    if (!article) {
        return (
            <div className="flex flex-col h-full bg-background">
                <header className="flex items-center p-4 border-b">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-semibold ml-4">News Not Found</h1>
                </header>
                <main className="flex-grow p-4 flex items-center justify-center">
                    <p>The requested news article could not be found.</p>
                </main>
            </div>
        )
    }
    
    const articleDate = new Date(article.date);

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4 truncate">{article.category}</h1>
            </header>
            <main className="flex-grow overflow-y-auto no-scrollbar">
                <Image 
                    src={article.image} 
                    alt={article.title} 
                    width={400} 
                    height={250} 
                    className="w-full h-48 object-cover" 
                    data-ai-hint={article.title.toLowerCase().split(' ').slice(0,2).join(' ')}
                />
                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold leading-tight">{article.title}</h1>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{format(articleDate, 'MMMM dd, yyyy')}</span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {article.description}
                    </p>
                </div>
            </main>
        </div>
    );
}
