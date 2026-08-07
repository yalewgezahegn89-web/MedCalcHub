"use client";

import { useState } from "react";

import {
  getCalculationHistory,
  clearHistory,
  type CalculationHistoryItem,
} from "@/lib/history/history";

export default function HistoryPage() {
  const [history, setHistory] = useState<
    CalculationHistoryItem[]
  >(() => getCalculationHistory());

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Calculation History
        </h1>

        <button
          onClick={handleClear}
          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          Clear History
        </button>

      </div>

      {history.length === 0 ? (
        <p className="text-slate-500">
          No calculations yet.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border p-5"
            >
              <h2 className="font-semibold text-lg">
                {item.calculatorName}
              </h2>

              <p className="mt-2 text-blue-600 font-bold">
                {item.result}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {new Date(
                  item.timestamp,
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}