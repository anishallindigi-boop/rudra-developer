import Reveal from "./Reveal";
import { ShieldCheck, Building2, MapPin, CalendarCheck } from "./icons";

const ITEMS = [
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

/** The four "why choose us" cards — used on Home (tinted) and About (white). */
export default function WhyUsCards({
  variant = "tinted",
}: {
  variant?: "tinted" | "white";
}) {
  const tinted = variant === "tinted";

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((item, i) => (
        <Reveal key={item.title} delay={i * 100}>
          <div
            className={`group h-full rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
              tinted
                ? "bg-rose-tint hover:shadow-xl hover:shadow-brand/10"
                : "bg-white shadow-sm hover:shadow-xl hover:shadow-brand/10"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-md shadow-brand/10 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
              <item.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold tracking-tight text-charcoal">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
