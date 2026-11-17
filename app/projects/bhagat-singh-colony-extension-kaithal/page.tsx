import type { Metadata } from "next";

export const instant = false;
import ProjectHero from "@/components/ProjectHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import InquiryForm from "@/components/InquiryForm";
import ImageSlot from "@/components/ImageSlot";
import ZoomSlot from "@/components/ZoomSlot";
import {
  MapPin,
  Lock,
  Lightbulb,
  Ruler,
  ShieldCheck,
  WhatsApp,
  Phone,
  ArrowRight,
} from "@/components/icons";
import { SITE, waLink } from "@/lib/site";
import { getProject } from "@/lib/api";

export const metadata: Metadata = {
  title: "Bhagat Singh Colony Extension, Kaithal — Prime Residential Plots",
  description: "Modern residential plotted colony in Kaithal with secure boundary wall, grand lighting gate, street lighting and well-planned layout.",
};

const FEATURE_ICONS = [Lock, Lightbulb, Lightbulb, Ruler, MapPin, ShieldCheck];

export default async function KaithalPage() {
  const project = await getProject("bhagat-singh-colony-extension-kaithal");

  const name = project?.name || "Bhagat Singh Colony Extension, Kaithal";
  const badge = project?.badge || "Prime Residential Plots in Kaithal";
  const location = project?.location || "Near HUDA Sector 19, Kaithal";
  const overview = project?.overview || project?.description || "Bhagat Singh Colony Extension un parivaron ke liye design kiya gaya hai jo Kaithal mein ek peaceful, secure aur easily accessible residential area ki talash mein hain.";
  const image = project?.image || "/images/kaithal-hero.jpg";
  const amenities = project?.amenities?.length ? project.amenities : ["Secure Boundary Wall", "Grand Lighting Gate", "Street Lighting", "Well-Planned Layout", "Prime Neighborhood", "Safe Investment"];

  const FACTS = [
    { label: "Location", value: location },
    { label: "Security", value: "Secure Boundary Wall All Around" },
    { label: "Entrance", value: "Grand Lighting Gate" },
    { label: "Utilities", value: "Street Lighting" },
    { label: "Layout", value: "Well-Planned, Master Map Available" },
  ];

  return (
    <>
      <ProjectHero
        badge={badge}
        crumb="Bhagat Singh Colony Ext."
        image={image}
        alt={name}
        title={<>Bhagat Singh Colony Extension — <span className="text-gold">Secure &amp; Well-Connected Living</span></>}
        sub="Kaithal ke prime location par modern amenities, boundary wall aur lighting gate ke saath residential plots — turant ghar banane aur long-term investment dono ke liye."
        ctas={
          <>
            <a href="#master-map" className="flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark">View Master Plan / Map</a>
            <a href={waLink("Hello Shree Rudra Developers! Mujhe Bhagat Singh Colony Extension, Kaithal ka price list chahiye.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold">Request Price List</a>
          </>
        }
      />

      <section className="relative z-10 -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-5 lg:p-7">
              {FACTS.map((fact) => (
                <div key={fact.label} className="rounded-2xl bg-alabaster px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{fact.label}</p>
                  <p className="mt-1.5 text-sm font-extrabold leading-tight tracking-tight text-charcoal">{fact.value}</p>
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
              <SectionHeading align="left" eyebrow="Project Overview" title="Peaceful, Secure & Easily Accessible" />
              <p className="mt-6 leading-relaxed text-slate-700">{overview}</p>
              <p className="mt-4 leading-relaxed text-slate-700">Boundary wall, lighting gate aur street lighting ke saath colony already secure hai — aap bas plot choose karein aur construction start karein. Location HUDA Sector 19 aur city centre ke paas hone se daily life kaafi convenient hai.</p>
              <ul className="mt-7 space-y-3">
                {["Secure boundary wall all around the colony", "Grand lighting gate + street lighting", "Well-planned layout with wide internal roads", "Prime neighborhood near markets, schools & HUDA Sector 19"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-tint text-brand"><ShieldCheck className="h-3.5 w-3.5" /></span>
                    <span className="text-sm font-semibold text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={150}><ImageSlot src="/images/kaithal-overview.jpg" alt={name} label="Kaithal Overview Image" className="aspect-[4/3] rounded-3xl shadow-2xl shadow-slate-200" sizes="(max-width: 1024px) 100vw, 560px" /></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><SectionHeading eyebrow="Key Features & Amenities" title="Everything You'd Expect From a Premium Colony" /></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <Reveal key={item} delay={i * 80}>
                  <div className="group h-full rounded-3xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-5 text-base font-extrabold tracking-tight text-charcoal">{item}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="master-map" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><SectionHeading eyebrow="Site Plan & Master Map" title="Approved Layout Plan — Bhagat Singh Colony Extension" sub="Zoom in/out buttons se map ko detail mein dekhein, ya scroll karke explore karein." /></Reveal>
          <Reveal delay={150} className="mt-12">
            <ZoomSlot src="/images/kaithal-master-map.jpg" alt="Master map" label="FINAL MAP – Bhagat Singh Colony Extension" />
            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Caption: Approved Layout Plan — Bhagat Singh Colony Extension</p>
          </Reveal>
        </div>
      </section>

      <section id="inquiry" className="bg-alabaster py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <SectionHeading align="left" eyebrow="Contact & Site Visit" title="Site & Office Location" sub="Aaeye, colony dekhein, plot choose karein. Hamara office HUDA Sector 19, Kaithal mein hai." />
                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Site &amp; Office Location</p>
                    <p className="mt-1.5 text-sm font-bold text-charcoal">{SITE.address}</p>
                    <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline">View on Google Maps <ArrowRight className="h-3.5 w-3.5" /></a>
                  </div>
                  <a href={waLink("Hello Shree Rudra Developers! Mujhe Bhagat Singh Colony Extension, Kaithal ke baare mein jaankari chahiye.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"><WhatsApp className="h-6 w-6" /></span>
                    <div><p className="text-sm font-extrabold text-charcoal">Call / WhatsApp for Booking</p><p className="text-xs text-slate-500">{SITE.phoneDisplay}</p></div>
                  </a>
                  <a href={SITE.phoneHref} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white"><Phone className="h-6 w-6" /></span>
                    <div><p className="text-sm font-extrabold text-charcoal">Direct Call</p><p className="text-xs text-slate-500">{SITE.phoneDisplay}</p></div>
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}><InquiryForm defaultProject="Bhagat Singh Colony Extension, Kaithal" /></Reveal>
          </div>
        </div>
      </section>

      <div className="bg-alabaster pb-20 md:pb-28"><Reveal><CTABand title="Plot Book Karna Hai?" sub="Aaj hi call ya WhatsApp karein — site visit turant arrange kar diya jaayega." /></Reveal></div>
    </>
  );
}
