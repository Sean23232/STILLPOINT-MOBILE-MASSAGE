import type { InquiryInput, SubmitResult } from "@/lib/types";

export async function postInquiry(body: InquiryInput): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json().catch(() => null)) as
      | {
          ok?: boolean;
          reference?: string | null;
          message?: string;
          fieldErrors?: Record<string, string>;
          lastMinute?: boolean;
        }
      | null;

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        message:
          data?.message ||
          "We could not store your request. Your entries are still here. Please try again.",
        fieldErrors: data?.fieldErrors ?? {},
      };
    }

    return {
      ok: true,
      reference: data.reference ?? null,
      message:
        data.message ||
        "Your request has been submitted. Your appointment is not confirmed until availability and details have been reviewed by the business.",
      confirmed: false,
      emailSent: false,
      lastMinute: Boolean(data.lastMinute),
    };
  } catch {
    return {
      ok: false,
      message:
        "A network error interrupted the submission. Nothing was confirmed, and your entries are still on this page. Please try again.",
      fieldErrors: {},
    };
  }
}

export function newIdempotencyKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `key-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function scrollToStatus(node: HTMLElement | null) {
  if (!node) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
}
