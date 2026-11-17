/** Origin of the Express API that serves /uploads/* (e.g. http://localhost:5000). */
export const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  "",
);

/**
 * Resolve an image path stored by the admin:
 * - "/uploads/x.jpg" -> "http://localhost:5000/uploads/x.jpg" (served by Express)
 * - "/images/x.jpg" and other local paths stay as they are (files in public/)
 * - absolute URLs pass through unchanged
 */
export function imageSrc(url?: string | null): string {
  if (!url) return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  const normalized = url.startsWith("uploads/") ? `/${url}` : url;
  return normalized.startsWith("/uploads/") ? `${API_ORIGIN}${normalized}` : normalized;
}
