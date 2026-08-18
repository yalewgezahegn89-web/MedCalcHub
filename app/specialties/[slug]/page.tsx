import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  calculatorRegistry,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialty = slugToSpecialty(slug);

  if (!specialty) {
    return { title: "Specialty Not Found" };
  }

  const calculators = getCalculatorsBySpecialty(specialty);
  const count = calculators.length;

  const description =
    `Browse ${count} medical calculator${count !== 1 ? "s" : ""} for ${specialty}. ` +
    `Evidence-based clinical tools for healthcare professionals.`;

  return {
    title: {
      absolute: `${specialty} Medical Calculators | MedCalcHub`,
    },
    description,
    alternates: {
      canonical: `${SITE_URL}/specialties/${slug}`,
    },
    openGraph: {
      title: `${specialty} Medical Calculators | MedCalcHub`,
      description,
      url: `${SITE_URL}/specialties/${slug}`,
      type: "website",
      siteName: "MedCalcHub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${specialty} Medical Calculators | MedCalcHub`,
      description,
    },
  };
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
    <div className="mx-auto max-w-6xl px-6 py-10">

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

    </div>
  );
}