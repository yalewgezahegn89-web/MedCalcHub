"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { getRecentCalculators } from "@/lib/recent";
import { calculatorRegistry } from "@/lib/calculators/registry";
import {
  createLocalStore,
  useLocalStorageStore,
} from "@/lib/use-sync-store";

const recentStore = createLocalStore<string[]>(
  "medcalchub-recent-changed",
  getRecentCalculators,
);

export function RecentCalculatorsWidget() {
  const recentIds = useLocalStorageStore(recentStore);

  const calculators = recentIds
    .map((id) =>
      calculatorRegistry.find(
        (calculator) => calculator.id === id,
      ),
    )
    .filter(
      (
        calculator,
      ): calculator is (typeof calculatorRegistry)[number] =>
        Boolean(calculator),
    );

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          Recently Used
        </h2>

        {calculators.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {calculators.length}
          </span>
        )}
      </div>

      {calculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center dark:border-slate-700">
          <Clock className="h-5 w-5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No recently opened calculators.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Calculators you open will appear here.
          </p>
        </div>
      ) : (
        <ul className="-mx-1 divide-y divide-slate-100 dark:divide-slate-800">

          {calculators.map((calculator) => (
            <li key={calculator.id}>
              <Link
                href={`/calculators/${calculator.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition hover:bg-muted"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">
                    {calculator.name}
                  </span>

                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    {calculator.category}
                  </span>
                </span>

                <ArrowRight
                  className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}

        </ul>
      )}

    </section>
  );
}
