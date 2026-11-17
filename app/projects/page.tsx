import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import ImageSlot from "@/components/ImageSlot";
import {
  MapPin,
  ArrowRight,
  Lock,
  Lightbulb,
  Ruler,
  ShieldCheck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Shree Rudra Developers ke live projects — Shree Rudra Homes Narwana (DDJAY RERA-approved township) aur Bhagat Singh Colony Extension Kaithal.",
};

const PROJECTS = [
  {
    href: "/projects/shree-rudra-homes-narwana",
    image: "/images/narwana-card.jpg",
    badge: "HRERA-PKL-JND-991-2026",
    name: "Shree Rudra Homes, Narwana",
    location: "Sector 15, Narwana (District Jind)",
    desc: "Deen Dayal Jan Awas Yojana (DDJAY) ke antargat develop ho raha ek modern residential plotted township — 206 independent plots, gated entry, wide roads aur green parks ke saath.",
    stats: [
      { label: "Total Area", value: "~11.99 Acres" },
      { label: "Residential Plots", value: "206 Units" },
      { label: "Plot Sizes", value: "118–180 Sq. Yds." },
    ],
  },
  {
    href: "/projects/bhagat-singh-colony-extension-kaithal",
    image: "/images/kaithal-card.jpg",
    badge: "Prime Kaithal Location",
    name: "Bhagat Singh Colony Extension, Kaithal",
    location: "Near HUDA Sector 19, Kaithal",
    desc: "Peaceful, secure aur easily accessible residential area — behtar road network, proper demarcation aur modern basic infrastructure ke saath. Turant possession ke liye ready.",
    stats: [
      { label: "Security", value: "Boundary Wall" },
      { label: "Entrance", value: "Grand Lighting Gate" },
      { label: "Layout", value: "Master Map Available" },
    ],
  },
];

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "RERA-Approved Projects" },
  { icon: Lock, label: "Gated & Secure Colonies" },
  { icon: Ruler, label: "Well-Planned Layouts" },
  { icon: Lightbulb, label: "Modern Infrastructure" },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-36 md:pb-28">
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[30px] border-brand/20"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full border-[30px] border-gold/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="left"
              light
              eyebrow="Our Projects"
              title="Live Projects — Plot Chuune Ka Mauka"
              sub="Har project government approvals, modern planning aur quality infrastructure ke saath. Detail page par poori jaankari, map aur inquiry form dekhein."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-3">
              {TRUST_POINTS.map((point) => (
                <span
                  key={point.label}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 backdrop-blur"
                >
                  <point.icon className="h-4 w-4 text-gold" />
                  {point.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project cards */}
      <section className="bg-alabaster py-20 md:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.href} delay={i * 120}>
              <article className="group grid overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/60 lg:grid-cols-2">
                <div className="relative">
                  <ImageSlot
                    src={project.image}
                    alt={project.name}
                    label={project.name}
                    className="h-full min-h-72"
                    sizes="(max-width: 1024px) 100vw, 600px"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                    {project.badge}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <h2 className="text-2xl font-extrabold tracking-tight text-charcoal transition-colors group-hover:text-brand">
                    {project.name}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-gold" />
                    {project.location}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                    {project.desc}
                  </p>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 text-sm font-extrabold text-charcoal">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={project.href}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    View Full Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="bg-alabaster pb-20 md:pb-28">
        <Reveal>
          <CTABand
            title="Koi Sawaal Ho Ya Site Visit Book Karni Ho?"
            sub="Seedha call ya WhatsApp karein — hamari team aapko poora project walkthrough degi."
          />
        </Reveal>
      </div>
    </>
  );
}
