import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import type { InquiryInput } from "@/lib/types";
import { isISODate, isLastMinuteDate, kindSuccessMessage, todayISO, validateInquiry } from "@/lib/validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const hits = new Map<string, number[]>();

const referenceAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeReference() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let code = "SP-";
  for (const byte of bytes) {
    code += referenceAlphabet[byte % referenceAlphabet.length];
  }
  return code;
}

function clean(value: string | undefined, max = 4000) {
  return (value ?? "").trim().slice(0, max);
}

function cleanDetails(details: Record<string, string | boolean> | undefined) {
  const output: Record<string, string | boolean> = {};
  if (!details) return output;
  for (const [key, value] of Object.entries(details)) {
    if (!/^[a-zA-Z][a-zA-Z0-9]{0,32}$/.test(key)) continue;
    if (typeof value === "boolean") output[key] = value;
    else if (typeof value === "string") output[key] = value.trim().slice(0, 500);
  }
  return output;
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "23505";
}

function preferredTimeLabel(input: InquiryInput) {
  const window = clean(input.preferredTime, 40);
  const specific = clean(String(input.details?.specificTime ?? ""), 40);
  if (window === "specific" && specific) return `Specific time: ${specific}`;
  const labels: Record<string, string> = {
    morning: "Morning",
    midday: "Midday",
    afternoon: "Afternoon",
    evening: "Evening",
    flexible: "Flexible",
  };
  return labels[window] ?? window;
}

export async function createInquiry(input: InquiryInput, ip: string) {
  if (input.honeypot?.trim()) {
    return {
      ok: true as const,
      reference: null,
      suppressed: true,
      confirmed: false as const,
      emailSent: false as const,
      lastMinute: false,
      message: kindSuccessMessage(input.kind),
    };
  }

  if (limited(ip)) {
    return {
      ok: false as const,
      status: 429,
      message: "Too many requests were sent from this connection. Please wait a few minutes and try again.",
      fieldErrors: {},
    };
  }

  const fieldErrors = validateInquiry(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      status: 400,
      message: "Please review the highlighted fields.",
      fieldErrors,
    };
  }

  const idempotencyKey = clean(input.idempotencyKey, 80) || null;
  if (idempotencyKey) {
    const existing = await db
      .select({ reference: inquiries.reference, payload: inquiries.payload })
      .from(inquiries)
      .where(eq(inquiries.idempotencyKey, idempotencyKey))
      .limit(1);
    if (existing[0]) {
      const stored = existing[0].payload as { lastMinute?: boolean };
      return {
        ok: true as const,
        reference: existing[0].reference,
        duplicate: true,
        confirmed: false as const,
        emailSent: false as const,
        lastMinute: Boolean(stored.lastMinute),
        message: kindSuccessMessage(input.kind),
      };
    }
  }

  const today = input.clientToday && isISODate(input.clientToday) ? input.clientToday : todayISO();
  const lastMinute =
    input.kind === "booking" && isISODate(input.preferredDate ?? "") ? isLastMinuteDate(input.preferredDate ?? "", today) : false;

  const payload: Record<string, unknown> = {
    kind: input.kind,
    fullName: clean(input.fullName, 160),
    email: clean(input.email, 200).toLowerCase(),
    phone: clean(input.phone, 40),
    organization: clean(input.organization, 200),
    role: clean(input.role, 120),
    service: clean(input.service, 64),
    location: clean(input.location, 300),
    preferredDate: clean(input.preferredDate, 120),
    preferredTime: preferredTimeLabel(input),
    durationPreference: clean(input.durationPreference, 80),
    participants: clean(input.participants, 10),
    arrangement: clean(input.arrangement, 40),
    sessionFormat: clean(input.sessionFormat, 120),
    collaborationType: clean(input.collaborationType, 120),
    preferredContact: clean(input.preferredContact, 20),
    topic: clean(input.topic, 80),
    message: clean(input.message, 4000),
    propertyPolicyAck: Boolean(input.propertyPolicyAck),
    details: cleanDetails(input.details),
    lastMinute,
    emailSent: false,
    confirmed: false,
  };

  if (JSON.stringify(payload).length > 20000) {
    return {
      ok: false as const,
      status: 400,
      message: "This request is too long to store. Please shorten the notes and try again.",
      fieldErrors: {},
    };
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const reference = makeReference();
    try {
      await db.insert(inquiries).values({
        reference,
        idempotencyKey,
        kind: input.kind,
        service: clean(input.service || input.topic, 64) || null,
        fullName: clean(input.fullName, 160),
        email: clean(input.email, 200).toLowerCase(),
        phone: clean(input.phone, 40) || null,
        organization: clean(input.organization, 200) || null,
        location: clean(input.location, 300) || null,
        preferredDate: clean(input.preferredDate, 120) || null,
        message: clean(input.message, 4000) || null,
        lastMinute,
        status: "submitted",
        payload,
      });

      return {
        ok: true as const,
        reference,
        confirmed: false as const,
        emailSent: false as const,
        lastMinute,
        message: kindSuccessMessage(input.kind),
      };
    } catch (error) {
      if (isUniqueViolation(error) && idempotencyKey) {
        const existing = await db
          .select({ reference: inquiries.reference })
          .from(inquiries)
          .where(eq(inquiries.idempotencyKey, idempotencyKey))
          .limit(1);
        if (existing[0]) {
          return {
            ok: true as const,
            reference: existing[0].reference,
            duplicate: true,
            confirmed: false as const,
            emailSent: false as const,
            lastMinute,
            message: kindSuccessMessage(input.kind),
          };
        }
      }
      if (isUniqueViolation(error)) continue;
      throw error;
    }
  }

  throw new Error("Could not allocate a request reference.");
}

export async function findInquiryStatus(reference: string) {
  if (!/^SP-[A-Z2-9]{6}$/.test(reference)) return null;
  const rows = await db
    .select({
      reference: inquiries.reference,
      status: inquiries.status,
      kind: inquiries.kind,
      createdAt: inquiries.createdAt,
      lastMinute: inquiries.lastMinute,
    })
    .from(inquiries)
    .where(eq(inquiries.reference, reference))
    .limit(1);
  return rows[0] ?? null;
}
