import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactDetails from "@/components/ContactDetails";
import MapEmbed from "@/components/MapEmbed";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact & Office Details"
            title="Visit Us, Let's Talk, Explore the Site"
            sub="Walk into our office, give us a call, or connect with us on WhatsApp — our team will respond promptly."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <ContactDetails />
          </Reveal>
          <Reveal delay={150} className="h-full">
            <MapEmbed label="HUDA Sector 19, Kaithal, Haryana" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
