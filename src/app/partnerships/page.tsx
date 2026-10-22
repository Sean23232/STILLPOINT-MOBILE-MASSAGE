import { Container, Eyebrow } from "@/components/brand";
import { PartnershipForm } from "@/components/inquiry-forms";
import { Photo } from "@/components/photo";
import { partnershipCategories } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Partnership inquiries",
  description:
    "Invite a conversation about collaborations with chiropractors, medical practices, hotels, and wellness professionals. No partnership is implied until agreed.",
  path: "/partnerships",
  image: "/images/calm.jpg",
  imageAlt: "Ivory linen and pale oak in soft daylight.",
});

export default function PartnershipsPage() {
  return (
    <>
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <Eyebrow>Partnerships</Eyebrow>
          <h1 className="editorial-title mt-4 text-[clamp(3rem,6vw,5.2rem)]">An invitation, not a directory of partners.</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Stillpoint welcomes conversations with professionals and organizations interested in complementary wellness services and coordinated client experiences. No practitioner, clinic, or hotel is presented as a current partner.
          </p>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-[12px] lg:col-span-6">
          <Photo
            src="/images/calm.jpg"
            alt="A quiet still life of linen, oak, and an olive sprig."
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
      <section className="bg-white">
        <Container className="py-16 lg:py-20">
          <h2 className="font-serif text-4xl text-forest">Conversations we welcome</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {partnershipCategories.map((item) => (
              <article key={item.title} className="border-t border-line pt-4">
                <h3 className="font-serif text-2xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section id="inquiry" className="scroll-mt-24">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <Eyebrow>Inquiry</Eyebrow>
            <h2 className="editorial-title mt-4 text-4xl">Start a conversation.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Describe the collaboration you have in mind. The note is stored for review. It does not create an agreement, a referral relationship, or a listing on this site.
            </p>
          </div>
          <div className="rounded-[14px] border border-line bg-white p-5 sm:p-7 lg:col-span-8">
            <PartnershipForm />
          </div>
        </Container>
      </section>
    </>
  );
}
