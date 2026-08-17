"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import SearchCommand from "@/components/search/search-command";
import { SearchBox } from "@/components/search/search-box";
import SearchFilters from "@/components/search/search-filters";

import { SectionHeader } from "@/components/ui/section-header";

import { FeaturedCalculatorCard } from "@/components/calculators/featured-calculator-card";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { searchCalculators } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return Array.from(
      new Set(calculatorRegistry.map((c) => c.category)),
    ).sort();
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim();

    const matchedSlugs: string[] = trimmed
      ? searchCalculators(trimmed).map((r) => r.document.slug)
      : calculatorRegistry.map((c) => c.slug);

    let filtered = matchedSlugs;

    if (category !== "All") {
      const categorySlugs = new Set(
        calculatorRegistry
          .filter((c) => c.category === category)
          .map((c) => c.slug),
      );
      filtered = matchedSlugs.filter((slug) => categorySlugs.has(slug));
    }

    return filtered
      .map((slug) => calculatorRegistry.find((c) => c.slug === slug)!)
      .filter(Boolean);
  }, [query, category]);

  const showCategorySuggestions =
    query.trim().length > 0 && results.length === 0;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">

      <SectionHeader
        title="Search Medical Calculators"
        description="Find calculators instantly by name, specialty, category, or keyword."
      />

      {/* Quick Search */}
      <SearchCommand />

      {/* Standard Search */}
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Filter calculators..."
        aria-label="Search medical calculators"
      />

      <SearchFilters
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          Results
        </h2>

        <span className="text-sm text-slate-500">
          {results.length} calculator
          {results.length !== 1 ? "s" : ""}
        </span>

      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">

          <h3 className="text-xl font-semibold">
            No calculators found
          </h3>

          <p className="mt-3 text-slate-500">
            Try another keyword, specialty, or category.
          </p>

          {showCategorySuggestions && (
            <div className="mt-6">
              <p className="mb-3 text-sm text-slate-400">
                Browse by category:
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${encodeURIComponent(cat)}`}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {results.map((calculator) => (
            <FeaturedCalculatorCard
              key={calculator.id}
              calculator={calculator}
            />
          ))}

        </div>
      )}

    </main>
  );
}
