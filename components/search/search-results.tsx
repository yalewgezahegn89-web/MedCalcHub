"use client";

import { SearchResultCard } from "./search-result-card";

import type { SearchResult } from "@/lib/search/search.types";

export interface SearchResultsProps {
  results: SearchResult[];
  onResultClick?: () => void;
}

export function SearchResults({
  results,
  onResultClick,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        No results found.
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto p-2">
      {results.map((result) => (
        <SearchResultCard
          key={result.document.slug}
          result={result}
          onClick={onResultClick}
        />
      ))}
    </div>
  );
}