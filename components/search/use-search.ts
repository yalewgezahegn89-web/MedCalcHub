"use client";

import { useMemo, useState } from "react";

import { searchCalculators } from "@/lib/search";
import type { SearchResult } from "@/lib/search/search.types";

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchCalculators(query);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isSearching: query.trim().length > 0,
  };
}