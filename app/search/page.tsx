"use client";

import { useMemo, useState } from "react";

import SearchCommand from "@/components/search/search-command";
import { SearchBox } from "@/components/search/search-box";
import SearchFilters from "@/components/search/search-filters";

import { SectionHeader } from "@/components/ui/section-header";

import { FeaturedCalculatorCard } from "@/components/calculators/featured-calculator-card";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    return Array.from(
      new Set(calculatorRegistry.map((c) => c.category)),
    ).sort();
  }, []);

  const results = useMemo(() => {
    let filtered = calculatorRegistry;

    if (category !== "All") {
      filtered = filtered.filter(
        (calculator) => calculator.category === category,
      );
    }

    if (!query.trim()) {
      return filtered;
    }

    const search = query.toLowerCase();

    return filtered.filter((calculator) => {
      return (
        calculator.name.toLowerCase().includes(search) ||
        calculator.description.toLowerCase().includes(search) ||
        calculator.category.toLowerCase().includes(search) ||
        calculator.specialty?.toLowerCase().includes(search) ||
        calculator.tags?.some((tag) =>
          tag.toLowerCase().includes(search),
        ) ||
        calculator.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(search),
        )
      );
    });
  }, [query, category]);

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