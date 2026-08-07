import type {
  GeneratorOptions,
} from "../../types";

import type {
  CalculatorSuggestion,
} from "../core/calculator-intelligence";

import {
  calculatorKnowledge,
  CalculatorKey,
} from "../knowledge/index";

import {
  generateCalculator,
} from "../core/generate-calculator";

import {
  getCalculatorsByMode,
  BatchMode,
} from "./modes";


function parseArgs() {
  const args =
    process.argv.slice(2);

  const mode =
    getArg(args, "--mode") ?? "v2";

  const dryRun =
    args.includes("--dry-run");

  const specialty =
    getArg(args, "--specialty");


  return {
    mode: mode as BatchMode,
    dryRun,
    specialty,
  };
}


function getArg(
  args: string[],
  key: string,
): string | undefined {
  const arg =
    args.find(
      (a) => a.startsWith(`${key}=`),
    );
  return arg?.split("=")[1];
}


function buildOptions(
  key: CalculatorKey,
): GeneratorOptions {
  const entry =
    calculatorKnowledge[key] as CalculatorSuggestion;

  return {
    name: key,
    shortName: key,
    slug: key,
    category:
      entry.category ?? "General",

    specialty:
      entry.specialty ?? "General",

    description:
      entry.description ?? "",

    formula:
      entry.formula ?? "",

    normalRange:
      entry.normalRange ?? "",

    keywords: entry.keywords
      ? [...entry.keywords]
      : [],

    inputs: entry.inputs
      ? [...entry.inputs] as GeneratorOptions["inputs"]
      : [],

    classification:
      entry.classification
        ? [...entry.classification] as GeneratorOptions["classification"]
        : [],

    clinicalGuidance:
      entry.clinicalGuidance as GeneratorOptions["clinicalGuidance"],

    relatedCalculators:
      entry.relatedCalculators
        ? [...entry.relatedCalculators]
        : [],

    evidence: entry.evidence
      ? { ...entry.evidence } as GeneratorOptions["evidence"]
      : undefined,

    faq: entry.faq as GeneratorOptions["faq"],

    comparison: entry.comparison as GeneratorOptions["comparison"],

    reference:
      "MedCalcHub Clinical References",

    reviewedBy:
      "MedCalcHub Clinical Team",

    featured: false,
  };
}


async function main() {
  try {

    const { mode, dryRun, specialty } =
      parseArgs();


    const keys =
      getCalculatorsByMode(
        mode,
        specialty,
      );


    console.log(
      `\n📦 Batch mode: ${mode}`,
    );

    console.log(
      `📋 Calculators found: ${keys.length}`,
    );


    if (dryRun) {
      console.log(
        "\n🔍 Dry run — no files will be written.\n",
      );

      for (const key of keys) {
        const entry =
          calculatorKnowledge[key];

        console.log(
          `  ✓ ${key} (${entry.category ?? "General"})`,
        );
      }

      console.log(
        `\n✅ ${keys.length} calculator(s) would be generated.`,
      );

      return;
    }


    let successCount = 0;
    let errorCount = 0;


    for (const key of keys) {

      try {
        const options =
          buildOptions(key);

        generateCalculator(options);

        successCount++;

      } catch (err) {
        console.error(
          `\n❌ Failed to generate "${key}": ${err instanceof Error ? err.message : "Unknown error"}`,
        );

        errorCount++;
      }
    }


    console.log(
      `\n✅ Batch complete: ${successCount} generated, ${errorCount} failed.`,
    );


  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `\n❌ ${error.message}`,
      );
    } else {
      console.error(
        "\n❌ Unknown error occurred.",
      );
    }

    process.exit(1);
  }
}


main();