import Link from "next/link";

import { Card } from "@/components/ui/card";
import { comparisonRegistry } from "@/lib/calculators/comparisons";

type Props = {
  slug: string;
};

export function CalculatorComparison({ slug }: Props) {
  const comparisons = comparisonRegistry[slug];

  if (!comparisons || comparisons.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-2xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Compare Renal Calculators
      </h2>

      <div className="space-y-4">
        {comparisons.map((calculator) => (
          <div
            key={calculator.id}
            className="rounded-xl border p-4 transition hover:bg-muted/30"
          >
            <Link
              href={calculator.href}
              className="text-lg font-semibold text-primary hover:underline"
            >
              {calculator.name}
            </Link>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-emerald-600">
                  Best For
                </div>

                <p className="text-sm text-muted-foreground">
                  {calculator.bestFor}
                </p>
              </div>

              <div>
                <div className="text-sm font-semibold text-orange-600">
                  Limitation
                </div>

                <p className="text-sm text-muted-foreground">
                  {calculator.limitation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}