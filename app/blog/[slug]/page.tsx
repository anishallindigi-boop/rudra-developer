import type { Metadata } from "next";

export const instant = false;
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogHero from "@/components/blog/BlogHero";
import ImageSlot from "@/components/ImageSlot";
import TagList from "@/components/blog/TagList";
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
      <BlogHero title={blog.title} author={blog.author} />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {blog.coverImage && (
            <ImageSlot
              src={blog.coverImage}
              alt={blog.title}
              label={blog.title}
              className="mb-8 aspect-[16/9] rounded-2xl"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          )}
          <TagList tags={blog.tags} className="mb-6" />
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              ← Back to all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
