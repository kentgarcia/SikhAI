// Centralized responses for Rosa AI demo environment
// In-memory knowledge base for interactive prototype.
// Each entry can optionally return follow up suggestions (nextPrompts) to guide the user.

export type AIResponse = {
  answer: string;
  nextPrompts?: string[]; // contextually related follow ups
  intent?: string; // used to render dynamic widget
  data?: any; // payload consumed by widget
};

// Normalize keys to lower-case for matching.
const store: Record<string, AIResponse> = {
  "what's the weather and traffic like in sta. rosa today?": {
    answer:
      "Currently: Light clouds 31°C. Traffic: Moderate along Balibago Rd, heavy near Nuvali junction. I've generated a live snapshot below.",
    intent: "weather_traffic",
    data: {
      temp: 31,
      condition: "Partly Cloudy",
      trafficSummary: "Moderate citywide, heavy at Nuvali junction",
      hotspots: [
        { location: "Balibago Rd", congestion: 62 },
        { location: "Nuvali Junction", congestion: 81 },
        { location: "Tagaytay Hwy", congestion: 47 },
      ],
    },
    nextPrompts: [
      "Set up 30‑minute traffic updates",
      "What's the forecast for tomorrow?",
      "Are there flood advisories now?",
    ],
  },
  "what's happening in sta. rosa this weekend?": {
    answer:
      "Here are curated weekend highlights—tap any to add to your calendar.",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "tech-fair",
          title: "Tech & Innovation Fair",
          time: "Sat 9:00 AM",
          venue: "City Hall Annex",
          category: "Innovation",
        },
        {
          id: "night-market",
          title: "Food & Crafts Night Market",
          time: "Fri–Sun 5 PM",
          venue: "Old Town Plaza",
          category: "Market",
        },
        {
          id: "fun-run",
          title: "Charity Fun Run",
          time: "Sun 5:00 AM",
          venue: "Sports Complex",
          category: "Fitness",
        },
      ],
    },
    nextPrompts: [
      "Give me registration links",
      "Family-friendly events only",
      "Any volunteer drives this month?",
    ],
  },
  "what are the requirements for the city scholarship program?": {
    answer: "Scholarship quick overview and downloadable resources below.",
    intent: "scholarship_requirements",
    data: {
      requirements: [
        "Completed application form",
        "Certified true copy of grades (GWA ≥ 85%)",
        "Barangay clearance",
        "Certificate of indigency OR parents' ITR",
        "2x2 photo (2 pcs)",
        "Good moral certificate",
      ],
      deadline: "Sept 30, 2025",
      files: [
        { name: "Application Form.pdf", type: "pdf" },
        { name: "Good Moral Template.docx", type: "docx" },
        { name: "Indigency Sample.pdf", type: "pdf" },
      ],
    },
    nextPrompts: [
      "Send me the forms",
      "What's the deadline again?",
      "Show me other financial aid options",
    ],
  },
  "is there a hospital nearby with available emergency services?": {
    answer: "Live emergency facility snapshot below.",
    intent: "hospital_emergency",
    data: {
      facilities: [
        {
          name: "Sta. Rosa Community Hospital",
          queue: 6,
          distanceKm: 1.2,
          emergency: true,
        },
        {
          name: "Global Care Medical Center",
          queue: 3,
          distanceKm: 2.9,
          emergency: true,
        },
        {
          name: "QualiMed Hospital",
          queue: 5,
          distanceKm: 4.1,
          emergency: true,
        },
      ],
    },
    nextPrompts: [
      "Give me contact numbers",
      "Which has the shortest queue?",
      "Show 24/7 pharmacies nearby",
    ],
  },
  "set up 30‑minute traffic updates": {
    answer:
      "30‑minute traffic and weather monitoring activated. I'll surface major changes and congestion spikes. You can pause anytime.",
    nextPrompts: [
      "What's the forecast for tomorrow?",
      "Are there flood advisories now?",
      "Cancel traffic updates",
    ],
  },
  "cancel traffic updates": {
    answer:
      "Traffic monitoring paused. You can re-enable it whenever you like.",
    nextPrompts: [
      "Set up 30‑minute traffic updates",
      "What's the forecast for tomorrow?",
      "Are there flood advisories now?",
    ],
  },
  "what's the forecast for tomorrow?": {
    answer:
      "Tomorrow looks partly cloudy: 29–32°C, light afternoon breeze, low rain chance (15%). Morning traffic expected heavier due to scheduled road clearing along Balibago Rd.",
    nextPrompts: [
      "Are there flood advisories now?",
      "Set up 30‑minute traffic updates",
      "Show weekend outlook",
    ],
  },
  "forecast for tomorrow": {
    answer:
      "Same as: partly cloudy 29–32°C; afternoon feels warmer at 35°C heat index.",
    nextPrompts: [
      "Are there flood advisories now?",
      "Set up 30‑minute traffic updates",
    ],
  },
  "show weekend outlook": {
    answer:
      "Weekend outlook: Sat: Mostly sunny 31°C • Sun: Early showers then clearing 30°C. Outdoor events remain green status.",
    nextPrompts: [
      "What's happening in Sta. Rosa this weekend?",
      "Any volunteer drives this month?",
      "Set up 30‑minute traffic updates",
    ],
  },
  "are there flood advisories now?": {
    answer:
      "No active flood alerts. River levels normal. Light monitoring in lakeside barangays only.",
    nextPrompts: ["Set up 30‑minute traffic updates", "Show weekend outlook"],
  },
  "flood advisories now": {
    answer: "No flood bulletins at the moment. All zones green.",
    nextPrompts: ["Show weekend outlook", "Set up 30‑minute traffic updates"],
  },
  "give me registration links": {
    answer:
      "Quick registration links: Tech Fair: city.gov/techfair • Night Market: city.gov/nightmarket • Fun Run: city.gov/funrun. Need calendar reminders?",
    nextPrompts: [
      "Add to my calendar",
      "Any events for students?",
      "Volunteer drives this month",
    ],
  },
  "add to my calendar": {
    answer:
      "Events added to your personal calendar space. You can manage reminders under Dashboard > Events.",
    nextPrompts: [
      "Any events for students?",
      "Family-friendly events only",
      "Volunteer drives this month",
    ],
  },
  "family-friendly events only": {
    answer:
      "Filtered family-friendly picks: Night Market (craft zone), Charity Fun Run (kids division), Eco Art Workshop (Sun 2PM, Library Courtyard).",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "night-market",
          title: "Night Market (Family Zone)",
          time: "Fri–Sun 5 PM",
          venue: "Old Town Plaza",
          category: "Market",
        },
        {
          id: "fun-run",
          title: "Charity Fun Run (Kids Heat)",
          time: "Sun 5:30 AM",
          venue: "Sports Complex",
          category: "Fitness",
        },
        {
          id: "eco-art",
          title: "Eco Art Workshop",
          time: "Sun 2:00 PM",
          venue: "Library Courtyard",
          category: "Workshop",
        },
      ],
    },
    nextPrompts: [
      "Add to my calendar",
      "Any events for students?",
      "Volunteer drives this month",
    ],
  },
  "any volunteer drives this month?": {
    answer: "Active volunteer drives listed below.",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "tree-plant",
          title: "Tree Planting Drive",
          time: "Sat 7:00 AM",
          venue: "Riverside Park",
          category: "Environment",
        },
        {
          id: "relief-pack",
          title: "Relief Pack Assembly",
          time: "Sat 1:00 PM",
          venue: "Barangay Hall 3",
          category: "Community",
        },
        {
          id: "literacy",
          title: "Youth Literacy Session",
          time: "Sun 9:00 AM",
          venue: "Public Library",
          category: "Education",
        },
      ],
    },
    nextPrompts: [
      "Add to my calendar",
      "Family-friendly events only",
      "Any events for students?",
    ],
  },
  "volunteer drives this month": {
    answer: "Same volunteer drives shown below.",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "tree-plant",
          title: "Tree Planting Drive",
          time: "Sat 7:00 AM",
          venue: "Riverside Park",
          category: "Environment",
        },
        {
          id: "relief-pack",
          title: "Relief Pack Assembly",
          time: "Sat 1:00 PM",
          venue: "Barangay Hall 3",
          category: "Community",
        },
        {
          id: "literacy",
          title: "Youth Literacy Session",
          time: "Sun 9:00 AM",
          venue: "Public Library",
          category: "Education",
        },
      ],
    },
    nextPrompts: [
      "Add to my calendar",
      "Family-friendly events only",
      "Any events for students?",
    ],
  },
  "any events for students?": {
    answer:
      "Student-focused: Tech & Innovation Fair (college showcase), Youth Literacy Session, Campus Startup Pitch Night (Fri 7PM, Innovation Hub).",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "tech-fair",
          title: "Tech & Innovation Fair",
          time: "Sat 9:00 AM",
          venue: "City Hall Annex",
          category: "Innovation",
        },
        {
          id: "literacy",
          title: "Youth Literacy Session",
          time: "Sun 9:00 AM",
          venue: "Public Library",
          category: "Education",
        },
        {
          id: "pitch-night",
          title: "Startup Pitch Night",
          time: "Fri 7:00 PM",
          venue: "Innovation Hub",
          category: "Startup",
        },
      ],
    },
    nextPrompts: [
      "Add to my calendar",
      "Family-friendly events only",
      "Volunteer drives this month",
    ],
  },
  "send me the forms": {
    answer:
      "Downloads ready: Application Form (PDF) • Good Moral Template • Indigency Certificate Sample. Need help filling them out?",
    nextPrompts: [
      "How to fill the application form",
      "Scholarship deadline",
      "Other financial aid options",
    ],
  },
  "how to fill the application form": {
    answer:
      "Filling guide: 1) Section A: Personal info (match ID) 2) Section B: Academic history (latest semester GWA) 3) Section C: Household income (attach supporting doc) 4) Sign & review checklist before submission.",
    nextPrompts: ["Scholarship deadline", "Other financial aid options"],
  },
  "scholarship deadline": {
    answer: "Submission closes Sept 30, 4:00 PM (no extensions).",
    nextPrompts: ["Other financial aid options", "Send me the forms"],
  },
  "what's the deadline again?": {
    answer:
      "Scholarship submission cutoff: Sept 30, 4:00 PM at Education Office or via online portal (if slots still available).",
    nextPrompts: ["Other financial aid options", "Send me the forms"],
  },
  "other financial aid options": {
    answer:
      "Available aid programs: 1) STEM Skills Grant (rolling) 2) Barangay Educational Assistance (per income bracket) 3) Private Tech Partner Scholarship (Opens Oct 15). Want details on one?",
    nextPrompts: [
      "STEM Skills Grant details",
      "Barangay assistance info",
      "Tech partner scholarship",
    ],
  },
  "show me other financial aid options": {
    answer: "Same list of aid programs shown. Choose one for details.",
    nextPrompts: [
      "STEM Skills Grant details",
      "Barangay assistance info",
      "Tech partner scholarship",
    ],
  },
  "stem skills grant details": {
    answer:
      "STEM Skills Grant: For ICT/Engineering tracks, min GWA 83%, stipend ₱3,000/mo for 10 months.",
    nextPrompts: ["Barangay assistance info", "Tech partner scholarship"],
  },
  "barangay assistance info": {
    answer:
      "Barangay Educational Assistance: Needs barangay endorsement + indigency; one sibling per household.",
    nextPrompts: ["STEM Skills Grant details", "Tech partner scholarship"],
  },
  "tech partner scholarship": {
    answer:
      "Tech Partner Scholarship: Opens Oct 15; covers tuition gap + device allowance. Limited slots; prioritize STEM female applicants.",
    nextPrompts: ["STEM Skills Grant details", "Barangay assistance info"],
  },
  "scholarship deadline?": {
    answer: "Sept 30, 4:00 PM final submission.",
    nextPrompts: ["Other financial aid options", "Send me the forms"],
  },
  "give me contact numbers": {
    answer:
      "Emergency contacts: Community Hospital ER: (049) 123‑4567 • Global Care: (049) 234‑7788 • QualiMed: (049) 331‑9050.",
    nextPrompts: [
      "Which has the shortest queue?",
      "Show 24/7 pharmacies nearby",
    ],
  },
  "which has the shortest queue?": {
    answer: "Current shortest ER queue: Global Care (3 waiting).",
    nextPrompts: ["Give me contact numbers", "Show 24/7 pharmacies nearby"],
  },
  "show 24/7 pharmacies nearby": {
    answer: "Open late-night pharmacies listed below.",
    intent: "pharmacies_list",
    data: {
      facilities: [
        { name: "HealthyLife Pharmacy", distanceKm: 0.9, open: true },
        { name: "AllCare 24h", distanceKm: 1.4, open: true },
        { name: "WellPlus Center", distanceKm: 2.2, open: true },
      ],
    },
    nextPrompts: ["Give me contact numbers", "Which has the shortest queue?"],
  },
  // Cultural & empathy oriented prompts
  "tell me something about sta. rosa's culture": {
    answer:
      "Sta. Rosa blends heritage, innovation, and community care—here's a cultural snapshot.",
    intent: "culture_card",
    data: {
      heading: "Sta. Rosa Cultural Essence",
      points: [
        "Heritage churches and modern tech parks coexist",
        "Strong bayanihan during community drives",
        "Youth initiatives in sustainability and arts",
      ],
      quote: "Ang pag-unlad ay mas matibay kapag kasama ang puso ng komunidad.",
    },
    nextPrompts: [
      "What local landmarks should I visit?",
      "Any upcoming cultural festivals?",
      "Share a local proverb",
    ],
  },
  "what local landmarks should i visit?": {
    answer:
      "Highlighted landmarks below—each symbolizing a facet of local identity.",
    intent: "culture_card",
    data: {
      heading: "Landmarks to Explore",
      points: [
        "Heritage Church Plaza – historical gatherings",
        "Innovation Tech Hub – startup incubators",
        "Riverfront Eco Park – community clean-up site",
      ],
      quote: "History and innovation walk side by side.",
    },
    nextPrompts: [
      "Any upcoming cultural festivals?",
      "Share a local proverb",
      "Tell me something about Sta. Rosa's culture",
    ],
  },
  "any upcoming cultural festivals?": {
    answer: "Festival lineup preview displayed.",
    intent: "events_list",
    data: {
      weekend: [
        {
          id: "harvest-fest",
          title: "Harvest & Heritage Fair",
          time: "Sept 14 9AM",
          venue: "Central Plaza",
          category: "Culture",
        },
        {
          id: "kulinarya",
          title: "Kulinarya Street Eats",
          time: "Sept 14 6PM",
          venue: "Food Arcade",
          category: "Cuisine",
        },
        {
          id: "art-loom",
          title: "Indie Art & Loom Expo",
          time: "Sept 15 1PM",
          venue: "Culture Hall",
          category: "Arts",
        },
      ],
    },
    nextPrompts: [
      "What local landmarks should I visit?",
      "Share a local proverb",
      "Tell me something about Sta. Rosa's culture",
    ],
  },
  "share a local proverb": {
    answer: "Local wisdom shared below.",
    intent: "culture_card",
    data: {
      heading: "Local Proverb",
      points: ["Ang tunay na sigla ng lungsod ay ang pagkakaisa ng mga tao."],
      quote: "Unity amplifies progress.",
    },
    nextPrompts: [
      "Tell me something about Sta. Rosa's culture",
      "Any upcoming cultural festivals?",
      "What local landmarks should I visit?",
    ],
  },
  "show empathy note": {
    answer: "Here's an encouragement banner.",
    intent: "banner",
    data: {
      title: "You are doing great exploring resources today!",
      description: "Let me know if you want help prioritizing tasks.",
      variant: "info",
    },
    nextPrompts: [
      "Tell me something about Sta. Rosa's culture",
      "Share a local proverb",
    ],
  },
};

export function getAIResponse(prompt: string): AIResponse {
  const key = prompt.trim().toLowerCase();
  if (store[key]) return store[key];
  // Fallback: craft a generic informative answer without placeholder wording.
  return {
    answer:
      "I can help with city services, events, scholarships, health facilities, weather and traffic. Try asking about weekend events, hospital queues, or scholarship forms.",
    nextPrompts: [
      "What's happening in Sta. Rosa this weekend?",
      "Is there a hospital nearby with available emergency services?",
      "What are the requirements for the city scholarship program?",
    ],
  };
}
