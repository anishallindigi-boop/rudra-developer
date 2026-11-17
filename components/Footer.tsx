import Link from "next/link";
import Logo from "./Logo";
import {
  Phone,
  MapPin,
  WhatsApp,
  Instagram,
  Facebook,
  ArrowRight,
} from "./icons";
import { SITE, waLink } from "../lib/site";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Our Projects" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const PROJECTS = [
  {
    href: "/projects/shree-rudra-homes-narwana",
    name: "Shree Rudra Homes, Narwana",
    note: "DDJAY • RERA-Approved Township",
  },
  {
    href: "/projects/bhagat-singh-colony-extension-kaithal",
    name: "Bhagat Singh Colony Ext., Kaithal",
    note: "Prime Residential Plots",
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            Full-service real estate development &amp; sales firm — RERA-approved
            residential townships, modern plotted colonies aur high-growth
            investment opportunities Haryana mein.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-gold hover:text-gold"
            >
              <WhatsApp className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            Quick Links
          </h3>
          <ul className="mt-6 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-1" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            Our Projects
          </h3>
          <ul className="mt-6 space-y-5">
            {PROJECTS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group block">
                  <span className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-gold">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">{p.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            Contact
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="text-slate-300">{SITE.address}</span>
            </li>
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 shrink-0 text-gold" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hello Shree Rudra Developers! Mujhe aapke projects ke baare mein jaankari chahiye.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <WhatsApp className="h-5 w-5 shrink-0 text-gold" />
                WhatsApp par message karein
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <p className="text-xs text-slate-500">
            © 2026 Shree Rudra Developers. All rights reserved.
          </p>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
