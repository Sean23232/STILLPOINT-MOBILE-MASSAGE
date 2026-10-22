import type { ServiceId } from "@/lib/types";

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/corporate", label: "Corporate Wellness" },
  { href: "/about", label: "About" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/contact", label: "Contact" },
];

export type ServiceSummary = {
  id: Exclude<ServiceId, "other">;
  index: string;
  name: string;
  headline: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const services: ServiceSummary[] = [
  {
    id: "in-home",
    index: "01",
    name: "In-Home Massage",
    headline: "Relax Without Leaving Home.",
    description:
      "Enjoy a convenient massage experience in the comfort of your own space. Appointments are arranged around your needs, preferred time, location, and available service options.",
    cta: "Request an In-Home Session",
    href: "/services/in-home#request",
    image: "/images/table.jpg",
    alt: "A portable massage table dressed in ivory linen in a bright room with oak floors and a sage curtain.",
  },
  {
    id: "corporate",
    index: "02",
    name: "Corporate Massage",
    headline: "A More Thoughtful Workplace.",
    description:
      "Bring massage sessions to offices, employee appreciation days, wellness initiatives, and company events. Explore flexible arrangements for teams and organizations.",
    cta: "Explore Corporate Wellness",
    href: "/corporate#proposal",
    image: "/images/corporate.jpg",
    alt: "A seated shoulder massage in a quiet office lounge with plants and natural light.",
  },
  {
    id: "hotel",
    index: "03",
    name: "Hotel & Travel Massage",
    headline: "Comfort, Wherever You Stay.",
    description:
      "Arrange a massage session at your hotel or accommodation, subject to location, property policies, and appointment availability.",
    cta: "Request a Hotel Session",
    href: "/services/hotel#request",
    image: "/images/hotel.jpg",
    alt: "A massage table prepared beside a window in a calm hotel room.",
  },
  {
    id: "event",
    index: "04",
    name: "Pop-Ups & Events",
    headline: "Wellness That Brings People Together.",
    description:
      "Add massage experiences to selected gatherings, private events, pop-ups, and workplace activations. Tell us about your event to explore a suitable arrangement.",
    cta: "Plan an Event",
    href: "/services/events#request",
    image: "/images/events.jpg",
    alt: "A small wellness pop-up with massage chairs and an ivory linen screen in a bright loft.",
  },
];

export const differences = [
  {
    title: "Convenience",
    body: "Appointments can be requested for home, workplace, hotel, and event settings.",
    icon: "path",
  },
  {
    title: "Personalized Experience",
    body: "Share your preferences and goals so the requested session can be discussed before confirmation.",
    icon: "person",
  },
  {
    title: "Flexible Service Options",
    body: "Explore individual appointments, group sessions, and organizational arrangements.",
    icon: "layers",
  },
  {
    title: "Professional Communication",
    body: "Receive clear information about availability, service scope, pricing, and appointment details.",
    icon: "message",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Choose Your Service",
    body: "Select in-home, corporate, hotel, or event massage.",
  },
  {
    n: "02",
    title: "Share Your Details",
    body: "Tell us your preferred date, location, service requirements, and any relevant scheduling preferences.",
  },
  {
    n: "03",
    title: "Confirm the Arrangement",
    body: "Submit your request. The business reviews availability, travel requirements, and service details before confirming the appointment.",
  },
  {
    n: "04",
    title: "Enjoy Your Session",
    body: "Once the details are confirmed, prepare your space or agreed location for the scheduled appointment.",
  },
];

export const corporateHighlights = [
  "Employee appreciation events",
  "Workplace wellness days",
  "Office pop-ups",
  "Recurring corporate arrangements",
  "Custom event inquiries",
];

export const partnershipCategories = [
  {
    title: "Chiropractors",
    body: "A conversation about complementary scheduling for shared clients — not an existing affiliation.",
  },
  {
    title: "Physicians and medical practices",
    body: "An invitation to discuss how mobile massage might sit alongside a practice’s own care. No clinical claims are made here.",
  },
  {
    title: "Licensed massage and wellness professionals",
    body: "Room for collaboration, coverage, or coordinated experiences once both parties agree.",
  },
  {
    title: "Hotels and hospitality teams",
    body: "A way to explore guest wellness requests, subject to property policy. No hotel is listed as a partner.",
  },
  {
    title: "Corporate wellness coordinators",
    body: "A direct line for teams planning workplace sessions or appreciation days.",
  },
  {
    title: "Event organizers",
    body: "A place to describe a gathering and ask whether a pop-up could be arranged.",
  },
];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "What types of massage appointments can I request?",
    answer:
      "You can inquire about in-home, workplace, hotel, and selected event massage services. The available options depend on your location and the details of your request.",
  },
  {
    question: "Do you offer last-minute appointments?",
    answer:
      "You can submit a last-minute request, and availability can be reviewed. A request is not a confirmed appointment until the business confirms it.",
  },
  {
    question: "Do you travel to my location?",
    answer:
      "Share your address or ZIP/postal code when requesting an appointment so the service area and any travel requirements can be reviewed.",
  },
  {
    question: "Can I arrange massage sessions for my employees?",
    answer:
      "Yes, you can submit a corporate wellness inquiry with your team size, preferred dates, location, and event requirements.",
  },
  {
    question: "Can you provide massage services at hotels?",
    answer:
      "Hotel appointments may be requested, subject to location, availability, and the property’s policies.",
  },
  {
    question: "How much does a session cost?",
    answer:
      "Pricing depends on the service, duration, location, and appointment requirements. Submit an inquiry to receive information about the applicable options.",
  },
  {
    question: "How do I know my appointment is confirmed?",
    answer:
      "Submitting a booking request does not guarantee a reservation. Wait for direct confirmation of the agreed service, time, location, and pricing.",
  },
  {
    question: "Can I request a recurring arrangement?",
    answer:
      "You can inquire about recurring individual or corporate arrangements. The business will review the requirements and available options.",
  },
  {
    question: "What should I prepare before the appointment?",
    answer:
      "Any preparation requirements will be communicated when your appointment details are confirmed.",
  },
];

export const timeWindows = [
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "flexible", label: "Flexible" },
  { value: "specific", label: "A specific time" },
];

export const bookingServices: { value: ServiceId; label: string; note: string }[] = [
  {
    value: "in-home",
    label: "In-Home Massage",
    note: "A session requested for a residence or private space.",
  },
  {
    value: "corporate",
    label: "Corporate Massage",
    note: "Continues to the workplace proposal form.",
  },
  {
    value: "hotel",
    label: "Hotel Massage",
    note: "Subject to location, availability, and property policy.",
  },
  {
    value: "event",
    label: "Event or Pop-Up",
    note: "A gathering, activation, or private event inquiry.",
  },
  {
    value: "other",
    label: "Other Inquiry",
    note: "Something that does not fit the options above.",
  },
];

export const sessionFormats = [
  "Individual seated sessions",
  "A scheduled block of appointments",
  "An employee appreciation event",
  "A recurring workplace visit",
  "Not sure yet — please advise",
];

export const collaborationTypes = [
  "Chiropractic practice",
  "Physician or medical practice",
  "Massage or wellness professional",
  "Hotel or hospitality team",
  "Corporate wellness coordinator",
  "Event organizer",
  "Other",
];

export const contactTopics = [
  "General question",
  "Booking help",
  "Corporate wellness",
  "Partnership",
  "Something else",
];

export const arrangementOptions = [
  { value: "one-time", label: "One-time" },
  { value: "recurring", label: "Recurring" },
];

/**
 * Approved session options. Leave empty until the business confirms names,
 * durations, and descriptions. Do not add sample modalities or prices.
 */
export type SessionOption = {
  name: string;
  summary: string;
  duration: string;
};

export const approvedSessionOptions: SessionOption[] = [];

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  context?: string;
};

/** Add verified testimonials only. Do not insert sample quotations. */
export const verifiedTestimonials: Testimonial[] = [];

export const values = [
  {
    title: "Your space stays yours",
    body: "The visit is arranged around the room, schedule, and setting you already have — not a studio you have to travel to.",
  },
  {
    title: "Nothing is assumed",
    body: "Duration, pricing, travel, and setup are discussed before an appointment is confirmed. A form is a request, not a reservation.",
  },
  {
    title: "Clear from the first note",
    body: "You should always know what was asked, what is still open, and what has actually been agreed.",
  },
];

export const servicePages = {
  "in-home": {
    eyebrow: "In-home massage",
    title: "A professional session, in the room you already know.",
    lede: "In-home massage services bring the appointment to your residence or private space. You choose a preferred time and share the location. Stillpoint reviews travel, setup, and availability before anything is confirmed.",
    image: "/images/table.jpg",
    alt: "A portable massage table dressed in ivory linen in a bright contemporary room.",
    points: [
      {
        title: "The experience",
        body: "The session is requested for your home, not a clinic. Share how you would like the time to feel, any scheduling limits, and whether more than one person hopes to book. Preferences are a starting point for the conversation.",
      },
      {
        title: "How to prepare",
        body: "Specific preparation is shared only after an appointment is confirmed. Before that, it helps to note access details such as stairs, parking, or a quiet room. Do not rearrange your home around an unconfirmed request.",
      },
      {
        title: "Service area",
        body: "Coverage is not published as a fixed map. Add a ZIP or postal code and, if you wish, a street address. The business reviews whether the location can be reached and whether travel time applies.",
      },
    ],
  },
  hotel: {
    eyebrow: "Hotel massage appointments",
    title: "Comfort, arranged around the place you are staying.",
    lede: "Travelers and guests can request a massage at a hotel or other accommodation. Every hotel request is subject to location, appointment availability, and the property’s own policies.",
    image: "/images/hotel.jpg",
    alt: "A massage table prepared beside a tall window in a refined hotel room.",
    points: [
      {
        title: "Travel-friendly timing",
        body: "Share your stay dates, a preferred window, and the property name. A request made close to arrival is treated as last-minute and is not held until the business confirms it.",
      },
      {
        title: "Location and scheduling",
        body: "Include the hotel, neighborhood, and any room or meeting-space note you are comfortable sharing now. A full room number can wait until an appointment is actually agreed.",
      },
      {
        title: "Property policy",
        body: "Some properties welcome in-room appointments. Others do not. Stillpoint does not override house rules, and a submitted request is not permission from the hotel.",
      },
    ],
  },
  event: {
    eyebrow: "Event massage services",
    title: "A quieter kind of gathering detail.",
    lede: "Pop-up and event massage can be discussed for selected private gatherings, workplace activations, and hosted experiences. Tell us about the occasion. A suitable arrangement, if one is possible, is confirmed only after the details are reviewed.",
    image: "/images/events.jpg",
    alt: "An airy loft prepared for a small wellness pop-up with linen screens and massage chairs.",
    points: [
      {
        title: "Examples, not a menu",
        body: "A chair-massage corner, a short block of individual sessions, or a calm pause during a private gathering are examples to discuss. They are not guaranteed offerings and they are not priced here.",
      },
      {
        title: "Size and schedule",
        body: "Guest count, start time, and how long the experience should run all change what is possible. Share estimates. They will be treated as estimates.",
      },
      {
        title: "Location and setup",
        body: "Note the venue, available floor space, power access, and any load-in limits. Setup requirements are confirmed with the appointment, not assumed from this page.",
      },
    ],
  },
} as const;

export const eventExamples = [
  "A quiet chair-massage corner during a private gathering",
  "A scheduled block of individual sessions at a hosted event",
  "A short workplace activation or appreciation pause",
  "A pop-up arranged with a hospitality or wellness partner, once that partnership exists",
];

export const corporateSections = [
  {
    title: "Workplace massage",
    body: "Seated or scheduled sessions can be requested for an office, studio, or other workplace. The right format depends on the room, the team, and the time available.",
  },
  {
    title: "Employee appreciation",
    body: "A wellness hour can be part of a thank-you day or a company gathering. Describe the occasion and the headcount so the request can be reviewed realistically.",
  },
  {
    title: "Recurring arrangements",
    body: "Some teams want a repeating visit rather than a single day. Recurring corporate massage is an inquiry, not a standing contract, until both sides agree in writing.",
  },
  {
    title: "Pop-ups and special events",
    body: "Off-sites, launches, and client gatherings can include a massage experience when the space and schedule allow. Use the event page if the gathering is not at the office.",
  },
];

export const logistics = [
  "A quiet room, open lounge, or private office — describe the space you actually have.",
  "Headcount is an estimate. It does not reserve therapists or a time block.",
  "Note building access, security, parking, and any vendor requirements.",
  "Timing, travel, and pricing are confirmed only after review.",
  "No corporate package rates are published on this site.",
];

export const preparationNotes = [
  "Wait for confirmation before changing your space around an appointment.",
  "When details are agreed, you will be told what to clear, where to park, and what the visit includes.",
  "Share access notes with the request if stairs, gates, or front-desk procedures matter.",
  "Please do not include detailed medical history in these forms.",
];

export function serviceLabel(id: string) {
  return bookingServices.find((item) => item.value === id)?.label ?? id;
}
