"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-background p-8"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <Building2 className="text-primary h-16 w-16" />

        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">We&apos;re glad to see you again.</p>
        </div>

        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" required />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeOff className="h-5 w-5 text-gray-500 mt-6" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500 mt-6" />
                )}
              </button>
            </div>
            <a href="#" className="text-sm text-right block hover:underline">
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Login
          </Button>
        </form>
      </div>

      <div className="pb-4">
        <div className="text-center text-sm text-muted-foreground mb-4">
          Doesn&apos;t have an account?
        </div>
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-red-50 hover:text-primary/90">
          Sign up
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
