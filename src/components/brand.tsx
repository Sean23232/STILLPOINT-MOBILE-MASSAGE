import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PauseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const color = tone === "light" ? "text-ivory" : "text-forest";
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", color)} aria-label="Stillpoint Mobile Massage, home">
      <PauseMark className={compact ? "h-7 w-7" : "h-8 w-8"} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif tracking-[0.08em] min-[400px]:tracking-[0.14em] sm:tracking-[0.16em]", compact ? "text-[1rem]" : "text-[0.98rem] min-[400px]:text-[1.15rem] sm:text-[1.28rem]")}>STILLPOINT</span>
        <span className={cn("mt-1 hidden font-medium tracking-[0.26em] min-[380px]:block", compact ? "text-[0.56rem]" : "text-[0.58rem] sm:text-[0.6rem]", tone === "light" ? "text-sand" : "text-forest/75")}>
          MOBILE MASSAGE
        </span>
      </span>
    </Link>
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em]", tone === "light" ? "text-sand" : "text-forest")}>
      <span className={cn("h-px w-8", tone === "light" ? "bg-sage" : "bg-sage-deep")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>{children}</div>;
}

type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost" | "inverseGhost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-ivory hover:bg-forest-deep",
  secondary: "border border-forest/25 bg-transparent text-forest hover:border-forest",
  inverse: "bg-ivory text-forest hover:bg-white",
  ghost: "bg-transparent px-0 text-forest underline-offset-4 hover:underline",
  inverseGhost: "bg-transparent px-0 text-ivory underline-offset-4 hover:underline",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-semibold tracking-[0.03em] transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    buttonVariants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={props.onClick as ButtonHTMLAttributes<HTMLAnchorElement>["onClick"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function PlaceholderValue({ label, value, fallback }: { label: string; value: string; fallback: string }) {
  const confirmed = value.trim().length > 0;
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest/70">{label}</dt>
      <dd className="mt-1 text-[0.98rem] leading-relaxed text-charcoal">
        {confirmed ? (
          value
        ) : (
          <span>
            <span className="mr-2 inline-flex rounded-full border border-sand-deep px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Placeholder
            </span>
            {fallback}
          </span>
        )}
      </dd>
    </div>
  );
}
