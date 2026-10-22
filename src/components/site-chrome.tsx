"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/brand";

const hiddenOn = ["/book", "/corporate", "/contact", "/partnerships"];

export function SiteChrome() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [formFocus, setFormFocus] = useState(false);
  const hideBar =
    hiddenOn.some((path) => pathname === path || pathname.startsWith(`${path}/`)) ||
    pathname.startsWith("/services");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function syncFocus() {
      const active = document.activeElement;
      setFormFocus(Boolean(active?.closest("input, textarea, select")));
    }
    document.addEventListener("focusin", syncFocus);
    document.addEventListener("focusout", syncFocus);
    return () => {
      document.removeEventListener("focusin", syncFocus);
      document.removeEventListener("focusout", syncFocus);
    };
  }, []);

  const showBar = !hideBar && !formFocus;

  return (
    <>
      {visible ? (
        <button
          type="button"
          className="fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-ivory text-forest shadow-none sm:bottom-6"
          onClick={() => {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
        >
          <span className="sr-only">Back to top</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M4 12.5 10 6.5l6 6" />
          </svg>
        </button>
      ) : null}
      {showBar ? (
        <div className="surface-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-forest px-4 py-3 text-ivory sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs leading-snug text-sand">Request a visit. Not a confirmation.</p>
            <Button href="/book" variant="inverse" className="min-h-10 px-3 text-xs">
              Book a Massage
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
