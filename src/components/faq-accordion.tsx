"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content";
import { cn } from "@/components/brand";

export function FAQAccordion({ items, heading = "Questions, answered plainly" }: { items: FaqItem[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      <h2 className="editorial-title text-[clamp(2.3rem,4vw,3.6rem)]">{heading}</h2>
      <div className="mt-8 border-t border-line">
        {items.map((item, index) => {
          const expanded = open === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          return (
            <div key={item.question} className="border-b border-line">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="font-serif text-[1.55rem] leading-tight text-forest">{item.question}</span>
                  <span aria-hidden="true" className="mt-2 text-forest">
                    <svg viewBox="0 0 20 20" className={cn("h-4 w-4 transition-transform", expanded && "rotate-45")} fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 3.5v13M3.5 10h13" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                <p className="max-w-3xl pb-6 pr-10 text-[1.02rem] leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
