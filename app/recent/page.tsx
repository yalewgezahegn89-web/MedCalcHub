"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";

import { getRecentCalculators, clearRecentCalculators } from "@/lib/recent";
import { calculatorRegistry } from "@/lib/calculators/registry";

import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(
    "medcalchub-recent-changed",
    handler,
  );

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(
      "medcalchub-recent-changed",
      handler,
    );
  };
}

function getSnapshot() {
  return JSON.stringify(getRecentCalculators());
}

function getServerSnapshot() {
  return "[]";
}

export default function RecentPage() {
  const recentIdsStr = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const recentIds: string[] = JSON.parse(recentIdsStr);

  const calculators: CalculatorDefinition[] = recentIds
    .map((id) =>
      calculatorRegistry.find((calc) => calc.id === id),
    )
    .filter(
      (calc): calc is CalculatorDefinition =>
        calc !== undefined,
    );

  function clearHistory() {
    clearRecentCalculators();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex items-center justify-between">

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
            onClick={clearHistory}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        )}

      </div>

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
            <Link
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {calc.category}
              </span>

              <h3 className="mt-4 text-lg font-semibold">
                {calc.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {calc.description}
              </p>

            </Link>
          ))}

        </div>
      )}

    </main>
  );
}