import type { Metadata } from "next";

export const instant = false;
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { getBlog } from "@/lib/api";
import { ArrowRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  return { title: blog?.title || "Blog", description: blog?.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal pb-16 pt-36">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-gold hover:underline">← Back to Blog</Link>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{blog.title}</h1>
            {blog.author && <p className="mt-3 text-sm text-slate-400">By {blog.author}</p>}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {blog.coverImage && (
            <ImageSlot src={blog.coverImage} alt={blog.title} label={blog.title} className="mb-8 aspect-[16/9] rounded-2xl" sizes="(max-width: 768px) 100vw, 768px" />
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {(blog.tags || []).map((t) => <span key={t} className="rounded-full bg-rose-tint px-3 py-1 text-xs font-bold text-brand">{t}</span>)}
          </div>
          <article className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
          <div className="mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">← Back to all posts <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
