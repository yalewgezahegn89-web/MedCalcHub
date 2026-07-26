import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function slugToCategory(slug: string) {
  return getCategories().find(
    (category) =>
      category
        .toLowerCase()
        .replace(/\s+/g, "-") ===
      slug.toLowerCase(),
  );
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category: slug } = await params;

  const category = slugToCategory(slug);

  if (!category) {
    notFound();
  }

  const calculators =
    getCalculatorsByCategory(category);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {category}
        </h1>

        <p className="mt-3 text-gray-600">
          {calculators.length} calculator
          {calculators.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {calculator.description}
            </p>

            {calculator.specialty && (
              <p className="mt-4 text-sm text-blue-600">
                {calculator.specialty}
              </p>
            )}
          </Link>
        ))}

      </div>

    </main>
  );
}