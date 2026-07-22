import Link from "next/link";
import { notFound } from "next/navigation";

import { calculatorRegistry } from "@/lib/calculators/registry";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const calculators = calculatorRegistry.filter(
    (calc) => calc.category.toLowerCase() === category.toLowerCase(),
  );

  if (calculators.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-3xl font-bold">
        {calculators[0].category}
      </h1>

      <p className="mb-8 text-gray-600">
        {calculators.length} calculator
        {calculators.length > 1 ? "s" : ""}
      </p>

      <div className="space-y-4">
        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="block rounded-lg border p-4 transition hover:bg-gray-50"
          >
            <h2 className="font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              {calculator.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}