import { loadTemplate } from "../../template-loader";
import { replacePlaceholders } from "../../replacer";
import { writeGeneratedFile } from "../../file-writer";
import { updateRegistry } from "../../registry-updater";

import { updateFormulaRegistry } from "./formula-updater";

import { generatorTemplates } from "./generator-templates";

import type { GeneratorOptions } from "../../types";

import { validateKnowledge } from "./validate-knowledge";

export function generateCalculator(
  options: GeneratorOptions & {
    dryRun?: boolean;
  },
) {

  validateKnowledge(options);

  const dryRun = options.dryRun ?? false;

  for (const item of generatorTemplates) {
    const template =
      loadTemplate(item.template);

    const content =
      replacePlaceholders(
        template,
        options,
      );

    const output =
      item.output.replace(
        "{slug}",
        options.slug,
      );

    if (!dryRun) {
      writeGeneratedFile(
        output,
        content,
      );
    }
  }

  if (!dryRun) {
    updateRegistry(options.slug);
    updateFormulaRegistry(options);
  }

  console.log(
    `✓ Calculator "${options.slug}" generated successfully${dryRun ? " (dry-run)" : ""}.`,
  );
}
