"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, Phone, WhatsApp } from "./icons";
import { SITE } from "../lib/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  // { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo light={!solid} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-brand ${
                solid ? "text-charcoal" : "text-white/90 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${
              solid ? "text-charcoal hover:text-brand" : "text-white hover:text-gold"
            }`}
          >
            <Phone className="h-4 w-4 text-gold" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <WhatsApp className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
            solid ? "text-charcoal hover:bg-rose-tint" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-b border-slate-100 shadow-lg" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-rose-tint hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-base font-bold text-white"
          >
            <Phone className="h-4 w-4" />
            Call: {SITE.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
