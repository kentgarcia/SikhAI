import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HandHelping, Briefcase, Search, Vote } from "lucide-react";

export default function CommunityWallPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline text-primary">Community Wall</h1>
                <p className="text-lg text-muted-foreground">Engage with your fellow citizens. Share, help, and connect.</p>
            </div>

            <Tabs defaultValue="volunteer" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mx-auto max-w-2xl h-auto">
                    <TabsTrigger value="volunteer" className="py-2"><HandHelping className="mr-2 h-4 w-4"/>Volunteer</TabsTrigger>
                    <TabsTrigger value="jobs" className="py-2"><Briefcase className="mr-2 h-4 w-4"/>Job Board</TabsTrigger>
                    <TabsTrigger value="lost-found" className="py-2"><Search className="mr-2 h-4 w-4"/>Lost & Found</TabsTrigger>
                    <TabsTrigger value="polls" className="py-2"><Vote className="mr-2 h-4 w-4"/>Polls</TabsTrigger>
                </TabsList>
                
                <TabsContent value="volunteer" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Coastal Cleanup Drive</CardTitle>
                                <CardDescription>Brgy. Aplaya</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Join us this Saturday to help clean our coastline. Gloves and bags will be provided.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Badge variant="secondary">Environment</Badge>
                                <Button>Sign Up</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Community Kitchen Assistant</CardTitle>
                                <CardDescription>City Social Welfare</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Help prepare and distribute meals for the less fortunate. We need volunteers for morning and afternoon shifts.</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Badge variant="secondary">Social</Badge>
                                <Button>Sign Up</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Fiesta Event Marshal</CardTitle>
                                <CardDescription>Tourism Office</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Assist in crowd control and logistics during the upcoming city fiesta. A fun way to serve the community!</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Badge variant="secondary">Event</Badge>
                                <Button>Sign Up</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="jobs" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Graphic Designer</CardTitle>
                                <CardDescription>Tech Solutions Inc. - Full-time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Looking for a creative graphic designer proficient in Adobe Creative Suite. 2+ years of experience preferred.</p>
                            </CardContent>
                             <CardFooter className="flex justify-between">
                                <Badge variant="outline">PHP 30k-40k</Badge>
                                <Button variant="secondary">View Details</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Service Representative</CardTitle>
                                <CardDescription>Connect BPO - On-site</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Excellent communication skills required. Amenable to shifting schedules. High school graduates are welcome.</p>
                            </CardContent>
                             <CardFooter className="flex justify-between">
                                <Badge variant="outline">Competitive Salary</Badge>
                                <Button variant="secondary">View Details</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="lost-found" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-primary">
                            <CardHeader>
                                <CardTitle>Found: Black Wallet</CardTitle>
                                <CardDescription>Found near City Hall on June 23</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Contains IDs and some cash. Please describe the IDs to claim. Contact the City Admin's office.</p>
                            </CardContent>
                            <CardFooter>
                                <Badge>Found Item</Badge>
                            </CardFooter>
                        </Card>
                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle>Lost: Brown Toy Poodle</CardTitle>
                                <CardDescription>Last seen at Lion's Park on June 22</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>His name is "Choco". Wearing a blue collar. He is very friendly. Please contact 0917-xxx-xxxx if found.</p>
                            </CardContent>
                            <CardFooter>
                                <Badge variant="destructive">Lost Item</Badge>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="polls" className="mt-6">
                    <Card className="max-w-xl mx-auto">
                        <CardHeader>
                            <CardTitle>What new public facility would you like to see in our city?</CardTitle>
                            <CardDescription>Your feedback helps shape our city's future projects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="option-one" className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-one" id="option-one" />
                                    <Label htmlFor="option-one">A larger Public Library</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">More Bike Lanes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">An Arts and Culture Center</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-four" id="option-four" />
                                    <Label htmlFor="option-four">A new Sports Complex</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-accent hover:bg-accent/90">Submit Vote</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
