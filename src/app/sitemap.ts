import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = [
  "/",
  "/services",
  "/services/in-home",
  "/services/hotel",
  "/services/events",
  "/corporate",
  "/about",
  "/partnerships",
  "/contact",
  "/book",
  "/privacy",
  "/terms",
  "/booking-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
