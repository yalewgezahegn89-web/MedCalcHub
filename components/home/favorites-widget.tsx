"use client";

import Link from "next/link";

import { getFavorites } from "@/lib/favorites";
import { calculatorRegistry } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

const favoritesStore = createLocalStore<string[]>(
  "medcalchub-favorites-changed",
  getFavorites,
);

export function FavoritesWidget() {
  const favorites = useLocalStorageStore(favoritesStore);

  const calculators = calculatorRegistry.filter(
    (calculator) =>
      favorites.includes(calculator.id),
  );

  return (
    <section className="rounded-2xl border p-6">

      <h2 className="mb-4 text-xl font-bold">
        Favorite Calculators
      </h2>

      {calculators.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven{"'"}t added any favorite calculators yet.
        </p>
      ) : (
        <div className="space-y-3">

          {calculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="block rounded-lg border p-3 transition hover:bg-muted"
            >
              <div className="font-medium">
                {calculator.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {calculator.category}
              </div>
            </Link>
          ))}

        </div>
      )}

    </section>
  );
}
