import Link from "next/link";
import { notFound } from "next/navigation";

import {
  calculatorRegistry,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function slugToSpecialty(
  slug: string,
): string | undefined {
  const specialties = [
    ...new Set(
      calculatorRegistry
        .map((calc) => calc.specialty)
        .filter(
          (specialty): specialty is string =>
            Boolean(specialty),
        ),
    ),
  ];

  return specialties.find(
    (specialty) =>
      specialty
        .toLowerCase()
        .replace(/\s+/g, "-") ===
      slug.toLowerCase(),
  );
}

export default async function SpecialtyPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const specialty = slugToSpecialty(slug);

  if (!specialty) {
    notFound();
  }

  const calculators =
    getCalculatorsBySpecialty(specialty);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      <div className="mb-10">

        <Link
          href="/specialties"
          className="text-blue-600 hover:underline"
        >
          ← Back to Specialties
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          {specialty}
        </h1>

        <p className="mt-2 text-gray-600">
          {calculators.length} calculator
          {calculators.length !== 1 ? "s" : ""}
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
          >

            <h2 className="text-xl font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-3 text-gray-600">
              {calculator.description}
            </p>

            <div className="mt-4 font-medium text-blue-600">
              <span className="sr-only">Open </span>
              {calculator.name}
              <span aria-hidden="true"> →</span>
            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}