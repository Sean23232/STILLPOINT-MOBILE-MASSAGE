"use client";

import { useRef, useState, type FormEvent } from "react";
import { arrangementOptions, collaborationTypes, contactTopics, sessionFormats } from "@/lib/content";
import type { FieldErrors, InquiryInput, SubmitResult } from "@/lib/types";
import { todayISO, validateContact, validateCorporate, validatePartnership } from "@/lib/validation";
import { newIdempotencyKey, postInquiry, scrollToStatus } from "@/lib/submit";
import { Button } from "@/components/brand";
import { Honeypot, PrivacyNotice, RequiredLegend, SelectField, TextAreaField, TextField } from "@/components/fields";
import { FormStatusMessage } from "@/components/form-status-message";

function useFormState() {
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const key = useRef(newIdempotencyKey());

  async function send(input: InquiryInput, validate: (value: InquiryInput) => FieldErrors) {
    const next = validate(input);
    setErrors(next);
    if (Object.keys(next).length) {
      const field = Object.keys(next)[0];
      document.getElementById(`${input.kind}-${field}`)?.focus();
      return;
    }
    setPending(true);
    setResult(null);
    const response = await postInquiry({ ...input, honeypot, idempotencyKey: key.current, clientToday: todayISO() });
    setPending(false);
    setResult(response);
    if (!response.ok) setErrors(response.fieldErrors);
    else key.current = newIdempotencyKey();
    scrollToStatus(statusRef.current);
  }

  return { pending, errors, setErrors, result, honeypot, setHoneypot, statusRef, send };
}

function ResultBlock({ result, pending }: { result: SubmitResult | null; pending: boolean }) {
  if (!result) return null;
  if (result.ok) {
    return (
      <FormStatusMessage state="success" title="Request received">
        <p>{result.message}</p>
        {result.reference ? (
          <p>
            Reference <span className="font-semibold tracking-[0.12em]">{result.reference}</span>
          </p>
        ) : (
          <p>If you do not see a reference number, the request may not have been stored. Please try again.</p>
        )}
        <p>No email has been sent, and nothing is confirmed until the business reviews the details directly.</p>
      </FormStatusMessage>
    );
  }
  return (
    <FormStatusMessage state="error" title="The request was not stored">
      <p>{result.message}</p>
      <p>{pending ? "Submitting…" : "Your entries are still in the form. Adjust them if needed, then try again."}</p>
    </FormStatusMessage>
  );
}

export function CorporateInquiryForm({
  prefill,
}: {
  prefill?: { preferredDate?: string; location?: string };
}) {
  const form = useFormState();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(prefill?.location ?? "");
  const [participants, setParticipants] = useState("");
  const [preferredDate, setPreferredDate] = useState(prefill?.preferredDate ?? "");
  const [arrangement, setArrangement] = useState("");
  const [sessionFormat, setSessionFormat] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    void form.send(
      {
        kind: "corporate",
        fullName,
        organization,
        email,
        phone,
        location,
        participants,
        preferredDate,
        arrangement,
        sessionFormat,
        message,
      },
      validateCorporate,
    );
  }

  if (form.result?.ok) {
    return (
      <div ref={form.statusRef}>
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
    );
  }

  return (
    <form id="proposal" onSubmit={submit} noValidate className="grid scroll-mt-28 gap-4" aria-labelledby="corporate-form-title">
      <div ref={form.statusRef}>
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
      <div>
        <h3 id="corporate-form-title" className="font-serif text-3xl text-forest">
          Request a corporate proposal
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tell us about the team and the setting. This does not reserve a date or approve a package.
        </p>
      </div>
      <RequiredLegend />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="corporate-fullName" label="Contact name" required autoComplete="name" placeholder="Your name" value={fullName} error={form.errors.fullName} onChange={(event) => setFullName(event.target.value)} />
        <TextField id="corporate-organization" label="Company or organization" required autoComplete="organization" placeholder="Organization name" value={organization} error={form.errors.organization} onChange={(event) => setOrganization(event.target.value)} />
        <TextField id="corporate-email" label="Work email" required type="email" autoComplete="email" placeholder="name@company.com" value={email} error={form.errors.email} onChange={(event) => setEmail(event.target.value)} />
        <TextField id="corporate-phone" label="Phone" type="tel" autoComplete="tel" placeholder="Include area code" hint="Optional. 10 to 15 digits are accepted." value={phone} error={form.errors.phone} onChange={(event) => setPhone(event.target.value)} />
      </div>
      <TextField id="corporate-location" label="Company location" required placeholder="City, neighborhood, or campus" value={location} error={form.errors.location} onChange={(event) => setLocation(event.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="corporate-participants" label="Estimated participants" required inputMode="numeric" placeholder="Approximate headcount" value={participants} error={form.errors.participants} onChange={(event) => setParticipants(event.target.value)} />
        <TextField id="corporate-preferredDate" label="Preferred date or date range" required placeholder="A day, or a range such as May 12–14" value={preferredDate} error={form.errors.preferredDate} onChange={(event) => setPreferredDate(event.target.value)} />
        <SelectField id="corporate-arrangement" label="One-time or recurring" required value={arrangement} error={form.errors.arrangement} onChange={(event) => setArrangement(event.target.value)}>
          <option value="">Select an arrangement</option>
          {arrangementOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </SelectField>
        <SelectField id="corporate-sessionFormat" label="Preferred session format" required value={sessionFormat} error={form.errors.sessionFormat} hint="A format to discuss, not a published package." onChange={(event) => setSessionFormat(event.target.value)}>
          <option value="">Select a format</option>
          {sessionFormats.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField id="corporate-message" label="Additional requirements" placeholder="Space, access, timing, or other constraints" value={message} error={form.errors.message} onChange={(event) => setMessage(event.target.value)} />
      <PrivacyNotice />
      <Honeypot id="corporate-website" value={form.honeypot} onChange={form.setHoneypot} />
      <Button type="submit" disabled={form.pending} aria-busy={form.pending}>
        {form.pending ? "Submitting request…" : "Submit proposal request"}
      </Button>
    </form>
  );
}

export function PartnershipForm() {
  const form = useFormState();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collaborationType, setCollaborationType] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    void form.send(
      {
        kind: "partnership",
        fullName,
        organization,
        role,
        email,
        phone,
        collaborationType,
        location,
        message,
      },
      validatePartnership,
    );
  }

  if (form.result?.ok) {
    return (
      <div ref={form.statusRef} id="inquiry">
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
    );
  }

  return (
    <form id="inquiry" onSubmit={submit} noValidate className="grid scroll-mt-28 gap-4" aria-labelledby="partner-form-title">
      <div ref={form.statusRef}>
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
      <div>
        <h3 id="partner-form-title" className="font-serif text-3xl text-forest">
          Explore a partnership
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This is an invitation to talk. Sending it does not create a partnership, referral agreement, or affiliation.
        </p>
      </div>
      <RequiredLegend />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="partnership-fullName" label="Name" required autoComplete="name" placeholder="Your name" value={fullName} error={form.errors.fullName} onChange={(event) => setFullName(event.target.value)} />
        <TextField id="partnership-organization" label="Organization" required autoComplete="organization" placeholder="Practice, hotel, or company" value={organization} error={form.errors.organization} onChange={(event) => setOrganization(event.target.value)} />
        <TextField id="partnership-role" label="Professional role" required placeholder="Your role" value={role} error={form.errors.role} onChange={(event) => setRole(event.target.value)} />
        <TextField id="partnership-email" label="Email" required type="email" autoComplete="email" placeholder="you@example.com" value={email} error={form.errors.email} onChange={(event) => setEmail(event.target.value)} />
        <TextField id="partnership-phone" label="Phone" type="tel" autoComplete="tel" placeholder="Include area code" value={phone} error={form.errors.phone} onChange={(event) => setPhone(event.target.value)} />
        <SelectField id="partnership-collaborationType" label="Type of collaboration" required value={collaborationType} error={form.errors.collaborationType} onChange={(event) => setCollaborationType(event.target.value)}>
          <option value="">Select a type</option>
          {collaborationTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField id="partnership-location" label="Location" required placeholder="City or area you work in" value={location} error={form.errors.location} onChange={(event) => setLocation(event.target.value)} />
      <TextAreaField id="partnership-message" label="Message" required placeholder="What kind of collaboration would you like to discuss?" value={message} error={form.errors.message} onChange={(event) => setMessage(event.target.value)} />
      <PrivacyNotice />
      <Honeypot id="partnership-website" value={form.honeypot} onChange={form.setHoneypot} />
      <Button type="submit" disabled={form.pending} aria-busy={form.pending}>
        {form.pending ? "Submitting inquiry…" : "Submit partnership inquiry"}
      </Button>
    </form>
  );
}

export function ContactForm() {
  const form = useFormState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    void form.send(
      { kind: "contact", fullName, email, phone, topic, message },
      validateContact,
    );
  }

  if (form.result?.ok) {
    return (
      <div ref={form.statusRef}>
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
    );
  }

  return (
    <form id="message" onSubmit={submit} noValidate className="grid gap-4" aria-labelledby="contact-form-title">
      <div ref={form.statusRef}>
        <ResultBlock result={form.result} pending={form.pending} />
      </div>
      <div>
        <h2 id="contact-form-title" className="font-serif text-3xl text-forest">
          Send a note
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          For a massage request, the booking flow is more useful. Use this form for a general question.
        </p>
      </div>
      <RequiredLegend />
      <TextField id="contact-fullName" label="Name" required autoComplete="name" placeholder="Your name" value={fullName} error={form.errors.fullName} onChange={(event) => setFullName(event.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="contact-email" label="Email" required type="email" autoComplete="email" placeholder="you@example.com" value={email} error={form.errors.email} onChange={(event) => setEmail(event.target.value)} />
        <TextField id="contact-phone" label="Phone" type="tel" autoComplete="tel" placeholder="Include area code" value={phone} error={form.errors.phone} onChange={(event) => setPhone(event.target.value)} />
      </div>
      <SelectField id="contact-topic" label="Topic" required value={topic} error={form.errors.topic} onChange={(event) => setTopic(event.target.value)}>
        <option value="">Select a topic</option>
        {contactTopics.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectField>
      <TextAreaField id="contact-message" label="Message" required placeholder="How can we help?" value={message} error={form.errors.message} onChange={(event) => setMessage(event.target.value)} />
      <PrivacyNotice />
      <Honeypot id="contact-website" value={form.honeypot} onChange={form.setHoneypot} />
      <Button type="submit" disabled={form.pending} aria-busy={form.pending}>
        {form.pending ? "Sending message…" : "Send message"}
      </Button>
    </form>
  );
}
