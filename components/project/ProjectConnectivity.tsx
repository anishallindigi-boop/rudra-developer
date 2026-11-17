import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Optional connectivity map section. */
export default function ProjectConnectivity({ image }: { image?: string }) {
  if (!image) return null;

  return (
    <section className="bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Connectivity" title="Location & Connectivity" />
        </Reveal>
        <Reveal delay={150} className="mt-10">
          <ImageSlot
            src={image}
            alt="Connectivity map"
            label="Connectivity Map"
            className="aspect-video rounded-3xl shadow-2xl"
            sizes="(max-width: 1024px) 100vw, 1100px"
          />
        </Reveal>
      </div>
    </section>
  );
}
