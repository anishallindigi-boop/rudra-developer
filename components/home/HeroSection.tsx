import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import HeroCtas from "@/components/HeroCtas";
import { ShieldCheck, ArrowRight } from "@/components/icons";
import { waLink } from "@/lib/site";

const STATS = [
  { value: "12+", label: "Acres Developed" },
  { value: "206+", label: "Residential Plots" },
  { value: "2", label: "Live Townships" },
  { value: "100%", label: "RERA Compliant" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-charcoal">
      <ImageSlot
        src="/Luxury SRH Entrance at Twilight.png"
        alt="Shree Rudra Developers township aerial view"
        label="Home Hero Background"
        className="absolute inset-0"
        sizes="100vw"
        preload
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/40"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-40 pt-36 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            RERA-Approved Projects • Haryana
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Building Modern Living Spaces &amp;{" "}
            <span className="text-gold">Trusted Communities</span> in Haryana
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Shree Rudra Developers is a full-service real estate development and
            sales firm dedicated to creating RERA-approved residential townships,
            modern plotted colonies, and high-growth investment opportunities.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-9">
            <HeroCtas
              primary={{
                label: "Explore Projects",
                href: "/projects",
                icon: (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                ),
              }}
              secondary={{
                label: "Contact Sales Team",
                href: waLink("Hello Shree Rudra Developers! Mujhe sales team se baat karni hai."),
              }}
            />
          </div>
        </Reveal>
      </div>

      {/* Stats strip */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:border-r md:border-white/10 md:last:border-none">
              <p className="text-3xl font-extrabold text-gold md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
