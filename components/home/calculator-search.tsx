"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { searchCalculators } from "@/lib/search";

export function CalculatorSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    return searchCalculators(trimmed).slice(0, 8);
  }, [query]);

  return (
    <section className="space-y-5">

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          aria-label="Search calculators"
          className="w-full rounded-xl border p-4 pl-12"
        />
      </div>

      {query && (
        <div className="space-y-3">

          {results.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No calculators found.
            </p>
          )}

          {results.map((result) => (
            <Link
              key={result.document.slug}
              href={`/calculators/${result.document.slug}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
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
