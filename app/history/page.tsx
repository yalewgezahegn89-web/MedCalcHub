"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Calculator, Trash2 } from "lucide-react";

import {
  getCalculationHistory,
  clearHistory,
  deleteHistoryEntry,
  type CalculationHistoryItem,
} from "@/lib/history/history";
import { calculatorRegistry } from "@/lib/calculators/registry";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-history-changed",
    handler,
  );

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-history-changed",
      handler,
    );
  };
}

function getSnapshot() {
  return JSON.stringify(getCalculationHistory());
}

function getServerSnapshot() {
  return "[]";
}

function resolveCalculatorSlug(
  calculatorId: string,
): string | null {
  const calc = calculatorRegistry.find(
    (c) => c.id === calculatorId,
  );
  return calc?.slug ?? null;
}

export default function HistoryPage() {
  const historyStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const history: CalculationHistoryItem[] =
    JSON.parse(historyStr);

  function handleClear() {
    clearHistory();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Calculation History
        </h1>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
        )}

      </div>

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
            const slug = resolveCalculatorSlug(
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
                  aria-label={`Delete ${item.calculatorName} result from history`}
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </main>
  );
}
