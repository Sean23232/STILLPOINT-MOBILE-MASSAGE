import Link from "next/link";
import { Container, Eyebrow } from "@/components/brand";
import { ContactForm } from "@/components/inquiry-forms";
import { business } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact Stillpoint Mobile Massage with a general question, booking help, or another inquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
      <div className="lg:col-span-5">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="editorial-title mt-4 text-[clamp(3rem,6vw,5rem)]">Write when a form elsewhere is not the right fit.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Massage requests are clearer in the booking flow. Workplace visits belong on the corporate form. Use this page for a general note.
        </p>
        <div className="mt-8 grid gap-4 text-sm">
          <p>
            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest">Direct email</span>
            <span className="mt-1 block text-muted">{business.email || "Not published yet. Please use the form."}</span>
          </p>
          <p>
            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest">Phone</span>
            <span className="mt-1 block text-muted">{business.phone || "Not published yet."}</span>
          </p>
          <p>
            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest">Hours</span>
            <span className="mt-1 block text-muted">{business.hours || "Business hours will be published once confirmed."}</span>
          </p>
        </div>
        <ul className="mt-8 grid gap-2 text-sm font-semibold text-forest">
          <li>
            <Link className="underline-offset-4 hover:underline" href="/book">
              Individual booking request
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/corporate#proposal">
              Corporate wellness proposal
            </Link>
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/partnerships#inquiry">
              Partnership inquiry
            </Link>
          </li>
        </ul>
      </div>
      <div className="rounded-[14px] border border-line bg-white p-5 sm:p-7 lg:col-span-7">
        <ContactForm />
      </div>
    </Container>
  );
}
