import type { ReactNode } from "react";

/**
 * Renders the project's `bannerheading` (from the admin panel) with the part
 * after the dash highlighted in gold. Falls back to the hard-coded title when
 * the project has no banner heading yet.
 */
export default function ProjectBannerTitle({
  heading,
  fallback,
}: {
  heading?: string;
  fallback: ReactNode;
}) {
  if (!heading) return <>{fallback}</>;

  const match = heading.match(/^(.*?)\s*[–—]\s*(.+)$/);
  if (!match) return <>{heading}</>;

  return (
    <>
      {match[1]} <span className="text-gold">{match[2]}</span>
    </>
  );
}
