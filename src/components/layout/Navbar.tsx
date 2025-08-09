
"use client";

import { Button } from "@/components/ui/button";
import { Home, Newspaper, Briefcase, User } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface NavbarProps {
    activePage: 'home' | 'news' | 'services' | 'account' | 'ai';
}

export default function Navbar({ activePage }: NavbarProps) {
    const router = useRouter();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home', href: '/dashboard' },
        { id: 'news', icon: Newspaper, label: 'News', href: '/news' },
        { id: 'services', icon: Briefcase, label: 'Services', href: '/services' },
        { id: 'account', icon: User, label: 'Account', href: '/account' },
    ]

    return (
        <nav className="relative border-t bg-background z-9999">
            <div className="mx-auto max-w-sm flex justify-around items-center h-16">
                {navItems.slice(0, 2).map(item => {
                    const Icon = item.icon;
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={`flex flex-col h-auto items-center ${activePage === item.id ? 'text-primary' : 'text-muted-foreground'}`}
                            onClick={() => router.push(item.href)}
                        >
                            <Icon className="h-6 w-6" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </Button>
                    )
                })}

                <div className="w-16"></div>

                {navItems.slice(2, 4).map(item => {
                    const Icon = item.icon;
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={`flex flex-col h-auto items-center ${activePage === item.id ? 'text-primary' : 'text-muted-foreground'}`}
                            onClick={() => router.push(item.href)}
                        >
                            <Icon className="h-6 w-6" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </Button>
                    )
                })}
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-9999">
                <Button
                    size="icon"
                    className="bg-primary hover:bg-primary/90 rounded-full w-16 h-16 shadow-lg"
                    onClick={() => router.push('/ai')}
                >
                    <Image src="/images/icon_logowhite.png" alt="AI" width={40} height={40} />
                </Button>
            </div>
        </nav>
    )
}
