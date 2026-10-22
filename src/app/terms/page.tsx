import { Container, Eyebrow } from "@/components/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of service",
  description: "Terms for using the Stillpoint Mobile Massage website and inquiry forms.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-14 lg:py-20">
      <article className="prose-legal max-w-3xl">
        <Eyebrow>Terms</Eyebrow>
        <h1 className="editorial-title mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">Terms of service</h1>
        <p>
          These terms are a working draft for the Stillpoint website concept. Governing legal details, including a business address and jurisdiction, will be added when they are confirmed. They are not invented here.
        </p>
        <h2>Using the site</h2>
        <p>
          The site describes a mobile massage service and lets you send booking, corporate, partnership, and general inquiries. You agree to provide accurate contact details and not to submit another person’s information without their permission.
        </p>
        <h2>No appointment is created by a form</h2>
        <p>
          A submission is a request for review. It is not a contract, a reserved time, a quoted price, or a confirmed appointment. Service scope, travel, duration, and pricing are agreed separately, in a direct confirmation from the business.
        </p>
        <h2>No medical service</h2>
        <p>
          Nothing on this site is medical advice, diagnosis, or a promise of a health outcome. Massage is described as a comfort and wellness service only.
        </p>
        <h2>Partnerships and testimonials</h2>
        <p>
          Names of professions on the partnership page are categories for conversation. They are not endorsements or existing affiliations. Client quotations are published only when verified. None are displayed until then.
        </p>
        <h2>Site content</h2>
        <p>
          Brand copy, layout, and photography are part of this website concept. Do not copy them for another business without permission. Placeholder fields are not factual business records.
        </p>
        <h2>Liability</h2>
        <p>
          The site is provided as an inquiry tool. It may be unavailable, and a stored request may still need a direct reply. Specific liability terms will be added with the business’s confirmed legal details.
        </p>
        <h2>Related policies</h2>
        <p>
          See the <a href="/privacy">privacy policy</a> and the <a href="/booking-policy">booking and cancellation policy</a>.
        </p>
      </article>
    </Container>
  );
}
