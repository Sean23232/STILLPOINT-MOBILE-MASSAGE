import { Container, Eyebrow } from "@/components/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "How Stillpoint Mobile Massage handles inquiry details submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-14 lg:py-20">
      <article className="prose-legal max-w-3xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="editorial-title mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">Privacy policy</h1>
        <p>
          This is a working privacy note for the Stillpoint website. It will be updated when the business confirms its legal details. It describes what this site actually does.
        </p>
        <h2>What is collected</h2>
        <p>Inquiry forms may store:</p>
        <ul>
          <li>Your name, email, and phone number, if provided.</li>
          <li>Organization, role, and location details relevant to the request.</li>
          <li>Preferred dates, times, service type, and notes you choose to write.</li>
          <li>A reference number, a timestamp, and the status “submitted”.</li>
        </ul>
        <p>Please do not include detailed medical history. The forms are for scheduling context, not a health record.</p>
        <h2>How it is used</h2>
        <p>
          Details are stored in the application database so the business can review the request. Submitting a form does not confirm an appointment, create a partnership, or send an email. An email notification service is not connected.
        </p>
        <h2>What is not done</h2>
        <ul>
          <li>Inquiry details are not sold.</li>
          <li>This site does not use advertising cookies or a third-party analytics tracker.</li>
          <li>Fonts are self-hosted with the site. The booking draft may be kept in your browser’s session storage until you submit or clear it.</li>
          <li>A request reference lookup shows status only. It does not display your contact details.</li>
        </ul>
        <h2>Retention and access</h2>
        <p>
          Requests remain stored until the business adopts a retention schedule. To ask about a submission, include the reference number in a new contact inquiry. A public street address, phone number, and email have not been published.
        </p>
        <h2>Contact</h2>
        <p>
          Use the <a href="/contact">contact form</a> for a privacy question. Direct contact details will replace this instruction when they are confirmed.
        </p>
      </article>
    </Container>
  );
}
