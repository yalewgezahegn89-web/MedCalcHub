import { replacePlaceholders } from "../../replacer";
import { loadTemplate } from "../../template-loader";
import { writeGeneratedFile } from "../../file-writer";
import { updateRegistry } from "../../registry-updater";
import type { GeneratorOptions } from "../../types";

export function generateCalculator(
  options: GeneratorOptions,
) {
  const template = loadTemplate(
    "calculator.template.ts",
  );

  const content = replacePlaceholders(
    template,
    options,
  );

  const output = `lib/calculators/${options.slug}.ts`;

  writeGeneratedFile(
    output,
    content,
  );

  updateRegistry(options.slug);
}