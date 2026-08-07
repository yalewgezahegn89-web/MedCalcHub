"use client";

import { useState } from "react";
import Link from "next/link";

import { getFavorites } from "@/lib/favorites";
import {
  getCalculationHistory,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { getRecentCalculators } from "@/lib/recent";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function WorkspacePage() {
  const [favorites] = useState<string[]>(() => getFavorites());

  const [calculationHistory] = useState<
    CalculationHistoryItem[]
  >(() => getCalculationHistory());

  const [recentCalculators] = useState(() => {
    const recentIds = getRecentCalculators();
    return calculatorRegistry.filter((calc) =>
      recentIds.includes(calc.id),
    );
  });

  const favoriteCalculators = calculatorRegistry.filter((calc) =>
    favorites.includes(calc.id),
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Clinical Workspace
        </h1>

        <p className="mt-3 text-slate-600">
          Your personalized MedCalcHub dashboard.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Favorites */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            ❤️ Favorites
          </h2>

          {favoriteCalculators.length === 0 ? (
            <p className="text-slate-500">
              No favorite calculators yet.
            </p>
          ) : (
            <div className="space-y-3">
              {favoriteCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  className="block rounded-lg border p-3 transition hover:bg-slate-50"
                >
                  <div className="font-medium">
                    {calc.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {calc.category}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Recent Calculations */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            🕒 Recent Calculations
          </h2>

          {calculationHistory.length === 0 ? (
            <p className="text-slate-500">
              No calculations yet.
            </p>
          ) : (
            <div className="space-y-3">
              {calculationHistory
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-3"
                  >
                    <div className="font-medium">
                      {item.calculatorName}
                    </div>

                    <div className="font-semibold text-blue-600">
                      {item.result}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {new Date(
                        item.timestamp,
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Recently Opened */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            ⚡ Recently Opened
          </h2>

          {recentCalculators.length === 0 ? (
            <p className="text-slate-500">
              No recently opened calculators.
            </p>
          ) : (
            <div className="space-y-3">
              {recentCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  className="block rounded-lg border p-3 transition hover:bg-slate-50"
                >
                  <div className="font-medium">
                    {calc.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {calc.category}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}