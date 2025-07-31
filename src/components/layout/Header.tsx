
"use client";

import { Button } from "@/components/ui/button";
import { Languages, Bell } from "lucide-react";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    title: string;
}

const notifications = [
    { title: "New Job Alert!", description: "A new job matching your profile has been posted." },
    { title: "Event Reminder", description: "The Coastal Cleanup Challenge is tomorrow." },
    { title: "Appointment Confirmed", description: "Your appointment at The Medical City is confirmed." },
]


export default function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
                <Image src="/images/icon_logo.png" alt="Logo" width={32} height={32} />
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Languages className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Tagalog</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                        <div className="p-2 font-semibold">Notifications</div>
                        <DropdownMenuSeparator />
                        {notifications.map((notification, index) => (
                            <DropdownMenuItem key={index} className="flex flex-col items-start whitespace-normal">
                                <div className="font-medium">{notification.title}</div>
                                <div className="text-xs text-muted-foreground">{notification.description}</div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
