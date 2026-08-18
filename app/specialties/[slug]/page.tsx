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

  const specialtyUrl =
    `${SITE_URL}/specialties/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${specialty} Medical Calculators`,
        description:
          description ??
          `${specialty} medical calculators for healthcare professionals.`,
        url: specialtyUrl,
        isPartOf: {
          "@type": "WebSite",
          name: "MedCalcHub",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Specialties",
            item: `${SITE_URL}/specialties`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: specialty,
            item: specialtyUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

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

          {description && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
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

          {calculators.map((calculator) => (
            <div
              key={calculator.id}
              role="link"
              tabIndex={0}
              onClick={() => {
                window.location.href = `/calculators/${calculator.slug}`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.location.href = `/calculators/${calculator.slug}`;
                }
              }}
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
            >

              <h2 className="text-xl font-semibold">
                {calculator.name}
              </h2>

              <p className="mt-3 text-gray-600">
                {calculator.description}
              </p>

              {calculator.category && (
                <a
                  href={`/categories/${taxonomyToSlug(calculator.category)}`}
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {calculator.category}
                </a>
              )}

              <div className="mt-4 font-medium text-blue-600">
                <span className="sr-only">Open </span>
                {calculator.name}
                <span aria-hidden="true"> →</span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}
