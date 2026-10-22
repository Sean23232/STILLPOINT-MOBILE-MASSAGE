import Link from "next/link";
import { navItems, services } from "@/lib/content";
import { business } from "@/lib/site";
import { Logo } from "@/components/brand";

function Detail({ label, value, empty }: { label: string; value: string; empty: string }) {
  return (
    <p>
      <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sage">{label}</span>
      <span className="mt-1 block text-sm leading-relaxed text-sand">
        {value.trim() ? value : empty}
      </span>
    </p>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark bg-forest text-ivory">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand">
            Stillpoint brings professional massage to the places you already are — home, work, a hotel, or a selected
            event. A request on this site is reviewed before anything is confirmed.
          </p>
        </div>
        <div className="lg:col-span-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-sage">Visit</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="text-ivory/90 underline-offset-4 hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-sage">Services</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link className="text-ivory/90 underline-offset-4 hover:underline" href={service.href.split("#")[0]}>
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-ivory/90 underline-offset-4 hover:underline" href="/corporate#proposal">
                Corporate wellness inquiry
              </Link>
            </li>
            <li>
              <Link className="text-ivory/90 underline-offset-4 hover:underline" href="/partnerships#inquiry">
                Partnership inquiry
              </Link>
            </li>
          </ul>
        </div>
        <div className="grid gap-4 lg:col-span-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-sage">Details</p>
          <Detail label="Email" value={business.email} empty="To be confirmed. Use an inquiry form until then." />
          <Detail label="Phone" value={business.phone} empty="To be confirmed. No number is published yet." />
          <Detail label="Address" value={business.address} empty="Not published. This is a mobile service." />
          <Detail label="Hours" value={business.hours} empty="Business hours will be published once confirmed." />
          <Detail
            label="Service area"
            value={business.serviceArea}
            empty="Reviewed with each request. No cities are listed until confirmed."
          />
          {business.instagram ? (
            <p>
              <a className="text-sm text-ivory underline-offset-4 hover:underline" href={business.instagram}>
                Instagram
              </a>
            </p>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-5 text-sm text-sand sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} Stillpoint Mobile Massage. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="underline-offset-4 hover:underline" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="underline-offset-4 hover:underline" href="/terms">
              Terms of Service
            </Link>
            <Link className="underline-offset-4 hover:underline" href="/booking-policy">
              Booking and cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
