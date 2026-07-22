import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";

export default function CategoriesPage() {
  const categories = Array.from(
    new Set(calculatorRegistry.map((calc) => calc.category)),
  ).sort();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Calculator Categories
      </h1>

      <div className="space-y-4">
        {categories.map((category) => {
          const count = calculatorRegistry.filter(
            (calc) => calc.category === category,
          ).length;

          return (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase()}`}
              className="block rounded-lg border p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{category}</span>
                <span>{count} calculators</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}