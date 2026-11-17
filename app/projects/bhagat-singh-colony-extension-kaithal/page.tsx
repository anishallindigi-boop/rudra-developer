import type { Metadata } from "next";

export const instant = false;
import ProjectHero from "@/components/ProjectHero";
import ProjectBannerTitle from "@/components/ProjectBannerTitle";
import HeroCtas from "@/components/HeroCtas";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ZoomSlot from "@/components/ZoomSlot";
import InfoCard from "@/components/InfoCard";
import CtaSection from "@/components/CtaSection";
import ProjectFacts from "@/components/project/ProjectFacts";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectInquiry from "@/components/project/ProjectInquiry";
import ContactActionLink from "@/components/project/ContactActionLink";
import {
  MapPin,
  Lock,
  Lightbulb,
  Ruler,
  ShieldCheck,
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
  const overview = project?.overview || project?.description ||
    "Bhagat Singh Colony Extension un parivaron ke liye design kiya gaya hai jo Kaithal mein ek peaceful, secure aur easily accessible residential area ki talash mein hain.";
  const image = project?.image || "/images/kaithal-card.jpg";
  const amenities = project?.amenities?.length
    ? project.amenities
    : ["Secure Boundary Wall", "Grand Lighting Gate", "Street Lighting", "Well-Planned Layout", "Prime Neighborhood", "Safe Investment"];

  const facts = [
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
        title={
          <ProjectBannerTitle
            heading={project?.bannerheading}
            fallback={<>Bhagat Singh Colony Extension — <span className="text-gold">Secure &amp; Well-Connected Living</span></>}
          />
        }
        sub="Kaithal ke prime location par modern amenities, boundary wall aur lighting gate ke saath residential plots — turant ghar banane aur long-term investment dono ke liye."
        ctas={
          <HeroCtas
            primary={{ label: "View Master Plan / Map", href: "#master-map" }}
            secondary={{
              label: "Request Price List",
              href: waLink("Hello Shree Rudra Developers! Mujhe Bhagat Singh Colony Extension, Kaithal ka price list chahiye."),
            }}
          />
        }
      />

      <ProjectFacts facts={facts} />

      <ProjectOverview
        title="Peaceful, Secure & Easily Accessible"
        paragraphs={[
          overview,
          "Boundary wall, lighting gate aur street lighting ke saath colony already secure hai — aap bas plot choose karein aur construction start karein. Location HUDA Sector 19 aur city centre ke paas hone se daily life kaafi convenient hai.",
        ]}
        bullets={[
          "Secure boundary wall all around the colony",
          "Grand lighting gate + street lighting",
          "Well-planned layout with wide internal roads",
          "Prime neighborhood near markets, schools & HUDA Sector 19",
        ]}
        image="/images/kaithal-overview.jpg"
        imageAlt={name}
        imageLabel="Kaithal Overview Image"
      />

      <ProjectAmenities
        eyebrow="Key Features & Amenities"
        title="Everything You'd Expect From a Premium Colony"
        items={amenities}
        icons={FEATURE_ICONS}
      />

      <section id="master-map" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Site Plan & Master Map"
              title="Approved Layout Plan — Bhagat Singh Colony Extension"
              sub="Zoom in/out buttons se map ko detail mein dekhein, ya scroll karke explore karein."
            />
          </Reveal>
          <Reveal delay={150} className="mt-12">
            <ZoomSlot
              src="/images/kaithal-card.jpg"
              alt="Master map"
              label="FINAL MAP – Bhagat Singh Colony Extension"
            />
            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Caption: Approved Layout Plan — Bhagat Singh Colony Extension
            </p>
          </Reveal>
        </div>
      </section>

      <ProjectInquiry
        eyebrow="Contact & Site Visit"
        title="Site & Office Location"
        sub="Aaeye, colony dekhein, plot choose karein. Hamara office HUDA Sector 19, Kaithal mein hai."
        defaultProject="Bhagat Singh Colony Extension, Kaithal"
      >
        <InfoCard icon={MapPin} title="Site & Office Location">
          <p className="font-bold text-charcoal">{SITE.address}</p>
          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
          >
            View on Google Maps
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </InfoCard>
        <ContactActionLink
          icon="whatsapp"
          iconBg="bg-[#25D366]"
          title="Call / WhatsApp for Booking"
          subtitle={SITE.phoneDisplay}
          href={waLink("Hello Shree Rudra Developers! Mujhe Bhagat Singh Colony Extension, Kaithal ke baare mein jaankari chahiye.")}
        />
        <ContactActionLink
          icon="phone"
          title="Direct Call"
          subtitle={SITE.phoneDisplay}
          href={SITE.phoneHref}
          external={false}
        />
      </ProjectInquiry>

      <CtaSection
        title="Plot Book Karna Hai?"
        sub="Aaj hi call ya WhatsApp karein — site visit turant arrange kar diya jaayega."
      />
    </>
  );
}
