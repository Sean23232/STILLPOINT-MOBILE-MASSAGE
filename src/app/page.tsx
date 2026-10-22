import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: { absolute: "Stillpoint Mobile Massage · Professional Massage, Delivered to You" },
  description:
    "Request mobile massage therapy for your home, workplace, hotel, or event. Stillpoint brings professional massage to you. Inquiries are reviewed before confirmation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Stillpoint Mobile Massage",
    description:
      "Professional massage, delivered to your home, workplace, hotel, or selected event. Requests are reviewed before anything is confirmed.",
    url: "/",
    images: [{ url: "/images/hero.jpg", alt: "A calm in-home massage prepared in soft daylight." }],
  },
};

export default function Page() {
  return <HomePage />;
}
