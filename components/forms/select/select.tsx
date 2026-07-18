"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { SelectProps } from "./select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, disabled, error, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          error && "border-destructive",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          error
            ? "focus-visible:ring-destructive"
            : "focus-visible:ring-primary/50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
