"use client";

import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import type { SearchResult } from "@/lib/search/search.types";

export interface SearchResultCardProps {
  result: SearchResult;
  onClick?: () => void;
  className?: string;
  id?: string;
  isActive?: boolean;
}

export function SearchResultCard({
  result,
  onClick,
  className,
  id,
  isActive,
}: SearchResultCardProps) {
  const { document } = result;

  return (
    <Link
      href={`/calculators/${document.slug}`}
      onClick={onClick}
      id={id}
      role="option"
      aria-selected={isActive}
      className={cn(
        "flex items-center justify-between gap-3",
        "rounded-lg px-4 py-3",
        "transition-colors",
        "hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isActive && "bg-accent",
        className,
      )}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Calculator className="h-4 w-4" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-medium">
            {document.title}
          </div>

          <div className="truncate text-xs text-muted-foreground">
            {document.category}
            {document.specialty && (
              <> · {document.specialty}</>
            )}
          </div>
        </div>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}
