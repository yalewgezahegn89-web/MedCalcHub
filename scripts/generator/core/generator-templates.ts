export type GeneratorTemplate = {
  template: string;
  output: string;
};

export const generatorTemplates: GeneratorTemplate[] = [
  {
    template: "calculator.template.txt",
    output: "lib/calculators/{slug}.ts",
  },
  {
    template: "faq.template.txt",
    output: "lib/calculators/faqs/{slug}.ts",
  },
  {
    template: "clinical.template.txt",
    output: "lib/calculators/clinical/{slug}.ts",
  },
  {
    template: "evidence.template.txt",
    output: "lib/calculators/evidence/{slug}.ts",
  },
  {
    template: "comparison.template.txt",
    output: "lib/calculators/comparisons/{slug}.ts",
  },
  {
    template: "related.template.txt",
    output: "lib/calculators/related/{slug}.ts",
  },
];