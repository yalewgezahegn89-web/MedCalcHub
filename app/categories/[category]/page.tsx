import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

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

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = slugToCategory(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const calculators = getCalculatorsByCategory(category);
  const count = calculators.length;

  const description =
    `Browse ${count} medical calculator${count !== 1 ? "s" : ""} in the ${category} category. ` +
    `Evidence-based clinical tools for healthcare professionals.`;

  return {
    title: {
      absolute: `${category} Calculators | MedCalcHub`,
    },
    description,
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
    openGraph: {
      title: `${category} Calculators | MedCalcHub`,
      description,
      url: `${SITE_URL}/categories/${slug}`,
      type: "website",
      siteName: "MedCalcHub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Calculators | MedCalcHub`,
      description,
    },
  };
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
    <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-10">
        <Link
          href="/categories"
          className="text-blue-600 hover:underline"
        >
          ← Back to Categories
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
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

    </div>
  );
}