"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { bookingServices, timeWindows } from "@/lib/content";
import { dateError, todayISO } from "@/lib/validation";
import type { FieldErrors } from "@/lib/types";
import { Button } from "@/components/brand";
import { SelectField, TextField } from "@/components/fields";

export function BookingWidget() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(todayISO());
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!service) next.service = "Choose a service.";
    const dateMessage = dateError(date, today || todayISO());
    if (dateMessage) next.preferredDate = dateMessage;
    if (!time) next.preferredTime = "Choose a preferred time window.";
    if (location.trim().length < 3) next.location = "Enter a location or ZIP / postal code.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      const id =
        first === "preferredDate"
          ? "widget-date"
          : first === "preferredTime"
            ? "widget-time"
            : first === "location"
              ? "widget-location"
              : "widget-service";
      document.getElementById(id)?.focus();
      return;
    }

    const params = new URLSearchParams({ service, date, time, location });
    if (service === "corporate") {
      router.push(`/corporate?${params.toString()}#proposal`);
      return;
    }
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form
      id="request"
      onSubmit={submit}
      noValidate
      className="scroll-mt-28 rounded-[14px] border border-sand bg-paper p-5 shadow-[0_18px_40px_rgba(35,60,50,0.06)] sm:p-6"
      aria-labelledby="widget-title"
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest">Request a time</p>
      <h2 id="widget-title" className="mt-1 font-serif text-[1.8rem] leading-none text-forest">
        Begin an inquiry
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Share a preference. This does not confirm availability or reserve an appointment.
      </p>
      <div className="mt-5 grid gap-4">
        <SelectField
          id="widget-service"
          name="service"
          label="Service type"
          required
          value={service}
          error={errors.service}
          onChange={(event) => setService(event.target.value)}
        >
          <option value="">Select a service</option>
          {bookingServices.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </SelectField>
        {service === "corporate" ? (
          <p className="text-sm leading-relaxed text-muted">Corporate requests continue to a proposal form.</p>
        ) : null}
        <TextField
          id="widget-date"
          name="preferredDate"
          label="Preferred date"
          required
          type="date"
          min={today || undefined}
          value={date}
          error={errors.preferredDate}
          hint="Today and tomorrow are treated as last-minute requests."
          onChange={(event) => setDate(event.target.value)}
        />
        <SelectField
          id="widget-time"
          name="preferredTime"
          label="Preferred time"
          required
          value={time}
          error={errors.preferredTime}
          hint="A window is a preference, not a reserved slot."
          onChange={(event) => setTime(event.target.value)}
        >
          <option value="">Select a window</option>
          {timeWindows.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </SelectField>
        <TextField
          id="widget-location"
          name="location"
          label="Location or ZIP / postal code"
          required
          placeholder="Neighborhood, hotel area, or postal code"
          autoComplete="postal-code"
          value={location}
          error={errors.location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <Button type="submit" className="w-full">
          Continue to Booking
        </Button>
      </div>
    </form>
  );
}
