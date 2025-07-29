'use client';

import { useState } from 'react';
import { generateTutorial, type GenerateTutorialOutput } from '@/ai/flows/tutorial-generator';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function TutorialGenerator() {
    const [topic, setTopic] = useState('');
    const [tutorial, setTutorial] = useState<GenerateTutorialOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Please enter a topic.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setTutorial(null);

        try {
            const response = await generateTutorial({ topic });
            setTutorial(response);
        } catch (err) {
            console.error(err);
            setError('Failed to generate tutorial. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wand2 className="text-accent" />
                        AI-Powered Tutorial Generator
                    </CardTitle>
                    <CardDescription>
                        Need help with a city process? Just type what you want to do, and our AI assistant, Rosa, will create a simple, step-by-step guide for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row items-center gap-4">
                        <Input
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., How to apply for a business permit"
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                'Generate Guide'
                            )}
                        </Button>
                    </form>
                    {error && (
                         <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {tutorial && tutorial.steps.length > 0 && (
                 <Card className="shadow-lg animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle>Your Guide for: {topic}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="space-y-6">
                            {tutorial.steps.map((step) => (
                                <li key={step.stepNumber} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                            {step.stepNumber}
                                        </div>
                                        {step.stepNumber !== tutorial.steps.length && (
                                            <div className="w-0.5 flex-grow bg-border mt-2"></div>
                                        )}
                                    </div>
                                    <div className="py-2">
                                        <p className="font-medium text-base">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                 </Card>
            )}
        </div>
    );
}
