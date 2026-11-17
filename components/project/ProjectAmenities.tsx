import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { ComponentType } from "react";

/** Amenity cards grid with rotating icons. */
export default function ProjectAmenities({
  eyebrow,
  title,
  sub,
  items,
  icons,
  className = "bg-alabaster",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  items: string[];
  icons: ComponentType<{ className?: string }>[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={`${className} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item} delay={i * 80}>
                <div className="group h-full rounded-3xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-extrabold tracking-tight text-charcoal">
                    {item}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
