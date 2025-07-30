
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { ChevronRight, User, Shield, Receipt, Bell, LifeBuoy, Info, LogOut } from "lucide-react";

const menuItems = [
    { icon: User, label: "Profile Information", href: "#" },
    { icon: Shield, label: "Login & Security", href: "#" },
    { icon: Receipt, label: "My Transactions", href: "#" },
    { icon: Bell, label: "Notifications Settings", href: "#" },
    { icon: LifeBuoy, label: "Help & Support", href: "#" },
    { icon: Info, label: "About SikhAI", href: "#" },
];

export default function AccountPage() {
    return (
        <div className="flex flex-col h-full bg-muted/20">
            <main className="flex-grow overflow-y-auto no-scrollbar">
                <div className="relative bg-gradient-to-b from-white to-[#FDE7E7] pt-8 pb-12 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 text-4xl font-semibold" style={{backgroundColor: '#F9E9EF'}}>
                        <AvatarFallback className="bg-transparent text-primary">J</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-gray-800">Juan Dela Cruz</h2>
                    <p className="text-sm text-muted-foreground">juan.delacruz@example.com</p>
                </div>
                
                <div className="p-4 space-y-3 -mt-8">
                    <h3 className="text-lg font-semibold px-2">Account Settings</h3>
                    <Card className="p-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                                    <Icon className="w-6 h-6 mr-4 text-primary" />
                                    <span className="flex-grow text-sm font-medium text-gray-700">{item.label}</span>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                            )
                        })}
                    </Card>
                    <Card className="p-2">
                         <div className="flex items-center p-3 hover:bg-muted/50 rounded-lg cursor-pointer text-destructive">
                            <LogOut className="w-6 h-6 mr-4" />
                            <span className="flex-grow text-sm font-medium">Log Out</span>
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </Card>
                </div>
            </main>

            <Navbar activePage="account" />
        </div>
    );
}
