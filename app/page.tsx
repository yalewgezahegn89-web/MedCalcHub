import type { Metadata } from "next";

import { CalculatorSearch } from "@/components/home/calculator-search";
import { FavoritesWidget } from "@/components/home/favorites-widget";
import { RecentCalculatorsWidget } from "@/components/home/recent-calculators-widget";
import { BrowseSpecialties } from "@/components/home/browse-specialties";
import { BrowseCategories } from "@/components/home/browse-categories";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "MedCalcHub — Professional Medical Calculators",
  },
  description:
    "Free evidence-based medical calculators for healthcare professionals. 140+ clinical tools including BMI, GFR, CHA₂DS₂-VASc, MELD, Wells Score, and more.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "MedCalcHub — Professional Medical Calculators",
    description:
      "Free evidence-based medical calculators for healthcare professionals. 140+ clinical tools.",
    url: SITE_URL,
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
    title: "MedCalcHub — Professional Medical Calculators",
    description:
      "Free evidence-based medical calculators for healthcare professionals. 140+ clinical tools.",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "MedCalcHub",
        url: SITE_URL,
        logo: `${SITE_URL}/og-default.png`,
        description:
          "Professional medical calculators and clinical decision support tools for healthcare professionals.",
      },
      {
        "@type": "WebSite",
        name: "MedCalcHub",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/calculators?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
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

      <div className="container mx-auto space-y-12 px-4 py-10">

      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          MedCalcHub
        </h1>

        <p className="mx-auto max-w-3xl text-muted-foreground">
          Professional medical calculators, clinical decision support,
          and evidence-based tools for healthcare professionals.
        </p>
      </section>

      <CalculatorSearch />

      <div className="grid gap-6 lg:grid-cols-2">
        <FavoritesWidget />
        <RecentCalculatorsWidget />
      </div>

      <BrowseCategories />

      <BrowseSpecialties />

      </div>
    </>
  );
}