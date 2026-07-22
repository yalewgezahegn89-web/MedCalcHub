import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function Home() {
  const featuredCalculators = calculatorRegistry.filter(
    (calc) => calc.featured,
  );

  const categories = Array.from(
    new Set(calculatorRegistry.map((calc) => calc.category)),
  ).sort();

  return (
    <main className="mx-auto max-w-6xl space-y-12 p-8">
      <section className="space-y-4 text-center">
        <h1 className="text-5xl font-bold">
          MedCalcHub
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Clinical calculators for healthcare professionals.
        </p>

        
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Featured Calculators
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="rounded-lg border p-5 transition hover:bg-gray-50"
            >
              <h3 className="font-semibold">
                {calculator.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {calculator.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Browse Categories
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => {
            const count = calculatorRegistry.filter(
              (calc) => calc.category === category,
            ).length;

            return (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="rounded-lg border p-5 transition hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {category}
                  </span>

                  <span className="text-sm text-gray-500">
                    {count} calculators
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}