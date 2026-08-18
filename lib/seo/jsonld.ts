import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";
import { calculatorFaqs } from "@/lib/calculators/faqs";
import { getClinicalContent } from "@/lib/clinical-content";
import { SITE_URL } from "@/lib/site-url";

export function buildCalculatorJsonLd(
  calculator: CalculatorDefinition,
) {
  const clinicalContent = getClinicalContent(calculator.slug);
  const faq =
    clinicalContent?.faq ??
    calculator.faq ??
    calculatorFaqs[calculator.slug] ??
    [];
  const calculatorUrl = `${SITE_URL}/calculators/${calculator.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
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
        "@type": "FAQPage",

        mainEntity: faq.map((item) => ({
          "@type": "Question",

          name: item.question,

          acceptedAnswer: {
            "@type": "Answer",

            text: item.answer,
          },
        })),
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
    ],
  };
}
