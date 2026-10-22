import { createInquiry, findInquiryStatus } from "@/lib/inquiries";
import type { InquiryInput } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "local";
  return request.headers.get("x-real-ip") || "local";
}

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference")?.trim().toUpperCase() ?? "";
  if (!reference) {
    return Response.json({ ok: false, message: "A reference is required." }, { status: 400 });
  }

  try {
    const row = await findInquiryStatus(reference);
    if (!row) {
      return Response.json({ ok: false, message: "No request was found for that reference." }, { status: 404 });
    }
    return Response.json({
      ok: true,
      reference: row.reference,
      status: row.status,
      kind: row.kind,
      createdAt: row.createdAt,
      lastMinute: row.lastMinute,
      confirmed: false,
      emailSent: false,
    });
  } catch (error) {
    console.error("Inquiry lookup failed", error);
    return Response.json({ ok: false, message: "The request could not be looked up." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return Response.json({ ok: false, message: "This request was rejected." }, { status: 403 });
  }

  let body: InquiryInput;
  try {
    body = (await request.json()) as InquiryInput;
  } catch {
    return Response.json({ ok: false, message: "The form could not be read. Please try again." }, { status: 400 });
  }

  try {
    const result = await createInquiry(body, clientIp(request));
    if (!result.ok) {
      return Response.json(
        { ok: false, message: result.message, fieldErrors: result.fieldErrors },
        { status: result.status },
      );
    }
    return Response.json({
      ok: true,
      reference: result.reference,
      message: result.message,
      confirmed: false,
      emailSent: false,
      lastMinute: result.lastMinute,
    });
  } catch (error) {
    console.error("Inquiry submission failed", error);
    return Response.json(
      {
        ok: false,
        message: "We could not store your request. Your entries are still on the page. Please try again.",
        fieldErrors: {},
      },
      { status: 500 },
    );
  }
}
