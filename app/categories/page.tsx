import type { Metadata } from "next";
import Link from "next/link";

import {
  getCategories,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: {
    absolute: "Calculator Categories | MedCalcHub",
  },
  description:
    "Browse medical calculator categories including cardiology, nephrology, oncology, and more. Evidence-based clinical tools organized by specialty.",
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: "Calculator Categories | MedCalcHub",
    description:
      "Browse medical calculator categories organized by clinical specialty.",
    url: `${SITE_URL}/categories`,
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
    title: "Calculator Categories | MedCalcHub",
    description:
      "Browse medical calculator categories organized by clinical specialty.",
    images: [OG_IMAGE],
  },
};

export default function CategoriesPage() {
  const categories = getCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Calculator Categories",
        description:
          "Browse medical calculator categories organized by clinical specialty.",
        url: `${SITE_URL}/categories`,
        isPartOf: {
          "@type": "WebSite",
          name: "MedCalcHub",
          url: SITE_URL,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: categories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: category,
            url: `${SITE_URL}/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
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
            name: "Categories",
            item: `${SITE_URL}/categories`,
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

      <div className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Calculator Categories
        </h1>

        <p className="mt-3 text-gray-600 dark:text-slate-300">
          Browse calculators by clinical category.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {categories.map((category) => {
          const count =
            getCalculatorsByCategory(category).length;

          return (
            <Link
              key={category}
              href={`/categories/${category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/70 dark:hover:bg-slate-800/70 dark:hover:shadow-lg dark:hover:shadow-black/40 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950"
            >
              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                    {category}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                    {count} calculator
                    {count !== 1 ? "s" : ""}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="text-blue-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-blue-400"
                >
                  →
                </span>

              </div>
            </Link>
          );
        })}

      </div>

    </div>
    </>
  );
}