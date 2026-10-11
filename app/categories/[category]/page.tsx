import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";
import {
  categoryDescriptions,
  getSpecialtiesForCategory,
  taxonomyToSlug,
} from "@/lib/seo/taxonomy-content";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { getGuidesForCategory } from "@/lib/guides";
import { AdSlot } from "@/components/ads";
import { RelatedGuides } from "@/components/guides/related-guides";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

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
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "MedCalcHub — Professional Medical Calculators",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Calculators | MedCalcHub`,
      description,
      images: [OG_IMAGE],
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

  const description =
    categoryDescriptions[category] ?? undefined;

  const relatedSpecialties =
    getSpecialtiesForCategory(category);

  const guidesForCategory = getGuidesForCategory(category);

  const categoryUrl =
    `${SITE_URL}/categories/${slug}`;

  const jsonLd = buildCollectionJsonLd({
    name: `${category} Calculators`,
    description:
      description ??
      `${category} medical calculators for healthcare professionals.`,
    path: `/categories/${slug}`,
    breadcrumb: [
      {
        name: "Categories",
        item: `${SITE_URL}/categories`,
      },
      {
        name: category,
        item: categoryUrl,
      },
    ],
    calculators,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="mx-auto max-w-5xl px-6 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category },
          ]}
        />

        <div className="mb-8">
          <Link
            href="/categories"
            className="mt-2 inline-block text-blue-600 hover:underline"
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

          {description && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {description}
            </p>
          )}

          <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">
            Every tool in this domain is linked below, each
            with its own formula, inputs, and interpretation
            notes. Starting from the clinical area instead
            of the subject? The same calculators are grouped
            on the{" "}
            <Link
              href="/specialties"
              className="font-medium text-blue-600 hover:underline"
            >
              specialties pages
            </Link>
            , the{" "}
            <Link
              href="/calculators"
              className="font-medium text-blue-600 hover:underline"
            >
              full alphabetical list
            </Link>{" "}
            collects everything in one place, and the{" "}
            <Link
              href="/comparison"
              className="font-medium text-blue-600 hover:underline"
            >
              comparison tool
            </Link>{" "}
            lines up three tools side by side.
          </p>
        </div>

        {relatedSpecialties.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Related Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedSpecialties.map((specialty) => (
                <Link
                  key={specialty}
                  href={`/specialties/${taxonomyToSlug(specialty)}`}
                  className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
                >
                  {specialty}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">

          {calculators.slice(0, 4).map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">
                {calculator.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {calculator.description}
              </p>

              {calculator.specialty && (
                <span
                  className="mt-4 inline-block text-sm text-blue-600"
                >
                  {calculator.specialty}
                </span>
              )}
            </Link>
          ))}

          {calculators.length >= 6 && (
            <AdSlot
              size="rectangle"
              slotId="placeholder-category-feed"
              className="col-span-1 md:col-span-2"
            />
          )}

          {calculators.slice(4).map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">
                {calculator.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {calculator.description}
              </p>

              {calculator.specialty && (
                <span
                  className="mt-4 inline-block text-sm text-blue-600"
                >
                  {calculator.specialty}
                </span>
              )}
            </Link>
          ))}

        </div>

        {guidesForCategory.length > 0 && (
          <div className="mt-10">
            <RelatedGuides guides={guidesForCategory} />
          </div>
        )}

      </div>
    </>
  );
}
