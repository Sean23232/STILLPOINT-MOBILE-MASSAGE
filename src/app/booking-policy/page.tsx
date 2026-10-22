import { Container, Eyebrow } from "@/components/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Booking and cancellation",
  description:
    "How Stillpoint booking requests work, including confirmation, last-minute requests, hotels, and cancellation expectations.",
  path: "/booking-policy",
});

export default function BookingPolicyPage() {
  return (
    <Container className="py-14 lg:py-20">
      <article className="prose-legal max-w-3xl">
        <Eyebrow>Booking</Eyebrow>
        <h1 className="editorial-title mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">Booking and cancellation</h1>
        <p>
          This policy explains the request process. Fixed cancellation fees, deposit rules, and session prices are not published because they have not been confirmed. They will be shared directly before an appointment is agreed.
        </p>
        <h2>A request is not a reservation</h2>
        <p>
          Submitting a booking request does not guarantee a time. Wait for direct confirmation of the service, time, location, and pricing. Until that confirmation, the appointment does not exist.
        </p>
        <h2>What is reviewed</h2>
        <ul>
          <li>Whether the location can be reached.</li>
          <li>Travel requirements, if any.</li>
          <li>The setting: home, workplace, hotel, or event.</li>
          <li>Availability for the preferred date and window.</li>
          <li>Any property rules that apply.</li>
        </ul>
        <h2>Last-minute requests</h2>
        <p>
          Same-day and next-day requests can be submitted. They are marked as last-minute and depend entirely on availability. They are not held while the form is open.
        </p>
        <h2>Hotels</h2>
        <p>
          Hotel appointments are subject to location, availability, and the property’s policies. Stillpoint cannot override a hotel’s rules.
        </p>
        <h2>Corporate and events</h2>
        <p>
          Team size, format, and dates in a proposal are estimates. They do not reserve therapists or a package. Recurring arrangements exist only after they are agreed in writing.
        </p>
        <h2>Pricing</h2>
        <p>
          Pricing depends on the service, duration, location, and appointment requirements. Applicable options are shared in response to an inquiry. No rate card is published on this site.
        </p>
        <h2>Changes and cancellation</h2>
        <p>
          Cancellation expectations, including any notice period or fee, will be stated when an appointment is confirmed. They are not implied by this page. If you need to change a request that has not been confirmed, send a new note with your reference number through the <a href="/contact">contact form</a>.
        </p>
        <h2>Preparation</h2>
        <p>Any preparation requirements are communicated with the confirmation, not before.</p>
      </article>
    </Container>
  );
}
