import Link from "next/link";
import Reveal from "@/components/Reveal";

/** Blog article hero with h1 + back link. */
export default function BlogHero({ title, author }: { title: string; author?: string }) {
  return (
    <section className="relative overflow-hidden bg-charcoal pb-16 pt-36">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-wider text-gold hover:underline"
          >
            ← Back to Blog
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {title}
          </h1>
          {author && <p className="mt-3 text-sm text-slate-400">By {author}</p>}
        </Reveal>
      </div>
    </section>
  );
}
