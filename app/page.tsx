import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";

export const instant = false;
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import InquiryForm from "@/components/InquiryForm";
import { getProjects } from "@/lib/api";
import {
  Check,
  ShieldCheck,
  Building2,
  MapPin,
  CalendarCheck,
  ArrowRight,
  Phone,
  WhatsApp,
  Instagram,
  Facebook,
} from "@/components/icons";
import { SITE, waLink } from "@/lib/site";

const STATS = [
  { value: "12+", label: "Acres Developed" },
  { value: "206+", label: "Residential Plots" },
  { value: "2", label: "Live Townships" },
  { value: "100%", label: "RERA Compliant" },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "100% Legal & RERA Compliant",
    desc: "Sabhi projects proper government approvals aur RERA guidelines ke anusaar develop kiye gaye hain — poora legal clarity.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Wide paved roads, boundary walls, proper drainage aur street lighting — har colony mein world-class basics.",
  },
  {
    icon: MapPin,
    title: "Prime Connectivity",
    desc: "Har project highways, schools, hospitals aur city centers ke paas strategically plan kiya gaya hai.",
  },
  {
    icon: CalendarCheck,
    title: "End-to-End Assistance",
    desc: "Site visit se lekar registry aur possession tak — hamari team har step par aapke saath hai.",
  },
];

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-svh items-center overflow-hidden bg-charcoal">
        <ImageSlot
          src="/images/hero-home.jpg"
          alt="Shree Rudra Developers township aerial view"
          label="Home Hero Background"
          className="absolute inset-0"
          sizes="100vw"
          preload
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/40"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-40 pt-36 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              RERA-Approved Projects • Haryana
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              Building Modern Living Spaces &amp;{" "}
              <span className="text-gold">Trusted Communities</span> in Haryana
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Shree Rudra Developers is a full-service real estate development and
              sales firm dedicated to creating RERA-approved residential townships,
              modern plotted colonies, and high-growth investment opportunities.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="group flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink("Hello Shree Rudra Developers! Mujhe sales team se baat karni hai.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                Contact Sales Team
              </a>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center md:border-r md:border-white/10 md:last:border-none">
                <p className="text-3xl font-extrabold text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="scroll-mt-24 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Image side */}
            <Reveal className="relative">
              <ImageSlot
                src="/images/about.jpg"
                alt="Shree Rudra Developers site"
                label="About Us Image"
                className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-4 rounded-2xl bg-brand px-7 py-6 text-white shadow-2xl shadow-brand/40 sm:right-8">
                <p className="text-4xl font-extrabold">12+</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                  Acres of Township
                  <br />
                  Development
                </p>
              </div>
              {/* Gold frame accent */}
              <div
                className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl border-2 border-gold/50"
                aria-hidden="true"
              />
            </Reveal>

            {/* Text side */}
            <Reveal delay={150}>
              <SectionHeading
                align="left"
                eyebrow="About Us"
                title="A Trusted Name in Haryana Real Estate"
              />
              <p className="mt-6 leading-relaxed text-slate-700">
                Shree Rudra Developers ek bharosemand real estate development aur
                sales firm hai jo modern urban planning aur transparent property
                deals ke liye jaani jaati hai. Hum residential plots se lekar
                complete township development tak har stage par quality aur legal
                clarity (HRERA approved) par focus karte hain — taaki aap aur
                aapka parivar ek safe aur future-ready jagah par apna ghar bana sakein.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "100% Legal & RERA Compliant",
                  "Modern Urban Planning",
                  "Transparent Property Deals",
                  "HRERA-Approved Projects",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-gold">
                {SITE.tagline}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ KEY PROJECTS ============ */}
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
                      src={project.image || "/images/narwana-card.jpg"}
                      alt={project.name || "Project"}
                      label={project.name || "Project"}
                      className="aspect-[16/10]"
                      sizes="(max-width: 768px) 100vw, 560px"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                      {project.badge}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-extrabold tracking-tight text-charcoal transition-colors group-hover:text-brand">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                      <MapPin className="h-4 w-4 text-gold" />
                      {project.location}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(project.chips || []).map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full bg-rose-tint px-3.5 py-1.5 text-xs font-bold text-brand"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
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

      {/* ============ WHY CHOOSE US ============ */}
      <section id="why-us" className="scroll-mt-24 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us?"
              title="Quality, Legal Clarity & Trust — Har Step Par"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full rounded-3xl bg-rose-tint p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-md shadow-brand/10 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <div className="bg-alabaster pb-20 pt-4 md:pb-28">
        <Reveal>
          <CTABand />
        </Reveal>
      </div>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="scroll-mt-24 bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Contact & Office Details"
              title="Aaeye, Baat Karein, Site Dekhein"
              sub="Office par walk-in karein, call karein ya WhatsApp karein — hamari team turant reply karegi."
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {/* Details + form */}
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                    Office Address
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {SITE.address}
                  </p>
                  <a
                    href={SITE.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    View on Google Maps
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <Phone className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                    Phone / WhatsApp
                  </h3>
                  <a
                    href={SITE.phoneHref}
                    className="mt-2 block text-sm font-bold text-charcoal hover:text-brand"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={waLink("Hello Shree Rudra Developers! Mujhe jaankari chahiye.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    <WhatsApp className="h-3.5 w-3.5" />
                    WhatsApp par message karein
                  </a>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-alabaster p-6 sm:col-span-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <Instagram className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-charcoal">
                    Social Media
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <a
                      href={SITE.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-600 transition-colors hover:text-brand"
                    >
                      Instagram <span className="text-slate-400">(@shree.rudradevelopers)</span>
                    </a>
                    <span className="h-4 w-px bg-slate-200" aria-hidden="true" />
                    <a
                      href={SITE.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-brand"
                    >
                      <Facebook className="h-4 w-4" />
                      Shree Rudra Developers
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <InquiryForm />
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={150} className="h-full">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                <iframe
                  title="Shree Rudra Developers — Office Location"
                  src={SITE.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-charcoal/60 to-transparent px-6 py-4">
                  <p className="pointer-events-auto text-sm font-bold text-white">
                    <MapPin className="mr-1.5 inline h-4 w-4 text-gold" />
                    HUDA Sector 19, Kaithal, Haryana
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
