"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/components/brand";

type PhotoProps = Omit<ImageProps, "alt"> & {
  alt: string;
  fallbackClassName?: string;
};

export function Photo({ alt, className, fallbackClassName, onError, ...props }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-sand", Boolean(props.fill) && "absolute inset-0", className, fallbackClassName)}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
