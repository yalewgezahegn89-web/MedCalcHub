"use client";

import Link from "next/link";

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
    <section className="rounded-2xl border p-6">

      <h2 className="mb-4 text-xl font-bold">
        Recently Used
      </h2>

      {calculators.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No recently opened calculators.
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
