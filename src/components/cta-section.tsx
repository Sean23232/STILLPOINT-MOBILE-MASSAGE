import { Button, Container, Eyebrow } from "@/components/brand";
import { Photo } from "@/components/photo";

export function CTASection({
  eyebrow = "A quieter next step",
  title = "Make Space for a Better Kind of Pause.",
  body = "Tell us where you need your massage experience, and let’s explore an appointment that works for you.",
  primaryHref = "/book",
  primaryLabel = "Request a Massage",
  secondaryHref = "/corporate#proposal",
  secondaryLabel = "Discuss Corporate Wellness",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Photo
        src="/images/calm.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ivory/88" />
      <Container className="relative py-24 md:py-32">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="editorial-title mt-4 text-[clamp(2.6rem,6vw,4.6rem)]">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/80">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primaryHref}>{primaryLabel}</Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
