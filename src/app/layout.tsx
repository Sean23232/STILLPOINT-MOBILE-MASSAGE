import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stillpoint Mobile Massage",
    template: "%s · Stillpoint Mobile Massage",
  },
  description:
    "Request mobile massage therapy for your home, workplace, hotel, or selected event. Stillpoint brings professional massage to you. Inquiries are reviewed before confirmation.",
  applicationName: "Stillpoint Mobile Massage",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Stillpoint Mobile Massage",
    description:
      "Professional massage, delivered to your home, workplace, hotel, or selected event. Requests are reviewed before anything is confirmed.",
    siteName: "Stillpoint Mobile Massage",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 800, alt: "A calm in-home massage prepared in soft daylight." }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#233C32",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stillpoint Mobile Massage",
  description:
    "Mobile massage therapy requested for homes, workplaces, hotels, and selected events. Appointments are confirmed only after availability and details are reviewed.",
  url: siteUrl,
  slogan: "Your Space. Your Time. Your Moment of Calm.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ivory font-sans text-charcoal antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <SiteChrome />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <p className="mx-auto max-w-3xl px-5 py-6 text-sm">
            Inquiry forms on this site need JavaScript. You can still read the service information without it.
          </p>
        </noscript>
      </body>
    </html>
  );
}
