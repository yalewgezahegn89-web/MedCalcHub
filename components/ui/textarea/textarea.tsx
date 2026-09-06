"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { TextareaProps } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, disabled, error, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground",
          "placeholder:text-muted-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          error && "border-destructive",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          error
            ? "focus-visible:ring-destructive"
            : "focus-visible:ring-primary/50",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";