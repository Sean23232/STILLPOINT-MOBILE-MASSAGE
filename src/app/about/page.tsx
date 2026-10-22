import { Button, Container, Eyebrow, PlaceholderValue } from "@/components/brand";
import { CTASection } from "@/components/cta-section";
import { Photo } from "@/components/photo";
import { business, conceptNote } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About the service",
  description:
    "Learn how Stillpoint approaches mobile massage — convenient, personal, and confirmed only after the details are reviewed.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Container className="grid items-end gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <Eyebrow>About</Eyebrow>
          <h1 className="editorial-title mt-4 text-[clamp(3rem,6vw,5.2rem)]">A more personal approach to mobile massage.</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Stillpoint was envisioned around a simple idea: professional massage should fit more naturally into everyday life. By bringing services into homes, workplaces, hotels, and selected events, the goal is to make the experience more convenient and personal.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] lg:col-span-5 lg:col-start-8">
          <Photo
            src="/images/prepare.jpg"
            alt="A practitioner folding linen before a mobile massage appointment."
            fill
            priority
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <section className="bg-white">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <Eyebrow>Practice profile</Eyebrow>
            <h2 className="editorial-title mt-4 text-4xl">The person behind the visit.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{conceptNote}</p>
          </div>
          <dl className="grid gap-6 lg:col-span-7">
            <PlaceholderValue label="Therapist name" value={business.therapistName} fallback="Name to be confirmed. It is intentionally unpublished." />
            <PlaceholderValue
              label="Professional biography"
              value={business.biography}
              fallback="A biography will be written from information the practitioner provides. None has been invented for this site."
            />
            <PlaceholderValue
              label="Credentials"
              value={business.credentials}
              fallback="Licenses and certifications will be listed only after they are verified."
            />
            <PlaceholderValue label="Professional training" value={business.training} fallback="Training details will be added when supplied." />
            <PlaceholderValue label="Service area" value={business.serviceArea} fallback="No cities are listed. Coverage is reviewed with each request." />
            <div>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest/70">Business philosophy</dt>
              <dd className="mt-1 leading-relaxed text-charcoal">
                Clear communication, thoughtful preparation, and arrangements that respect each client and setting. Massage is offered as a comfort and wellness service, not as medical treatment.
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <Container className="grid gap-8 py-16 lg:grid-cols-2 lg:py-24">
        <article className="rounded-[12px] bg-sand/70 p-7">
          <h2 className="font-serif text-3xl text-forest">What the service is</h2>
          <p className="mt-3 leading-relaxed text-muted">
            A way to request professional massage where you already are. Individual visits, workplace sessions, hotel appointments, and selected events can all be discussed.
          </p>
        </article>
        <article className="rounded-[12px] border border-line p-7">
          <h2 className="font-serif text-3xl text-forest">What it is not</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Not a clinic, not a guaranteed outcome, and not an instant booking. Submitting a form does not create an appointment. Pricing, credentials, and service area stay unpublished until they are confirmed.
          </p>
        </article>
        <div className="lg:col-span-2">
          <Button href="/book">Request a massage</Button>
        </div>
      </Container>
      <CTASection eyebrow="Continue" title="When you are ready, send a request." body="Share the setting and a preferred time. Stillpoint will review it before anything is agreed." />
    </>
  );
}
