import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

import { ComparisonCard } from "./comparison-card";

type ComparisonGridProps = {
  calculators: CalculatorDefinition[];
};

export function ComparisonGrid({
  calculators,
}: ComparisonGridProps) {
  if (calculators.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
        <h3 className="text-xl font-semibold">
          No calculators selected
        </h3>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Choose one or more calculators to compare.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {calculators.map((calculator) => (
        <ComparisonCard
          key={calculator.id}
          calculator={calculator}
        />
      ))}
    </div>
  );
}