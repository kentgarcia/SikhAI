"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, CloudSun, MapPin, Activity, FileText, Hospital, ExternalLink, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// Widgets emit actions back to chat via optional onAction callback so actions become part of history.

export type WeatherTrafficData = {
    temp: number;
    condition: string;
    trafficSummary: string;
    hotspots: { location: string; congestion: number }[]; // 0-100
};

export function WeatherTrafficWidget({ data, onAction }: { data: WeatherTrafficData; onAction?: ActionFn }) {
    const [subscribed, setSubscribed] = useState(false);
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-sky-50 to-emerald-50">
            <div className="flex items-center gap-2 text-sm font-medium">
                <CloudSun className="h-4 w-4 text-amber-500" /> Live Weather & Traffic Snapshot
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border p-2 bg-white/60">
                    <p className="font-semibold text-base">{data.temp}°C</p>
                    <p className="text-muted-foreground">{data.condition}</p>
                </div>
                <div className="rounded-lg border p-2 bg-white/60">
                    <p className="font-semibold">Traffic</p>
                    <p className="text-muted-foreground leading-snug">{data.trafficSummary}</p>
                </div>
            </div>
            <div className="space-y-2">
                {data.hotspots.map(h => (
                    <div key={h.location} className="flex items-center gap-2">
                        <div className="w-24 text-xs truncate">{h.location}</div>
                        <Progress value={h.congestion} className="h-2" />
                        <span className="text-[10px] w-6 text-right">{h.congestion}%</span>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant={subscribed ? "secondary" : "default"} onClick={() => {
                    setSubscribed(s => !s);
                    onAction?.({ title: subscribed ? "Live updates paused" : "Live updates enabled", description: subscribed ? "You will stop receiving traffic/weather alerts." : "You will see periodic traffic/weather alerts in this chat." });
                }}>
                    <Bell className="h-3.5 w-3.5 mr-1" /> {subscribed ? "Pause" : "Live Updates"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => onAction?.({ title: "Tomorrow's Forecast", description: "Partly cloudy • 29–32°C • Light breeze SE 8km/h" })}>Tomorrow</Button>
            </div>
        </Card>
    );
}

export type EventsData = {
    weekend: { id: string; title: string; time: string; venue: string; category: string }[];
};

export function EventsWidget({ data, onAction }: { data: EventsData; onAction?: ActionFn }) {
    const router = useRouter();
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-fuchsia-50 to-pink-50">
            <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4 text-fuchsia-500" /> Weekend Highlights
            </div>
            <div className="space-y-3">
                {data.weekend.map(ev => (
                    <div key={ev.id} className="rounded-md border bg-white/70 p-2 text-xs hover:shadow-sm transition">
                        <p className="font-semibold text-sm">{ev.title}</p>
                        <p className="text-muted-foreground">{ev.time} • {ev.venue}</p>
                        <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline" onClick={() => onAction?.({ title: "Added to calendar", description: ev.title })}>Add</Button>
                            <Button size="sm" variant="ghost" onClick={() => router.push(`/events/${ev.id}`)}>Details <ExternalLink className="h-3 w-3 ml-1" /></Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button size="sm" variant="secondary" onClick={() => { onAction?.({ title: "Opening events", description: "Navigated to full events list." }); router.push('/events'); }}>View All Events</Button>
        </Card>
    );
}

export type HospitalData = {
    facilities: { name: string; queue: number; distanceKm: number; emergency: boolean }[];
};

export function HospitalWidget({ data, onAction }: { data: HospitalData; onAction?: ActionFn }) {
    const router = useRouter();
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-red-50 to-orange-50">
            <div className="flex items-center gap-2 text-sm font-medium">
                <Hospital className="h-4 w-4 text-red-500" /> Nearby Emergency Facilities
            </div>
            <div className="space-y-2 text-xs">
                {data.facilities.map(f => (
                    <div key={f.name} className="flex items-center justify-between rounded-md border bg-white/70 px-2 py-1.5">
                        <div>
                            <p className="font-semibold text-sm leading-tight">{f.name}</p>
                            <p className="text-muted-foreground">Queue {f.queue} • {f.distanceKm} km</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Button size="sm" variant="outline" onClick={() => onAction?.({ title: "Call initiated", description: f.name })}>Call</Button>
                            <Button size="sm" variant="ghost" onClick={() => { onAction?.({ title: "Opening locator", description: f.name }); router.push('/responda-hub/hospital-locator'); }}>Map</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button size="sm" variant="secondary" onClick={() => { onAction?.({ title: "Hospital locator", description: "Opening map interface" }); router.push('/responda-hub/hospital-locator'); }}>Open Locator</Button>
        </Card>
    );
}

export type ScholarshipData = {
    requirements: string[];
    deadline: string;
    files: { name: string; type: string }[];
};

export function ScholarshipWidget({ data, onAction }: { data: ScholarshipData; onAction?: ActionFn }) {
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-amber-50 to-lime-50">
            <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-amber-500" /> Scholarship Requirements
            </div>
            <ul className="list-disc list-inside text-xs space-y-1">
                {data.requirements.map(r => <li key={r}>{r}</li>)}
            </ul>
            <p className="text-[11px] text-muted-foreground">Deadline: <span className="font-medium">{data.deadline}</span></p>
            <div className="flex flex-wrap gap-2">
                {data.files.map(f => (
                    <Button key={f.name} size="sm" variant="outline" onClick={() => onAction?.({ title: "Download queued", description: f.name })}>{f.name}</Button>
                ))}
            </div>
            <Button size="sm" variant="secondary" onClick={() => onAction?.({ title: "Form helper", description: "Guided filling session prepared." })}>Help Me Fill Forms</Button>
        </Card>
    );
}

// New Pharmacies widget
export type PharmaciesData = {
    facilities: { name: string; distanceKm: number; open: boolean }[];
};

export function PharmaciesWidget({ data, onAction }: { data: PharmaciesData; onAction?: ActionFn }) {
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-emerald-500" /> 24/7 Pharmacies Nearby
            </div>
            <div className="space-y-2 text-xs">
                {data.facilities.map(f => (
                    <div key={f.name} className="flex items-center justify-between rounded-md border bg-white/70 px-2 py-1.5">
                        <div>
                            <p className="font-semibold text-sm leading-tight">{f.name}</p>
                            <p className="text-muted-foreground">{f.distanceKm} km • {f.open ? 'Open' : 'Closed'}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => onAction?.({ title: 'Call initiated', description: f.name })}>Call</Button>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// Culture widget to showcase empathetic, culturally grounded responses
export type CultureData = { heading: string; points: string[]; quote?: string };
export function CultureWidget({ data, onAction }: { data: CultureData; onAction?: ActionFn }) {
    return (
        <Card className="p-4 mt-2 space-y-3 bg-gradient-to-br from-violet-50 to-indigo-50">
            <div className="text-sm font-semibold">{data.heading}</div>
            <ul className="text-xs space-y-1 list-disc list-inside">
                {data.points.map(p => <li key={p}>{p}</li>)}
            </ul>
            {data.quote && <p className="text-[11px] italic text-muted-foreground">“{data.quote}”</p>}
            <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => onAction?.({ title: 'Reflection saved', description: 'Added to your cultural insights.' })}>Save Insight</Button>
                <Button size="sm" variant="secondary" onClick={() => onAction?.({ title: 'Shared', description: 'Posted to Community Wall.' })}>Share</Button>
            </div>
        </Card>
    );
}

// Banner widget for action feedback
export type BannerData = { title: string; description?: string; variant?: 'info' | 'success' | 'warning' };
export function BannerWidget({ data }: { data: BannerData }) {
    const color = data.variant === 'success' ? 'bg-emerald-100 border-emerald-300' : data.variant === 'warning' ? 'bg-amber-100 border-amber-300' : 'bg-blue-100 border-blue-300';
    return (
        <div className={`mt-2 text-xs rounded-md border px-3 py-2 ${color}`}>
            <p className="font-medium leading-tight">{data.title}</p>
            {data.description && <p className="text-[11px] mt-0.5 text-muted-foreground">{data.description}</p>}
        </div>
    );
}

export type ActionFn = (payload: { title: string; description?: string; variant?: 'info' | 'success' | 'warning' }) => void;

export type GenericData = Record<string, any>;

export const intentComponentMap: Record<string, (props: { data: any; onAction?: ActionFn }) => JSX.Element> = {
    weather_traffic: WeatherTrafficWidget,
    events_list: EventsWidget,
    hospital_emergency: HospitalWidget,
    scholarship_requirements: ScholarshipWidget,
    pharmacies_list: PharmaciesWidget,
    culture_card: CultureWidget,
    banner: BannerWidget,
};
