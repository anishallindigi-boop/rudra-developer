import { getProjects } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import CtaSection from "@/components/home/CtaSection";
import VideoSection from "@/components/home/VideoSection";
import ContactSection from "@/components/home/ContactSection";

export const instant = false;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <WhyUsSection />
      <CtaSection />
      <VideoSection />
      <ContactSection />
    </>
  );
}
