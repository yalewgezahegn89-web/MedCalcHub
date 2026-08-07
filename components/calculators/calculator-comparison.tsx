import Link from "next/link";

import { Card } from "@/components/ui/card";
import { comparisonRegistry } from "@/lib/calculators/comparisons";
import type {
  ComparisonMetadata,
  ComparisonItem,
} from "@/lib/calculators/calculator.types";

type Props = {
  slug: string;
  comparison?: ComparisonMetadata | ComparisonItem[];
};

function resolveItems(
  comparison: ComparisonMetadata | ComparisonItem[] | undefined,
): ComparisonItem[] {
  if (!comparison) return [];
  if (Array.isArray(comparison)) return comparison;
  return comparison.calculators ?? [];
}

function resolveTitle(
  comparison: ComparisonMetadata | ComparisonItem[] | undefined,
): string {
  if (
    comparison &&
    !Array.isArray(comparison) &&
    comparison.title
  ) {
    return comparison.title;
  }
  return "Related Clinical Calculators";
}

export function CalculatorComparison({
  slug,
  comparison,
}: Props) {
  const items = resolveItems(comparison);
  const registryItems = comparisonRegistry[slug] ?? [];

  const comparisons =
    items.length > 0 ? items : registryItems;

  if (comparisons.length === 0) {
    return null;
  }

  const title = resolveTitle(comparison);

  return (
    <Card className="rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <div className="space-y-4">
        {comparisons.map((calculator, index) => (
          <div
            key={calculator.href ?? index}
            className="rounded-xl border p-4 transition hover:bg-muted/30"
          >
            <Link
              href={calculator.href}
              className="text-lg font-semibold text-primary hover:underline"
            >
              {calculator.name}
            </Link>

            {calculator.bestFor || calculator.limitation ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {calculator.bestFor && (
                  <div>
                    <div className="text-sm font-semibold text-emerald-600">
                      Best For
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {calculator.bestFor}
                    </p>
                  </div>
                )}

                {calculator.limitation && (
                  <div>
                    <div className="text-sm font-semibold text-orange-600">
                      Limitation
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {calculator.limitation}
                    </p>
                  </div>
                )}
              </div>
            ) : calculator.use ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {calculator.use}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
