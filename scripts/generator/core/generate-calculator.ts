import { loadTemplate } from "../../template-loader";
import { replacePlaceholders } from "../../replacer";
import { writeGeneratedFile } from "../../file-writer";
import { updateRegistry } from "../../registry-updater";

import { updateFormulaRegistry } from "./formula-updater";

import { generatorTemplates } from "./generator-templates";

import type { GeneratorOptions } from "../../types";

export function generateCalculator(
  options: GeneratorOptions,
) {
  for (const item of generatorTemplates) {
    const template =
      loadTemplate(item.template);

    const content =
      replacePlaceholders(
        template,
        options,
      );

    // ============================
    // TEMP DEBUG
    // ============================
    console.log("================================");
    console.log(content);
    console.log("================================");

    const output =
      item.output.replace(
        "{slug}",
        options.slug,
      );

    writeGeneratedFile(
      output,
      content,
    );
  }

  updateRegistry(options.slug);

  updateFormulaRegistry(options);

  console.log(
    `✓ Calculator "${options.slug}" generated successfully.`,
  );
}