"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const ResourceDetailPage: React.FC = () => {
    const router = useRouter();
    // In a real application, you would fetch resource data here based on the ID
    const resource = {
        id: 1, // This would be dynamic
        title: 'Algebra Basics: Solving Equations (Khan Academy)',
        description: 'Learn the fundamentals of algebra, including solving linear equations and inequalities.',
        type: 'Course Link',
        url: 'https://www.khanacademy.org/math/algebra-basics' // Example URL
    };

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex items-center p-4 bg-white shadow-md">
                <ChevronLeft className="h-6 w-6 cursor-pointer" onClick={handleBackClick} />
                <h1 className="text-xl font-semibold ml-4">{resource.title}</h1>
            </div>
            <main className="flex-grow p-4 space-y-4">
                <p>{resource.description}</p>
                <p>Type: {resource.type}</p>
                {resource.url && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Go to Resource
                    </a>
                )}
            </main>
        </div>
    );
};

export default ResourceDetailPage;
