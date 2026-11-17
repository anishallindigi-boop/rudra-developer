import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import WhyUsCards from "@/components/WhyUsCards";

/** About page values section — reuses the shared WhyUsCards component. */
export default function AboutValues() {
  return (
    <section className="bg-alabaster py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Why Choose Us?" title="What Makes Us Different" />
        </Reveal>
        <div className="mt-14">
          <WhyUsCards variant="white" />
        </div>
      </div>
    </section>
  );
}
