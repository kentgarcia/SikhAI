
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Bell, Home, Newspaper, Sparkles, User, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Juan Dela Cruz" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h2 className="text-lg font-bold">Juan Dela Cruz</h2>
            </div>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Card>
              <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>Welcome to your dashboard!</CardDescription>
              </CardHeader>
              <CardContent>
                  <p>This is the dashboard page. You can add your main app content here.</p>
              </CardContent>
              <CardFooter>
                  <Button onClick={() => router.push('/')}>Log Out</Button>
              </CardFooter>
          </Card>
        </motion.div>
      </main>

      <nav className="relative border-t bg-background">
        <div className="mx-auto max-w-sm flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col h-auto items-center text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-auto items-center text-muted-foreground">
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
                <Sparkles className="h-8 w-8 text-primary-foreground" />
            </Button>
        </div>
      </nav>
    </div>
  );
}
