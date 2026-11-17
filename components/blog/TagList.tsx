export default function TagList({
  tags,
  className = "",
}: {
  tags?: string[];
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-rose-tint px-3 py-1 text-xs font-bold text-brand"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
