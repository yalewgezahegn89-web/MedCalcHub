import type { Metadata } from "next";
import Link from "next/link";

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
import { calculatorRegistry } from "@/lib/calculators/registry";
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

      <section
        aria-labelledby="about-this-library"
        className="border-t border-slate-200 pt-10 dark:border-slate-800"
      >
        <div className="max-w-3xl">
          <h2
            id="about-this-library"
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What you will find in this library
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            MedCalcHub is a free reference of{" "}
            {calculatorRegistry.length} clinical
            calculators — risk scores, estimates, staging
            criteria, and dosing aids — for healthcare
            professionals, trainees, and students who need a
            number during a shift. Every calculator page
            shows the formula behind the result, the inputs
            it expects, notes on interpreting the output,
            the sources it draws on, and the mistakes that
            most often lead clinicians astray. The{" "}
            <Link
              href="/calculators"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              full alphabetical list
            </Link>{" "}
            covers everything in one place.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            The library is organised two ways on purpose.
            Categories group calculators by what is being
            calculated — kidney function, cardiac risk,
            fluid balance — while specialties group the same
            tools by the clinical area they are used in.
            When two tools look interchangeable, the
            comparison view lines up their purpose, inputs,
            formula, and limitations so the differences
            become visible before you rely on a result.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              <Link
                href="/categories"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Browse by subject
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Start from the calculation you want to make.
              Each category page explains its domain and
              lists every tool it contains.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              <Link
                href="/specialties"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Browse by clinical area
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Start from the ward, clinic, or setting you
              work in, and see which decisions each tool is
              there to support.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              <Link
                href="/comparison"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Compare before you choose
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Put up to three calculators side by side to
              check what each one asks for and what it can
              and cannot tell you.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          Calculators support clinical judgement; they do
          not replace it. Outputs depend on the values you
          enter and on the population a tool was derived
          in, so results should always be read alongside
          the patient in front of you. Our{" "}
          <Link
            href="/about"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            About page
          </Link>{" "}
          describes how entries are written, which sources
          they cite, and how review status is recorded.
        </p>
      </section>

      <AdSlot
        size="banner"
        slotId="placeholder-homepage-below-fold"
      />

      </div>
    </>
  );
}
