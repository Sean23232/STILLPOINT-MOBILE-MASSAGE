import { ServiceDetail } from "@/components/service-detail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "In-home massage",
  description:
    "Request in-home massage services in your own space. Share a preferred time and location. Appointments are confirmed only after review.",
  path: "/services/in-home",
  image: "/images/table.jpg",
  imageAlt: "A portable massage table dressed in ivory linen in a bright room.",
});

export default function InHomePage() {
  return <ServiceDetail service="in-home" />;
}
