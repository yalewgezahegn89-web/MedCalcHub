"use client";

import Link from "next/link";
import { Bookmark, Clock, Heart, X, Zap } from "lucide-react";

import { getFavorites, removeFavorite } from "@/lib/favorites";
import {
  getCalculationHistory,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { getRecentCalculators } from "@/lib/recent";
import {
  getSavedCalculations,
  type SavedCalculation,
} from "@/lib/saved-calculations";
import { calculatorRegistry } from "@/lib/calculators/registry";
import { resolveWorkspaceCalculators } from "@/lib/workspace";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

/* ── stores ── */

const favoritesStore = createLocalStore<string[]>(
  "medcalchub-favorites-changed",
  getFavorites,
);

const recentStore = createLocalStore<string[]>(
  "medcalchub-recent-changed",
  getRecentCalculators,
);

const historyStore = createLocalStore<
  CalculationHistoryItem[]
>("medcalchub-history-changed", getCalculationHistory);

const savedCalculationsStore = createLocalStore<
  SavedCalculation[]
>("medcalchub-saved-calculations-changed", getSavedCalculations);

/* ── helpers ── */

function resolveSavedCalculatorSlug(
  calculatorId: string,
): string | null {
  const calc = calculatorRegistry.find(
    (c) => c.id === calculatorId,
  );
  return calc?.slug ?? null;
}

function formatSavedResult(
  result?: { value: string | number; unit?: string },
): string | null {
  if (!result) return null;
  return `${result.value}${result.unit ? ` ${result.unit}` : ""}`;
}

/* ── page ── */

export default function WorkspacePage() {
  const favorites =
    useLocalStorageStore(favoritesStore);
  const recentIds =
    useLocalStorageStore(recentStore);
  const calculationHistory =
    useLocalStorageStore(historyStore);
  const savedCalculations =
    useLocalStorageStore(savedCalculationsStore);

  const favoriteCalculators =
    resolveWorkspaceCalculators(favorites);

  const recentCalculators =
    resolveWorkspaceCalculators(recentIds);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Clinical Workspace
        </h1>

        <p className="mt-3 text-slate-600">
          Your personalized MedCalcHub dashboard. Save
          calculators for quick access and pick up where
          you left off.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Your MedCalcHub data is stored locally in this
          browser and is not synced to a server. Clearing
          browser data will permanently delete it.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Favorite Calculators */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              Favorite Calculators
            </h2>

            {favoriteCalculators.length > 0 && (
              <Link
                href="/favorites"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View all
              </Link>
            )}
          </div>

          {favoriteCalculators.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Heart className="h-10 w-10 text-slate-300" />

              <p className="text-slate-500">
                No favorite calculators yet.
              </p>

              <Link
                href="/"
                className="mt-1 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Calculators
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteCalculators.map((calc) => (
                <div
                  key={calc.id}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <Link
                    href={`/calculators/${calc.slug}`}
                    className="min-w-0 flex-1 transition hover:opacity-80"
                  >
                    <div className="truncate font-medium">
                      {calc.name}
                    </div>

                    <div className="text-sm text-slate-500">
                      {calc.category}
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      removeFavorite(calc.id)
                    }
                    aria-label={`Remove ${calc.name} from favorite calculators`}
                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Calculations */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Bookmark className="h-5 w-5 text-purple-600" />
              Saved Calculations
            </h2>

            {savedCalculations.length > 0 && (
              <Link
                href="/saved-calculations"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View all
              </Link>
            )}
          </div>

          {savedCalculations.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Bookmark className="h-10 w-10 text-slate-300" />

              <p className="text-slate-500">
                No saved calculations yet.
              </p>

              <Link
                href="/"
                className="mt-1 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Calculators
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {savedCalculations
                .slice(0, 6)
                .map((item) => {
                  const slug =
                    resolveSavedCalculatorSlug(
                      item.calculatorId,
                    );

                  const resultText = formatSavedResult(
                    item.result,
                  );

                  return slug ? (
                    <Link
                      key={item.id}
                      href={`/calculators/${slug}?restore=${item.id}`}
                      className="block rounded-lg border p-3 transition hover:bg-slate-50"
                    >
                      <div className="font-medium">
                        {item.calculatorName}
                      </div>

                      {resultText && (
                        <div className="font-semibold text-blue-600">
                          {resultText}
                        </div>
                      )}

                      <div className="mt-1 text-xs text-slate-500">
                        {new Date(
                          item.savedAt,
                        ).toLocaleString()}
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={item.id}
                      className="rounded-lg border p-3"
                    >
                      <div className="font-medium">
                        {item.calculatorName}
                      </div>

                      {resultText && (
                        <div className="font-semibold text-blue-600">
                          {resultText}
                        </div>
                      )}

                      <div className="mt-1 text-xs text-slate-500">
                        {new Date(
                          item.savedAt,
                        ).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </section>

        {/* Recent Calculations */}

        <section className="rounded-2xl border p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Calculations
            </h2>

            {calculationHistory.length > 0 && (
              <Link
                href="/history"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View all
              </Link>
            )}
          </div>

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
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Zap className="h-5 w-5 text-amber-500" />
              Recently Opened
            </h2>

            {recentCalculators.length > 0 && (
              <Link
                href="/recent"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View all
              </Link>
            )}
          </div>

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
