"use client";

import Link from "next/link";
import { Heart, X } from "lucide-react";

import {
  getFavorites,
  removeFavorite,
  clearFavorites,
} from "@/lib/favorites";
import { calculatorRegistry } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

const favoritesStore = createLocalStore<string[]>(
  "medcalchub-favorites-changed",
  getFavorites,
);

export default function FavoritesPage() {
  const favorites = useLocalStorageStore(favoritesStore);

  const calculators = calculatorRegistry.filter(
    (calculator) => favorites.includes(calculator.id),
  );

  function handleClearAll() {
    if (
      window.confirm(
        "Clear all favorite calculators? This cannot be undone.",
      )
    ) {
      clearFavorites();
    }
  }

  return (
    <main className="container mx-auto space-y-12 px-4 py-10">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          Favorite Calculators
        </h1>

        <p className="mx-auto max-w-3xl text-muted-foreground">
          Your saved calculators for quick access.
        </p>

        <p className="mx-auto max-w-3xl text-sm text-slate-500">
          Your MedCalcHub data is stored locally in this
          browser and is not synced to a server. Clearing
          browser data will permanently delete it.
        </p>
      </section>

      {calculators.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Heart className="h-12 w-12 text-slate-300" />

          <p className="text-lg text-muted-foreground">
            You haven{"'"}t added any favorite calculators yet.
          </p>

          <Link
            href="/"
            className="mt-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Calculators
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClearAll}
              className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Clear all
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {calculators.map((calculator) => (
              <div
                key={calculator.id}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => removeFavorite(calculator.id)}
                  aria-label={`Remove ${calculator.name} from favorites`}
                  className="absolute right-3 top-3 min-h-[44px] min-w-[44px] rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>

                <Link
                  href={`/calculators/${calculator.slug}`}
                  className="flex flex-1 flex-col"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {calculator.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {calculator.name}
                  </h3>

                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3 dark:text-slate-400">
                    {calculator.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
