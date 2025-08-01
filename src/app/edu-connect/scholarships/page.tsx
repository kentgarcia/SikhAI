"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // Import Dialog components

interface Scholarship {
  id: number;
  logo: string;
  title: string;
  status: string;
  targetLevel: string;
  deadline: string;
  educationLevel: string;
  scholarshipType: string;
  description: string;
}

const ScholarshipApplicationPage: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEducationLevel, setSelectedEducationLevel] = useState('all'); // Initial state to 'all'
    const [selectedScholarshipType, setSelectedScholarshipType] = useState('all'); // Initial state to 'all'
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null); // State to hold selected scholarship for modal

    const handleBackClick = () => {
        router.back();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEducationLevelChange = (value: string) => {
        setSelectedEducationLevel(value);
    };

    const handleScholarshipTypeChange = (value: string) => {
        setSelectedScholarshipType(value);
    };

    const handleDetailsClick = (scholarship: Scholarship) => { // Function to handle Details button click
        setSelectedScholarship(scholarship);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedScholarship(null);
    };

    const scholarships: Scholarship[] = [
        {
            id: 1,
            logo: '/images/scholarship/image.png', // Replace with actual path
            title: 'City Scholarship Program',
            status: 'OPEN',
            targetLevel: 'Elementary, High School, College',
            deadline: 'Aug 15, 2025',
            educationLevel: 'college', // Added education level for filtering
            scholarshipType: 'academic', // Added scholarship type for filtering
            description: `This program provides financial assistance to deserving students residing in the city.
Eligibility criteria include academic performance and financial need.` // Added description
        },
        {
            id: 2,
            logo: '/images/scholarship/image copy.png', // Replace with actual path
            title: 'Rotary Club Scholarship',
            status: 'OPEN',
            targetLevel: 'Elementary, High School, College',
            deadline: 'Aug 15, 2025',
            educationLevel: 'highschool', // Added education level for filtering
            scholarshipType: 'academic', // Added scholarship type for filtering
            description: `The Rotary Club offers scholarships to support students pursuing higher education.
Focus areas include community involvement and leadership potential.` // Added description
        },
        {
            id: 3,
            logo: '/images/scholarship/image copy 2.png', // Replace with actual path
            title: 'PUP Sta. Rosa Extension Tuition Benefit',
            status: 'OPEN',
            targetLevel: 'For Low-income students in Santa Rosa pursuing public or private school education',
            deadline: 'Aug 15, 2025',
            educationLevel: 'college', // Added education level for filtering
            scholarshipType: 'academic', // Added scholarship type for filtering
            description: `This benefit is available to low-income students in Santa Rosa enrolled in public or private schools.
It aims to reduce the financial burden of tuition fees.` // Added description
        },
         {
            id: 4,
            logo: '/images/scholarship/image copy 3.png', // Replace with actual path
            title: 'Arts Scholarship',
            status: 'OPEN',
            targetLevel: 'High School',
            deadline: 'Sept 1, 2024',
            educationLevel: 'highschool', // Added education level for filtering
            scholarshipType: 'arts', // Added scholarship type for filtering
            description: `A scholarship dedicated to supporting talented students in the arts.
Applicants should demonstrate exceptional skills in their chosen artistic field.` // Added description
        },
         {
            id: 5,
            logo: '/images/scholarship/image copy 4.png', // Replace with actual path
            title: 'College Scholarship',
            status: 'CLOSED',
            targetLevel: 'College',
            deadline: 'July 30, 2024',
            educationLevel: 'college', // Added education level for filtering
            scholarshipType: 'academic', // Added scholarship type for filtering
            description: `This scholarship provides financial aid to college students.
Criteria include academic merit and financial need.` // Added description
        },
    ];

    // Filter scholarships based on search term and selected filters
    const filteredScholarships = scholarships.filter(scholarship => {
        const matchesSearchTerm =
            searchTerm === '' ||
            scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.targetLevel.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesEducationLevel = selectedEducationLevel === 'all' ||
            (scholarship.educationLevel && scholarship.educationLevel === selectedEducationLevel);

        const matchesScholarshipType = selectedScholarshipType === 'all' ||
            (scholarship.scholarshipType && scholarship.scholarshipType === selectedScholarshipType);

        return matchesSearchTerm && matchesEducationLevel && matchesScholarshipType;
    });



    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">Scholarship Application</h1>
            </div>

            <main className="flex-grow p-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search scholarships by title or target level"
                        className="pl-10"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="flex space-x-4">
                    <Select onValueChange={handleEducationLevelChange} value={selectedEducationLevel}> {/* Added value and onValueChange */}
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Education Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Education Levels</SelectItem> {/* Changed value to "all" */}
                            <SelectItem value="elementary">Elementary</SelectItem>
                            <SelectItem value="highschool">High School</SelectItem>
                            <SelectItem value="college">College</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={handleScholarshipTypeChange} value={selectedScholarshipType}> {/* Added value and onValueChange */}
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Scholarship Type" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="all">All Scholarship Types</SelectItem> {/* Changed value to "all" */}
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    {filteredScholarships.map((scholarship) => (
                        <Card key={scholarship.id} className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                            <CardContent className="flex items-center p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <Image src={scholarship.logo} alt={scholarship.title} width={50} height={50} className="rounded-full" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                                    <p className={`text-sm ${scholarship.status === 'OPEN' ? 'text-green-600' : 'text-red-600'}`}>
                                        {scholarship.status}
                                    </p>
                                    <p className="text-sm text-gray-600">Target Level: {scholarship.targetLevel}</p>
                                    <p className="text-sm text-gray-600">Deadline: {scholarship.deadline}</p>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">Apply Now</Button>
                                    <Button variant="link" size="sm" onClick={() => handleDetailsClick(scholarship)}>Details</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     {filteredScholarships.length === 0 && (
                        <p className="text-center text-gray-600">No scholarships found.</p>
                    )}
                </div>
            </main>

            {/* Scholarship Details Modal */}
            <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedScholarship?.title}</DialogTitle>
                         <DialogDescription>{selectedScholarship?.targetLevel}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {/* Display other details as needed */}
                        <p><strong>Status:</strong> {selectedScholarship?.status}</p>
                        <p><strong>Deadline:</strong> {selectedScholarship?.deadline}</p>
                        <p><strong>Education Level:</strong> {selectedScholarship?.educationLevel}</p>
                         <p><strong>Scholarship Type:</strong> {selectedScholarship?.scholarshipType}</p>
                         {selectedScholarship?.description && <p><strong>Description:</strong> {selectedScholarship.description}</p>}

                        {/* Add more details from your scholarship object here */}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCloseDetailsModal}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Assuming a Navbar component exists */}
            {/* <Navbar activePage="services" /> */}
        </div>
    );
};

export default ScholarshipApplicationPage;
