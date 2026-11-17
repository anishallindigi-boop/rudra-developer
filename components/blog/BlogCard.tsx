import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import TagList from "./TagList";
import { ArrowRight } from "@/components/icons";
import { imageSrc } from "@/lib/imageUrl";
import type { Blog } from "@/lib/api";

/** Blog post card for the /blog listing grid. */
export default function BlogCard({ blog }: { blog: Blog }) {
  const cover = imageSrc(blog.coverImage || "/images/narwana-card.jpg");

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/60 transition-all hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <ImageSlot
        src={cover}
        alt={blog.title}
        label={blog.title}
        className="aspect-[16/10]"
        sizes="(max-width: 768px) 100vw, 400px"
        imgClassName="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-6">
        <TagList tags={blog.tags} />
        <h3 className="mt-3 text-lg font-extrabold tracking-tight text-charcoal group-hover:text-brand">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {blog.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
