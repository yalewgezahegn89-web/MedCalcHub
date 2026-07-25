"use client";

import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { getFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [query, setQuery] = useState("");

  const favorites = getFavorites();

  const calculators = useMemo(() => {
    const favCalculators = calculatorRegistry.filter((calc) =>
      favorites.includes(calc.id),
    );

    if (!query.trim()) {
      return favCalculators;
    }

    const q = query.toLowerCase();

    return favCalculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(q) ||
        calc.category.toLowerCase().includes(q) ||
        calc.description.toLowerCase().includes(q),
    );
  }, [favorites, query]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10">
        <h1 className="flex items-center gap-3 text-4xl font-bold">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          My Favorites
        </h1>

        <p className="mt-3 text-slate-600">
          Quickly access your most frequently used clinical calculators.
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search favorites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {calculators.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <Heart className="mx-auto mb-5 h-12 w-12 text-slate-300" />

          <h2 className="text-xl font-semibold">
            No favorite calculators yet
          </h2>

          <p className="mt-3 text-slate-500">
            Tap the ❤️ button on any calculator to add it here.
          </p>

          <Link
            href="/calculators"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Browse Calculators
          </Link>

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {calculators.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {calc.category}
                </span>

                <Heart className="h-5 w-5 fill-red-500 text-red-500" />

              </div>

              <h3 className="text-lg font-semibold">
                {calc.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {calc.description}
              </p>

            </Link>
          ))}

        </div>
      )}

    </main>
  );
}