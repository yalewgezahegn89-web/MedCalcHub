import { replacePlaceholders } from "../../replacer";
import { loadTemplate } from "../../template-loader";
import { writeGeneratedFile } from "../../file-writer";
import { updateRegistry } from "../../registry-updater";
import type { GeneratorOptions } from "../../types";
import { suggestCalculationCode } from "./formula-intelligence";
export function generateCalculator(
  options: GeneratorOptions,
) {
  const template = loadTemplate(
    "calculator.template.ts",
  );

  let content =
  replacePlaceholders(
    template,
    options,
  );

content = content.replace(
  "{{CALCULATION_CODE}}",
  suggestCalculationCode(
    options.name,
  ),
);

  const output = `lib/calculators/${options.slug}.ts`;

  writeGeneratedFile(
    output,
    content,
  );

  updateRegistry(options.slug);
}