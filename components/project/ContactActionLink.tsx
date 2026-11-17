import { Phone, WhatsApp, ArrowRight } from "@/components/icons";
import { SITE } from "@/lib/site";

/** Icon + title + subtitle link row used in project inquiry sections. */
export default function ContactActionLink({
  icon,
  title,
  subtitle,
  href,
  iconBg = "bg-brand",
  display = SITE.phoneDisplay,
  external = true,
}: {
  icon: "whatsapp" | "phone" | "maps";
  title: string;
  subtitle?: string;
  href: string;
  iconBg?: string;
  display?: string;
  external?: boolean;
}) {
  const Icon = icon === "whatsapp" ? WhatsApp : icon === "phone" ? Phone : ArrowRight;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${iconBg}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-sm font-extrabold text-charcoal">{title}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        {!subtitle && <p className="text-xs text-slate-500">{display}</p>}
      </div>
    </a>
  );
}
