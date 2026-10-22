export const serviceIds = ["in-home", "corporate", "hotel", "event", "other"] as const;

export type ServiceId = (typeof serviceIds)[number];

export type InquiryKind = "booking" | "corporate" | "partnership" | "contact";

export type InquiryInput = {
  kind: InquiryKind;
  honeypot?: string;
  idempotencyKey?: string;
  clientToday?: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  service?: string;
  location?: string;
  preferredDate?: string;
  preferredTime?: string;
  durationPreference?: string;
  participants?: string;
  arrangement?: string;
  sessionFormat?: string;
  collaborationType?: string;
  preferredContact?: string;
  topic?: string;
  message?: string;
  propertyPolicyAck?: boolean;
  details?: Record<string, string | boolean>;
};

export type FieldErrors = Record<string, string>;

export type BookingDraft = {
  service: ServiceId | "";
  preferredDate: string;
  timeWindow: string;
  specificTime: string;
  durationPreference: string;
  participants: string;
  location: string;
  address: string;
  hotelName: string;
  roomNote: string;
  eventName: string;
  eventType: string;
  venue: string;
  setupNotes: string;
  additionalRequests: string;
  propertyPolicyAck: boolean;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "" | "email" | "phone";
  notes: string;
};

export const emptyDraft: BookingDraft = {
  service: "",
  preferredDate: "",
  timeWindow: "",
  specificTime: "",
  durationPreference: "",
  participants: "",
  location: "",
  address: "",
  hotelName: "",
  roomNote: "",
  eventName: "",
  eventType: "",
  venue: "",
  setupNotes: "",
  additionalRequests: "",
  propertyPolicyAck: false,
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "",
  notes: "",
};

export type SubmitSuccess = {
  ok: true;
  reference: string | null;
  message: string;
  confirmed: false;
  emailSent: false;
  lastMinute: boolean;
};

export type SubmitFailure = {
  ok: false;
  message: string;
  fieldErrors: FieldErrors;
};

export type SubmitResult = SubmitSuccess | SubmitFailure;
