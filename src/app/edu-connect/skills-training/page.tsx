"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Search, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const SkillsTrainingPage: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleBackClick = () => {
        router.back();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRegisterClick = () => {
        setIsPrivacyModalOpen(true);
    };

    const handleAcceptPrivacy = () => {
        setIsPrivacyModalOpen(false);
        setIsSuccessModalOpen(true);
        // In a real application, you would proceed with registration here
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    const skillsTrainingEvents = [
        {
            id: 1,
            title: 'Digital Marketing Bootcamp',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Online',
        },
        {
            id: 2,
            title: 'TESDA Food Handling Certification',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Sta. Rosa Hall',
        },
        {
            id: 3,
            title: 'Basic Graphic Design Training',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'TechHub Room 2',
        },
        {
            id: 4,
            title: 'Introduction to Coding (Python Basics)',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Online',
        },
        {
            id: 5,
            title: 'Barista Skills Certification',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Cafelab Sta. Rosa',
        },
         {
            id: 6,
            title: 'Resume & Interview Skills Workshop',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Online',
        },
          {
            id: 7,
            title: 'Resume & Interview Skills Workshop',
            date: 'Aug 10',
            time: '1:00-5:00PM',
            location: 'Online',
        },
    ];

     const filteredEvents = skillsTrainingEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">Skills Training Events</h1>
            </div>

            <main className="flex-grow p-4 space-y-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search Training Events"
                        className="pl-10"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="space-y-4">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="border border-green-600 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
                            <CardContent className="flex justify-between p-4">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <div className="flex items-center text-gray-600 text-sm mt-1">
                                        <Calendar className="h-4 w-4 mr-1 text-green-600" />
                                        <span>{event.date} | {event.time}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm mt-1">
                                        <MapPin className="h-4 w-4 mr-1 text-green-600" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <Button size="sm" onClick={handleRegisterClick}>Register</Button>
                                    <Button variant="outline" size="sm">More Info</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     {filteredEvents.length === 0 && (
                        <p className="text-center text-gray-600">No skills training events found.</p>
                    )}
                </div>
            </main>

            {/* Privacy Modal */}
            <Dialog open={isPrivacyModalOpen} onOpenChange={setIsPrivacyModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Privacy and Data Privacy Act</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>By clicking 'Accept', you agree to the collection and processing of your personal information in accordance with the Privacy and Data Privacy Act.</p>
                        {/* Add more details about your privacy policy here */}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAcceptPrivacy}>Accept</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registration Successful!</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>You have successfully registered for the skills training event.</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCloseSuccessModal}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Assuming a Navbar component exists */}
            {/* <Navbar activePage="services" /> */}
        </div>
    );
};

export default SkillsTrainingPage;
