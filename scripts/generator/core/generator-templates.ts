export const generatorTemplates = [
  {
    template: "calculator.template.ts",
    output: "lib/calculators/{slug}.ts",
  },
  {
    template: "faq.template.ts",
    output: "lib/calculators/faqs/{slug}.faq.ts",
  },
  {
    template: "clinical.template.ts",
    output: "lib/calculators/clinical/{slug}.clinical.ts",
  },
  {
    template: "evidence.template.ts",
    output: "lib/calculators/evidence/{slug}.evidence.ts",
  },
  {
    template: "comparison.template.ts",
    output: "lib/calculators/comparisons/{slug}.comparison.ts",
  },
  {
    template: "related.template.ts",
    output: "lib/calculators/related/{slug}.related.ts",
  },
];