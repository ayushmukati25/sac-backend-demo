import { MapPin, Navigation, Phone, Stethoscope } from "lucide-react";
import { practice, practiceMapsUrl } from "@/lib/member-data";
import Card from "./Card";

export default function PracticeCard({ className }: { className?: string }) {
  const tel = `tel:${practice.phone.replace(/\s/g, "")}`;

  return (
    <Card
      title="Your practice details"
      icon={Stethoscope}
      className={className}
      bodyClassName="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="font-heading text-lg font-bold leading-tight text-ink">{practice.name}</p>
        <ul className="mt-2 space-y-1.5 text-sm text-neutral-600">
          <li className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-ink" />
            <span>{practice.address.join(", ")}</span>
          </li>
          <li className="flex gap-2">
            <Phone className="mt-0.5 size-4 shrink-0 text-ink" />
            <a href={tel} className="font-medium hover:text-ink">
              {practice.phone}
            </a>
          </li>
        </ul>
      </div>

      <div className="flex shrink-0 gap-2">
        <a
          href={practiceMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-hover"
        >
          <Navigation className="size-4" />
          Open in Google Maps
        </a>
        <a
          href={tel}
          aria-label="Call practice"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-3 text-ink transition-colors hover:bg-neutral-100"
        >
          <Phone className="size-4" />
        </a>
      </div>
    </Card>
  );
}
