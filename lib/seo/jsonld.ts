import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";
import { getClinicalContent } from "@/lib/clinical-content";
import { SITE_URL } from "@/lib/site-url";

export function buildCalculatorJsonLd(
  calculator: CalculatorDefinition,
) {
  const clinicalContent = getClinicalContent(calculator.slug);
  const faq = clinicalContent?.faq ?? [];
  const calculatorUrl = `${SITE_URL}/calculators/${calculator.slug}`;

  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "MedicalWebPage",

      name: calculator.name,

      description: calculator.description,

      about: calculator.category,

      specialty: calculator.specialty,

      url: calculatorUrl,
    },

    {
      "@type": "SoftwareApplication",

      name: calculator.name,

      applicationCategory: "MedicalApplication",

      operatingSystem: "Any",

      description: calculator.description,

      url: calculatorUrl,
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
          name: "Calculators",
          item: `${SITE_URL}/calculators`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: calculator.name,
          item: calculatorUrl,
        },
      ],
    },
  ];

  if (faq.length > 0) {
    graph.splice(2, 0, {
      "@type": "FAQPage",

      mainEntity: faq.map((item) => ({
        "@type": "Question",

        name: item.question,

        acceptedAnswer: {
          "@type": "Answer",

          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * P3-C1 — Collection-page structured data for calculator listing surfaces.
 * Emits a CollectionPage node (with an ItemList of member calculators)
 * plus a BreadcrumbList. The breadcrumb trail passed by callers must not
 * include Home; it is prepended automatically.
 */
export function buildCollectionJsonLd(input: {
  name: string;
  description: string;
  path: string;
  breadcrumb: Array<{ name: string; item: string }>;
  calculators: CalculatorDefinition[];
}) {
  const url = `${SITE_URL}${input.path}`;

  const itemListElement = input.calculators.map(
    (calculator, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: calculator.name,

      url: `${SITE_URL}/calculators/${calculator.slug}`,
    }),
  );

  return {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "CollectionPage",

        name: input.name,

        description: input.description,

        url,

        isPartOf: {
          "@type": "WebSite",

          name: "MedCalcHub",

          url: SITE_URL,
        },

        mainEntity: {
          "@type": "ItemList",

          itemListElement,
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

          ...input.breadcrumb.map((crumb, index) => ({
            "@type": "ListItem",

            position: index + 2,

            name: crumb.name,

            item: crumb.item,
          })),
        ],
      },
    ],
  };
}
