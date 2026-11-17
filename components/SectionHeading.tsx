export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gold ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-gold" aria-hidden="true" />}
      </p>
      <h2 className={`mt-4 text-3xl font-extrabold tracking-tight md:text-4xl ${light ? "text-white" : "text-charcoal"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-base leading-relaxed ${light ? "text-slate-300" : "text-slate-500"}`}>{sub}</p>}
    </div>
  );
}
