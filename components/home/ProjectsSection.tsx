import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { MapPin, ArrowRight } from "@/components/icons";
import type { Project } from "@/lib/api";

const FALLBACK_IMAGES: Record<string, string> = {
  "shree-rudra-homes-narwana": "/images/narwana-card.jpg",
  "bhagat-singh-colony-extension-kaithal": "/images/kaithal-card.jpg",
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-24 bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Key Projects"
            title="Live Townships, Ready for Your Future"
            sub="Do soch samajh kar develop kiye gaye projects — ek DDJAY-approved Narwana township aur ek prime-location Kaithal colony."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.slice(0, 2).map((project, i) => (
            <Reveal key={project.slug} delay={i * 150}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/60"
              >
                <div className="relative">
                  <ImageSlot
                    src={project.image || FALLBACK_IMAGES[project.slug] || "/images/narwana-card.jpg"}
                    alt={project.name || "Project"}
                    label={project.name || "Project"}
                    className="aspect-[16/10]"
                    sizes="(max-width: 768px) 100vw, 560px"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.badge && (
                    <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                      {project.badge}
                    </span>
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-extrabold tracking-tight text-charcoal transition-colors group-hover:text-brand">
                    {project.name}
                  </h3>
                  {project.location && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                      <MapPin className="h-4 w-4 text-gold" />
                      {project.location}
                    </p>
                  )}
                  {project.description && (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                  )}
                  {!!project.chips?.length && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full bg-rose-tint px-3.5 py-1.5 text-xs font-bold text-brand"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
                    View Project Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
