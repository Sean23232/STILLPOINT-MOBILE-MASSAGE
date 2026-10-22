import { Button, Container, Eyebrow } from "@/components/brand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Page not found",
  description: "That page is not part of the Stillpoint Mobile Massage site.",
  path: "/404",
});

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <Eyebrow>404</Eyebrow>
      <h1 className="editorial-title mt-4 max-w-xl text-[clamp(3rem,7vw,5.4rem)]">This page has stepped out.</h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        The address may be mistyped, or the page may have moved. The services, booking request, and corporate inquiry are still here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Return home</Button>
        <Button href="/book" variant="secondary">
          Book a Massage
        </Button>
      </div>
    </Container>
  );
}
