"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Fingerprint, Phone, Building2, ArrowRightLeft } from "lucide-react";
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
            <div className="inline-flex items-center justify-between w-full max-w-xs p-2 pl-4 rounded-full bg-muted">
                <span className="font-semibold">Juan Dela Cruz</span>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRightLeft className="h-5 w-5" />
                </Button>
            </div>
        </div>

        <div className="w-full max-w-xs h-24 bg-primary text-primary-foreground rounded-lg flex items-center">
          <Button variant="ghost" className="w-1/2 h-full flex-col space-y-2 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-r-none">
            <Fingerprint className="h-6 w-6" />
            <span>Biometric Login</span>
          </Button>
          <div className="w-px h-16 bg-primary-foreground/20"></div>
          <Button variant="ghost" className="w-1/2 h-full flex-col space-y-2 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-l-none">
            <Shield className="h-6 w-6" />
            <span>MPIN Login</span>
          </Button>
        </div>
        
        <div className="text-center">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary font-semibold hover:underline">
                    Sign Up
                </a>
            </p>
        </div>
      </div>

      <div className="pb-4 text-center">
        <Button variant="link" className="text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" />
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
