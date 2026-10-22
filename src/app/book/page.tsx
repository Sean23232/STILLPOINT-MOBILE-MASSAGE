import { Container, Eyebrow } from "@/components/brand";
import { BookingStepper } from "@/components/booking-stepper";
import { firstParam, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Booking request",
  description:
    "Start a massage booking request for in-home, hotel, or event service. Submitting a request does not confirm an appointment.",
  path: "/book",
});

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <Container className="grid gap-8 py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-4">
        <Eyebrow>Booking</Eyebrow>
        <h1 className="editorial-title mt-4 text-[clamp(2.8rem,5vw,4.4rem)]">Request a massage.</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Move through the steps at your own pace. You can go back without losing what you entered. Corporate massage is routed to the proposal form so team details are not missed.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A submitted request is stored for review. It is not a confirmed appointment, and no email is sent from this site.
        </p>
      </div>
      <div className="lg:col-span-8">
        <BookingStepper
          initialService={firstParam(params.service)}
          initialDate={firstParam(params.date)}
          initialTime={firstParam(params.time)}
          initialLocation={firstParam(params.location)}
          initialReference={firstParam(params.reference).toUpperCase()}
        />
      </div>
    </Container>
  );
}
