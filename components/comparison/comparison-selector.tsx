"use client";

import { useMemo, useState } from "react";

import { calculatorRegistry } from "@/lib/calculators/registry";
import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type ComparisonSelectorProps = {
  onChange: (calculators: CalculatorDefinition[]) => void;
};

export function ComparisonSelector({
  onChange,
}: ComparisonSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const calculators = useMemo(() => {
    return calculatorRegistry.filter((calculator) =>
      selectedIds.includes(calculator.id),
    );
  }, [selectedIds]);

  function toggleCalculator(id: string) {
    let updated: string[];

    if (selectedIds.includes(id)) {
      updated = selectedIds.filter((value) => value !== id);
    } else {
      if (selectedIds.length >= 3) return;
      updated = [...selectedIds, id];
    }

    setSelectedIds(updated);

    onChange(
      calculatorRegistry.filter((calculator) =>
        updated.includes(calculator.id),
      ),
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="text-lg font-semibold">
        Select calculators to compare
      </h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        You can compare up to 3 calculators.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {calculatorRegistry.map((calculator) => (
          <label
            key={calculator.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-500 dark:border-slate-700"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(calculator.id)}
              onChange={() =>
                toggleCalculator(calculator.id)
              }
            />

            <div>
              <div className="font-medium">
                {calculator.name}
              </div>

              <div className="text-sm text-slate-500">
                {calculator.category}
              </div>
            </div>
          </label>
        ))}
      </div>

    </div>
  );
}