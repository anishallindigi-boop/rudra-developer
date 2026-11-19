import type { Metadata } from "next";

export const instant = false;
import ProjectHero from "@/components/ProjectHero";
import ProjectBannerTitle from "@/components/ProjectBannerTitle";
import HeroCtas from "@/components/HeroCtas";
import ImageSlot from "@/components/ImageSlot";
import CtaSection from "@/components/CtaSection";
import ProjectFacts from "@/components/project/ProjectFacts";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectLocationAdvantages from "@/components/project/ProjectLocationAdvantages";
import ProjectGlimpse from "@/components/project/ProjectGlimpse";
import ProjectImmersiveTour from "@/components/project/ProjectImmersiveTour";
import ProjectPremiereOffering from "@/components/project/ProjectPremiereOffering";
import ProjectAboutPoints from "@/components/project/ProjectAboutPoints";
import ProjectBrochure from "@/components/project/ProjectBrochure";
import ProjectConnectivity from "@/components/project/ProjectConnectivity";
import ProjectInquiry from "@/components/project/ProjectInquiry";
import ContactActionLink from "@/components/project/ContactActionLink";
import {
  Lock,
  Ruler,
  Lightbulb,
  Tree,
  Droplet,
  ShieldCheck,
  Download,
} from "@/components/icons";
import { SITE, waLink } from "@/lib/site";
import { getProject } from "@/lib/api";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ZoomSlot from "@/components/ZoomSlot";

export const metadata: Metadata = {
  title: "Shree Rudra Homes, Narwana — Premium Residential Plots",
  description: "HRERA-approved plotted residential township under DDJAY in Sector 15, Narwana (District Jind). 206 plots, 118–180 Sq. Yds., ~11.99 acres. RERA No. HRERA-PKL-JND-991-2026.",
};

const AMENITY_ICONS = [Lock, Ruler, Lightbulb, Tree, Droplet, ShieldCheck];

export default async function NarwanaPage() {
  const project = await getProject("shree-rudra-homes-narwana");

  const name = project?.name || "Shree Rudra Homes, Narwana";
  const badge = project?.badge || "HRERA Approved | Deen Dayal Jan Awas Yojana (DDJAY)";
  const overview = project?.overview || project?.description ||
    "Sector 15, Narwana (District Jind) mein lagbhag 12 acres mein faila Shree Rudra Homes ek modern residential plotted township hai.";
  const image = project?.image || "/images/narwana-card.jpg";
  const area = project?.area || "~11.99 Acres";
  const totalUnits = project?.totalUnits || "206 Residential Plots";
  const plotSizes = project?.plotSizes || "118 – 180 Sq. Yds.";
  const reraNo = project?.reraNo || "HRERA-PKL-JND-991-2026";
  const policy = project?.policy || "Deen Dayal Jan Awas Yojana (DDJAY)";
  const amenities = project?.amenities?.length
    ? project.amenities
    : ["Gated Entry & Secure Boundary Wall", "Wide Internal Paved Roads", "Street Lighting", "Landscaped Green Parks & Open Spaces", "Underground Water Supply & Sewerage System", "24x7 Security & Power Backup Infrastructure"];
  const locationAdvantages = project?.locations?.length ? project.locations : [
    { name: "Kamla Memorial Government College", distance: "1.9 km" },
    { name: "NH-52 Highway", distance: "2.0 km" },
    { name: "Narwana Bus Stand", distance: "2.5 km" },
    { name: "D.A.V. Centenary Public School", distance: "3.2 km" },
    { name: "Narwana Budget Mall", distance: "3.5 km" },
    { name: "Nandini Hospital", distance: "5.6 km" },
    { name: "Narwana Junction Railway Station", distance: "6.7 km" },
  ];

  const facts = [
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
        title={
          <ProjectBannerTitle
            heading={project?.bannerheading}
            fallback={<>Shree Rudra Homes — Premium Residential Plots in <span className="text-gold">Sector 15, Narwana</span></>}
          />
        }
        sub="Apne sapno ka ghar banayein ek secure, government-approved aur well-planned residential township mein — DDJAY policy ke antargat, HRERA-registered."
        ctas={
          <HeroCtas
            primary={{
              label: "Download Brochure",
              href: waLink("Hello Shree Rudra Developers! Mujhe Shree Rudra Homes, Narwana ka brochure chahiye."),
              icon: <Download className="h-4 w-4" />,
            }}
            secondary={{ label: "Book a Free Site Visit", href: "#inquiry" }}
          />
        }
      />

      <ProjectFacts facts={facts} />

      <ProjectOverview
        title="Modern Township, Narwana ke Dil Mein"
        paragraphs={[
          overview,
          `Har plot registry aur possession ke saath aata hai, aur pura township HRERA se registered hai (${reraNo}). Aap invest kar rahe ho ek fully-developed, legally-safe property mein.`,
        ]}
        image="/images/narwana-overview.jpg"
        imageAlt={name}
        imageLabel="Narwana Overview Image"
      />

      <ProjectAmenities
        eyebrow="Township Amenities"
        title="Everything You Need, Right Here"
        sub="Modern infrastructure, safety aur green living — sab kuch ek gated township ke andar."
        items={amenities}
        icons={AMENITY_ICONS}
      />

      <ProjectLocationAdvantages
        items={locationAdvantages}
        image="/images/narwana-overview.jpg"
        imageLabel="Location Image / Map"
      />

      <ProjectGlimpse items={project?.glimpse} fallbackImage="/images/narwana-overview.jpg" />
      <ProjectImmersiveTour items={project?.immersivetour} fallbackImage="/images/narwana-overview.jpg" />
      <ProjectPremiereOffering items={project?.premiereoffering} fallbackImage="/images/narwana-overview.jpg" />

      <ProjectAboutPoints
        heading={project?.aboutheading}
        subheading={project?.aboutsubheading}
        paragraphs={[project?.aboutpara1, project?.aboutpara2]}
        points={[
          project?.abountpointone,
          project?.abountpointtwo,
          project?.abountpointthree,
          project?.abountpointfour,
        ]}
      />

      <ProjectBrochure
        title={project?.brochuretitle}
        paragraph={project?.brochurepara}
        image={project?.brochureimage || "/images/narwana-overview.jpg"}
        pdf={project?.brochurepdf}
      />

      <ProjectConnectivity image={project?.connectivity} />


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
              src="/images/narwana-map1.png"
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
        eyebrow="Book Your Plot"
        title="Book Your Plot in Shree Rudra Homes Today"
        sub="Free site visit schedule karein ya brochure maangein — hamari team aapko plot selection, pricing aur registry process mein help karegi."
        defaultProject="Shree Rudra Homes, Narwana"
      >
        <ContactActionLink
          icon="whatsapp"
          iconBg="bg-[#25D366]"
          title="WhatsApp"
          subtitle={`Instant reply — ${SITE.phoneDisplay}`}
          href={waLink("Hello Shree Rudra Developers! Mujhe Shree Rudra Homes, Narwana ke baare mein jaankari chahiye.")}
        />
        <ContactActionLink
          icon="phone"
          title="Call Now"
          subtitle={SITE.phoneDisplay}
          href={SITE.phoneHref}
          external={false}
        />
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <ImageSlot
            src="/images/narwana-overview.jpg"
            alt="Master plan"
            label="Master Plan Image"
            className="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 560px"
            imgClassName="object-contain"
          />
          <div className="border-t border-slate-100 px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Township Master Plan — Shree Rudra Homes, Narwana
            </p>
          </div>
        </div>




      </ProjectInquiry>

      <CtaSection
        title="Site Visit Book Karna Hai?"
        sub="Aaj hi call karein — hamari team aapko site dikhaane ke liye ready hai."
      />
    </>
  );
}
