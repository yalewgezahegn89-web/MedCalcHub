import { loadTemplate } from "./template-loader";
import { replacePlaceholders } from "./replacer";
import { writeGeneratedFile } from "./file-writer";
import { GeneratorOptions } from "./types";

export function generateCalculator(
  options: GeneratorOptions,
) {
  const template =
    loadTemplate(
      "calculator.template.ts",
    );

  const result =
    replacePlaceholders(
      template,
      options,
    );

  writeGeneratedFile(
    `lib/calculators/${options.slug}.ts`,
    result,
  );
}