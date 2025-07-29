"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

const LionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2c2.4 0 4.6.9 6.2 2.5C20.4 6.6 22 9.2 22 12c0 2.8-.9 5.4-2.5 7.5C17.4 21.6 14.8 23 12 23s-5.4-1.4-7.5-3.5C2.9 17.4 2 14.8 2 12c0-2.8.9-5.4 2.5-7.5C6.6 2.9 9.2 2 12 2zm0 2c-2.1 0-4.1.8-5.7 2.3C4.8 7.9 4 9.9 4 12c0 2.1.8 4.1 2.3 5.7C7.9 19.2 9.9 20 12 20s4.1-.8 5.7-2.3C19.2 16.1 20 14.1 20 12c0-2.1-.8-4.1-2.3-5.7C16.1 4.8 14.1 4 12 4zm0 3c.8 0 1.5.7 1.5 1.5S12.8 10 12 10s-1.5-.7-1.5-1.5S11.2 7 12 7zm-1.1 4.5c.3-.3.7-.5 1.1-.5s.8.2 1.1.5c.6.6.6 1.5 0 2.1l-1.1 1.1 1.1 1.1c.6.6.6 1.5 0 2.1-.3.3-.7.5-1.1.5s-.8-.2-1.1-.5L12 17.6l-1.1 1.1c-.3.3-.7.5-1.1.5s-.8-.2-1.1-.5c-.6-.6-.6-1.5 0-2.1l1.1-1.1-1.1-1.1c-.6-.6-.6-1.5 0-2.1.3-.3.7-.5 1.1-.5s.8.2 1.1.5L12 13.4l1.1-1.1z" />
  </svg>
);

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background p-8">
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        <LionIcon className="text-red-600 h-16 w-16" />

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
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Login
          </Button>
        </form>
      </div>

      <div className="pb-4">
        <div className="text-center text-sm text-muted-foreground mb-4">
          Doesn&apos;t have an account?
        </div>
        <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700">
          Sign up
        </Button>
      </div>
    </div>
  );
}
