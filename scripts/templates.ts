export type GeneratorTemplate = {
  template: string;
  output: string;
};

export const generatorTemplates: GeneratorTemplate[] = [
  {
    template: "calculator.template.ts",
    output: "lib/calculators/{slug}.ts",
  },
  {
    template: "faq.template.ts",
    output: "lib/calculators/faqs/{slug}.ts",
  },
  {
    template: "clinical.template.ts",
    output: "lib/calculators/clinical/{slug}.ts",
  },
  {
    template: "evidence.template.ts",
    output: "lib/calculators/evidence/{slug}.ts",
  },
  {
    template: "comparison.template.ts",
    output: "lib/calculators/comparisons/{slug}.ts",
  },
  {
    template: "related.template.ts",
    output: "lib/calculators/related/{slug}.ts",
  },
];