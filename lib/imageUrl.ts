/** Origin of the Express API that serves /uploads/* (e.g. http://localhost:5000). */
export const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
  /\/api\/?$/,
  "",
);

/** Turn a stored path like "/uploads/x.jpg" into a loadable absolute URL. */
export function imageSrc(url?: string | null): string {
  if (!url) return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}
