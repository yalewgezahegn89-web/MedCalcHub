import Link from "next/link";

import Dashboard from "@/components/home/dashboard";
import { Hero } from "@/components/home/hero";
import { FeaturedCalculatorCard } from "@/components/calculators/featured-calculator-card";
import { SpecialtyGridCard } from "@/components/specialties/specialty-grid-card";

import {
  calculatorRegistry,
  getSpecialties,
} from "@/lib/calculators/registry";

export default function Home() {
  const featuredCalculators = calculatorRegistry.filter(
    (calc) => calc.featured,
  );

  const specialties = getSpecialties();

  const categories = Array.from(
    new Set(calculatorRegistry.map((calc) => calc.category)),
  ).sort();

  return (
    <main className="space-y-16">

      {/* Dashboard */}

      <Dashboard />

      {/* Hero */}

      <Hero />

      {/* Featured Calculators */}

      <section>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Featured Calculators
            </h2>

            <p className="mt-2 text-slate-600">
              Most frequently used clinical calculators.
            </p>

          </div>

          <Link
            href="/calculators"
            className="text-blue-600 hover:underline"
          >
            View all →
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {featuredCalculators.map((calculator) => (
            <FeaturedCalculatorCard
              key={calculator.id}
              calculator={calculator}
            />
          ))}

        </div>

      </section>

      {/* Browse by Specialty */}

      <section>

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Browse by Specialty
          </h2>

          <p className="mt-2 text-slate-600">
            Find calculators organized by medical specialty.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {specialties.map((specialty) => {
            const slug = specialty
              .toLowerCase()
              .replace(/\s+/g, "-");

            const count = calculatorRegistry.filter(
              (calc) => calc.specialty === specialty,
            ).length;

            return (
              <SpecialtyGridCard
                key={specialty}
                name={specialty}
                slug={slug}
                count={count}
              />
            );
          })}

        </div>

      </section>

      {/* Browse Categories */}

      <section>

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Browse Categories
          </h2>

          <p className="mt-2 text-slate-600">
            Explore calculators organized by medical category.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const count = calculatorRegistry.filter(
              (calc) => calc.category === category,
            ).length;

            return (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="rounded-xl border bg-white p-5 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    {category}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    {count}
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