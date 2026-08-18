import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function CalculatorsPage() {
  const calculators = [...calculatorRegistry].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        Medical Calculators
      </h1>

      <p className="mb-8 text-muted-foreground">
        Browse all available clinical calculators.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border p-5 transition hover:bg-muted"
          >
            <h2 className="font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <div className="mt-4 text-xs text-muted-foreground">
              {calculator.category}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}