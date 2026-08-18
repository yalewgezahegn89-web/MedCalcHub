"use client";

import Link from "next/link";
import { Clock, X } from "lucide-react";

import {
  getRecentCalculators,
  clearRecentCalculators,
  removeRecentCalculator,
} from "@/lib/recent";
import { calculatorRegistry } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

const recentStore = createLocalStore<string[]>(
  "medcalchub-recent-changed",
  getRecentCalculators,
);

export default function RecentPage() {
  const recentIds = useLocalStorageStore(recentStore);

  const calculators: CalculatorDefinition[] = recentIds
    .map((id) =>
      calculatorRegistry.find((calc) => calc.id === id),
    )
    .filter(
      (calc): calc is CalculatorDefinition =>
        calc !== undefined,
    );

  function clearAll() {
    if (
      window.confirm(
        "Clear all recently used calculators? This cannot be undone.",
      )
    ) {
      clearRecentCalculators();
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold">
            <Clock className="h-8 w-8 text-blue-600" />
            Recently Used
          </h1>

          <p className="mt-3 text-slate-600">
            Continue working where you left off.
          </p>
        </div>

        {calculators.length > 0 && (
          <button
            onClick={clearAll}
            className="flex min-h-[44px] items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-100"
          >
            Clear all
          </button>
        )}

      </div>

      <p className="mb-6 text-sm text-slate-500">
        Your MedCalcHub data is stored locally in this
        browser and is not synced to a server. Clearing
        browser data will permanently delete it.
      </p>

      {calculators.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <Clock className="mx-auto mb-5 h-12 w-12 text-slate-300" />

          <h2 className="text-xl font-semibold">
            No recent calculators
          </h2>

          <p className="mt-3 text-slate-500">
            Open any calculator and it will appear here automatically.
          </p>

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {calculators.map((calc) => (
            <div
              key={calc.id}
              className="flex items-stretch gap-2"
            >
              <Link
                href={`/calculators/${calc.slug}`}
                className="min-w-0 flex-1 rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {calc.category}
                </span>

                <h3 className="mt-4 text-lg font-semibold">
                  {calc.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {calc.description}
                </p>

              </Link>

              <button
                type="button"
                onClick={() =>
                  removeRecentCalculator(calc.id)
                }
                aria-label={`Remove ${calc.name} from recent calculators`}
                className="shrink-0 self-start rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

        </div>
      )}

    </main>
  );
}
