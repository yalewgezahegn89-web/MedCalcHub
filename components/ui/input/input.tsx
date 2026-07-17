"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { InputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, disabled, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
