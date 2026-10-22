import type { FieldErrors, InquiryInput, ServiceId } from "@/lib/types";
import { serviceIds } from "@/lib/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isServiceId(value: string): value is ServiceId {
  return (serviceIds as readonly string[]).includes(value);
}

export function todayISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysISO(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

export function isISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function isLastMinuteDate(preferredDate: string, today = todayISO()) {
  if (!isISODate(preferredDate)) return false;
  return preferredDate <= addDaysISO(today, 1);
}

function requiredText(errors: FieldErrors, key: string, value: string | undefined, label: string, min = 2) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    errors[key] = `Enter ${label}.`;
    return "";
  }
  if (trimmed.length < min) {
    errors[key] = `${label} looks too short.`;
  }
  return trimmed;
}

function validateEmail(errors: FieldErrors, value: string | undefined, label = "email address") {
  const email = value?.trim() ?? "";
  if (!email) {
    errors.email = `Enter an ${label}.`;
    return;
  }
  if (email.length > 200 || !emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }
}

function validateOptionalPhone(errors: FieldErrors, value: string | undefined) {
  const phone = value?.trim() ?? "";
  if (!phone) return;
  if (!isValidPhone(phone)) {
    errors.phone = "Enter a phone number with 10 to 15 digits, including the area code.";
  }
}

function validateRequiredPhone(errors: FieldErrors, value: string | undefined) {
  const phone = value?.trim() ?? "";
  if (!phone) {
    errors.phone = "Enter a phone number.";
    return;
  }
  if (!isValidPhone(phone)) {
    errors.phone = "Enter a phone number with 10 to 15 digits, including the area code.";
  }
}

export function dateError(preferredDate: string, clientToday?: string) {
  if (!preferredDate) return "Choose a preferred date.";
  if (!isISODate(preferredDate)) return "Choose a valid date.";
  const serverToday = todayISO();
  const earliest = addDaysISO(serverToday, -1);
  if (preferredDate < earliest) return "Choose today or a future date.";
  if (
    clientToday &&
    isISODate(clientToday) &&
    Math.abs(Date.parse(clientToday) - Date.parse(serverToday)) < 1000 * 60 * 60 * 24 * 3 &&
    preferredDate < clientToday &&
    preferredDate < serverToday
  ) {
    return "Choose today or a future date.";
  }
  if (preferredDate > addDaysISO(serverToday, 540)) {
    return "Choose a date within the next 18 months.";
  }
  return "";
}

export function validateBooking(input: InquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  const service = input.service?.trim() ?? "";

  if (!service || !isServiceId(service)) {
    errors.service = "Choose a service.";
  } else if (service === "corporate") {
    errors.service = "Corporate requests use the proposal form.";
  }

  const dateMessage = dateError(input.preferredDate ?? "", input.clientToday);
  if (dateMessage) errors.preferredDate = dateMessage;

  if (!input.preferredTime?.trim()) {
    errors.preferredTime = "Choose a preferred time window.";
  }
  if (input.preferredTime === "specific" && !input.details?.specificTime) {
    errors.specificTime = "Enter the specific time you have in mind.";
  }

  requiredText(errors, "location", input.location, "a location or ZIP / postal code", 3);

  if (service === "hotel") {
    requiredText(errors, "hotelName", String(input.details?.hotelName ?? ""), "the hotel or property name");
    if (!input.propertyPolicyAck) {
      errors.propertyPolicyAck = "Confirm that you understand hotel appointments depend on property policies.";
    }
  }

  if (service === "event") {
    requiredText(errors, "eventName", String(input.details?.eventName ?? ""), "an event name");
    const count = input.participants?.trim() ?? "";
    if (!count || !/^\d+$/.test(count) || Number(count) < 1 || Number(count) > 500) {
      errors.participants = "Enter an estimated number of participants from 1 to 500.";
    }
  } else if (input.participants?.trim()) {
    if (!/^\d+$/.test(input.participants.trim()) || Number(input.participants) < 1 || Number(input.participants) > 500) {
      errors.participants = "Enter a number of people from 1 to 500, or leave this blank.";
    }
  }

  if (service === "other") {
    requiredText(errors, "message", input.message, "a short description of the request", 8);
  }

  requiredText(errors, "fullName", input.fullName, "your name");
  validateEmail(errors, input.email);
  validateRequiredPhone(errors, input.phone);
  if (!input.preferredContact) {
    errors.preferredContact = "Choose a preferred contact method.";
  }

  if ((input.durationPreference?.trim().length ?? 0) > 80) {
    errors.durationPreference = "Keep the duration preference under 80 characters.";
  }
  if ((input.message?.length ?? 0) > 4000) {
    errors.message = "Please shorten this note to under 4,000 characters.";
  }

  return errors;
}

export function validateCorporate(input: InquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  requiredText(errors, "fullName", input.fullName, "a contact name");
  requiredText(errors, "organization", input.organization, "a company or organization");
  validateEmail(errors, input.email, "work email");
  validateOptionalPhone(errors, input.phone);
  requiredText(errors, "location", input.location, "a company location", 3);
  const count = input.participants?.trim() ?? "";
  if (!count || !/^\d+$/.test(count) || Number(count) < 1 || Number(count) > 2000) {
    errors.participants = "Enter an estimated number of participants.";
  }
  requiredText(errors, "preferredDate", input.preferredDate, "a preferred date or date range", 3);
  if (input.preferredDate && isISODate(input.preferredDate) && input.preferredDate < addDaysISO(todayISO(), -1)) {
    errors.preferredDate = "Choose today or a future date, or describe an upcoming range.";
  }
  if (!input.arrangement) errors.arrangement = "Choose one-time or recurring.";
  requiredText(errors, "sessionFormat", input.sessionFormat, "a preferred session format", 2);
  if ((input.message?.length ?? 0) > 4000) {
    errors.message = "Please shorten additional requirements to under 4,000 characters.";
  }
  return errors;
}

export function validatePartnership(input: InquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  requiredText(errors, "fullName", input.fullName, "your name");
  requiredText(errors, "organization", input.organization, "an organization");
  requiredText(errors, "role", input.role, "your professional role");
  validateEmail(errors, input.email);
  validateOptionalPhone(errors, input.phone);
  requiredText(errors, "collaborationType", input.collaborationType, "a type of collaboration", 2);
  requiredText(errors, "location", input.location, "a location", 3);
  requiredText(errors, "message", input.message, "a message", 12);
  if ((input.message?.length ?? 0) > 4000) {
    errors.message = "Please shorten the message to under 4,000 characters.";
  }
  return errors;
}

export function validateContact(input: InquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  requiredText(errors, "fullName", input.fullName, "your name");
  validateEmail(errors, input.email);
  validateOptionalPhone(errors, input.phone);
  if (!input.topic?.trim()) errors.topic = "Choose a topic.";
  requiredText(errors, "message", input.message, "a message", 8);
  if ((input.message?.length ?? 0) > 4000) {
    errors.message = "Please shorten the message to under 4,000 characters.";
  }
  return errors;
}

export function validateInquiry(input: InquiryInput): FieldErrors {
  switch (input.kind) {
    case "booking":
      return validateBooking(input);
    case "corporate":
      return validateCorporate(input);
    case "partnership":
      return validatePartnership(input);
    case "contact":
      return validateContact(input);
    default:
      return { kind: "Choose a request type." };
  }
}

export function bookingSuccessMessage() {
  return "Your request has been submitted. Your appointment is not confirmed until availability and details have been reviewed by the business.";
}

export function kindSuccessMessage(kind: InquiryInput["kind"]) {
  if (kind === "booking") return bookingSuccessMessage();
  if (kind === "corporate") {
    return "Your corporate proposal request has been submitted. This is not a confirmed booking, and no package or rate has been reserved.";
  }
  if (kind === "partnership") {
    return "Your partnership inquiry has been submitted. This does not create a partnership or an affiliation.";
  }
  return "Your message has been submitted. This is a stored inquiry, not an automated email reply.";
}
