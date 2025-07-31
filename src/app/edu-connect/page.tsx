import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EduConnectPage: React.FC = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">EduConnect</h1>
            </div>

            <main className="flex-grow p-4 flex flex-col items-center justify-center">
                <h2 className="text-lg font-medium mb-6">Choose a EduConnect service</h2>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <Card className="flex flex-col items-center justify-center text-center p-4">
                        <Image src="/images/scholarship.png" alt="Scholarship Application" width={40} height={40} />
                        <CardContent className="mt-2 p-0">Scholarship Application</CardContent>
                    </Card>

                    <Card className="flex flex-col items-center justify-center text-center p-4">
                        <Image src="/images/online-modules.png" alt="Online Modules & Resource Hub" width={40} height={40} />
                        <CardContent className="mt-2 p-0">Online Modules & Resource Hub</CardContent>
                    </Card>

                    <Card className="flex flex-col items-center justify-center text-center p-4 col-span-2">
                        <Image src="/images/training-events.png" alt="Skills Training Events" width={40} height={40} />
                        <CardContent className="mt-2 p-0">Skills Training Events</CardContent>
                    </Card>
                </div>
            </main>

            {/* Assuming a Navbar component exists */}
            {/* <Navbar activePage="services" /> */}
        </div>
    );
};

export default EduConnectPage;
