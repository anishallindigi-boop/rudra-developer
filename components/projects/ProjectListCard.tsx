import Link from "next/link";
import { MapPin, ArrowRight } from "@/components/icons";
import type { Project } from "@/lib/api";

/** Full-width project card used on the /projects listing page. */
export default function ProjectListCard({ project }: { project: Project }) {
  const stats = [
    { label: "Total Area", value: project.area },
    { label: "Residential Plots", value: project.totalUnits },
    { label: "Plot Sizes", value: project.plotSizes },
  ].filter((stat) => stat.value);

  // --- Image URL Logic ---
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5000";
  let imageSrc = project.homebanner || project.image || "";

  // Agar path /uploads/ se shuru hota hai toh baseUrl add karein
  if (imageSrc.startsWith("/uploads/") || imageSrc.startsWith("uploads/")) {
    const cleanPath = imageSrc.startsWith("/") ? imageSrc : `/${imageSrc}`;
    imageSrc = `${baseUrl}${cleanPath}`;
  }

  return (
    <article className="group grid overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/60 lg:grid-cols-2">
      
      {/* Image Section */}
      <div className="relative min-h-72 w-full overflow-hidden bg-slate-100">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={project.name || "Project"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}
        
        {project.badge && (
          <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur z-10">
            {project.badge}
          </span>
        )}
      </div>

      {/* Content Section */}
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