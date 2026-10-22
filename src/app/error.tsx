"use client";

import { useEffect } from "react";
import { Button } from "@/components/brand";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest">Something interrupted this page</p>
      <h1 className="editorial-title mt-4 text-5xl">The page could not be shown.</h1>
      <p className="mt-4 max-w-xl text-muted">
        Your inquiry, if you were filling one in, may still be in this browser. Try again, or return home and start from the booking request.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </div>
  );
}
