
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { FileText, PieChart, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

const onboardingSteps = [
  {
    icon: FileText,
    title: "Manage Transactions",
    description: "Easily view and manage all your recent transactions in one place.",
    image: "https://placehold.co/300x200.png",
    imageHint: "transactions list"
  },
  {
    icon: PieChart,
    title: "Track Your Spending",
    description: "Visualize your spending habits with insightful charts and graphs.",
    image: "https://placehold.co/300x200.png",
    imageHint: "charts analytics"
  },
  {
    icon: ShieldCheck,
    title: "Secure Your Account",
    description: "Your security is our priority. Enjoy peace of mind with top-notch protection.",
    image: "https://placehold.co/300x200.png",
    imageHint: "security shield"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };
  
  const { icon: Icon, title, description, image, imageHint } = onboardingSteps[currentStep];

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-grow flex flex-col items-center justify-center text-center space-y-4"
        >
            <Icon className="w-12 h-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground px-4">{description}</p>
            <div className="relative w-full max-w-xs aspect-video mt-4">
              <Image
                src={image}
                alt={title}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={imageHint}
              />
            </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex items-center justify-center space-x-2 my-6">
        {onboardingSteps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentStep === index ? 'w-4 bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
            {currentStep > 0 ? (
                <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
                    <ArrowLeft className="mr-2"/>
                    Back
                </Button>
            ) : <div></div>}
            
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                Skip
            </Button>
        </div>
        <Button onClick={handleNext} size="lg">
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
