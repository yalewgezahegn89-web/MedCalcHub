import type { Metadata } from "next";
import Link from "next/link";
import {
  getSpecialties,
  getCalculatorsBySpecialty,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "Medical Specialties | MedCalcHub",
  },
  description:
    "Browse medical calculators by specialty — cardiology, nephrology, oncology, emergency medicine, and more.",
  alternates: {
    canonical: `${SITE_URL}/specialties`,
  },
  openGraph: {
    title: "Medical Specialties | MedCalcHub",
    description:
      "Browse medical calculators by clinical specialty.",
    url: `${SITE_URL}/specialties`,
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
    title: "Medical Specialties | MedCalcHub",
    description:
      "Browse medical calculators by clinical specialty.",
    images: [OG_IMAGE],
  },
};

export default function SpecialtiesPage() {
  const specialties = getSpecialties();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Medical Specialties",
        description:
          "Browse medical calculators by specialty — cardiology, nephrology, oncology, emergency medicine, and more.",
        url: `${SITE_URL}/specialties`,
        isPartOf: {
          "@type": "WebSite",
          name: "MedCalcHub",
          url: SITE_URL,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: specialties.map((specialty, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: specialty,
            url: `${SITE_URL}/specialties/${specialty.toLowerCase().replace(/\s+/g, "-")}`,
          })),
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
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Medical Specialties
        </h1>

        <p className="mt-3 text-gray-600 dark:text-slate-300">
          Browse calculators by medical specialty.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {specialties.map((specialty) => {
          const calculators =
            getCalculatorsBySpecialty(specialty);

          return (
            <Link
              key={specialty}
              href={`/specialties/${encodeURIComponent(
                specialty.toLowerCase().replace(/\s+/g, "-"),
              )}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/70 dark:hover:bg-slate-800/70 dark:hover:shadow-lg dark:hover:shadow-black/40 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950"
            >
              <h2 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                {specialty}
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                {calculators.length} calculator
                {calculators.length !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}

      </div>

    </div>
    </>
  );
}