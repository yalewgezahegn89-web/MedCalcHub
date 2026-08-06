import readline from "node:readline";

import { suggestInputs } from "../core/input-intelligence";
import { suggestCalculator } from "../core/calculator-intelligence";
import { generateCalculator } from "../core/generate-calculator";
import { validateSlug } from "../../validator";
import { buildMetadata } from "../core/build-metadata";
import { validateCalculator } from "../core/validator";
import { printCoverageReport } from "../core/dashboard";
import {
  validateKnowledge,
} from "../core/knowledge-validator";
import {
  printAutoFixReport,
} from "../core/auto-fix";
import {
  printQualityReport,
} from "../core/quality-score";
import {
  printDependencyGraphReport,
} from "../core/dependency-graph";
import {
  generateKnowledgeTemplate,
  printTemplateSummary,
  slugExists,
} from "../core/template-engine";
import { generateCalculatorTests } from "../core/test-generator";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function ask(
  question: string,
): Promise<string> {
  return new Promise((resolve) =>
    rl.question(
      question,
      (answer) =>
        resolve(answer.trim()),
    ),
  );
}


async function askRequired(
  question: string,
): Promise<string> {

  while (true) {

    const value =
      await ask(question);

    if (value.length > 0) {
      return value;
    }

    console.log(
      "❌ This field is required.\n",
    );

  }
}



async function main() {

  try {


    const args =
      process.argv.slice(2);

    // ── Template command ──
    if (args[0] === "template") {
      const slug = args[1];
      if (!slug) {
        console.error(
          "\n❌ Usage: npm run template -- <slug>\nExample: npm run template -- corrected-calcium",
        );
        return;
      }

      if (slugExists(slug)) {
        console.error(
          `\n❌ Calculator "${slug}" already exists in the knowledge base.`,
        );
        return;
      }

      const category =
        args[2] ?? "Laboratory";
      const specialty = args[3] ?? "";

      const result =
        generateKnowledgeTemplate({
          slug,
          name: "",
          category,
          specialty,
        });

      printTemplateSummary(result);
      return;
    }

    const name =
      args[0];

    // Print coverage report before generation
    printCoverageReport();

    // Run knowledge consistency validator
    const knowledgeResult =
      validateKnowledge();

    if (knowledgeResult.errors.length > 0) {
      console.log(
        "\n❌ Knowledge validation errors:",
      );
      for (const e of knowledgeResult.errors) {
        console.log(
          `  [${e.code}] ${e.message}`,
        );
      }
    }

    if (knowledgeResult.warnings.length > 0) {
      console.log(
        "\n⚠️  Knowledge validation warnings:",
      );
      for (const w of knowledgeResult.warnings) {
        console.log(
          `  [${w.code}] ${w.message}`,
        );
      }
    }

    if (knowledgeResult.valid) {
      console.log(
        "\n✅ Knowledge validation passed",
      );
    }

    // Run auto-fix engine
    printAutoFixReport();

    // Print quality report (after auto-fix)
    printQualityReport();

    // Print dependency graph report
    printDependencyGraphReport();


    const force =
      args.includes(
        "--force",
      );


    if (!name) {

      throw new Error(
        "Missing calculator name.\nExample: npm run generate -- heart-rate",
      );

    }



    // -----------------------------
    // Metadata generation
    // -----------------------------

    const metadata =
      buildMetadata(name);


    const suggestion =
      suggestCalculator(name);



    const shortName =
      metadata.shortName;


    const slug =
      metadata.slug;


    validateSlug(
      slug,
      force,
    );



    const category =
      metadata.category;


    const specialty =
      metadata.specialty;


    const description =
      metadata.description;


    const formula =
      metadata.formula;


    const normalRange =
      metadata.normalRange;


    const keywords =
      metadata.keywords;


    const reference =
      metadata.reference;


    const reviewedBy =
      metadata.reviewedBy;


    const featured =
      metadata.featured;



    // NEW:
// Clinical interpretation rules

const classification =
  suggestion.classification ?? [];


const clinicalGuidance =
  suggestion.clinicalGuidance ?? {};




    // -----------------------------
    // Input generation
    // -----------------------------

    let inputs =
      suggestInputs(name);



    if (inputs.length === 0) {


      console.log(
        "\nNo recommended inputs found.",
      );


      const inputCount =
        Number(
          await askRequired(
            "Number of calculator inputs: ",
          ),
        );



      for (
        let i = 0;
        i < inputCount;
        i++
      ) {


        console.log(
          `\n--- Input ${i + 1} ---`,
        );


        const label =
          await askRequired(
            "Label: ",
          );


        const id =
          await askRequired(
            "ID: ",
          );


        const type =
          (
            await askRequired(
              "Type (number/text/select): ",
            )
          ) as
            | "number"
            | "text"
            | "select";



        const unit =
          await ask(
            "Unit (optional): ",
          );



        const required =
          (
            await ask(
              "Required? (y/n): ",
            )
          )
            .toLowerCase() === "y";



        inputs.push({

          id,

          label,

          type,

          unit:
            unit.length > 0
              ? unit
              : undefined,

          required,

        });


      }


    } else {


      console.log(
        `\n✓ Found ${inputs.length} recommended inputs.`,
      );


    }




    // -----------------------------
    // Generate calculator
    // -----------------------------


    // -----------------------------
    // Validation
    // -----------------------------

    const validationResult =
      validateCalculator({
        ...metadata,
        force,
        classification,
        clinicalGuidance,
        inputs,
      });

    // Print warnings
    for (const w of validationResult.warnings) {
      console.warn(
        `⚠ [${w.code}] ${w.message}${w.path ? ` (${w.path})` : ""}`,
      );
    }

    // Block generation on errors
    if (!validationResult.valid) {
      console.error(
        "\n❌ Validation failed. Cannot generate calculator.",
      );
      for (const e of validationResult.errors) {
        console.error(
          `  ✘ [${e.code}] ${e.message}${e.path ? ` (${e.path})` : ""}`,
        );
      }
      console.error("");
      return;
    }

    const genOptions = {

  ...metadata,

  force,

  classification,

  clinicalGuidance,

      inputs,

    };

    generateCalculator(genOptions);

    generateCalculatorTests(genOptions);

    console.log(
      "\n✅ Calculator generated successfully.",
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


  } finally {

    rl.close();

  }

}


main();