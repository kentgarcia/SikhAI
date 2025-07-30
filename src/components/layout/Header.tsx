
"use client";

import { Button } from "@/components/ui/button";
import { Languages, Bell } from "lucide-react";
import Image from 'next/image';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
                <Image src="/images/icon_logo.png" alt="Logo" width={32} height={32} />
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Languages className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-6 w-6" />
                </Button>
            </div>
        </header>
    )
}
