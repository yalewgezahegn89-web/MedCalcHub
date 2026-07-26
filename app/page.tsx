import Link from "next/link";

import Dashboard from "@/components/home/dashboard";
import { Hero } from "@/components/home/hero";
import { calculatorRegistry } from "@/lib/calculators/registry";

export default function Home() {
  const featuredCalculators = calculatorRegistry.filter(
    (calc) => calc.featured,
  );

  const categories = Array.from(
    new Set(calculatorRegistry.map((calc) => calc.category)),
  ).sort();

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-6 py-8">

      {/* Hero */}
      <Hero />

      {/* Dashboard */}
      <Dashboard />

      {/* Featured Calculators */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Featured Calculators
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          {featuredCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
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

      {/* Categories */}
      <section>

        <h2 className="mb-6 text-2xl font-semibold">
          Browse Categories
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const count = calculatorRegistry.filter(
              (calc) => calc.category === category,
            ).length;

            return (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
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