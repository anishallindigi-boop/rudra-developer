import type { Metadata } from "next";

export const instant = false;
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { getBlogs } from "@/lib/api";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Blog",
  description: "Shree Rudra Developers blog — real estate tips, DDJAY, plot investment guides.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pb-20 pt-36">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal><SectionHeading align="left" light eyebrow="Blog" title="Insights & Guides" sub="Real estate tips, DDJAY updates, plot investment guides aur colony updates." /></Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 && (
            <div className="text-center text-slate-500">No blog posts yet. Check back soon.</div>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => (
              <Reveal key={b.slug} delay={i * 100}>
                <Link href={`/blog/${b.slug}`} className="group block overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all hover:-translate-y-1.5 hover:shadow-2xl">
                  <ImageSlot src={b.coverImage || "/images/about.jpg"} alt={b.title} label={b.title} className="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 400px" imgClassName="transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {(b.tags || []).map((t) => <span key={t} className="rounded-full bg-rose-tint px-3 py-1 text-xs font-bold text-brand">{t}</span>)}
                    </div>
                    <h3 className="mt-3 text-lg font-extrabold tracking-tight text-charcoal group-hover:text-brand">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">{b.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
