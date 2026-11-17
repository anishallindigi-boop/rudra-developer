import type { Project } from "./api";

/** Card / hero fallback images per project slug (files live in public/images). */
export const PROJECT_FALLBACK_IMAGES: Record<string, string> = {
  "shree-rudra-homes-narwana": "/image.png",
  "bhagat-singh-colony-extension-kaithal": "/image.png",
};

export function projectImage(
  project?: Pick<Project, "slug" | "image"> | null,
  fallback = "/image.png",
): string {
  if (!project) return fallback;
  return project.image || PROJECT_FALLBACK_IMAGES[project.slug] || fallback;
}
