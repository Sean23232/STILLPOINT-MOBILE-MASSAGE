import { ServiceDetail } from "@/components/service-detail";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hotel massage appointments",
  description:
    "Request a hotel massage appointment, subject to location, availability, and the property’s policies. A request is not a confirmation.",
  path: "/services/hotel",
  image: "/images/hotel.jpg",
  imageAlt: "A massage table prepared beside a window in a calm hotel room.",
});

export default function HotelPage() {
  return <ServiceDetail service="hotel" />;
}
