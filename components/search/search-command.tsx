"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Calculator } from "lucide-react";

import { searchCalculators } from "@/lib/search";
import type { SearchResult } from "@/lib/search/search.types";

export default function SearchCommand() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    return searchCalculators(trimmed).slice(0, 8);
  }, [query]);

  return (
    <div className="relative w-full max-w-full md:max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Quick search calculators"
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {query && (
        <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              No calculators found.
            </div>
          ) : (
            results.map((result: SearchResult) => (
              <Link
                key={result.document.slug}
                href={`/calculators/${result.document.slug}`}
                className="flex items-center justify-between border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Calculator className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="font-medium">
                      {result.document.title}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {result.document.category}
                      {result.document.specialty && (
                        <> · {result.document.specialty}</>
                      )}
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
