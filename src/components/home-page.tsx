import Link from "next/link";
import { BookingWidget } from "@/components/booking-widget";
import { Button, Container, Eyebrow, PlaceholderValue, cn } from "@/components/brand";
import { CTASection } from "@/components/cta-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { Icon } from "@/components/icons";
import { CorporateInquiryForm, PartnershipForm } from "@/components/inquiry-forms";
import { Photo } from "@/components/photo";
import {
  corporateHighlights,
  differences,
  faqs,
  partnershipCategories,
  services,
  steps,
  values,
  verifiedTestimonials,
} from "@/lib/content";
import { business } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-start gap-8 pb-8 pt-8 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-14">
        <div className="rise lg:col-span-6 lg:pb-10">
          <Eyebrow>Mobile massage · Personal & corporate wellness</Eyebrow>
          <h1 className="editorial-title mt-5 text-[clamp(3.3rem,7vw,6.1rem)]">
            Professional Massage.
            <span className="mt-1 block italic font-normal">Delivered to You.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80">
            From the comfort of your home to your workplace or hotel, enjoy a more convenient massage experience designed around your schedule and your space.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#request">Book a Massage</Button>
            <Button href="/services" variant="secondary">
              Explore Our Services
            </Button>
          </div>
          <p className="mt-6 text-sm tracking-[0.08em] text-muted">In-Home · Workplace · Hotel · Events</p>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] sm:aspect-[4/5]">
            <Photo
              src="/images/hero.jpg"
              alt="Massage therapist working on a client’s shoulders in a sunlit home, with ivory linen and an olive branch nearby."
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 mx-3 -mt-16 sm:mx-8 sm:-mt-28 lg:mx-6">
            <BookingWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServiceCard({
  service,
  reverse = false,
}: {
  service: (typeof services)[number];
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-12">
      <div className={cn("lg:col-span-6", reverse && "lg:col-start-7")}>
        <Link href={service.href.split("#")[0]} className="group relative block aspect-[5/4] overflow-hidden rounded-[12px]">
          <Photo
            src={service.image}
            alt={service.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition duration-700 motion-safe:group-hover:scale-[1.03]"
          />
        </Link>
      </div>
      <div className={cn("lg:col-span-5", reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8")}>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest">
          Service {service.index} — {service.name}
        </p>
        <h3 className="editorial-title mt-3 text-[clamp(2.1rem,4vw,3.3rem)]">{service.headline}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted">{service.description}</p>
        <Link href={service.href} className="mt-6 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline">
          {service.cta}
        </Link>
      </div>
    </article>
  );
}

export function ServiceFeature({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: "path" | "person" | "layers" | "message";
}) {
  return (
    <div className="border-b border-line p-7 last:border-b-0 sm:p-9 md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(n+3)]:border-b-0 md:[&:nth-child(odd)]:border-r">
      <span className="text-forest">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-6 font-serif text-[1.9rem] leading-tight text-forest">{title}</h3>
      <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="relative lg:col-span-7">
            <div className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-[12px] bg-sand sm:block" aria-hidden="true" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[12px]">
              <Photo
                src="/images/prepare.jpg"
                alt="Hands folding ivory linen on an oak table beside an unlabeled bottle and a ceramic bowl."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>Wellness that meets you where you are</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.5rem,5vw,4.2rem)]">
              Your Space. Your Schedule. Your Moment.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Life moves quickly. Stillpoint brings professional massage services closer to where you live, work, stay, and connect. Whether you are planning a personal session, supporting employee wellness, or arranging an event, the experience begins with making care more convenient.
            </p>
            <Link href="/services" className="mt-7 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline">
              Discover Our Services
            </Link>
          </div>
        </Container>
      </section>

      <section id="services">
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Services</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.5rem,5vw,4.3rem)]">Four ways to ask for a visit.</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              In-home massage, corporate massage, hotel massage appointments, and event massage services. Each one starts as a request, not a reservation.
            </p>
          </div>
          <div className="mt-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} reverse={index % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      <section id="difference" className="bg-sand/70">
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>The Stillpoint difference</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.5rem,5vw,4.3rem)]">Professional Service. Thoughtfully Delivered.</h2>
          </div>
          <div className="mt-10 grid overflow-hidden rounded-[12px] border border-line bg-white md:grid-cols-2">
            {differences.map((item) => (
              <ServiceFeature key={item.title} title={item.title} body={item.body} icon={item.icon} />
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-white">
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.5rem,5vw,4.3rem)]">A Simpler Way to Make Time for Yourself.</h2>
          </div>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            <div className="absolute left-[1.15rem] top-0 hidden h-full w-px bg-sand-deep md:left-0 md:top-5 md:block md:h-px md:w-full" aria-hidden="true" />
            {steps.map((step) => (
              <li key={step.n} className="relative border-l border-sand-deep pl-8 md:border-0 md:pl-0">
                <span className="absolute -left-3 top-0 grid h-6 w-6 place-items-center rounded-full bg-forest text-[0.65rem] text-ivory md:static md:h-10 md:w-10 md:text-sm">
                  {step.n}
                </span>
                <h3 className="mt-1 font-serif text-[1.7rem] leading-tight text-forest md:mt-5">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href="/book">Start Your Booking Request</Button>
          </div>
        </Container>
      </section>

      <section id="corporate" className="surface-dark bg-forest text-ivory">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-12">
          <div className="relative min-h-[24rem] lg:col-span-5 lg:min-h-full">
            <Photo
              src="/images/corporate.jpg"
              alt="A discreet seated massage in a quiet workplace lounge."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="px-5 py-16 sm:px-8 lg:col-span-7 lg:px-12 lg:py-20">
            <Eyebrow tone="light">For teams & organizations</Eyebrow>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.03em] text-ivory">
              Bring a Moment of Calm Into the Workday.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand">
              From employee appreciation days to recurring workplace wellness sessions, Stillpoint helps organizations explore massage experiences that fit their environment, schedule, and team size.
            </p>
            <ul className="mt-8 max-w-lg divide-y divide-white/15 border-y border-white/15">
              {corporateHighlights.map((item) => (
                <li key={item} className="py-3 text-sm text-ivory">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a className="font-semibold text-ivory underline-offset-4 hover:underline" href="#proposal">
                Request a Corporate Proposal
              </a>
              <Link className="text-sand underline-offset-4 hover:underline" href="/services/events#request">
                Discuss Your Event
              </Link>
            </div>
            <div className="mt-10 rounded-[14px] bg-ivory p-5 text-charcoal sm:p-7">
              <CorporateInquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section id="partnerships">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <Eyebrow>Professional partnerships</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.4rem,4vw,3.8rem)]">Better Connected. Thoughtfully Delivered.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Stillpoint welcomes conversations with professionals and organizations interested in exploring complementary wellness services and coordinated client experiences. Nothing here is a current partnership.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {partnershipCategories.map((item) => (
                <li key={item.title} className="py-4">
                  <p className="font-serif text-2xl text-forest">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
            <Link href="/partnerships#inquiry" className="mt-6 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline">
              Explore a Partnership
            </Link>
          </div>
          <div className="rounded-[14px] border border-line bg-white p-5 sm:p-7 lg:col-span-7">
            <PartnershipForm />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] lg:col-span-5">
            <Photo
              src="/images/hero.jpg"
              alt="A therapist preparing a linen-draped table in a bright residential room."
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>About Stillpoint</Eyebrow>
            <h2 className="editorial-title mt-4 text-[clamp(2.4rem,4vw,3.8rem)]">A More Personal Approach to Mobile Massage.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Stillpoint was envisioned around a simple idea: professional massage should fit more naturally into everyday life. By bringing services into homes, workplaces, hotels, and selected events, the goal is to make the experience more convenient and personal.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The service is built around clear communication, thoughtful preparation, and arrangements that work for each client and setting.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <PlaceholderValue label="Therapist name" value={business.therapistName} fallback="To be confirmed." />
              <PlaceholderValue label="Service area" value={business.serviceArea} fallback="Reviewed with each request." />
              <PlaceholderValue label="Credentials" value={business.credentials} fallback="Listed only after they are verified." />
              <PlaceholderValue label="Training" value={business.training} fallback="Added when provided." />
            </dl>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Get to Know the Service
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand/60">
        <Container className="py-20 lg:py-28">
          {verifiedTestimonials.length > 0 ? (
            <div>
              <Eyebrow>Client notes</Eyebrow>
              <h2 className="editorial-title mt-4 text-[clamp(2.4rem,4vw,3.8rem)]">From people who have visited.</h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {verifiedTestimonials.map((item) => (
                  <figure key={item.id} className="border-t border-line pt-6">
                    <blockquote className="font-serif text-3xl leading-snug text-forest">“{item.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm text-muted">
                      {item.attribution}
                      {item.context ? ` · ${item.context}` : ""}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <Eyebrow>In place of reviews</Eyebrow>
              <h2 className="editorial-title mt-4 text-[clamp(2.5rem,5vw,4.2rem)]">Thoughtful Service Starts With You.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Verified client reflections will be published here. None are shown until they are genuine. Until then, the work is described by how a request is handled.
              </p>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {values.map((item) => (
                  <div key={item.title} className="border-t border-forest/20 pt-5">
                    <h3 className="font-serif text-2xl text-forest">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section id="faq">
        <Container className="py-20 lg:py-28">
          <FAQAccordion items={faqs} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
