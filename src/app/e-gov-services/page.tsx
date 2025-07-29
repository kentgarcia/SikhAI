import { TutorialGenerator } from '@/components/tutorial-generator';

export default function EGovServicesPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline text-primary">e-Government Services</h1>
                <p className="text-lg text-muted-foreground">Learn how to access city services with easy-to-follow guides.</p>
            </div>
            
            <TutorialGenerator />

        </div>
    );
}
