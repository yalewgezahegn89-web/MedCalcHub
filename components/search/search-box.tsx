"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { SearchBoxProps } from "./search-box.types";

export const SearchBox = forwardRef<
  HTMLInputElement,
  SearchBoxProps
>(function SearchBox(
  {
    className,
    value,
    onChange,
    placeholder = "Search calculators...",
    ...props
  },
  ref,
) {
  return (
    <input
      ref={ref}
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "w-full rounded-lg border border-border bg-background px-4 py-3",
        "text-sm outline-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        className,
      )}
      {...props}
    />
  );
});

SearchBox.displayName = "SearchBox";