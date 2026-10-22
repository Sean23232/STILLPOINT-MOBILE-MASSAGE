"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { bookingServices, serviceLabel, timeWindows } from "@/lib/content";
import type { BookingDraft, FieldErrors, InquiryInput, ServiceId } from "@/lib/types";
import { emptyDraft } from "@/lib/types";
import { dateError, isLastMinuteDate, isServiceId, todayISO, validateBooking } from "@/lib/validation";
import { newIdempotencyKey, postInquiry, scrollToStatus } from "@/lib/submit";
import { Button, cn } from "@/components/brand";
import { CheckboxField, Honeypot, PrivacyNotice, RequiredLegend, SelectField, TextAreaField, TextField } from "@/components/fields";
import { FormStatusMessage } from "@/components/form-status-message";

const storageKey = "stillpoint-booking-draft";

type Lookup = {
  ok: boolean;
  reference?: string;
  status?: string;
  lastMinute?: boolean;
  message?: string;
};

function preferenceErrors(draft: BookingDraft, today: string): FieldErrors {
  const errors: FieldErrors = {};
  const dateMessage = dateError(draft.preferredDate, today);
  if (dateMessage) errors.preferredDate = dateMessage;
  if (!draft.timeWindow) errors.preferredTime = "Choose a preferred time window.";
  if (draft.timeWindow === "specific" && draft.specificTime.trim().length < 2) {
    errors.specificTime = "Enter the specific time you have in mind.";
  }
  if (draft.location.trim().length < 3) errors.location = "Enter a location or ZIP / postal code.";
  if (draft.service === "hotel") {
    if (draft.hotelName.trim().length < 2) errors.hotelName = "Enter the hotel or property name.";
    if (!draft.propertyPolicyAck) {
      errors.propertyPolicyAck = "Confirm that you understand hotel appointments depend on property policies.";
    }
  }
  if (draft.service === "event") {
    if (draft.eventName.trim().length < 2) errors.eventName = "Enter an event name.";
    if (!/^\d+$/.test(draft.participants.trim()) || Number(draft.participants) < 1 || Number(draft.participants) > 500) {
      errors.participants = "Enter an estimated number of participants from 1 to 500.";
    }
  } else if (draft.participants.trim() && (!/^\d+$/.test(draft.participants.trim()) || Number(draft.participants) < 1)) {
    errors.participants = "Enter a number of people, or leave this blank.";
  }
  if (draft.service === "other" && draft.additionalRequests.trim().length < 8) {
    errors.message = "Describe the request in a sentence or two.";
  }
  return errors;
}

function contactErrors(draft: BookingDraft): FieldErrors {
  const errors: FieldErrors = {};
  if (draft.fullName.trim().length < 2) errors.fullName = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim())) errors.email = "Enter a valid email address.";
  const digits = draft.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Enter a phone number with 10 to 15 digits, including the area code.";
  }
  if (!draft.preferredContact) errors.preferredContact = "Choose a preferred contact method.";
  return errors;
}

function toInput(draft: BookingDraft, honeypot: string, idempotencyKey: string, today: string): InquiryInput {
  const details: Record<string, string | boolean> = {
    specificTime: draft.specificTime.trim(),
    address: draft.address.trim(),
    hotelName: draft.hotelName.trim(),
    roomNote: draft.roomNote.trim(),
    eventName: draft.eventName.trim(),
    eventType: draft.eventType.trim(),
    venue: draft.venue.trim(),
    setupNotes: draft.setupNotes.trim(),
  };
  return {
    kind: "booking",
    honeypot,
    idempotencyKey,
    clientToday: today,
    fullName: draft.fullName,
    email: draft.email,
    phone: draft.phone,
    service: draft.service,
    location: draft.location,
    preferredDate: draft.preferredDate,
    preferredTime: draft.timeWindow,
    durationPreference: draft.durationPreference,
    participants: draft.participants,
    preferredContact: draft.preferredContact,
    message: [draft.additionalRequests, draft.notes].filter(Boolean).join("\n\n"),
    propertyPolicyAck: draft.propertyPolicyAck,
    details,
  };
}

function asService(value: string | undefined): BookingDraft["service"] {
  return value && isServiceId(value) ? value : "";
}

function timeLabel(draft: BookingDraft) {
  if (draft.timeWindow === "specific") return draft.specificTime ? `Specific time: ${draft.specificTime}` : "Specific time";
  return timeWindows.find((item) => item.value === draft.timeWindow)?.label ?? draft.timeWindow;
}

export function BookingStepper({
  initialService = "",
  lockService = false,
  initialDate = "",
  initialTime = "",
  initialLocation = "",
  initialReference = "",
}: {
  initialService?: string;
  lockService?: boolean;
  initialDate?: string;
  initialTime?: string;
  initialLocation?: string;
  initialReference?: string;
}) {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const idempotencyKey = useRef(newIdempotencyKey());
  const formId = useId();
  const [today, setToday] = useState("");
  const serviceSeed = isServiceId(initialService) ? initialService : "";

  const [step, setStep] = useState(serviceSeed && (initialDate || initialLocation) ? 2 : 1);
  const [draft, setDraft] = useState<BookingDraft>({
    ...emptyDraft,
    service: serviceSeed,
    preferredDate: initialDate,
    timeWindow: initialTime,
    location: initialLocation,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [lastMinute, setLastMinute] = useState(false);
  const [failure, setFailure] = useState("");
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToday(todayISO());
    if (initialReference) {
      setReady(true);
      return;
    }
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BookingDraft>;
        setDraft((current) => ({
          ...current,
          ...parsed,
          service: lockService && serviceSeed ? serviceSeed : asService(serviceSeed || parsed.service || current.service),
          preferredDate: initialDate || parsed.preferredDate || current.preferredDate,
          timeWindow: initialTime || parsed.timeWindow || current.timeWindow,
          location: initialLocation || parsed.location || current.location,
        }));
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    }
    setReady(true);
  }, [initialDate, initialLocation, initialReference, initialTime, lockService, serviceSeed]);

  useEffect(() => {
    if (!ready || reference) return;
    sessionStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft, ready, reference]);

  useEffect(() => {
    if (!initialReference) return;
    let cancelled = false;
    fetch(`/api/inquiries?reference=${encodeURIComponent(initialReference)}`)
      .then((response) => response.json())
      .then((data: Lookup) => {
        if (!cancelled) setLookup(data);
      })
      .catch(() => {
        if (!cancelled) setLookup({ ok: false, message: "The reference could not be checked." });
      });
    return () => {
      cancelled = true;
    };
  }, [initialReference]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, reference]);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function focusError(next: FieldErrors) {
    const key = Object.keys(next)[0];
    if (!key) return;
    document.getElementById(`${formId}-${key}`)?.focus();
  }

  function goNext() {
    if (step === 1) {
      if (!draft.service) {
        const next = { service: "Choose a service." };
        setErrors(next);
        focusError(next);
        return;
      }
      if (draft.service === "corporate") {
        const params = new URLSearchParams();
        if (draft.preferredDate) params.set("date", draft.preferredDate);
        if (draft.location) params.set("location", draft.location);
        router.push(`/corporate?${params.toString()}#proposal`);
        return;
      }
      setErrors({});
      setStep(2);
      return;
    }
    if (step === 2) {
      const next = preferenceErrors(draft, today || todayISO());
      setErrors(next);
      if (Object.keys(next).length) {
        focusError(next);
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      const next = contactErrors(draft);
      setErrors(next);
      if (Object.keys(next).length) {
        focusError(next);
        return;
      }
      setStep(4);
    }
  }

  async function submit() {
    const input = toInput(draft, honeypot, idempotencyKey.current, today || todayISO());
    const next = validateBooking(input);
    setErrors(next);
    if (Object.keys(next).length) {
      setFailure("Please review the highlighted fields before submitting.");
      if (next.service) setStep(1);
      else if (next.preferredDate || next.preferredTime || next.location || next.hotelName || next.eventName || next.participants || next.propertyPolicyAck || next.message) setStep(2);
      else setStep(3);
      focusError(next);
      return;
    }

    setPending(true);
    setFailure("");
    const result = await postInquiry(input);
    setPending(false);
    if (!result.ok) {
      setFailure(result.message);
      setErrors(result.fieldErrors);
      scrollToStatus(statusRef.current);
      return;
    }
    setReference(result.reference ?? "");
    setAccepted(true);
    setLastMinute(result.lastMinute);
    sessionStorage.removeItem(storageKey);
    if (result.reference) router.replace(`/book?reference=${result.reference}`);
    scrollToStatus(statusRef.current);
  }

  const soon = draft.preferredDate ? isLastMinuteDate(draft.preferredDate, today) : false;
  const steps = [
    { n: 1, label: "Service" },
    { n: 2, label: "Preferences" },
    { n: 3, label: "Contact" },
    { n: 4, label: "Review" },
  ];

  if (initialReference && lookup === null && !accepted) {
    return (
      <div role="status" className="rounded-[14px] border border-line bg-white p-6 sm:p-8">
        <p className="font-serif text-3xl text-forest">Checking that reference…</p>
        <p className="mt-2 text-sm text-muted">Only the status is shown. Contact details stay off this page.</p>
      </div>
    );
  }

  const receiptReference = accepted ? reference : lookup?.ok ? lookup.reference ?? initialReference : "";

  if (receiptReference) {
    return (
      <div ref={statusRef} className="rounded-[14px] border border-line bg-white p-6 sm:p-8">
        <FormStatusMessage state="success" title="Request received">
          <p>Your request has been submitted. Your appointment is not confirmed until availability and details have been reviewed by the business.</p>
          {receiptReference ? (
            <p>
              Reference <span className="font-semibold tracking-[0.12em] text-forest">{receiptReference}</span>
              {lookup && lookup.ok === false ? " — we could not recheck it just now, but it was returned when the request was stored." : null}
              {lookup?.ok ? ` — stored for review with status “${lookup.status}”.` : null}
            </p>
          ) : (
            <p>A reference number was not returned. Please try again if you do not see a reference above.</p>
          )}
          <p>No email has been sent. Keep this reference. Availability, travel, pricing, and timing are still open.</p>
          {lastMinute || lookup?.lastMinute ? (
            <p>This request is marked last-minute and is especially dependent on availability.</p>
          ) : null}
        </FormStatusMessage>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/">Return home</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setReference("");
              setAccepted(false);
              setDraft(lockService && serviceSeed ? { ...emptyDraft, service: asService(serviceSeed) } : emptyDraft);
              setStep(1);
              idempotencyKey.current = newIdempotencyKey();
              router.replace("/book");
            }}
          >
            Start another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-line bg-white p-5 sm:p-8">
      <nav aria-label="Booking progress">
        <ol className="grid grid-cols-4 gap-2">
          {steps.map((item) => {
            const current = step === item.n;
            const complete = step > item.n;
            return (
              <li key={item.n} aria-current={current ? "step" : undefined} className="grid gap-2">
                <span className={cn("h-px", complete || current ? "bg-forest" : "bg-sand-deep")} />
                <span className={cn("text-[0.68rem] font-semibold uppercase tracking-[0.14em]", current ? "text-forest" : "text-muted")}>
                  0{item.n} {item.label}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-8" aria-live="polite">
        {initialReference && lookup && !lookup.ok ? (
          <div className="mb-6">
            <FormStatusMessage state="error" title="Reference not found">
              <p>{lookup.message || "We could not find a stored request for that reference."}</p>
            </FormStatusMessage>
          </div>
        ) : null}
        {failure ? (
          <div ref={statusRef} className="mb-6">
            <FormStatusMessage state="error" title="The request was not stored">
              <p>{failure}</p>
              <p>Your entries are still here. Correct any highlighted fields and try again.</p>
            </FormStatusMessage>
          </div>
        ) : (
          <div ref={statusRef} />
        )}

        {step === 1 ? (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest outline-none">
              Choose a service
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Select the setting that fits. Corporate massage continues to a separate proposal form.
            </p>
            <fieldset className="mt-6 grid gap-3">
              <legend className="sr-only">Service type</legend>
              {bookingServices.map((item) => {
                const selected = draft.service === item.value;
                const disabled = lockService && item.value !== serviceSeed;
                return (
                  <label
                    key={item.value}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-[12px] border px-4 py-4",
                      selected ? "border-forest bg-[#f4f7f3]" : "border-line bg-ivory",
                      disabled && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <input
                      className="mt-1 accent-forest"
                      type="radio"
                      name="service"
                      value={item.value}
                      checked={selected}
                      disabled={disabled}
                      onChange={() => update("service", item.value as ServiceId)}
                    />
                    <span>
                      <span className="block font-semibold text-charcoal">{item.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{item.note}</span>
                    </span>
                  </label>
                );
              })}
            </fieldset>
            {errors.service ? (
              <p id={`${formId}-service`} role="alert" className="mt-3 text-sm text-danger">
                {errors.service}
              </p>
            ) : null}
            {lockService ? (
              <p className="mt-4 text-sm text-muted">
                This page is for {serviceLabel(serviceSeed)}.{" "}
                <Link className="text-forest underline underline-offset-2" href="/book">
                  Choose a different service
                </Link>
                .
              </p>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest outline-none">
              Share your preferences
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Approved session lengths and prices are not published yet. Anything you note here is a preference, not a confirmed option.
            </p>
            <RequiredLegend />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`${formId}-preferredDate`}
                label="Preferred date"
                required
                type="date"
                min={today || undefined}
                value={draft.preferredDate}
                error={errors.preferredDate}
                onChange={(event) => update("preferredDate", event.target.value)}
              />
              <SelectField
                id={`${formId}-preferredTime`}
                label="Preferred time window"
                required
                value={draft.timeWindow}
                error={errors.preferredTime}
                hint="Not a reserved slot."
                onChange={(event) => update("timeWindow", event.target.value)}
              >
                <option value="">Select a window</option>
                {timeWindows.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </SelectField>
            </div>
            {draft.timeWindow === "specific" ? (
              <TextField
                id={`${formId}-specificTime`}
                label="Specific time"
                required
                placeholder="For example, 3:30 pm"
                value={draft.specificTime}
                error={errors.specificTime}
                onChange={(event) => update("specificTime", event.target.value)}
              />
            ) : null}
            {soon ? (
              <FormStatusMessage state="info" title="Last-minute request">
                <p>Today and next-day requests can be submitted, and they depend entirely on availability. Submitting one does not hold a time.</p>
              </FormStatusMessage>
            ) : null}
            <TextField
              id={`${formId}-durationPreference`}
              label="Duration preference"
              placeholder="Leave blank if you would like this discussed"
              hint="Session lengths have not been published. A note here is not an approved duration."
              value={draft.durationPreference}
              error={errors.durationPreference}
              onChange={(event) => update("durationPreference", event.target.value)}
            />
            <TextField
              id={`${formId}-location`}
              label="Location or ZIP / postal code"
              required
              placeholder="Area, postal code, or neighborhood"
              autoComplete="postal-code"
              value={draft.location}
              error={errors.location}
              onChange={(event) => update("location", event.target.value)}
            />
            <TextField
              id={`${formId}-address`}
              label="Address details"
              placeholder="Street address, if you want to share it now"
              hint="You can wait to share a full address until an appointment is being confirmed."
              autoComplete="street-address"
              value={draft.address}
              onChange={(event) => update("address", event.target.value)}
            />
            {draft.service === "in-home" || draft.service === "event" || draft.service === "other" ? (
              <TextField
                id={`${formId}-participants`}
                label={draft.service === "event" ? "Estimated participants" : "Number of people"}
                required={draft.service === "event"}
                inputMode="numeric"
                placeholder={draft.service === "event" ? "Estimated guest count" : "1"}
                value={draft.participants}
                error={errors.participants}
                onChange={(event) => update("participants", event.target.value)}
              />
            ) : null}
            {draft.service === "hotel" ? (
              <>
                <TextField
                  id={`${formId}-hotelName`}
                  label="Hotel or property name"
                  required
                  placeholder="Property name"
                  value={draft.hotelName}
                  error={errors.hotelName}
                  onChange={(event) => update("hotelName", event.target.value)}
                />
                <TextField
                  id={`${formId}-roomNote`}
                  label="Room or meeting-space note"
                  placeholder="Optional until an appointment is agreed"
                  value={draft.roomNote}
                  onChange={(event) => update("roomNote", event.target.value)}
                />
                <CheckboxField
                  id={`${formId}-propertyPolicyAck`}
                  label="I understand hotel appointments depend on the property’s policies and are not confirmed until Stillpoint reviews them."
                  checked={draft.propertyPolicyAck}
                  error={errors.propertyPolicyAck}
                  onChange={(event) => update("propertyPolicyAck", event.target.checked)}
                />
              </>
            ) : null}
            {draft.service === "event" ? (
              <>
                <TextField
                  id={`${formId}-eventName`}
                  label="Event name"
                  required
                  value={draft.eventName}
                  error={errors.eventName}
                  onChange={(event) => update("eventName", event.target.value)}
                />
                <TextField
                  id={`${formId}-eventType`}
                  label="Event type"
                  placeholder="Private gathering, workplace activation, other"
                  value={draft.eventType}
                  onChange={(event) => update("eventType", event.target.value)}
                />
                <TextField
                  id={`${formId}-venue`}
                  label="Venue"
                  placeholder="Venue name or area"
                  value={draft.venue}
                  onChange={(event) => update("venue", event.target.value)}
                />
                <TextAreaField
                  id={`${formId}-setup`}
                  label="Setup notes"
                  placeholder="Space, timing, access, or other constraints"
                  value={draft.setupNotes}
                  onChange={(event) => update("setupNotes", event.target.value)}
                />
              </>
            ) : null}
            <TextAreaField
              id={`${formId}-message`}
              label={draft.service === "other" ? "Describe the request" : "Additional requests"}
              required={draft.service === "other"}
              placeholder="Scheduling notes or other context. Please skip medical history."
              value={draft.additionalRequests}
              error={errors.message}
              onChange={(event) => update("additionalRequests", event.target.value)}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest outline-none">
              How should we reach you?
            </h2>
            <RequiredLegend />
            <p className="text-sm leading-relaxed text-muted">
              A primary country has not been configured. Phone numbers with 10 to 15 digits are accepted, including international formats.
            </p>
            <TextField
              id={`${formId}-fullName`}
              label="Full name"
              required
              autoComplete="name"
              placeholder="Your name"
              value={draft.fullName}
              error={errors.fullName}
              onChange={(event) => update("fullName", event.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`${formId}-email`}
                label="Email"
                required
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={draft.email}
                error={errors.email}
                onChange={(event) => update("email", event.target.value)}
              />
              <TextField
                id={`${formId}-phone`}
                label="Phone"
                required
                type="tel"
                autoComplete="tel"
                placeholder="Include area code"
                value={draft.phone}
                error={errors.phone}
                onChange={(event) => update("phone", event.target.value)}
              />
            </div>
            <SelectField
              id={`${formId}-preferredContact`}
              label="Preferred contact method"
              required
              value={draft.preferredContact}
              error={errors.preferredContact}
              onChange={(event) => update("preferredContact", event.target.value as BookingDraft["preferredContact"])}
            >
              <option value="">Select one</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </SelectField>
            <TextAreaField
              id={`${formId}-notes`}
              label="Additional notes"
              placeholder="Anything else about scheduling. Please do not include detailed medical history."
              value={draft.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl text-forest outline-none">
              Review the request
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Check the details, then submit. This stores a request for review. It does not confirm an appointment, send an email, or guarantee a price.
            </p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <SummaryRow label="Service" value={serviceLabel(draft.service)} onEdit={() => setStep(1)} />
              <SummaryRow label="Preferred date" value={draft.preferredDate} onEdit={() => setStep(2)} />
              <SummaryRow label="Preferred time" value={timeLabel(draft)} onEdit={() => setStep(2)} />
              <SummaryRow label="Duration preference" value={draft.durationPreference || "To be discussed"} onEdit={() => setStep(2)} />
              <SummaryRow label="Location" value={draft.location} onEdit={() => setStep(2)} />
              {draft.address ? <SummaryRow label="Address" value={draft.address} onEdit={() => setStep(2)} /> : null}
              {draft.participants ? <SummaryRow label="People" value={draft.participants} onEdit={() => setStep(2)} /> : null}
              {draft.hotelName ? <SummaryRow label="Hotel" value={draft.hotelName} onEdit={() => setStep(2)} /> : null}
              {draft.roomNote ? <SummaryRow label="Room note" value={draft.roomNote} onEdit={() => setStep(2)} /> : null}
              {draft.eventName ? <SummaryRow label="Event" value={draft.eventName} onEdit={() => setStep(2)} /> : null}
              {draft.eventType ? <SummaryRow label="Event type" value={draft.eventType} onEdit={() => setStep(2)} /> : null}
              {draft.venue ? <SummaryRow label="Venue" value={draft.venue} onEdit={() => setStep(2)} /> : null}
              {draft.setupNotes ? <SummaryRow label="Setup" value={draft.setupNotes} onEdit={() => setStep(2)} /> : null}
              {draft.additionalRequests ? <SummaryRow label="Requests" value={draft.additionalRequests} onEdit={() => setStep(2)} /> : null}
              <SummaryRow label="Name" value={draft.fullName} onEdit={() => setStep(3)} />
              <SummaryRow label="Email" value={draft.email} onEdit={() => setStep(3)} />
              <SummaryRow label="Phone" value={draft.phone} onEdit={() => setStep(3)} />
              <SummaryRow label="Contact by" value={draft.preferredContact} onEdit={() => setStep(3)} />
              {draft.notes ? <SummaryRow label="Notes" value={draft.notes} onEdit={() => setStep(3)} /> : null}
            </dl>
            {soon ? <p className="mt-4 text-sm text-muted">Marked as a last-minute, availability-dependent request.</p> : null}
            <div className="mt-5">
              <PrivacyNotice />
            </div>
            <Honeypot id={`${formId}-website`} value={honeypot} onChange={setHoneypot} />
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 1 ? (
          <Button type="button" variant="secondary" onClick={() => setStep((value) => value - 1)} disabled={pending}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <Button type="button" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={pending} aria-busy={pending}>
            {pending ? "Submitting request…" : "Submit request"}
          </Button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[9rem_1fr_auto] sm:items-start">
      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="text-sm leading-relaxed text-charcoal">{value}</dd>
      <button type="button" className="text-left text-sm font-semibold text-forest underline-offset-2 hover:underline" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
