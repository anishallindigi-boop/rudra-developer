import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import WhyUsCards from "@/components/WhyUsCards";

export default function WhyUsSection() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us?"
            title="Quality, Legal Clarity & Trust — Har Step Par"
          />
        </Reveal>
        <div className="mt-14">
          <WhyUsCards />
        </div>
      </div>
    </section>
  );
}
