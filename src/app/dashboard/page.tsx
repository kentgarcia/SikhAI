
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-background p-8"
    >
      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
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
      </div>
    </motion.div>
  );
}
