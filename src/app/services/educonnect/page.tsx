"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { GraduationCap, BookOpen, CalendarDays } from "lucide-react";
import Link from 'next/link';

const eduConnectMenuItems = [
    { icon: GraduationCap, label: "Scholarship Application", href: "#" }, // Replace # with actual links
    { icon: BookOpen, label: "Online Modules & Resource Hub", href: "#" }, // Replace # with actual links
    { icon: CalendarDays, label: "Skills Training Events", href: "#" }, // Replace # with actual links
];

export default function EduConnectPage() {
    const router = useRouter();
}