import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ShieldCheck } from "@/components/icons";

/** Two-column overview: heading + paragraphs (+ optional bullets) and an image. */
export default function ProjectOverview({
  eyebrow = "Project Overview",
  title,
  paragraphs,
  bullets = [],
  image,
  imageAlt,
  imageLabel,
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image: string;
  imageAlt: string;
  imageLabel: string;
}) {
  const paras = paragraphs.filter(Boolean);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} />
            {paras.map((text, i) => (
              <p key={i} className={i === 0 ? "mt-6 leading-relaxed text-slate-700" : "mt-4 leading-relaxed text-slate-700"}>
                {text}
              </p>
            ))}
            {bullets.length > 0 && (
              <ul className="mt-7 space-y-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={150}>
            <ImageSlot
              src={image}
              alt={imageAlt}
              label={imageLabel}
              className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
