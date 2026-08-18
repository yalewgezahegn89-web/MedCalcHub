import Link from "next/link";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Calculator Categories
        </h1>

        <p className="mt-3 text-gray-600">
          Browse calculators by clinical category.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {categories.map((category) => {
          const count =
            getCalculatorsByCategory(category).length;

          return (
            <Link
              key={category}
              href={`/categories/${category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold">
                    {category}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    {count} calculator
                    {count !== 1 ? "s" : ""}
                  </p>
                </div>

                <span className="text-blue-600">
                  →
                </span>

              </div>
            </Link>
          );
        })}

      </div>

    </div>
  );
}