import { Instagram, Facebook } from "./icons";
import { SITE } from "@/lib/site";

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-brand"
      >
        <Instagram className="h-4 w-4" />
        Instagram <span className="font-normal text-slate-400">(@shree.rudradevelopers)</span>
      </a>
      <span className="h-4 w-px bg-slate-200" aria-hidden="true" />
      <a
        href={SITE.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 font-semibold text-slate-600 transition-colors hover:text-brand"
      >
        <Facebook className="h-4 w-4" />
        Shree Rudra Developers
      </a>
    </div>
  );
}
