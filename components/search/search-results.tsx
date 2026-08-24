"use client";

import { SearchResultCard } from "./search-result-card";

import type { SearchResult } from "@/lib/search/search.types";

export interface SearchResultsProps {
  results: SearchResult[];
  onResultClick?: () => void;
  activeIndex?: number;
  listboxId?: string;
  query?: string;
}

export function SearchResults({
  results,
  onResultClick,
  activeIndex = -1,
  listboxId,
  query,
}: SearchResultsProps) {
  if (results.length === 0) {
    if (!query || query.trim().length === 0) {
      return null;
    }

    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground" role="status">
        No results found.
      </div>
    );
  }

  return (
    <div
      id={listboxId}
      role="listbox"
      aria-label="Search results"
      className="max-h-[400px] overflow-y-auto overscroll-contain p-2"
    >
      {results.map((result, index) => (
        <SearchResultCard
          key={result.document.slug}
          result={result}
          onClick={onResultClick}
          id={`${listboxId}-option-${index}`}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}
