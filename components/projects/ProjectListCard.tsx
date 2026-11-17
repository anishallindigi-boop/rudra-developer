import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import { MapPin, ArrowRight } from "@/components/icons";
import { projectImage } from "@/lib/projectMedia";
import type { Project } from "@/lib/api";

/** Full-width project card used on the /projects listing page. */
export default function ProjectListCard({ project }: { project: Project }) {
  const stats = [
    { label: "Total Area", value: project.area },
    { label: "Residential Plots", value: project.totalUnits },
    { label: "Plot Sizes", value: project.plotSizes },
  ].filter((stat) => stat.value);

  return (
    <article className="group grid overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/60 lg:grid-cols-2">
      <div className="relative">
        <ImageSlot
          src={projectImage(project)}
          alt={project.name || "Project"}
          label={project.name || "Project"}
          className="h-full min-h-72"
          sizes="(max-width: 1024px) 100vw, 600px"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {project.badge && (
          <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">
            {project.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center p-8 md:p-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-charcoal transition-colors group-hover:text-brand">
          {project.name}
        </h2>
        {project.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
            <MapPin className="h-4 w-4 text-gold" />
            {project.location}
          </p>
        )}
        {(project.description || project.overview) && (
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            {project.description || project.overview}
          </p>
        )}
        {stats.length > 0 && (
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-sm font-extrabold text-charcoal">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          View Full Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
