import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/api";

type Glimpse = NonNullable<Project["glimpse"]>;

/** Optional "Glimpse" image cards section. */
export default function ProjectGlimpse({
  items,
  fallbackImage,
}: {
  items?: Glimpse;
  fallbackImage: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Glimpse" title="A Glimpse of the Project" />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="overflow-hidden rounded-3xl bg-alabaster shadow-sm">
                <ImageSlot
                  src={g.gimage || fallbackImage}
                  alt={g.gtitle || ""}
                  label={g.gtitle || "Glimpse"}
                  className="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-charcoal">{g.gtitle}</h3>
                  <p className="mt-2 text-sm text-slate-600">{g.gpara1}</p>
                  <p className="mt-1 text-sm text-slate-500">{g.gpara2}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
