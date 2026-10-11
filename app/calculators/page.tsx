import type { Metadata } from "next";
import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { taxonomyToSlug } from "@/lib/seo/taxonomy-content";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "All Medical Calculators | MedCalcHub",
  },
  description:
    "Browse all 143 evidence-based medical calculators including BMI, GFR, CHA₂DS₂-VASc, MELD, and more. Free clinical tools for healthcare professionals.",
  alternates: {
    canonical: `${SITE_URL}/calculators`,
  },
  openGraph: {
    title: "All Medical Calculators | MedCalcHub",
    description:
      "Browse all evidence-based medical calculators for healthcare professionals.",
    url: `${SITE_URL}/calculators`,
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
    title: "All Medical Calculators | MedCalcHub",
    description:
      "Browse all evidence-based medical calculators for healthcare professionals.",
    images: [OG_IMAGE],
  },
};

export default function CalculatorsPage() {
  const calculators = [...calculatorRegistry].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const jsonLd = buildCollectionJsonLd({
    name: "All Medical Calculators",
    description:
      "Browse all evidence-based medical calculators for healthcare professionals.",
    path: "/calculators",
    breadcrumb: [
      {
        name: "Calculators",
        item: `${SITE_URL}/calculators`,
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

      <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        Medical Calculators
      </h1>

      <div className="mb-8 max-w-3xl space-y-3 text-muted-foreground">
        <p>
          All {calculators.length} calculators in the
          library, listed alphabetically. Each entry opens a
          page with the formula, the inputs it expects,
          notes on interpreting the result, cited sources,
          common mistakes, and a short FAQ.
        </p>

        <p>
          If you already know what you need to calculate,
          start from{" "}
          <Link
            href="/categories"
            className="font-medium text-blue-600 hover:underline"
          >
            categories
          </Link>
          , which group tools by the subject they are about.
          If you are starting from the patient in front of
          you, start from{" "}
          <Link
            href="/specialties"
            className="font-medium text-blue-600 hover:underline"
          >
            specialties
          </Link>
          , which group the same tools by clinical area. To
          weigh two similar tools against each other, use{" "}
          <Link
            href="/comparison"
            className="font-medium text-blue-600 hover:underline"
          >
            the comparison tool
          </Link>
          , and see{" "}
          <Link
            href="/about"
            className="font-medium text-blue-600 hover:underline"
          >
            About
          </Link>{" "}
          for how entries are written and sourced.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <article
            key={calculator.id}
            className="rounded-xl border p-5 transition hover:bg-muted"
          >
            <h2 className="font-semibold">
              <Link
                href={`/calculators/${calculator.slug}`}
                className="hover:text-blue-600"
              >
                {calculator.name}
              </Link>
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <div className="mt-4 text-xs text-muted-foreground">
              <Link
                href={`/categories/${taxonomyToSlug(calculator.category)}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {calculator.category}
              </Link>
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}