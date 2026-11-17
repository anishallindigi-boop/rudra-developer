import Reveal from "./Reveal";
import CTABand from "./CTABand";

/** Brand-red call-to-action band with the standard alabaster spacing. */
export default function CtaSection({
  title,
  sub,
  className = "pb-20 pt-4 md:pb-28",
}: {
  title?: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`bg-alabaster ${className}`}>
      <Reveal>
        <CTABand title={title} sub={sub} />
      </Reveal>
    </div>
  );
}
