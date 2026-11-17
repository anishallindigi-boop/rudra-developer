import { MapPin } from "./icons";
import { SITE } from "@/lib/site";

/** Google Maps embed with an optional overlay label. */
export default function MapEmbed({
  label,
  title = "Shree Rudra Developers — Office Location",
}: {
  label?: string;
  title?: string;
}) {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
      <iframe
        title={title}
        src={SITE.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      {label && (
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-charcoal/60 to-transparent px-6 py-4">
          <p className="pointer-events-auto text-sm font-bold text-white">
            <MapPin className="mr-1.5 inline h-4 w-4 text-gold" />
            {label}
          </p>
        </div>
      )}
    </div>
  );
}
