"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { FeaturedCalculatorCard } from "@/components/calculators/featured-calculator-card";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { getFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [query, setQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const calculators = useMemo(() => {
    const favCalculators = calculatorRegistry.filter((calc) =>
      favoriteIds.includes(calc.id),
    );

    if (!query.trim()) {
      return favCalculators;
    }

    const q = query.toLowerCase();

    return favCalculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(q) ||
        calc.category.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q) ||
        calc.specialty?.toLowerCase().includes(q),
    );
  }, [favoriteIds, query]);

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
      {/* Header */}

      <div>
        <h1 className="flex items-center gap-3 text-4xl font-bold">
          <Heart className="h-8 w-8 fill-red-500 text-red-500" />
          My Favorites
        </h1>

        <p className="mt-3 text-slate-600">
          Quickly access your favorite clinical calculators.
        </p>
      </div>

      {/* Search */}

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search favorites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Empty State */}

      {calculators.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Heart className="mx-auto mb-6 h-12 w-12 text-slate-300" />

          <h2 className="text-2xl font-bold">
            No Favorite Calculators
          </h2>

          <p className="mt-3 text-slate-500">
            Tap the ❤️ icon on any calculator to save it here.
          </p>

          <Link
            href="/calculators"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Browse Calculators
          </Link>
        </div>
      ) : (
        <>
          {/* Results Count */}

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {calculators.length} favorite
              {calculators.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {calculators.map((calculator) => (
              <FeaturedCalculatorCard
                key={calculator.id}
                calculator={calculator}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}