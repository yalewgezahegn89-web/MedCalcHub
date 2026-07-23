import Link from "next/link";
import { Card } from "@/components/ui/card";
import { calculatorRegistry } from "@/lib/calculators/registry";

export default function RenalPage() {
  const calculators = calculatorRegistry.filter(
    (calc) => calc.category === "Renal",
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          💧 Renal Calculators
        </h1>

        <p className="mt-2 text-muted-foreground">
          Kidney function, electrolytes, acid-base disorders,
          and renal dosing calculators.
        </p>

        <p className="mt-4 text-sm font-medium text-primary">
          {calculators.length} Calculators
        </p>
      </div>

      <div className="grid gap-6">
        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
          >
            <Card className="p-6 transition hover:border-primary hover:shadow-md">
              <h2 className="text-xl font-semibold">
                {calculator.name}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {calculator.description}
              </p>

              <div className="mt-4 text-sm font-medium text-primary">
                Open Calculator →
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}