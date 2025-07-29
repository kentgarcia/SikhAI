import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Newspaper, Calendar, Megaphone, Sun, MapPin, Wind } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome, Resident!</h1>
        <p className="text-muted-foreground">Here's your personalized overview of Santa Rosa today.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Weather Widget */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Weather</CardTitle>
            <Sun className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary">29°C</div>
            <p className="text-xs text-muted-foreground">Sunny with a light breeze</p>
            <div className="mt-4 flex space-x-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Santa Rosa City</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">5 km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* City Announcements Widget */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-accent" />
              City Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="official seal" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Public Service Announcement: Water Interruption</p>
                <p className="text-sm text-muted-foreground">Scheduled water maintenance in Brgy. Dita on June 25, from 8 AM to 5 PM. Please store enough water.</p>
                <p className="text-xs text-muted-foreground mt-1">Posted 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
               <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="official seal" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Road Closure for City Fiesta</p>
                <p className="text-sm text-muted-foreground">Main Street will be closed to traffic on June 28 for the annual city fiesta parade. Please take alternate routes.</p>
                <p className="text-xs text-muted-foreground mt-1">Posted 1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Local News Widget */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-accent" />
              Local News
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <Image src="https://placehold.co/150x100.png" data-ai-hint="technology park" alt="News Image" width={150} height={100} className="rounded-md" />
              <div>
                <h3 className="font-semibold">New Tech Park to Boost Local Economy</h3>
                <p className="text-sm text-muted-foreground">The new technology park is expected to create over 5,000 jobs in the next three years.</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-1">Read More</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image src="https://placehold.co/150x100.png" data-ai-hint="community garden" alt="News Image" width={150} height={100} className="rounded-md" />
              <div>
                <h3 className="font-semibold">Community Garden Initiative Launched</h3>
                <p className="text-sm text-muted-foreground">Residents of Brgy. Pooc have started a community garden to promote sustainable living.</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-1">Read More</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Widget */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center p-2 bg-primary text-primary-foreground rounded-md">
                <span className="text-xs">JUN</span>
                <span className="text-lg font-bold">28</span>
              </div>
              <div>
                <h3 className="font-semibold">City Fiesta Celebration</h3>
                <p className="text-sm text-muted-foreground">Plaza Complex, 9 AM onwards</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center p-2 bg-secondary text-secondary-foreground rounded-md">
                <span className="text-xs">JUL</span>
                <span className="text-lg font-bold">05</span>
              </div>
              <div>
                <h3 className="font-semibold">Free Skills Training Seminar</h3>
                <p className="text-sm text-muted-foreground">City Auditorium, 1 PM - 4 PM</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center p-2 bg-secondary text-secondary-foreground rounded-md">
                <span className="text-xs">JUL</span>
                <span className="text-lg font-bold">12</span>
              </div>
              <div>
                <h3 className="font-semibold">Job Fair 2024</h3>
                <p className="text-sm text-muted-foreground">City Sports Complex, 8 AM - 5 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
