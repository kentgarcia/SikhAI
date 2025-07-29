import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, School, BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function EduConnectPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline text-primary">EduConnect</h1>
                <p className="text-lg text-muted-foreground">Empowering residents through education and skills development.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-1/3">
                        <Image src="https://placehold.co/600x400.png" data-ai-hint="student graduation" alt="Scholarships" width={600} height={400} className="object-cover h-full w-full" />
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-accent"><GraduationCap size={28}/>City Scholarship Program</CardTitle>
                            <CardDescription>Now accepting applications for SY 2024-2025</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p>The Santa Rosa City Scholarship Program is dedicated to supporting bright and deserving students in pursuing their dreams. We offer financial assistance for college and vocational courses. Check the eligibility requirements and application deadlines.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full md:w-auto">
                                Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent"><BookOpen size={24}/>Online Learning Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-muted-foreground">Access free courses and learning materials from our partners.</p>
                        <ul className="space-y-2">
                           <li className="flex items-center gap-2"><Button variant="link" className="p-0 h-auto">TESDA Online Program</Button></li>
                           <li className="flex items-center gap-2"><Button variant="link" className="p-0 h-auto">Coursera for Government</Button></li>
                           <li className="flex items-center gap-2"><Button variant="link" className="p-0 h-auto">Khan Academy</Button></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-accent"><School size={24}/>Skills Training</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-muted-foreground">Enhance your employability with free, hands-on skills training.</p>
                         <ul className="space-y-3">
                           <li className="font-medium">Welding NC II</li>
                           <li className="font-medium">Computer Systems Servicing</li>
                           <li className="font-medium">Housekeeping NC II</li>
                        </ul>
                    </CardContent>
                     <CardFooter>
                        <Button variant="secondary" className="w-full">
                           View Schedules & Enlist
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
