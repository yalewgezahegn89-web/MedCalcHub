"use client";

import Link from "next/link";
import { Calculator, X } from "lucide-react";

import {
  getCalculationHistory,
  clearHistory,
  deleteHistoryEntry,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { calculatorRegistry, getCalculatorSlug } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

const historyStore = createLocalStore<
  CalculationHistoryItem[]
>("medcalchub-history-changed", getCalculationHistory);

export default function HistoryPage() {
  const history = useLocalStorageStore(historyStore);

  function handleClear() {
    if (
      window.confirm(
        "Clear all calculation history? This cannot be undone.",
      )
    ) {
      clearHistory();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <h1 className="text-3xl font-bold">
          Calculation History
        </h1>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="flex min-h-[44px] items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
          >
            Clear all history
          </button>
        )}

      </div>

      <p className="mb-6 text-sm text-slate-500">
        Your MedCalcHub data is stored locally in this
        browser and is not synced to a server. Clearing
        browser data will permanently delete it.
      </p>

      {history.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Calculator className="h-12 w-12 text-slate-300" />

          <p className="text-lg text-muted-foreground">
            No calculations yet.
          </p>

          <p className="text-sm text-slate-500">
            Perform a calculation and the result will appear here automatically.
          </p>

          <Link
            href="/"
            className="mt-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Calculators
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => {
            const slug = getCalculatorSlug(
              item.calculatorId,
            );

            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border p-5"
              >
                <div className="min-w-0 flex-1">
                  {slug ? (
                    <Link
                      href={`/calculators/${slug}`}
                      className="font-semibold text-lg transition hover:text-blue-600"
                    >
                      {item.calculatorName}
                    </Link>
                  ) : (
                    <h2 className="font-semibold text-lg">
                      {item.calculatorName}
                    </h2>
                  )}

                  <p className="mt-2 text-blue-600 font-bold">
                    {item.result}
                  </p>

                  <time
                    className="mt-2 block text-sm text-slate-500"
                    dateTime={new Date(
                      item.timestamp,
                    ).toISOString()}
                  >
                    {new Date(
                      item.timestamp,
                    ).toLocaleString()}
                  </time>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    deleteHistoryEntry(index)
                  }
                  aria-label={`Remove ${item.calculatorName} from history`}
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
