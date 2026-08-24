"use client";

import { useId, useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Calculator } from "lucide-react";

import { searchCalculators } from "@/lib/search";
import type { SearchResult } from "@/lib/search/search.types";

export default function SearchCommand() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const router = useRouter();

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    return searchCalculators(trimmed).slice(0, 8);
  }, [query]);

  const effectiveActiveIndex =
    activeIndex >= results.length ? -1 : activeIndex;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
        e.preventDefault();
        router.push(`/calculators/${results[activeIndex].document.slug}`);
      }
    },
    [results, activeIndex, router],
  );

  const hasResults = results.length > 0;
  const activeDescendantId = effectiveActiveIndex >= 0 ? `${listboxId}-option-${effectiveActiveIndex}` : undefined;

  return (
    <div className="relative w-full max-w-full md:max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />

        <input
          ref={inputRef}
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Quick search calculators"
          role="combobox"
          aria-expanded={query.trim().length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
        />
      </div>

      {query && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400" role="status">
              No calculators found.
            </div>
          ) : (
            results.map((result: SearchResult, index: number) => (
              <Link
                key={result.document.slug}
                href={`/calculators/${result.document.slug}`}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={index === effectiveActiveIndex}
                className={`flex items-center justify-between border-b border-slate-100 px-5 py-4 transition last:border-b-0 dark:border-slate-800 ${
                  index === effectiveActiveIndex
                    ? "bg-slate-50 dark:bg-slate-800"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Calculator className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <div>
                    <div className="font-medium dark:text-white">
                      {result.document.title}
                    </div>

                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {result.document.category}
                      {result.document.specialty && (
                        <> · {result.document.specialty}</>
                      )}
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
