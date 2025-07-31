"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Search, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const OnlineModulesPage: React.FC = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const handleBackClick = () => {
        router.back();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
    };

    const handleCardClick = (id: number) => {
        router.push(`/edu-connect/online-modules/${id}`);
    };

    const resources = [
        {
            id: 1,
            image: '/images/module/image.png', // Replace with actual path
            title: 'Algebra Basics: Solving Equations (Khan Academy)',
            type: 'Course Link',
            category: 'math',
        },
        {
            id: 2,
            image: '/images/module/image copy.png', // Replace with actual path for PDF icon
            title: 'Grade 10 Math Reviewer (PDF)',
            type: 'Download',
            category: 'math',
        },
        {
            id: 3,
            image: '/images/module/image copy 2.png', // Replace with actual path for DepEd logo
            title: 'Geometry Mastery: Angles & Triangles (DepEd)',
            type: 'Module Link',
            category: 'math',
        },
         {
            id: 4,
            image: '/images/module/image copy 3.png', // Replace with actual path for PDF icon
            title: 'Fractions & Decimals (PDF)',
            type: 'Download',
            category: 'math',
        },
         {
            id: 5,
            image: '/images/module/image copy 4.png', // Replace with actual path for video thumbnail
            title: 'Fractions & Decimals (Video)',
            type: 'Video',
            category: 'math',
        },
         {
            id: 6,
            image: '/images/module/image copy 7.png', // Replace with actual path for PDF icon
            title: 'Polynomials (PDF)',
            type: 'Download',
            category: 'math',
        },
          {
            id: 7,
            image: '/images/module/image copy 5.png', // Replace with actual path for PDF icon
            title: 'Algebra (PDF)',
            type: 'Download',
            category: 'math',
        },
         {
            id: 8,
            image: '/images/module/image copy 6.png', // Replace with actual path
            title: 'English Grammar Basics',
            type: 'Course Link',
            category: 'english',
        },
    ];

    const filteredResources = resources.filter(resource => {
        const matchesSearchTerm =
            searchTerm === '' ||
            resource.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilter === 'all' || resource.category === activeFilter;

        return matchesSearchTerm && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">Online Modules & Resource Hub</h1>
            </div>

            <main className="flex-grow p-4 space-y-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search Learning Resources"
                        className="pl-10"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                 <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                    <Button
                        variant={activeFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('all')}
                        className="rounded-full px-4"
                    >
                        All
                    </Button>
                    <Button
                        variant={activeFilter === 'math' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('math')}
                        className="rounded-full px-4"
                    >
                        Math
                    </Button>
                    <Button
                        variant={activeFilter === 'english' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('english')}
                         className="rounded-full px-4"
                    >
                        English
                    </Button>
                     <Button
                        variant={activeFilter === 'science' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('science')}
                         className="rounded-full px-4"
                    >
                        Science
                    </Button>
                     <Button
                        variant={activeFilter === 'filipino' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('filipino')}
                         className="rounded-full px-4"
                    >
                        Filipino
                    </Button>
                     <Button
                        variant={activeFilter === 'technology' ? 'default' : 'outline'}
                        onClick={() => handleFilterClick('technology')}
                         className="rounded-full px-4"
                    >
                        Technology
                    </Button>
                    {/* Add more filter buttons as needed */}
                 </div>

                <div className="space-y-4">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} onClick={() => handleCardClick(resource.id)} className="cursor-pointer">
                            <CardContent className="flex items-center p-4">
                                 <div className="flex-shrink-0 mr-4">
                                     <Image src={resource.image} alt={resource.title} width={50} height={50} objectFit="contain" /> {/* Added objectFit */}
                                 </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                                     <Button variant="link" size="sm" className="p-0 h-auto">{resource.type}</Button>
                                </div>
                                 <Bookmark className="h-5 w-5 text-gray-400" /> {/* Added bookmark icon */}
                            </CardContent>
                        </Card>
                    ))}
                     {filteredResources.length === 0 && (
                        <p className="text-center text-gray-600">No resources found.</p>
                    )}
                </div>
            </main>

            {/* Assuming a Navbar component exists */}
            {/* <Navbar activePage="services" /> */}
        </div>
    );
};

export default OnlineModulesPage;
