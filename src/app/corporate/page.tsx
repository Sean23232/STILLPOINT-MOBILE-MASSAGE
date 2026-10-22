import Link from "next/link";
import { Container, Eyebrow } from "@/components/brand";
import { CorporateInquiryForm } from "@/components/inquiry-forms";
import { Photo } from "@/components/photo";
import { corporateHighlights, corporateSections, logistics } from "@/lib/content";
import { pageMeta, firstParam } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Corporate wellness massage",
  description:
    "Request corporate massage and workplace wellness sessions for teams, appreciation days, and recurring visits. A proposal request is not a confirmed booking.",
  path: "/corporate",
  image: "/images/corporate.jpg",
  imageAlt: "A seated shoulder massage in a quiet office lounge.",
});

export default async function CorporatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const prefill = {
    preferredDate: firstParam(params.date),
    location: firstParam(params.location),
  };

  return (
    <>
      <section className="surface-dark bg-forest text-ivory">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <Eyebrow tone="light">Corporate wellness</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.03em]">
              Workplace massage, requested with the day in mind.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand">
              From a single appreciation event to a recurring visit, corporate massage services are planned around the room you have, the people attending, and the time you can actually spare.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[12px] lg:col-span-6">
            <Photo
              src="/images/corporate.jpg"
              alt="A discreet workplace wellness session in a bright office lounge."
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Container className="py-16 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow>What can be explored</Eyebrow>
          <h2 className="editorial-title mt-4 text-[clamp(2.3rem,4vw,3.6rem)]">A visit shaped by the workplace, not a generic package.</h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {corporateSections.map((section) => (
            <article key={section.title} className="border-t border-line pt-5">
              <h3 className="font-serif text-3xl text-forest">{section.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
            </article>
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap gap-2">
          {corporateHighlights.map((item) => (
            <li key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-charcoal">
              {item}
            </li>
          ))}
        </ul>
      </Container>

      <section className="bg-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <Eyebrow>Planning and logistics</Eyebrow>
            <h2 className="editorial-title mt-4 text-4xl">What helps a proposal stay realistic.</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Share what you know. Missing details are fine — they will be asked about before anything is agreed. No corporate rates are published here.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Planning a gathering away from the office?{" "}
              <Link className="text-forest underline underline-offset-2" href="/services/events#request">
                Discuss an event or pop-up
              </Link>
              .
            </p>
          </div>
          <ol className="grid gap-4 lg:col-span-7">
            {logistics.map((item, index) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-4 border-b border-line pb-4">
                <span className="font-serif text-2xl text-forest">0{index + 1}</span>
                <p className="pt-1 leading-relaxed text-charcoal">{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="proposal" className="scroll-mt-24">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <Eyebrow>Proposal request</Eyebrow>
            <h2 className="editorial-title mt-4 text-4xl">Tell us about the team.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The form stores a corporate inquiry for review. It does not confirm a date, a headcount, or a rate. If you arrived from the booking panel, your date and location are carried over when they were provided.
            </p>
          </div>
          <div className="rounded-[14px] border border-line bg-white p-5 sm:p-7 lg:col-span-8">
            <CorporateInquiryForm prefill={prefill} />
          </div>
        </Container>
      </section>
    </>
  );
}
