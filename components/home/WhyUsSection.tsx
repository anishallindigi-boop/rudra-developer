import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Building2, MapPin, CalendarCheck } from "@/components/icons";

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "100% Legal & RERA Compliant",
    desc: "Sabhi projects proper government approvals aur RERA guidelines ke anusaar develop kiye gaye hain — poora legal clarity.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    desc: "Wide paved roads, boundary walls, proper drainage aur street lighting — har colony mein world-class basics.",
  },
  {
    icon: MapPin,
    title: "Prime Connectivity",
    desc: "Har project highways, schools, hospitals aur city centers ke paas strategically plan kiya gaya hai.",
  },
  {
    icon: CalendarCheck,
    title: "End-to-End Assistance",
    desc: "Site visit se lekar registry aur possession tak — hamari team har step par aapke saath hai.",
  },
];

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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group h-full rounded-3xl bg-rose-tint p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-md shadow-brand/10 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
