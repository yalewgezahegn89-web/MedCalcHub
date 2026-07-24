import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";

type SpecialtyGridProps = {
  calculators: CalculatorDefinition[];
};

export function SpecialtyGrid({
  calculators,
}: SpecialtyGridProps) {
  if (calculators.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No calculators are currently assigned to this specialty.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {calculators.map((calculator) => (
        <Link
          key={calculator.id}
          href={`/calculators/${calculator.slug}`}
          className="block"
        >
          <Card className="h-full p-6 transition-all hover:border-primary hover:shadow-md">
            <h3 className="text-lg font-semibold">
              {calculator.name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Open calculator →
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}