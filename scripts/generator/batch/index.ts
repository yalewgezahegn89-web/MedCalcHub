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

main();