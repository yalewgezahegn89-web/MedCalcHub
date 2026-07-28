import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

export function FeaturedCalculators() {
  const featured = calculatorRegistry.filter(
    (calculator) => calculator.featured,
  );

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Featured Calculators
        </h2>

        <p className="text-muted-foreground">
          Frequently used evidence-based clinical calculators.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border p-5 transition hover:border-primary hover:shadow-md"
          >
            <div className="font-semibold">
              {calculator.name}
            </div>

            <div className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </div>

            <div className="mt-4 text-xs text-primary">
              {calculator.category}
              {calculator.specialty &&
                ` • ${calculator.specialty}`}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}