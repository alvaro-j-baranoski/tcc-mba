import { cn } from "@/lib/utils";

export function HomeSection({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
