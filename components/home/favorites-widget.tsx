"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

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

export function FavoritesWidget() {
  const favoritesStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const favorites: string[] = JSON.parse(favoritesStr);

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