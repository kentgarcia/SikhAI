import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { GraduationCap, BookOpen, CalendarDays } from "lucide-react"; // Using CalendarDays for Skills Training Events for now
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

const eduConnectMenuItems = [
    { icon: GraduationCap, label: "Scholarship Application", href: "#" }, // Replace # with actual links
    { icon: BookOpen, label: "Online Modules & Resource Hub", href: "#" }, // Replace # with actual links
    { icon: CalendarDays, label: "Skills Training Events", href: "#" }, // Replace # with actual links
];

export default function EduConnectPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center justify-start px-4 py-2 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-semibold ml-2">EduConnect</h1>
            </header>

            <main className="flex-grow p-4 flex flex-col items-center">
                <p className="text-center text-muted-foreground mb-6">Choose a EduConnect service</p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    {eduConnectMenuItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <Card className="flex flex-col items-center justify-center text-center p-4 h-36">
                                <CardContent className="flex flex-col items-center justify-center p-0">
                                    <item.icon className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-sm font-medium">{item.label}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>

            {/* TODO: Add Bottom Navigation Bar */}
        </div>
    );
}
