import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Optional "About the project" section: paragraphs + highlight points. */
export default function ProjectAboutPoints({
  heading,
  subheading,
  paragraphs,
  points,
}: {
  heading?: string;
  subheading?: string;
  paragraphs: (string | undefined)[];
  points: (string | undefined)[];
}) {
  const paras = paragraphs.filter(Boolean) as string[];
  const bulletPoints = points.filter(Boolean) as string[];

  if (!heading && paras.length === 0 && bulletPoints.length === 0) return null;

  return (
    <section className="bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="About the Project"
            title={heading || "About the Project"}
            sub={subheading}
          />
        </Reveal>
        {paras.length > 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {paras.map((text, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="leading-relaxed text-slate-700">{text}</p>
              </Reveal>
            ))}
          </div>
        )}
        {bulletPoints.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {bulletPoints.map((pt, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-bold text-charcoal">{pt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
