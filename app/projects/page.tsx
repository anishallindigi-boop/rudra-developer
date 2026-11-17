import type { Metadata } from "next";

export const instant = false;
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import ProjectListCard from "@/components/projects/ProjectListCard";
import { ShieldCheck, Lock, Ruler, Lightbulb } from "@/components/icons";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Shree Rudra Developers ke live projects — Shree Rudra Homes Narwana (DDJAY RERA-approved township) aur Bhagat Singh Colony Extension Kaithal.",
};

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "RERA-Approved Projects" },
  { icon: Lock, label: "Gated & Secure Colonies" },
  { icon: Ruler, label: "Well-Planned Layouts" },
  { icon: Lightbulb, label: "Modern Infrastructure" },
];

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Live Projects — Plot Chuune Ka Mauka"
        sub="Har project government approvals, modern planning aur quality infrastructure ke saath. Detail page par poori jaankari, map aur inquiry form dekhein."
      >
        <div className="flex flex-wrap gap-3">
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
      </PageHero>

      <section className="bg-alabaster py-20 md:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120}>
              <ProjectListCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* <CtaSection
        title="Koi Sawaal Ho Ya Site Visit Book Karni Ho?"
        sub="Seedha call ya WhatsApp karein — hamari team aapko poora project walkthrough degi."
      /> */}
    </>
  );
}
