import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/components/brand";

export function fieldDescribedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
}

export function FieldFrame({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="text-forest"> *</span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass = "field-input";

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  className,
  ...props
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldFrame id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(id, hint, error)}
        className={cn(controlClass, className)}
        {...props}
      />
    </FieldFrame>
  );
}

export function TextAreaField({
  id,
  label,
  required,
  hint,
  error,
  ...props
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldFrame id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(id, hint, error)}
        className={controlClass}
        {...props}
      />
    </FieldFrame>
  );
}

export function SelectField({
  id,
  label,
  required,
  hint,
  error,
  children,
  ...props
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldFrame id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(id, hint, error)}
        className={controlClass}
        {...props}
      >
        {children}
      </select>
    </FieldFrame>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 rounded border-sand-deep accent-forest"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Website</label>
      <input
        id={id}
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      By submitting, you ask Stillpoint to review this request. Details are stored for follow-up and are not sold.
      This form does not send an email, reserve a time, or confirm an appointment. Please do not include detailed
      medical history. See the <a className="text-forest underline underline-offset-2" href="/privacy">privacy note</a>.
    </p>
  );
}

export function RequiredLegend() {
  return <p className="text-sm text-muted">Fields marked * are required.</p>;
}
