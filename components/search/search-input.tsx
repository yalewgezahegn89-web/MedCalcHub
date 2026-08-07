"use client";

import { forwardRef } from "react";
import { Search, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(function SearchInput(
  {
    value,
    onChange,
    placeholder = "Search calculators...",
    loading = false,
    className,
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
            <Search className="h-5 w-5" />
          )}
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "flex-1 bg-transparent px-3 py-3 text-sm outline-none",
            "placeholder:text-muted-foreground",
            className,
          )}
        />
      </div>
    </div>
  );
});

SearchInput.displayName = "SearchInput";