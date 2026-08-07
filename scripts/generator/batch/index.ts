<<<<<<< HEAD
import {
  calculatorKnowledge,
} from "../knowledge";
import { buildMetadata } from "../core/build-metadata";
import { generateCalculator } from "../core/generate-calculator";

function parseArgs(
  args: string[],
): {
  mode: "v2" | "specialty";
  specialty?: string;
  dryRun: boolean;
} {
  const modeArg = args.find((a) =>
    a.startsWith("--mode="),
  );
  const specialtyArg = args.find((a) =>
    a.startsWith("--specialty="),
  );
  const dryRun = args.includes("--dry-run");

  const mode = modeArg?.split("=")[1] as
    | "v2"
    | "specialty"
    | undefined;

  if (
    !mode ||
    !["v2", "specialty"].includes(mode)
  ) {
    throw new Error(
      "Usage: --mode=v2| --mode=specialty [--specialty=<name>] [--dry-run]",
    );
  }

  if (
    mode === "specialty" &&
    !specialtyArg
  ) {
    throw new Error(
      "Usage: --mode=specialty --specialty=<name>",
    );
  }

  return {
    mode,
    specialty: specialtyArg?.split("=")[1],
    dryRun,
  };
}

function getV2Slugs(): string[] {
  return Object.entries(calculatorKnowledge)
    .filter(([, k]) => {
      const hasEvidence =
        k.evidence !== undefined &&
        k.evidence !== null;
      const hasFaq =
        k.faq !== undefined &&
        k.faq !== null &&
        (Array.isArray(k.faq)
          ? k.faq.length > 0
          : true);
      const hasClinicalGuidance =
        k.clinicalGuidance !== undefined &&
        k.clinicalGuidance !== null;
      return (
        hasEvidence && hasFaq && hasClinicalGuidance
      );
    })
    .map(([slug]) => slug);
}

function getSpecialtySlugs(
  specialty: string,
): string[] {
  return Object.entries(calculatorKnowledge)
    .filter(
      ([, k]) =>
        k.specialty?.toLowerCase() ===
        specialty.toLowerCase(),
    )
    .map(([slug]) => slug);
}

function main() {
  const args = process.argv.slice(2);
  const config = parseArgs(args);

  let slugs: string[];

  if (config.mode === "v2") {
    slugs = getV2Slugs();
    console.log(
      `Found ${slugs.length} V2 calculators`,
    );
  } else {
    slugs = getSpecialtySlugs(
      config.specialty!,
    );
    console.log(
      `Found ${slugs.length} calculators in specialty "${config.specialty}"`,
    );
  }

  if (slugs.length === 0) {
    console.log("No calculators to generate.");
    return;
  }

  const errors: {
    slug: string;
    error: string;
  }[] = [];
  let generated = 0;

  for (const slug of slugs) {
    const knowledge =
      calculatorKnowledge[
        slug as keyof typeof calculatorKnowledge
      ] as any;

    if (!knowledge) {
      errors.push({
        slug,
        error: "Missing knowledge entry",
      });
      continue;
    }

    try {
      const metadata = buildMetadata(slug);

      generateCalculator({
        force: true,
        dryRun: config.dryRun,
        classification:
          knowledge.classification ?? [],
        clinicalGuidance:
          knowledge.clinicalGuidance ??
          knowledge.clinical ??
          {},
        clinical:
          knowledge.clinical ??
          knowledge.clinicalGuidance ??
          {},
        faq: knowledge.faq
          ? [...knowledge.faq]
          : [],
        comparison:
          knowledge.comparison ?? {
            title: "",
            calculators: [],
          },
        evidence:
          knowledge.evidence ?? {},
        relatedCalculators:
          knowledge.relatedCalculators
            ? [...knowledge.relatedCalculators]
            : [],
        name:
          metadata.name,
        shortName:
          metadata.shortName,
        slug: metadata.slug,
        category:
          metadata.category,
        specialty:
          metadata.specialty,
        description:
          metadata.description,
        formula:
          metadata.formula,
        normalRange:
          metadata.normalRange,
        keywords:
          metadata.keywords,
        reference:
          metadata.reference,
        reviewedBy:
          metadata.reviewedBy,
        featured:
          metadata.featured,
        inputs:
          metadata.inputs,
      });

      generated++;
    } catch (err) {
      errors.push({
        slug,
        error:
          err instanceof Error
            ? err.message
            : "Unknown error",
      });
    }
  }

  console.log("\n--- Batch Summary ---");
  console.log(
    `Generated: ${generated}/${slugs.length}`,
  );

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    for (const e of errors) {
      console.log(
        `  ✗ ${e.slug}: ${e.error}`,
      );
    }
  }
}

=======
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


>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
main();