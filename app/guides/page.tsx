import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/site-url";
import {
  getGuides,
  getRelatedCalculators,
  buildGuideIndexJsonLd,
} from "@/lib/guides";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "Guides | MedCalcHub",
  },
  description:
    "Educational guides to the MedCalcHub calculator library: how related calculators differ, when to use which, and how to use them together.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: "Guides | MedCalcHub",
    description:
      "Educational guides to the MedCalcHub calculator library: how related calculators differ, when to use which, and how to use them together.",
    url: `${SITE_URL}/guides`,
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
    title: "Guides | MedCalcHub",
    description:
      "Educational guides to the MedCalcHub calculator library: how related calculators differ, when to use which, and how to use them together.",
    images: [OG_IMAGE],
  },
};

export default function GuidesPage() {
  const guides = getGuides();
  const jsonLd = buildGuideIndexJsonLd(guides);

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
            { label: "Guides" },
          ]}
        />

        <div className="mb-8">
          <h1 className="mt-4 text-4xl font-bold">
            Guides
          </h1>

          <p className="mt-3 text-gray-600">
            {guides.length} guides to the calculator library
          </p>

          <p className="mt-4 max-w-3xl text-gray-700 leading-relaxed">
            The calculators in this library do not exist in
            isolation. This set of guides explains how related
            calculators differ, which one answers which
            question, and how several tools can be used
            together when interpreting a single patient. Each
            guide links to the registered calculators it
            discusses and lists the real published sources
            behind them.{" "}
            <Link
              href="/content-sources"
              className="font-medium text-blue-600 hover:underline"
            >
              How content is sourced and maintained
            </Link>{" "}
            is documented separately.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => {
            const calculators = getRelatedCalculators(guide);
            return (
              <article
                key={guide.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-lg font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                >
                  {guide.title}
                </Link>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {guide.summary}
                </p>

                {calculators.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Calculators in this guide
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {calculators.map((calculator) => (
                        <li key={calculator.slug}>
                          <Link
                            href={`/calculators/${calculator.slug}`}
                            className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 hover:bg-blue-100"
                          >
                            {calculator.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}