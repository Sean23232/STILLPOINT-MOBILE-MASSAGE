import Link from "next/link";
import { Button, Container, Eyebrow } from "@/components/brand";
import { CTASection } from "@/components/cta-section";
import { Photo } from "@/components/photo";
import { services } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Massage services",
  description:
    "Explore in-home massage, corporate massage, hotel massage appointments, and event massage services. Request a session that comes to you.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Container className="py-14 lg:py-20">
        <Eyebrow>Services</Eyebrow>
        <h1 className="editorial-title mt-4 max-w-3xl text-[clamp(3rem,6vw,5.4rem)]">Professional massage, arranged around where you are.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Stillpoint is a mobile service. The visit comes to a home, a workplace, a hotel, or a selected event. Choose the setting that fits, then send a request. Nothing is confirmed until availability, travel, and scope have been reviewed.
        </p>
      </Container>
      <div className="border-t border-line">
        {services.map((service, index) => (
          <article key={service.id} className={index % 2 ? "bg-white" : "bg-ivory"}>
            <Container className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:py-16">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[12px] lg:col-span-6">
                <Photo src={service.image} alt={service.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-forest">
                  {service.index} — {service.name}
                </p>
                <h2 className="editorial-title mt-3 text-4xl">{service.headline}</h2>
                <p className="mt-4 leading-relaxed text-muted">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link className="text-sm font-semibold text-forest underline-offset-4 hover:underline" href={service.href.split("#")[0]}>
                    View {service.name}
                  </Link>
                  <Link className="text-sm font-semibold text-forest underline-offset-4 hover:underline" href={service.href}>
                    {service.cta}
                  </Link>
                </div>
              </div>
            </Container>
          </article>
        ))}
      </div>
      <Container className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-10">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl text-forest">Not sure which request to send?</h2>
            <p className="mt-3 text-muted">Start with the setting, not a treatment menu. Pricing and duration are discussed after you inquire.</p>
          </div>
          <Button href="/book">Start a booking request</Button>
        </div>
      </Container>
      <CTASection />
    </>
  );
}
