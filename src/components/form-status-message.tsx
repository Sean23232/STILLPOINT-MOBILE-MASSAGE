import type { ReactNode } from "react";
import { cn } from "@/components/brand";

export function FormStatusMessage({
  state,
  title,
  children,
}: {
  state: "success" | "error" | "info";
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      role={state === "error" ? "alert" : "status"}
      className={cn(
        "rounded-[12px] border px-5 py-5",
        state === "success" && "border-sage bg-[#f3f6f1]",
        state === "error" && "border-danger/30 bg-[#fbf6f4]",
        state === "info" && "border-sand-deep bg-sand/60",
      )}
    >
      <h3 className="font-serif text-2xl text-forest">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-charcoal">{children}</div>
    </div>
  );
}
