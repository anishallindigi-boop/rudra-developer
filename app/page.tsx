import { getProjects } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import AboutStory from "@/components/AboutStory";
import ProjectsSection from "@/components/home/ProjectsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CtaSection from "@/components/CtaSection";
import VideoSection from "@/components/home/VideoSection";
import ContactSection from "@/components/home/ContactSection";
import MapSection from "@/components/home/MapSection";

export const instant = false;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <HeroSection />

      <AboutStory
        eyebrow="About Us"
        title="A Trusted Name in Haryana Real Estate"
        paragraphs={[
          "Shree Rudra Developers ek bharosemand real estate development aur sales firm hai jo modern urban planning aur transparent property deals ke liye jaani jaati hai. Hum residential plots se lekar complete township development tak har stage par quality aur legal clarity (HRERA approved) par focus karte hain — taaki aap aur aapka parivar ek safe aur future-ready jagah par apna ghar bana sakein.",
        ]}
        highlights={[
          "100% Legal & RERA Compliant",
          "Modern Urban Planning",
          "Transparent Property Deals",
          "HRERA-Approved Projects",
        ]}
        showStatCard
      />

      <ProjectsSection projects={projects} />
      <WhyUsSection />
      {/* <CtaSection /> */}
      <VideoSection />
<MapSection/>
      <ContactSection />
    </>
  );
}
