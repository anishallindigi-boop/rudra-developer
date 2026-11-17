import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactDetails from "@/components/ContactDetails";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Shree Rudra Developers se contact karein — office HUDA Sector 19, Kaithal. Call, WhatsApp ya site visit book karein.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Aaeye, Baat Karein, Site Dekhein"
        sub="Office par walk-in karein, call karein ya WhatsApp karein — hamari team turant reply karegi."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <ContactDetails />
            </Reveal>
            <Reveal delay={150} className="h-full">
              <MapEmbed title="Office Location" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
