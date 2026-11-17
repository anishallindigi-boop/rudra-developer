import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/api";

type Tours = NonNullable<Project["immersivetour"]>;

/** Optional immersive tour / video cards section. */
export default function ProjectImmersiveTour({
  items,
  fallbackImage,
}: {
  items?: Tours;
  fallbackImage: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Immersive Tour" title="Virtual Tours & Updates" />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <ImageSlot
                  src={t.immersiveThumbnail || fallbackImage}
                  alt={t.immersiveTitle || ""}
                  label={t.immersiveTitle || "Tour"}
                  className="aspect-video"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-charcoal">{t.immersiveTitle}</h3>
                  {t.immersiveVideoUrl && (
                    <a
                      href={t.immersiveVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
                    >
                      Watch Video →
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
