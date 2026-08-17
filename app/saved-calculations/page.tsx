"use client";

import Link from "next/link";
import { Calculator, Trash2 } from "lucide-react";

import {
  getSavedCalculations,
  clearSavedCalculations,
  deleteSavedCalculation,
  type SavedCalculation,
} from "@/lib/saved-calculations";
import { calculatorRegistry } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

const savedStore = createLocalStore<SavedCalculation[]>(
  "medcalchub-saved-calculations-changed",
  getSavedCalculations,
);

function resolveCalculatorSlug(
  calculatorId: string,
): string | null {
  const calc = calculatorRegistry.find(
    (c) => c.id === calculatorId,
  );
  return calc?.slug ?? null;
}

function formatResult(
  result?: { value: string | number; unit?: string },
): string | null {
  if (!result) return null;

  return `${result.value}${result.unit ? ` ${result.unit}` : ""}`;
}

export default function SavedCalculationsPage() {
  const saved = useLocalStorageStore(savedStore);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Saved Calculations
        </h1>

        {saved.length > 0 && (
          <button
            onClick={clearSavedCalculations}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete All
          </button>
        )}
      </div>

      <p className="mb-6 text-sm text-slate-500">
        Saved calculations are stored locally in this
        browser and are not synced to a server. Avoid
        entering personally identifying patient information.
      </p>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Calculator className="h-12 w-12 text-slate-300" />

          <p className="text-lg text-muted-foreground">
            No saved calculations yet.
          </p>

          <p className="text-sm text-slate-500">
            Use the Save button on a calculator to save a
            calculation with its inputs for later reference.
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
          {saved.map((item) => {
            const slug = resolveCalculatorSlug(
              item.calculatorId,
            );

            const resultText = formatResult(item.result);

            return (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-xl border p-5"
              >
                <div className="min-w-0 flex-1">
                  {slug ? (
                    <Link
                      href={`/calculators/${slug}?restore=${item.id}`}
                      className="font-semibold text-lg transition hover:text-blue-600"
                    >
                      {item.calculatorName}
                    </Link>
                  ) : (
                    <h2 className="font-semibold text-lg">
                      {item.calculatorName}
                    </h2>
                  )}

                  {resultText && (
                    <p className="mt-2 text-blue-600 font-bold">
                      {resultText}
                    </p>
                  )}

                  {item.result?.interpretation && (
                    <p className="mt-1 text-sm text-slate-600">
                      {item.result.interpretation}
                    </p>
                  )}

                  <time
                    className="mt-2 block text-sm text-slate-500"
                    dateTime={new Date(
                      item.savedAt,
                    ).toISOString()}
                  >
                    {new Date(
                      item.savedAt,
                    ).toLocaleString()}
                  </time>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    deleteSavedCalculation(item.id)
                  }
                  aria-label={`Delete saved ${item.calculatorName} calculation`}
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
