import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { MapPin } from "@/components/icons";

/** Location advantages list beside an image/map. */
export default function ProjectLocationAdvantages({
  items,
  image,
  imageLabel,
  eyebrow = "Location Advantages",
  title = "Strategically Connected to Everything",
}: {
  items: { name: string; distance: string }[];
  image: string;
  imageLabel: string;
  eyebrow?: string;
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} />
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Township ka location deliberately highways, schools, hospitals aur city
              centre ke nazdeek rakha gaya hai — daily commute aur long-term value dono
              ke liye ideal.
            </p>
            <ul className="mt-8 divide-y divide-slate-100">
              {items.map((loc) => (
                <li key={loc.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-center gap-3 text-sm font-semibold text-charcoal">
                    <MapPin className="h-4 w-4 shrink-0 text-gold" />
                    {loc.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-rose-tint px-3 py-1 text-xs font-bold text-brand">
                    {loc.distance}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <ImageSlot
              src={image}
              alt={title}
              label={imageLabel}
              className="aspect-square rounded-3xl shadow-2xl shadow-slate-200"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
