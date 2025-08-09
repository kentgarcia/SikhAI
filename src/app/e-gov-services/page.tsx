'use client';

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ArrowRight, Syringe, Briefcase, Rocket, FileText, Locate, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  location: string;
  contact: string;
  process: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, location, contact, process, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div onClick={() => setIsExpanded(!isExpanded)} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 border-red-800">
        <div className="flex items-start mb-2">
 <div className="mr-4">
 {title === 'Vaccination' && <Syringe size={32} className="text-blue-500" />}
 {title === 'PESO Online Portal' && <Briefcase size={32} className="text-green-500" />}
 {title === 'ROAR Portal' && <Rocket size={32} className="text-red-500" />}
 {title === 'Business Permits & Licensing (BPLO)' && <FileText size={32} className="text-purple-500" />}
 {title === 'CENRO Permit to Post' && <FileText size={32} className="text-orange-500" />}
 {title === 'CENRO Clearance' && <CheckCircle size={32} className="text-teal-500" />}
 {title === 'Precinct Finder' && <Locate size={32} className="text-yellow-500" />}
 {title === 'Local Civil Registry Services' && <FileText size={32} className="text-red-800" />}
 </div>
 <div className="flex-grow">
 <div className="flex justify-between items-center">
 <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
 <div className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center">
 <ArrowRight className={`text-white transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} size={18} />
 </div>
 </div>
 </div>
        </div>
        <p className="text-gray-600">{description}</p>
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {imageUrl && (
              <div className="relative w-full h-48 mb-4">
                <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-md" />
              </div>
            )}
            <div className="space-y-2 text-gray-700">
              <p><strong>Location:</strong> {location}</p>
              <p><strong>Contact:</strong> {contact}</p>
              <p><strong>Process:</strong></p>
              <div>
                {process.split('. Step ').map((step, index) => (
                  <p key={index}>{index === 0 ? step : `Step ${parseInt(step.split(':')[0])}: ${step.split(':')[1]}`}</p>
                ))}
              </div>
 <button className="mt-4 px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity duration-200" style={{ backgroundColor: 'maroon' }}>Learn More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EGovernmentServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Vaccination',
      description: 'Schedule your vaccination appointments and access information.',
      location: 'Address: 74W3+XC6, Kabesang Moldes St. Nia Rd, City of Santa Rosa, 4026 Laguna',
      contact: '(049) 530 0015',
      process: 'Step 1: Click the Learn More button to redirect in the Appointment Form. Step 2: Visit the City Health Office at your scheduled time. Step 3: Present your ID and confirmation. Step 4: Receive your vaccination.',
      imageUrl: '/images/egovservices/image.png', // Replace with actual image path
    },
    {
      title: 'PESO Online Portal',
      description: 'Access the Public Employment Service Office online portal.',
      location: 'PESO Office, City Hall',
      contact: 'pesosantarosa@gmail.com',      process: 'Step 1: click the Learn More button to Visit the PESO online portal. Step 2: Register or log in. Step 3: Browse job listings and apply online.',
      imageUrl: '/images/egovservices/image copy.png', // Replace with actual image path
    },
    {
      title: 'ROAR Portal',
      description: 'Access the official ROAR portal for various services.',
      location: 'Online Portal',
      contact: 'Local Number: (049)530-0015',      process: 'click the Learn More button to Visit the ROAR portal website. Step 2: Log in or create an account. Step 3: Navigate through available services.',
      imageUrl: '/images/egovservices/image copy 6.png', // Replace with actual image path
    },
    {
      title: 'Business Permits & Licensing (BPLO)',
      description: 'Apply for or renew business permits and licenses.',
      location: '3rd Floor, New Government Center, Rizal Blvd, City of Santa Rosa, 4026 Laguna',
      contact: '(049) 530 0015',      process: 'Step 1: Click the Learn More button to redirect toDownload application forms from the BPLO website or get them at the office. Step 2: Complete the forms and gather required documents. Step 3: Submit your application to BPLO. Step 4: Pay the necessary fees. Step 5: Await permit processing.',
      imageUrl: '/images/egovservices/image copy 2.png', // Replace with actual image path
    },
    {
      title: 'CENRO Permit to Post',
      description: 'Apply for permits related to environmental concerns.',
      location: 'City Environment and Natural Resources Office (CENRO), City Hall',
      contact: 'Local Number: (049)530-0015',      process: 'Step 1: Click the Learn More button to redirect to Obtain the application form from CENRO. Step 2: Fill out the form and provide necessary details about the posting. Step 3: Submit the application to CENRO for evaluation. Step 4: Pay the corresponding fee upon approval.',
      imageUrl: '/images/egovservices/image copy 3.png', // Replace with actual image path
    },
    {
      title: 'CENRO Clearance',
      description: 'Obtain environmental clearances.',
      location: '4th Floor Building A, City Government Building of Santa Rosa, Laguna, Santa Rosa, Philippines',
      contact: 'cenrosantarosa2021@gmail.com',      process: 'Step 1: Click the Learn More button to redirect to the clearance form from CENRO. Step 2: Complete the form and attach required supporting documents. Step 3: Submit your application for review. Step 4: Pay the clearance fee upon issuance.',
      imageUrl: '/images/egovservices/image copy 4.png', // Replace with actual image path
    },
    {
      title: 'Precinct Finder',
      description: 'Locate your voting precinct.',
      location: 'COMELEC Local Office / Online',
      contact: 'www.laguna-pulse-sta-rosa.com',      process: 'Step 1: click the Learn More button to Visit the Visit the COMELEC precinct finder website or visit the local COMELEC office. Step 2: Enter your required information (e.g., name, birthdate). Step 3: Your precinct details will be displayed.',
      imageUrl: '/images/egovservices/image copy 5.png', // Replace with actual image path
    },
    {
      title: 'Local Civil Registry Services',
      description: 'Access services related to birth, marriage, and death certificates.',
      location: 'Local Civil Registry Office, City Hall',
      contact: 'ccrosantarosacity@gmail.com',
      process: 'Step 1:  Click the Learn More button to redirect to the form of Local Civil Registry Office. Step 2: State the input the type of document you need. Step 3: Provide necessary identification and information. Step 4: Pay the required fees. Step 5: Receive your document.',      imageUrl: '/images/egovservices/image copy 5.png' // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
 <Link href="/services"><ChevronLeft className="h-6 w-6 text-gray-600 mr-4" /></Link>
 <h2 className="text-3xl font-bold text-gray-800 text-center flex-grow">E-Government Services</h2>
 </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              location={service.location}
              contact={service.contact}
              process={service.process}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EGovernmentServicesPage;