
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Heart, Shield, GraduationCap, Building, MapPin, Cloudy, Wind, Sunset, CloudRain, Calendar, Sun, Thermometer, Droplets, Umbrella, Gauge, ArrowUp, ArrowDown, Sunrise, Compass } from "lucide-react";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import data from '@/lib/data.json';

type TruncatedTitleProps = {
    title: string;
    maxChars?: number;
};

function TruncatedTitle({ title, maxChars = 60 }: TruncatedTitleProps) {
    const isTruncated = title.length > maxChars;
    const displayTitle = isTruncated ? title.slice(0, maxChars).trim() + '...' : title;
    return (
        <span className="inline">
            {displayTitle}
            {isTruncated && (
                <span className="ml-1 text-primary font-medium">Read more</span>
            )}
        </span>
    );
}
import { formatDistanceToNow, format } from 'date-fns';
import { useRouter } from "next/navigation";
import Link from "next/link";

const quickActions = [
    { icon: Heart, label: "Health", href: "/ai" },
    { icon: Shield, label: "Safety", href: "/responda-hub" },
    { icon: GraduationCap, label: "Education", href: "/edu-connect" },
    { icon: Building, label: "e-Gov", href: "/services" },
];

const newsItems = data.news.slice(0, 4).map(item => ({
    ...item,
    imageHint: item.category.toLowerCase()
}));

const eventItems = data.upcomingEvents.map(event => {
    // The date in data.json is "AUG 05, 2025", which is not a standard format.
    // We'll parse it manually for format() to work correctly.
    // A more robust solution would be to standardize date formats in the JSON.
    const dateStr = event.date.replace(',', ''); // "AUG 05 2025"
    const eventDate = new Date(dateStr);

    return {
        ...event,
        day: format(eventDate, 'dd'),
        month: format(eventDate, 'MMM'),
        imageHint: event.title.toLowerCase().split(' ').slice(0, 2).join(' ')
    };
});


// removed static hourlyForecast in favor of live hourly preview from Open-Meteo

type WeatherData = {
    current_weather?: {
        temperature: number;
        weathercode: number;
        windspeed: number;
        winddirection?: number;
    };
    hourly?: {
        time?: string[];
        temperature_2m?: number[];
        apparent_temperature?: number[];
        relative_humidity_2m?: number[];
        precipitation?: number[];
        weathercode?: number[];
        wind_speed_10m?: number[];
        wind_direction_10m?: number[];
        uv_index?: number[];
    };
    daily?: {
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        sunrise?: string[];
        sunset?: string[];
        uv_index_max?: number[];
    };
};

function WeatherWidget() {
    // Sta. Rosa, Laguna coordinates
    const lat = 14.3122;
    const lon = 121.1114;
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch weather');
                return res.json();
            })
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading weather...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!weather || !weather.current_weather) return <div>No weather data.</div>;

    // Weather code mapping (simplified)
    const weatherCodes: Record<number, { label: string; icon: JSX.Element }> = {
        0: { label: 'Clear sky', icon: <Sun className="w-12 h-12 text-yellow-400" /> },
        1: { label: 'Mainly clear', icon: <Cloudy className="w-12 h-12 text-blue-400" /> },
        2: { label: 'Partly cloudy', icon: <Cloudy className="w-12 h-12 text-blue-300" /> },
        3: { label: 'Overcast', icon: <Cloudy className="w-12 h-12 text-gray-400" /> },
        45: { label: 'Fog', icon: <CloudRain className="w-12 h-12 text-gray-400" /> },
        48: { label: 'Depositing rime fog', icon: <CloudRain className="w-12 h-12 text-gray-400" /> },
        51: { label: 'Drizzle', icon: <CloudRain className="w-12 h-12 text-blue-400" /> },
        53: { label: 'Drizzle', icon: <CloudRain className="w-12 h-12 text-blue-400" /> },
        55: { label: 'Drizzle', icon: <CloudRain className="w-12 h-12 text-blue-400" /> },
        61: { label: 'Rain', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
        63: { label: 'Rain', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
        65: { label: 'Rain', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
        80: { label: 'Rain showers', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
        81: { label: 'Rain showers', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
        82: { label: 'Rain showers', icon: <CloudRain className="w-12 h-12 text-blue-500" /> },
    };
    const code = weather.current_weather.weathercode;
    const weatherInfo = weatherCodes[code] || { label: 'Unknown', icon: <Cloudy className="w-12 h-12 text-gray-400" /> };

    // Determine nearest hourly index to now
    const times = weather.hourly?.time || [];
    const now = new Date();
    let idx = 0;
    if (times.length) {
        let minDiff = Number.POSITIVE_INFINITY;
        times.forEach((t, i) => {
            const diff = Math.abs(new Date(t).getTime() - now.getTime());
            if (diff < minDiff) {
                minDiff = diff;
                idx = i;
            }
        });
    }

    const feelsLike = weather.hourly?.apparent_temperature?.[idx];
    const humidity = weather.hourly?.relative_humidity_2m?.[idx];
    const precip = weather.hourly?.precipitation?.[idx];
    const uv = weather.hourly?.uv_index?.[idx];
    const windDir = weather.current_weather?.winddirection;
    const hi = weather.daily?.temperature_2m_max?.[0];
    const lo = weather.daily?.temperature_2m_min?.[0];
    const sunrise = weather.daily?.sunrise?.[0];
    const sunset = weather.daily?.sunset?.[0];

    const hourlyPreview = Array.from({ length: 5 }).map((_, i) => {
        const hIndex = Math.min(idx + i, (weather.hourly?.time?.length || 1) - 1);
        const t = weather.hourly?.time?.[hIndex];
        const temp = weather.hourly?.temperature_2m?.[hIndex];
        const wcode = weather.hourly?.weathercode?.[hIndex] ?? code;
        const info = weatherCodes[wcode] || weatherInfo;
        return { time: t ? format(new Date(t), 'ha') : '--', temp, info };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl border border-[#E7E7E7] bg-gradient-to-br from-white to-blue-50"
        >
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full" style={{ backgroundColor: '#EFF6FF' }} />
            <div className="absolute -bottom-12 -right-6 w-40 h-40 rounded-full" style={{ backgroundColor: '#DBEAFE' }} />
            <div className="relative p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                            {weatherInfo.icon}
                        </motion.div>
                        <div>
                            <div className="text-4xl font-bold text-primary flex items-baseline gap-2">
                                {Math.round(weather.current_weather.temperature)}°C
                                {typeof hi === 'number' && typeof lo === 'number' && (
                                    <span className="text-sm text-gray-600 font-medium">/
                                        <span className="ml-1 inline-flex items-center gap-1"><ArrowUp className="w-3 h-3" />{Math.round(hi)}°</span>
                                        <span className="ml-2 inline-flex items-center gap-1"><ArrowDown className="w-3 h-3" />{Math.round(lo)}°</span>
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">{weatherInfo.label}</div>
                            <div className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin className="w-4 h-4" />Sta. Rosa, Laguna</div>
                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1"><Sunrise className="w-4 h-4 text-primary" />{sunrise ? format(new Date(sunrise), 'h:mm a') : '--'}</div>
                        <div className="flex items-center gap-1"><Sunset className="w-4 h-4 text-primary" />{sunset ? format(new Date(sunset), 'h:mm a') : '--'}</div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {hourlyPreview.map((h, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                                className="min-w-[70px] rounded-lg border border-blue-100 bg-white/70 backdrop-blur px-3 py-2 text-center">
                                <div className="text-[10px] text-gray-500">{h.time}</div>
                                <div className="flex items-center justify-center gap-1 my-1">{h.info.icon}<span className="text-xs font-semibold">{typeof h.temp === 'number' ? `${Math.round(h.temp)}°` : '--'}</span></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Dashboard" />

            <main className="flex-grow p-4 overflow-y-auto space-y-8 no-scrollbar">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-transparent rounded-xl p-6 overflow-hidden flex items-center border border-[#E7E7E7]"
                >
                    <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full flex items-center justify-center animate-subtle-breathe" style={{ backgroundColor: '#FFF2F3' }}>
                        <div className="w-20 h-20 rounded-full" style={{ backgroundColor: '#FEE2E3' }}></div>
                    </div>
                    <div className="absolute -bottom-12 -right-6 w-28 h-28 rounded-full flex items-center justify-center animate-subtle-breathe [animation-delay:500ms]" style={{ backgroundColor: '#FFF2F3' }}>
                        <div className="w-20 h-20 rounded-full" style={{ backgroundColor: '#FEE2E3' }}></div>
                    </div>

                    <div className="relative z-10 w-1/2">
                        <h3 className="text-lg font-semibold text-gray-800">Good day, Juan!</h3>
                        <p className="text-xs text-gray-600 mt-2">I'm <span className="text-primary">Rosa</span>, your smart and caring companion from Sta. Rosa, ready to guide you trough your day!</p>
                        <Button variant="outline" className="mt-4 rounded-full border-primary text-primary bg-transparent hover:bg-primary/10 hover:text-primary" onClick={() => router.push('/ai')}>
                            Start talking
                        </Button>
                    </div>
                    <div className="relative w-1/2 h-32">
                        <Image src="/images/rosaWave.png" alt="AI companion" layout="fill" objectFit="contain" data-ai-hint="robot waving" />
                    </div>
                </motion.div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Local News & Announcements</h3>
                    <Carousel opts={{ loop: true, align: "start" }} className="w-full">
                        <CarouselContent>
                            {newsItems.map((item, index) => (
                                <CarouselItem key={index} className="basis-2/3">
                                    <Link href={`/news/${item.id}`}>
                                        <Card className="overflow-hidden rounded-xl cursor-pointer hover:shadow-md transition-shadow">
                                            <CardContent className="p-0">
                                                <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-28 object-cover" data-ai-hint={item.imageHint} />
                                                <div className="p-3">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-semibold text-xs leading-snug flex-1 pr-2">
                                                            <TruncatedTitle title={item.title} maxChars={60} />
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground whitespace-nowrap">{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <div key={index} className="flex flex-col items-center space-y-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-16 h-16 rounded-full bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                                        onClick={() => router.push(action.href)}
                                    >
                                        <Icon className="w-8 h-8" />
                                    </Button>
                                    <span className="text-xs font-medium">{action.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Santa Rosa Events</h3>
                        <Button variant="link" className="text-primary" onClick={() => router.push('/calendar')}>
                            <Calendar className="w-4 h-4 mr-2" />
                            View calendar
                        </Button>
                    </div>
                    <Carousel opts={{ loop: true }} className="w-full">
                        <CarouselContent>
                            {eventItems.map((item, index) => (
                                <CarouselItem key={index} className="basis-4/5">
                                    <Link href={`/events/${item.id}`}>
                                        <Card className="overflow-hidden rounded-xl cursor-pointer hover:shadow-md transition-shadow">
                                            <CardContent className="p-0">
                                                <Image src={item.image} alt={item.title} width={300} height={150} className="w-full h-32 object-cover" data-ai-hint={item.imageHint} />
                                                <div className="p-4 flex items-center gap-4">
                                                    <div className="text-center">
                                                        <p className="text-xl font-bold">{item.day}</p>
                                                        <p className="text-sm text-muted-foreground">{item.month}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm">
                                                            <TruncatedTitle title={item.title} maxChars={60} />
                                                        </h4>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Weather Updates</h3>
                    <Card className="p-4">
                        <CardContent className="p-0">
                            <WeatherWidget />
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Navbar activePage="home" />
        </div>
    );
}
