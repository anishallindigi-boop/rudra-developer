import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/api";

type Offerings = NonNullable<Project["premiereoffering"]>;

/** Optional premiere offering tabs (title + slide grid). */
export default function ProjectPremiereOffering({
  items,
  fallbackImage,
}: {
  items?: Offerings;
  fallbackImage: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Premiere Offering" title="Amenities & Offerings" />
        </Reveal>
        <div className="mt-14 space-y-10">
          {items.map((o, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <h3 className="text-xl font-extrabold text-charcoal">
                  {o.tabtitle || o.tabid}
                </h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {(o.tabslides || []).map((s, j) => (
                    <div key={j} className="overflow-hidden rounded-2xl bg-alabaster shadow-sm">
                      <ImageSlot
                        src={s.slideimage || fallbackImage}
                        alt={s.slidetitle || ""}
                        label={s.slidetitle || "Slide"}
                        className="aspect-[4/3]"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <div className="p-4">
                        <p className="text-sm font-bold text-charcoal">{s.slidetitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
