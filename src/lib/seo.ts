import type { Metadata } from "next";

export function pageMeta({
  title,
  description,
  path,
  image = "/images/hero.jpg",
  imageAlt = "A calm in-home massage prepared in soft daylight.",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Stillpoint Mobile Massage`,
      description,
      url: path,
      siteName: "Stillpoint Mobile Massage",
      images: [{ url: image, width: 1200, height: 800, alt: imageAlt }],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}
