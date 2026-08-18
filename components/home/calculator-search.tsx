"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
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

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

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

  const hasResults = query.trim().length > 0;
  const activeDescendantId = activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <section className="space-y-5">

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search calculators"
          role="combobox"
          aria-expanded={hasResults && results.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          className="w-full rounded-xl border p-4 pl-12"
        />
      </div>

      {query && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="space-y-3"
        >

          {results.length === 0 && (
            <p className="text-sm text-muted-foreground" role="status">
              No calculators found.
            </p>
          )}

          {results.map((result, index) => (
            <Link
              key={result.document.slug}
              href={`/calculators/${result.document.slug}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`block rounded-xl border p-4 transition ${
                index === activeIndex
                  ? "bg-muted border-primary/30"
                  : "hover:bg-muted"
              }`}
            >
              <div className="font-semibold">
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
