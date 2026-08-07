/**
 * Incremental Generation Plugin
 *
 * Determines which calculators have changed and
 * only regenerates those. Removes deleted
 * calculators and their outputs.
 *
 * This plugin MUST NOT modify calculator logic.
 * It only manages the generation cache.
 */

import type { GeneratorPlugin } from "./types";
import { calculatorKnowledge } from "../knowledge";
import type { CalculatorSuggestion } from "../core/calculator-intelligence";
import {
  runIncrementalCycle,
  printIncrementalReport,
} from "../core/incremental";

const plugin: GeneratorPlugin = {
  name: "Incremental Generation",
  order: 99,
  enabled: true,
  execute(_context) {
    const knowledge =
      calculatorKnowledge as Record<string, CalculatorSuggestion>;

    const result = runIncrementalCycle(knowledge);

    printIncrementalReport(result);

    // Result is stored in context for downstream use
  },
};

export default plugin;