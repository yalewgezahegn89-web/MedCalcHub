"use client";

import { forwardRef } from "react";
import { Search, Loader2 } from "lucide-react";

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
    onSubmit,
    placeholder = "Search calculators...",
    icon,
    button,
    loading = false,
    ...props
  },
  ref,
) {
  return (
    <div className="relative w-full">

      <div
        className={cn(
          "flex items-center rounded-xl border border-border bg-background",
          "transition",
          "focus-within:border-primary",
          "focus-within:ring-2",
          "focus-within:ring-primary/20",
        )}
      >
        <div className="pl-4 text-muted-foreground">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            icon ?? <Search className="h-5 w-5" />
          )}
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          placeholder={placeholder}
          aria-label="Search calculators"
          onChange={(e) =>
            onChange(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              onSubmit
            ) {
              onSubmit();
            }
          }}
          className={cn(
            "flex-1 bg-transparent px-3 py-3 text-sm outline-none",
            "placeholder:text-muted-foreground",
            className,
          )}
          {...props}
        />

        {button && (
          <div className="pr-2">
            {button}
          </div>
        )}
      </div>
    </div>
  );
});

SearchBox.displayName = "SearchBox";