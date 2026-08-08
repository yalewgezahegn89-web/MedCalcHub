"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { getFavorites } from "@/lib/favorites";
import { calculatorRegistry } from "@/lib/calculators/registry";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-favorites-changed",
    handler,
  );

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-favorites-changed",
      handler,
    );
  };
}

function getSnapshot() {
  return JSON.stringify(getFavorites());
}

function getServerSnapshot() {
  return "[]";
}

export default function FavoritesPage() {
  const favoritesStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const favorites: string[] = JSON.parse(favoritesStr);

  const calculators = calculatorRegistry.filter(
    (calculator) => favorites.includes(calculator.id),
  );

  return (
    <main className="container mx-auto space-y-12 px-4 py-10">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          Favorite Calculators
        </h1>

        <p className="mx-auto max-w-3xl text-muted-foreground">
          Your saved calculators for quick access.
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {calculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
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
          ))}
        </div>
      )}
    </main>
  );
}