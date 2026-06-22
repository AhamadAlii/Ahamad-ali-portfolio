import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-surface-border bg-surface-strong px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
