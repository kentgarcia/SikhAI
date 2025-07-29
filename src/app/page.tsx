"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Fingerprint, Phone, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-background p-8"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
        <Building2 className="text-primary h-16 w-16" />

        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Login to continue to Rosa Ciudad</p>
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <p className="font-semibold">Juan Dela Cruz</p>
                <a href="#" className="text-sm text-primary hover:underline">Switch User</a>
            </div>
        </div>

        <div className="w-full space-y-4">
            <Button variant="outline" className="w-full justify-center">
                <Fingerprint className="mr-2 h-5 w-5" />
                Login with Biometric
            </Button>
            <Button className="w-full bg-primary hover:bg-primary/90">
                <Shield className="mr-2 h-5 w-5" />
                Login with MPIN
            </Button>
        </div>
      </div>

      <div className="pb-4">
        <Button variant="destructive" className="w-full">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Hotline
        </Button>
      </div>
    </motion.div>
  );
};

const SplashScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="flex h-full w-full items-center justify-center bg-background"
  >
    <Building2 className="text-primary h-24 w-24 animate-pulse" />
  </motion.div>
);

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? <SplashScreen key="splash" /> : <LoginPage key="login" />}
    </AnimatePresence>
  );
}
