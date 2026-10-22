"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/content";
import { Button, Logo, PauseMark, cn } from "@/components/brand";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>("a, button")).filter(
        (item) => !item.hasAttribute("disabled"),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div className="absolute inset-0 bg-forest/45" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-[min(100%,26rem)] flex-col bg-ivory px-6 py-6 shadow-none"
      >
        <div className="flex items-center justify-between">
          <p id={titleId} className="font-serif text-2xl text-forest">
            Menu
          </p>
          <button type="button" className="min-h-11 min-w-11 text-sm font-semibold text-forest" onClick={onClose}>
            Close
          </button>
        </div>
        <nav className="mt-8 flex flex-col" aria-label="Mobile">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b border-line py-4 font-serif text-3xl text-forest",
                  active && "italic",
                )}
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto grid gap-3 pt-8">
          <Button href="/book" onClick={onClose}>
            Book a Massage
          </Button>
          <Button href="/corporate#proposal" variant="secondary" onClick={onClose}>
            Request Corporate Wellness
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-line bg-ivory/95 backdrop-blur-md" : "border-transparent bg-ivory",
      )}
    >
      <div className="mx-auto flex h-[4.6rem] max-w-[1180px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-[0.92rem] text-charcoal/80 hover:text-forest",
                  active && "border-forest text-forest",
                )}
              >
                {active ? <PauseMark className="h-2.5 w-2.5" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/corporate#proposal"
            className="hidden text-sm font-semibold text-forest underline-offset-4 hover:underline xl:inline"
          >
            Request Corporate Wellness
          </Link>
          <Button href="/book" className="min-h-11 px-3 text-xs sm:px-4 sm:text-sm">
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a Massage</span>
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-forest/20 text-forest lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-navigation">
        <MobileNavigation open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
