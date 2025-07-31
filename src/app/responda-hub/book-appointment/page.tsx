
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

export default function BookAppointmentPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleBooking = () => {
        // Form submission logic would go here
        toast({
          title: "Booking Successful!",
          description: "Your appointment has been scheduled.",
        });
        router.push('/responda-hub');
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <header className="flex items-center p-4 border-b bg-white flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Book an Appointment</h1>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto no-scrollbar">
                <Card>
                    <CardHeader>
                        <CardTitle>Appointment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                             <Label htmlFor="facility">Facility</Label>
                             <Select>
                                <SelectTrigger id="facility">
                                    <SelectValue placeholder="Select a facility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tmc">The Medical City South Luzon</SelectItem>
                                    <SelectItem value="qmh">QualiMed Hospital Sta. Rosa</SelectItem>
                                    <SelectItem value="srh">Sta. Rosa Hospital and Medical Center</SelectItem>
                                    <SelectItem value="sjh">St. James Hospital</SelectItem>
                                    <SelectItem value="nsm">New Sinai MDI Hospital</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="specialty">Specialty</Label>
                             <Select>
                                <SelectTrigger id="specialty">
                                    <SelectValue placeholder="Select a specialty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="cardiology">Cardiology</SelectItem>
                                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                    <SelectItem value="dental">Dental</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Time Slot</Label>
                            <RadioGroup defaultValue={timeSlots[0]} className="grid grid-cols-3 gap-4">
                                {timeSlots.map(slot => (
                                     <Label key={slot} htmlFor={slot} className="flex items-center space-x-2 border rounded-md p-3 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                                        <RadioGroupItem value={slot} id={slot} />
                                        <span>{slot}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="Juan" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Dela Cruz" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="09123456789" />
                            </div>
                        </div>

                        <Button onClick={handleBooking} className="w-full" size="lg">Book Now</Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
