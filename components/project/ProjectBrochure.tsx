import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Optional brochure block: image + download title/paragraph/PDF button. */
export default function ProjectBrochure({
  title,
  paragraph,
  image,
  pdf,
  imageLabel = "Brochure Image",
}: {
  title?: string;
  paragraph?: string;
  image: string;
  pdf?: string;
  imageLabel?: string;
}) {
  if (!title) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <ImageSlot
              src={image}
              alt={title}
              label={imageLabel}
              className="aspect-[4/3] rounded-3xl shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>
          <Reveal delay={150}>
            <SectionHeading align="left" eyebrow="Brochure" title={title} sub={paragraph} />
            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-brand-dark"
              >
                Download Brochure
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
