import type { CalculatorDefinition } from "@/lib/calculators/calculator.types";
import { calculatorFaqs } from "@/lib/calculators/faqs";

export function buildCalculatorJsonLd(
  calculator: CalculatorDefinition,
) {
  const faq = calculator.faq ?? calculatorFaqs[calculator.slug] ?? [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",

        name: calculator.name,

        description: calculator.description,

        about: calculator.category,

        specialty: calculator.specialty,

        url: `https://medcalchub.com/calculators/${calculator.slug}`,
      },

      {
        "@type": "SoftwareApplication",

        name: calculator.name,

        applicationCategory: "MedicalApplication",

        operatingSystem: "Any",

        description: calculator.description,

        url: `https://medcalchub.com/calculators/${calculator.slug}`,
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
    ],
  };
}