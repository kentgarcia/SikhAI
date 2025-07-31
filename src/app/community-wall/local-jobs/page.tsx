
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useMemo } from 'react';

// Sample job data - replace with actual data fetching
const jobData = [
    {
        id: 1,
        company: "METRO RETAIL STORES GROUP, INC",
        logo: "/images/job/metro.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa srls.hrd@metroretail.ph. Maaaring basahin ang poster para sa iba pang detalye. Maraming Salamat!",
        date: "July 23, 2025"
    },
    {
        id: 2,
        company: "FULLY ADVANCED MANPOWER SOLUTIONS, INC.",
        logo: "/images/job/famsi.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa hrd.famsirecruitment@gmail.com. Maaaring basahin ang poster para sa iba pang detalye. Maraming Salamat!",
        date: "July 14, 2025"
    },
     {
        id: 3,
        company: "SANYO PLASTIC PHILIPPINES, INC.",
        logo: "/images/job/pacific.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa spci_hr@ysppi.com.ph Maaaring basahin ang poster para sa iba pang detalye. Maraming Salamat!",
        date: "July 07, 2025"
    },
     {
        id: 4,
        company: "CHOZEN RESOURCES, INC.",
        logo: "/images/job/Chozen_n.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa mrdarians.chozenresources@gmail.com Maaaring basahin ang poster para sa iba pang detalye. Maraming Salamat!",
        date: "July 03, 2025"
    },
      {
        id: 5,
        company: "THE PACIFIC MEAT COMPANY, INC.",
        logo: "/images/job/pacific.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa hr@pacificmeat.com.ph. Maaaring basahin ang poster para sa iba pang detalye. Maraming Salamat!",
        date: "July 02, 2025"
    },
      {
        id: 6,
        company: "Z LAB INTERNATIONAL",
        logo: "/images/job/ZLAB.jpg", // Replace with actual path
        description: "Para sa mga interesadong mag apply, mag-email ng inyong resume sa gdecastro@centurypacific.com.ph",
        date: "July 01, 2025"
    },
];

export default function LocalJobsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDateAscending, setSortByDateAscending] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortByDateAscending(!sortByDateAscending);
    };

    const handleApplyClick = () => {
        setShowForm(true);
    };

    const handleSubmitApplication = () => {
        // Here you would typically handle form submission, e.g., send data to an API
        console.log('Application submitted!'); // Placeholder for actual submission logic

        setShowForm(false); // Hide the form
        setShowSuccessMessage(true); // Show the success message

        // Optionally, hide the success message after a few seconds
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 5000); // Hide after 5 seconds
    };

    const filteredAndSortedJobs = useMemo(() => {
        let filtered = jobData.filter(job =>
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (sortByDateAscending) {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });

        return filtered;
    }, [searchTerm, sortByDateAscending]);


    return (
        <div className="flex flex-col h-full bg-background">
            <header className="flex items-center p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-4">Local Jobs Opening</h1>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                <div className="mb-4 flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Search Job Opportunities"
                        className="flex-grow px-4 py-2 border rounded-md"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                         <SlidersHorizontal className="h-5 w-5" />
                    </Button>
                </div>

                <h2 className="text-lg font-semibold mb-4">Explore Job Openings Near You</h2>
                <p className="text-muted-foreground mb-6">
                    Check out available jobs and apply directly through our Job Board.
                </p>

                <div className="space-y-4">
                    {filteredAndSortedJobs.map((job) => (
                        <div key={job.id} className="flex p-4 border rounded-lg shadow-sm hover:shadow-lg active:shadow-xl transition-all duration-200 ease-in-out" style={{ borderColor: 'green', borderWidth: '1px' }}>
                           <div className="flex flex-col items-center mr-4">
                                <Image 
                                    src={job.logo} 
                                    alt={`${job.company} logo`} 
                                    width={50} 
                                    height={50} 
                                    objectFit="contain"
                                    className="rounded-md mb-2"
                                />
                                <Button variant="outline" size="sm" className="hover:bg-green-700 active:bg-white active:text-green-500 transition-all duration-100 ease-in-out" style={{ backgroundColor: 'green', color: 'white', borderColor: 'green' }} onClick={handleApplyClick}>
                                    Apply Now
                                </Button>
                           </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-gray-800">{job.company}</h3>
                                <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                                <p className="text-xs text-muted-foreground mt-2">{job.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Application Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Job Application Form</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <Input type="text" id="fullName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <Input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <Input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                                    <Input type="file" id="resume" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                </div>
                            </div>
                            <Button onClick={handleSubmitApplication} className="mt-6 w-full">Submit</Button>
                        </div>
                    </div>
                )}

                {/* Success Message Pop-up */}
                {showSuccessMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-green-600">Application Submitted!</h2>
                            <p>Your information will be reviewed by the employer. Please wait for an update that will be sent to your email.</p>
                             <Button onClick={() => setShowSuccessMessage(false)} className="mt-4">Close</Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

