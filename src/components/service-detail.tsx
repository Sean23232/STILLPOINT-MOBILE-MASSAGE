import Link from "next/link";
import { BookingStepper } from "@/components/booking-stepper";
import { Button, Container, Eyebrow } from "@/components/brand";
import { FAQAccordion } from "@/components/faq-accordion";
import { Photo } from "@/components/photo";
import { approvedSessionOptions, eventExamples, faqs, preparationNotes, servicePages } from "@/lib/content";

type ServiceKey = keyof typeof servicePages;

const faqSets: Record<ServiceKey, string[]> = {
  "in-home": [
    "What types of massage appointments can I request?",
    "Do you travel to my location?",
    "Do you offer last-minute appointments?",
    "How much does a session cost?",
    "What should I prepare before the appointment?",
    "How do I know my appointment is confirmed?",
  ],
  hotel: [
    "Can you provide massage services at hotels?",
    "Do you offer last-minute appointments?",
    "How much does a session cost?",
    "How do I know my appointment is confirmed?",
    "What should I prepare before the appointment?",
  ],
  event: [
    "What types of massage appointments can I request?",
    "Can I request a recurring arrangement?",
    "How much does a session cost?",
    "How do I know my appointment is confirmed?",
    "What should I prepare before the appointment?",
  ],
};

export function ServiceDetail({ service }: { service: ServiceKey }) {
  const content = servicePages[service];
  const questions = faqs.filter((item) => faqSets[service].includes(item.question));

  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid items-end gap-10 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-6">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="editorial-title mt-4 text-[clamp(2.8rem,6vw,5rem)]">{content.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{content.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#request">Request this service</Button>
              <Button href="/booking-policy" variant="secondary">
                Read the booking policy
              </Button>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[12px] lg:col-span-6">
            <Photo src={content.image} alt={content.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-10 py-16 md:grid-cols-3 lg:py-24">
          {content.points.map((point) => (
            <article key={point.title} className="border-t border-line pt-5">
              <h2 className="font-serif text-3xl text-forest">{point.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{point.body}</p>
            </article>
          ))}
        </Container>
      </section>

      {service === "in-home" ? (
        <section>
          <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <Eyebrow>Session options</Eyebrow>
              <h2 className="editorial-title mt-4 text-4xl">What can be requested</h2>
            </div>
            <div className="lg:col-span-7">
              {approvedSessionOptions.length > 0 ? (
                <ul className="divide-y divide-line border-y border-line">
                  {approvedSessionOptions.map((option) => (
                    <li key={option.name} className="py-4">
                      <p className="font-serif text-2xl text-forest">{option.name}</p>
                      <p className="mt-1 text-sm text-muted">{option.duration}</p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal">{option.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-[12px] border border-line bg-sand/50 p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest">Awaiting confirmed details</p>
                  <p className="mt-3 leading-relaxed text-charcoal">
                    Modalities, durations, and prices will be listed here only after the business approves them. You can note a preference in the request. It will be discussed, not treated as a published option.
                  </p>
                </div>
              )}
              <ul className="mt-8 grid gap-3">
                {preparationNotes.map((note) => (
                  <li key={note} className="border-l border-sage pl-4 text-sm leading-relaxed text-muted">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {service === "hotel" ? (
        <section>
          <Container className="py-16 lg:py-20">
            <div className="max-w-3xl rounded-[12px] bg-forest px-6 py-8 text-ivory sm:px-10">
              <h2 className="font-serif text-3xl">Property policy disclaimer</h2>
              <p className="mt-3 leading-relaxed text-sand">
                Hotel massage appointments may be requested, subject to location, availability, and the property’s policies. Stillpoint does not guarantee that a hotel will permit an in-room or on-site visit, and a form submission is not permission from the property.
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      {service === "event" ? (
        <section className="bg-sand/50">
          <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <Eyebrow>Possible formats</Eyebrow>
              <h2 className="editorial-title mt-4 text-4xl">Examples to discuss, not a guaranteed menu.</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line lg:col-span-7">
              {eventExamples.map((item) => (
                <li key={item} className="py-4 text-base leading-relaxed text-charcoal">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section>
        <Container className="py-16 lg:py-20">
          <FAQAccordion items={questions} heading="Before you request" />
        </Container>
      </section>

      <section id="request" className="scroll-mt-24 bg-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <Eyebrow>Booking request</Eyebrow>
            <h2 className="editorial-title mt-4 text-4xl">Ask about this visit.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The form stores a request for review. It does not check live availability, send an email, or confirm pricing.{" "}
              <Link className="text-forest underline underline-offset-2" href="/book">
                Open the full booking flow
              </Link>{" "}
              if you would rather start without a service locked in.
            </p>
          </div>
          <div className="lg:col-span-8">
            <BookingStepper initialService={service} lockService />
          </div>
        </Container>
      </section>
    </>
  );
}
