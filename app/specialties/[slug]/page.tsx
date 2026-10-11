import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  calculatorRegistry,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";
import {
  specialtyDescriptions,
  getCategoriesForSpecialty,
  taxonomyToSlug,
} from "@/lib/seo/taxonomy-content";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { getGuidesForSpecialty } from "@/lib/guides";
import { AdSlot } from "@/components/ads";
import { RelatedGuides } from "@/components/guides/related-guides";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

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
      title: `${specialty} Medical Calculators | MedCalcHub`,
      description,
      images: [OG_IMAGE],
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

  const description =
    specialtyDescriptions[specialty] ?? undefined;

  const relatedCategories =
    getCategoriesForSpecialty(specialty);

  const guidesForSpecialty = getGuidesForSpecialty(specialty);

  const specialtyUrl =
    `${SITE_URL}/specialties/${slug}`;

  const jsonLd = buildCollectionJsonLd({
    name: `${specialty} Medical Calculators`,
    description:
      description ??
      `${specialty} medical calculators for healthcare professionals.`,
    path: `/specialties/${slug}`,
    breadcrumb: [
      {
        name: "Specialties",
        item: `${SITE_URL}/specialties`,
      },
      {
        name: specialty,
        item: specialtyUrl,
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

      <div className="mx-auto max-w-6xl px-6 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Specialties", href: "/specialties" },
            { label: specialty },
          ]}
        />

        <div className="mb-8">

          <Link
            href="/specialties"
            className="mt-2 inline-block text-blue-600 hover:underline"
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

          {description && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {description}
            </p>
          )}

          <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">
            This page groups by clinical area, so the tools
            below are the ones this setting reaches for —
            the subject-focused view of the same calculators
            lives on the{" "}
            <Link
              href="/categories"
              className="font-medium text-blue-600 hover:underline"
            >
              categories pages
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
            lines up three tools side by side when two of
            them look interchangeable.
          </p>
        </div>

        {relatedCategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              Related Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${taxonomyToSlug(category)}`}
                  className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">

          {calculators.slice(0, 4).map((calculator) => (
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

              {calculator.category && (
                <span
                  className="mt-3 inline-block text-sm text-blue-600"
                >
                  {calculator.category}
                </span>
              )}

              <div className="mt-4 font-medium text-blue-600">
                <span className="sr-only">Open </span>
                {calculator.name}
                <span aria-hidden="true"> →</span>
              </div>

            </Link>
          ))}

          {calculators.length >= 6 && (
            <AdSlot
              size="rectangle"
              slotId="placeholder-specialty-feed"
              className="col-span-1 md:col-span-2"
            />
          )}

          {calculators.slice(4).map((calculator) => (
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

              {calculator.category && (
                <span
                  className="mt-3 inline-block text-sm text-blue-600"
                >
                  {calculator.category}
                </span>
              )}

              <div className="mt-4 font-medium text-blue-600">
                <span className="sr-only">Open </span>
                {calculator.name}
                <span aria-hidden="true"> →</span>
              </div>

            </Link>
          ))}

        </div>

        {guidesForSpecialty.length > 0 && (
          <div className="mt-10">
            <RelatedGuides guides={guidesForSpecialty} />
          </div>
        )}

      </div>
    </>
  );
}
