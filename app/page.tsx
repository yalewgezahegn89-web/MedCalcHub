import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { MedicalTechBackground } from "@/components/home/medical-tech-background";
import { CalculatorSearch } from "@/components/home/calculator-search";
import { TrustStrip } from "@/components/home/trust-strip";
import { PopularCalculators } from "@/components/home/popular-calculators";
import { FavoritesWidget } from "@/components/home/favorites-widget";
import { RecentCalculatorsWidget } from "@/components/home/recent-calculators-widget";
import { BrowseSpecialties } from "@/components/home/browse-specialties";
import { BrowseCategories } from "@/components/home/browse-categories";
import { SITE_URL } from "@/lib/site-url";
import { AdSlot } from "@/components/ads";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "MedCalcHub — Professional Medical Calculators",
  },
  description:
    "Free evidence-based medical calculators for healthcare professionals. 143 clinical tools including BMI, GFR, CHA₂DS₂-VASc, MELD, Wells Score, and more.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "MedCalcHub — Professional Medical Calculators",
    description:
      "Free evidence-based medical calculators for healthcare professionals. 143 clinical tools.",
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
      "Free evidence-based medical calculators for healthcare professionals. 143 clinical tools.",
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
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
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

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:space-y-14">

      <section className="relative isolate overflow-hidden">
        <MedicalTechBackground />

        <div className="relative space-y-12 sm:space-y-14">
          <Hero />

          <CalculatorSearch />

          <TrustStrip />
        </div>
      </section>

      <PopularCalculators />

      <section aria-label="Quick access">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <FavoritesWidget />
          <RecentCalculatorsWidget />
        </div>
      </section>

      <BrowseCategories />

      <BrowseSpecialties />

      <AdSlot
        size="banner"
        slotId="placeholder-homepage-below-fold"
      />

      </div>
    </>
  );
}
