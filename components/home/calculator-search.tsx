"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { searchCalculators } from "@/lib/search";

export function CalculatorSearch() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

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
        window.location.href = `/calculators/${results[activeIndex].document.slug}`;
      }
    },
    [results, activeIndex],
  );

  const activeDescendantId = effectiveActiveIndex >= 0 ? `${listboxId}-option-${effectiveActiveIndex}` : undefined;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5">

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search calculators, conditions, scores, or lab formulas…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search calculators"
          role="combobox"
          aria-expanded={query.trim().length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-16 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
        />
        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs font-medium text-slate-500 sm:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
        >
          Ctrl K
        </kbd>
      </div>

      {query && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="space-y-3"
        >

          {results.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-muted-foreground dark:border-slate-700 dark:bg-slate-900" role="status">
              No calculators found.
            </p>
          )}

          {results.map((result, index) => (
            <Link
              key={result.document.slug}
              href={`/calculators/${result.document.slug}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === effectiveActiveIndex}
              className={`block rounded-xl border bg-white p-4 shadow-sm transition dark:bg-slate-900 ${
                index === effectiveActiveIndex
                  ? "border-blue-500/50 ring-1 ring-blue-500/30"
                  : "border-slate-200 hover:bg-muted dark:border-slate-800"
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">
                {result.document.title}
              </div>

              <div className="text-sm text-muted-foreground">
                {result.document.description}
              </div>

              <div className="mt-1 text-xs text-primary">
                {result.document.category}
                {result.document.specialty &&
                  ` • ${result.document.specialty}`}
              </div>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}
