/**
 * Editable business details.
 * Leave a field empty until it is confirmed. The site will show a clear
 * placeholder instead of inventing contact details, credentials, or a service area.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stillpoint.example";

export const business = {
  name: "Stillpoint Mobile Massage",
  shortName: "Stillpoint",
  tagline: "Your Space. Your Time. Your Moment of Calm.",
  alternateHeadline: "Professional Massage, Wherever You Need It.",
  email: "",
  phone: "",
  address: "",
  hours: "",
  serviceArea: "",
  instagram: "",
  therapistName: "",
  credentials: "",
  training: "",
  biography: "",
};

export const conceptNote =
  "Details marked as awaiting confirmation are intentional placeholders. They should be replaced only with verified business information.";
