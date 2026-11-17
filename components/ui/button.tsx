import { cn } from "@/lib/utils";

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
        variant === "default" && "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        variant === "destructive" && "bg-destructive text-white shadow-xs hover:bg-destructive/90",
        variant === "outline" && "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        variant === "link" && "text-primary underline-offset-4 hover:underline",
        size === "default" && "h-9 px-4 py-2 has-[>svg]:px-3",
        size === "sm" && "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        size === "lg" && "h-10 rounded-md px-6 has-[>svg]:px-4",
        size === "icon" && "size-9",
        className
      )}
      {...props}
    />
  );
}

export { Button };
