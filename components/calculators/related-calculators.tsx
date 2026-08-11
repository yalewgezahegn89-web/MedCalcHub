import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { getRelatedCalculators } from "@/lib/search/related";
import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type Props = {
  related?: string[];
  calculator?: CalculatorDefinition;
};

export function RelatedCalculators({
  related,
  calculator,
}: Props) {
  let calculators: CalculatorDefinition[] = [];

  if (related && related.length > 0 && calculator) {
    const currentId = calculator.id;
    const seen = new Set<string>([currentId]);
    calculators = related
      .map((id) =>
        calculatorRegistry.find(
          (calc) => calc.id === id,
        ),
      )
      .filter(
        (c): c is CalculatorDefinition =>
          c !== undefined && !seen.has(c.id) && (() => { seen.add(c.id); return true; })(),
      );
  } else if (related && related.length > 0) {
    const seen = new Set<string>();
    calculators = related
      .map((id) =>
        calculatorRegistry.find(
          (calc) => calc.id === id,
        ),
      )
      .filter(
        (c): c is CalculatorDefinition =>
          c !== undefined && !seen.has(c.id) && (() => { seen.add(c.id); return true; })(),
      );
  }

  if (calculators.length === 0 && calculator) {
    calculators = getRelatedCalculators(calculator);
  }

  if (calculators.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-950">
      <h2 className="mb-6 text-2xl font-bold">
        Related Calculators
      </h2>

      <div className="space-y-3">
        {calculators.map((calc) => (
          <Link
            key={calc.id}
            href={`/calculators/${calc.slug}`}
            className="block rounded-lg border p-3 transition hover:bg-gray-50 dark:hover:bg-zinc-900"
          >
            <div className="font-medium">
              {calc.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {calc.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
