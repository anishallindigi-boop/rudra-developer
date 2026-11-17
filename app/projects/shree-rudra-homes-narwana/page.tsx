/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";

export const instant = false;
import ProjectHero from "@/components/ProjectHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import InquiryForm from "@/components/InquiryForm";
import ImageSlot from "@/components/ImageSlot";
import {
  MapPin,
  Lock,
  Ruler,
  Lightbulb,
  Tree,
  Droplet,
  ShieldCheck,
  Download,
  WhatsApp,
  Phone,
} from "@/components/icons";
import { SITE, waLink } from "@/lib/site";
import { getProject } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shree Rudra Homes, Narwana — Premium Residential Plots",
  description: "HRERA-approved plotted residential township under DDJAY in Sector 15, Narwana (District Jind). 206 plots, 118–180 Sq. Yds., ~11.99 acres. RERA No. HRERA-PKL-JND-991-2026.",
};

const AMENITY_ICONS = [Lock, Ruler, Lightbulb, Tree, Droplet, ShieldCheck];

export default async function NarwanaPage() {
  const project = await getProject("shree-rudra-homes-narwana");

  const name = project?.name || "Shree Rudra Homes, Narwana";
  const badge = project?.badge || "HRERA Approved | Deen Dayal Jan Awas Yojana (DDJAY)";
  // location available via project?.location if needed
  const overview = project?.overview || project?.description || "Sector 15, Narwana (District Jind) mein lagbhag 12 acres mein faila Shree Rudra Homes ek modern residential plotted township hai.";
  const image = project?.image || "/images/narwana-hero.jpg";
  const area = project?.area || "~11.99 Acres";
  const totalUnits = project?.totalUnits || "206 Residential Plots";
  const plotSizes = project?.plotSizes || "118 – 180 Sq. Yds.";
  const reraNo = project?.reraNo || "HRERA-PKL-JND-991-2026";
  const policy = project?.policy || "Deen Dayal Jan Awas Yojana (DDJAY)";
  const amenities = project?.amenities?.length ? project.amenities : ["Gated Entry & Secure Boundary Wall", "Wide Internal Paved Roads", "Street Lighting", "Landscaped Green Parks & Open Spaces", "Underground Water Supply & Sewerage System", "24x7 Security & Power Backup Infrastructure"];
  const locationAdvantages = project?.locations?.length ? project.locations : [
    { name: "Kamla Memorial Government College", distance: "1.9 km" },
    { name: "NH-52 Highway", distance: "2.0 km" },
    { name: "Narwana Bus Stand", distance: "2.5 km" },
    { name: "D.A.V. Centenary Public School", distance: "3.2 km" },
    { name: "Narwana Budget Mall", distance: "3.5 km" },
    { name: "Nandini Hospital", distance: "5.6 km" },
    { name: "Narwana Junction Railway Station", distance: "6.7 km" },
  ];

  const FACTS = [
    { label: "Project Area", value: area },
    { label: "Total Units", value: totalUnits },
    { label: "Plot Sizes", value: plotSizes },
    { label: "RERA Reg. No.", value: reraNo, highlight: true },
    { label: "Policy", value: policy },
  ];

  return (
    <>
      <ProjectHero
        badge={badge}
        crumb="Shree Rudra Homes"
        image={image}
        alt={name}
        title={<>Shree Rudra Homes — Premium Residential Plots in <span className="text-gold">Sector 15, Narwana</span></>}
        sub="Apne sapno ka ghar banayein ek secure, government-approved aur well-planned residential township mein — DDJAY policy ke antargat, HRERA-registered."
        ctas={
          <>
            <a href={waLink("Hello Shree Rudra Developers! Mujhe Shree Rudra Homes, Narwana ka brochure chahiye.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark">
              <Download className="h-4 w-4" /> Download Brochure
            </a>
            <a href="#inquiry" className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">Book a Free Site Visit</a>
          </>
        }
      />

      <section className="relative z-10 -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-5 lg:p-7">
              {FACTS.map((fact) => (
                <div key={fact.label} className={`rounded-2xl px-4 py-4 ${fact.highlight ? "bg-rose-tint ring-1 ring-brand/15" : "bg-alabaster"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{fact.label}</p>
                  <p className={`mt-1.5 text-sm font-extrabold leading-tight tracking-tight ${fact.highlight ? "text-brand" : "text-charcoal"}`}>{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <SectionHeading align="left" eyebrow="Project Overview" title="Modern Township, Narwana ke Dil Mein" />
              <p className="mt-6 leading-relaxed text-slate-700">{overview}</p>
              <p className="mt-4 leading-relaxed text-slate-700">Har plot registry aur possession ke saath aata hai, aur pura township HRERA se registered hai ({reraNo}). Aap invest kar rahe ho ek fully-developed, legally-safe property mein.</p>
            </Reveal>
            <Reveal delay={150}>
              <ImageSlot src="/images/narwana-overview.jpg" alt={name} label="Narwana Overview Image" className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200" sizes="(max-width: 1024px) 100vw, 560px" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><SectionHeading eyebrow="Township Amenities" title="Everything You Need, Right Here" sub="Modern infrastructure, safety aur green living — sab kuch ek gated township ke andar." /></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item, i) => {
              const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
              return (
                <Reveal key={item} delay={i * 80}>
                  <div className="group h-full rounded-3xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-base font-extrabold tracking-tight text-charcoal">{item}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <SectionHeading align="left" eyebrow="Location Advantages" title="Strategically Connected to Everything" />
              <p className="mt-6 text-sm leading-relaxed text-slate-600">Township ka location deliberately highways, schools, hospitals aur city centre ke nazdeek rakha gaya hai — daily commute aur long-term value dono ke liye ideal.</p>
              <ul className="mt-8 divide-y divide-slate-100">
                {locationAdvantages.map((loc) => (
                  <li key={loc.name} className="flex items-center justify-between gap-4 py-3.5">
                    <span className="flex items-center gap-3 text-sm font-semibold text-charcoal"><MapPin className="h-4 w-4 shrink-0 text-gold" />{loc.name}</span>
                    <span className="shrink-0 rounded-full bg-rose-tint px-3 py-1 text-xs font-bold text-brand">{loc.distance}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}><ImageSlot src="/images/narwana-location.jpg" alt="Narwana location" label="Location Image / Map" className="aspect-square rounded-3xl shadow-2xl shadow-slate-200" sizes="(max-width: 1024px) 100vw, 560px" /></Reveal>
          </div>
        </div>
      </section>

      {/* ============ GLIMPSE ============ */}
      {project?.glimpse && project.glimpse.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="Glimpse" title="A Glimpse of the Project" /></Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.glimpse.map((g: any, i: number) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="overflow-hidden rounded-3xl bg-alabaster shadow-sm">
                    <ImageSlot src={g.gimage || "/images/narwana-overview.jpg"} alt={g.gtitle || ""} label={g.gtitle || "Glimpse"} className="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 300px" />
                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-charcoal">{g.gtitle}</h3>
                      <p className="mt-2 text-sm text-slate-600">{g.gpara1}</p>
                      <p className="mt-1 text-sm text-slate-500">{g.gpara2}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ IMMERSIVE TOUR ============ */}
      {project?.immersivetour && project.immersivetour.length > 0 && (
        <section className="bg-alabaster py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="Immersive Tour" title="Virtual Tours & Updates" /></Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {project.immersivetour.map((t: any, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                    <ImageSlot src={t.immersiveThumbnail || "/images/narwana-overview.jpg"} alt={t.immersiveTitle || ""} label={t.immersiveTitle || "Tour"} className="aspect-video" sizes="(max-width: 768px) 100vw, 600px" />
                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-charcoal">{t.immersiveTitle}</h3>
                      {t.immersiveVideoUrl && (
                        <a href={t.immersiveVideoUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">Watch Video →</a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PREMIERE OFFERING ============ */}
      {project?.premiereoffering && project.premiereoffering.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="Premiere Offering" title="Amenities & Offerings" /></Reveal>
            <div className="mt-14 space-y-10">
              {project.premiereoffering.map((o: any, i: number) => (
                <Reveal key={i} delay={i * 80}>
                  <div>
                    <h3 className="text-xl font-extrabold text-charcoal">{o.tabtitle || o.tabid}</h3>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {(o.tabslides || []).map((s: any, j: number) => (
                        <div key={j} className="overflow-hidden rounded-2xl bg-alabaster shadow-sm">
                          <ImageSlot src={s.slideimage || "/images/narwana-overview.jpg"} alt={s.slidetitle || ""} label={s.slidetitle || "Slide"} className="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 300px" />
                          <div className="p-4"><p className="text-sm font-bold text-charcoal">{s.slidetitle}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ ABOUT POINTS ============ */}
      {(project?.abountpointone || project?.aboutpara1) && (
        <section className="bg-alabaster py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading align="left" eyebrow={project?.aboutheading || "About"} title={project?.aboutsubheading || "Project Details"} />
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {project?.aboutpara1 && <Reveal><p className="leading-relaxed text-slate-700">{project.aboutpara1}</p></Reveal>}
              {project?.aboutpara2 && <Reveal delay={100}><p className="leading-relaxed text-slate-700">{project.aboutpara2}</p></Reveal>}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[project?.abountpointone, project?.abountpointtwo, project?.abountpointthree, project?.abountpointfour].filter(Boolean).map((pt, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="font-bold text-charcoal">{pt}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ BROCHURE ============ */}
      {project?.brochuretitle && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <ImageSlot src={project.brochureimage || "/images/narwana-master-plan.jpg"} alt={project.brochuretitle} label="Brochure Image" className="aspect-[4/3] rounded-3xl shadow-2xl" sizes="(max-width: 1024px) 100vw, 560px" />
              </Reveal>
              <Reveal delay={150}>
                <SectionHeading align="left" eyebrow="Brochure" title={project.brochuretitle} sub={project.brochurepara} />
                {project.brochurepdf && (
                  <a href={project.brochurepdf} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-brand-dark">
                    Download Brochure
                  </a>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ============ CONNECTIVITY ============ */}
      {project?.connectivity && (
        <section className="bg-alabaster py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal><SectionHeading eyebrow="Connectivity" title="Location & Connectivity" /></Reveal>
            <Reveal delay={150} className="mt-10">
              <ImageSlot src={project.connectivity} alt="Connectivity map" label="Connectivity Map" className="aspect-video rounded-3xl shadow-2xl" sizes="(max-width: 1024px) 100vw, 1100px" />
            </Reveal>
          </div>
        </section>
      )}

      <section id="inquiry" className="bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <SectionHeading align="left" eyebrow="Book Your Plot" title="Book Your Plot in Shree Rudra Homes Today" sub="Free site visit schedule karein ya brochure maangein — hamari team aapko plot selection, pricing aur registry process mein help karegi." />
                <div className="mt-8 space-y-4">
                  <a href={waLink("Hello Shree Rudra Developers! Mujhe Shree Rudra Homes, Narwana ke baare mein jaankari chahiye.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"><WhatsApp className="h-6 w-6" /></span>
                    <div><p className="text-sm font-extrabold text-charcoal">WhatsApp</p><p className="text-xs text-slate-500">Instant reply — {SITE.phoneDisplay}</p></div>
                  </a>
                  <a href={SITE.phoneHref} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white"><Phone className="h-6 w-6" /></span>
                    <div><p className="text-sm font-extrabold text-charcoal">Call Now</p><p className="text-xs text-slate-500">{SITE.phoneDisplay}</p></div>
                  </a>
                </div>
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <ImageSlot src="/images/narwana-master-plan.jpg" alt="Master plan" label="Master Plan Image" className="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 560px" imgClassName="object-contain" />
                  <div className="border-t border-slate-100 px-5 py-3"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Township Master Plan — Shree Rudra Homes, Narwana</p></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}><InquiryForm defaultProject="Shree Rudra Homes, Narwana" /></Reveal>
          </div>
        </div>
      </section>

      <div className="bg-alabaster pb-20 md:pb-28"><Reveal><CTABand title="Site Visit Book Karna Hai?" sub="Aaj hi call karein — hamari team aapko site dikhaane ke liye ready hai." /></Reveal></div>
    </>
  );
}
