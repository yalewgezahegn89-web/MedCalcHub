import { searchCalculators } from "./search-engine";
import type { SearchResult } from "./search.types";

/**
 * Sprint 1.7 — Search Suggestions
 *
 * Returns ranked suggestion results using the existing weighted search engine.
 * Suggestions are limited, deterministic, and de-duplicated.
 */

const MAX_SUGGESTIONS = 8;

export function getSuggestions(query: string): SearchResult[] {
  const trimmed = query.trim();

  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const results = searchCalculators(trimmed);

  return results.slice(0, MAX_SUGGESTIONS);
}