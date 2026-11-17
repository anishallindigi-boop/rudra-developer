import type { Metadata } from "next";

export const instant = false;
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog",
  description: "Shree Rudra Developers blog — real estate tips, DDJAY, plot investment guides.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights & Guides"
        sub="Real estate tips, DDJAY updates, plot investment guides aur colony updates."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 && (
            <div className="text-center text-slate-500">
              No blog posts yet. Check back soon.
            </div>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, i) => (
              <Reveal key={blog.slug} delay={i * 100}>
                <BlogCard blog={blog} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
