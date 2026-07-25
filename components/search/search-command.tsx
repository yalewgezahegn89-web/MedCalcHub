"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function SearchCommand() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return calculatorRegistry
      .filter((calc) => {
        return (
          calc.name.toLowerCase().includes(q) ||
          calc.description.toLowerCase().includes(q) ||
          calc.category.toLowerCase().includes(q) ||
          (calc.keywords ?? []).some((k) =>
  k.toLowerCase().includes(q),
)
        );
      })
      .slice(0, 8);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
            results.map((calc) => (
              <Link
                key={calc.id}
                href={`/calculators/${calc.slug}`}
                className="flex items-center justify-between border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 last:border-b-0"
              >
                <div>
                  <div className="font-medium">
                    {calc.name}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {calc.category}
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}