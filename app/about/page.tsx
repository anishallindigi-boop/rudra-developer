import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AboutStory from "@/components/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Shree Rudra Developers — Haryana mein RERA-approved residential townships aur plotted colonies banane wali trusted real estate firm.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A Trusted Name in Haryana Real Estate"
        sub="Shree Rudra Developers ek bharosemand real estate development aur sales firm hai jo modern urban planning aur transparent property deals ke liye jaani jaati hai."
      />

      <AboutStory
        title="Quality, Legal Clarity & Trust — Har Step Par"
        paragraphs={[
          "Hum residential plots se lekar complete township development tak har stage par quality aur legal clarity (HRERA approved) par focus karte hain — taaki aap aur aapka parivar ek safe aur future-ready jagah par apna ghar bana sakein. Shree Rudra Homes, Narwana (DDJAY-approved, HRERA-registered) aur Bhagat Singh Colony Extension, Kaithal hamare do live projects hain.",
          "Transparent property deals, modern urban planning aur government-approved projects — yahi hamari pehchan hai. Aap invest kar rahe ho ek fully-developed, legally-safe property mein.",
        ]}
        highlights={[
          "100% Legal & RERA Compliant",
          "Modern Urban Planning",
          "Transparent Property Deals",
          "HRERA-Approved Projects",
          "End-to-End Assistance",
          "Prime Connectivity",
        ]}
      />

      <AboutValues />

      <CtaSection />
    </>
  );
}
