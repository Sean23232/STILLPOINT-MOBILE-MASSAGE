import { ServiceDetail } from "@/components/service-detail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Event and pop-up massage",
  description:
    "Plan event massage services and pop-up wellness experiences. Share your gathering details to explore a suitable arrangement.",
  path: "/services/events",
  image: "/images/events.jpg",
  imageAlt: "A bright loft prepared for a small wellness pop-up.",
});

export default function EventsPage() {
  return <ServiceDetail service="event" />;
}
