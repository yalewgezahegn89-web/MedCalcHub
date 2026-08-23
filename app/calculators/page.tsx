import type { Metadata } from "next";
import Link from "next/link";

import { calculatorRegistry } from "@/lib/calculators/registry";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "All Medical Calculators | MedCalcHub",
  },
  description:
    "Browse all 140+ evidence-based medical calculators including BMI, GFR, CHA₂DS₂-VASc, MELD, and more. Free clinical tools for healthcare professionals.",
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

      <p className="mb-8 text-muted-foreground">
        Browse all available clinical calculators.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <Link
            key={calculator.id}
            href={`/calculators/${calculator.slug}`}
            className="rounded-xl border p-5 transition hover:bg-muted"
          >
            <h2 className="font-semibold">
              {calculator.name}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {calculator.description}
            </p>

            <div className="mt-4 text-xs text-muted-foreground">
              {calculator.category}
            </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
}