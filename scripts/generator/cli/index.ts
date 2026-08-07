import readline from "node:readline";

import { suggestInputs } from "../core/input-intelligence";
import { suggestCalculator } from "../core/calculator-intelligence";
import { generateCalculator } from "../core/generate-calculator";
import { validateSlug } from "../../validator";
import { buildMetadata } from "../core/build-metadata";
import { validateCalculator } from "../core/validator";
import { loadPlugins } from "../plugins";
import type { PluginContext } from "../plugins/types";
import {
  generateKnowledgeTemplate,
  printTemplateSummary,
  slugExists,
} from "../core/template-engine";
import { generateCalculatorTests } from "../core/test-generator";
import {
  loadGeneratorConfig,
} from "../core/config";


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

    // ── Version command ──
    if (args[0] === "version") {
      console.log("");
      console.log("═══════════════════════════════════════");
      console.log("");
      console.log("  MedCalcHub Generator");
      console.log("");
      console.log(`  Version:   1.0.0`);
      console.log(`  Status:    Stable`);
      console.log(`  Build:     Generator V7`);
      console.log("");
      console.log("═══════════════════════════════════════");
      console.log("");
      return;
    }

    // ── Template command ──
    // ── Config command ──
    if (args[0] === "config") {
      const config = loadGeneratorConfig();
      console.log("\n⚙️  Generator Configuration");
      console.log("═══════════════════════════════════════");
      console.log(`  Version:           ${config.version}`);
      console.log(`  Generator:         ${config.generator.name}`);
      console.log("");
      console.log("  📁 Directories");
      console.log(`    Output:          ${config.generator.outputDirectory}`);
      console.log(`    Docs:            ${config.generator.docsDirectory}`);
      console.log(`    Exports:         ${config.generator.exportsDirectory}`);
      console.log(`    Locales:         ${config.generator.localesDirectory}`);
      console.log(`    Tests:           ${config.generator.testsDirectory}`);
      console.log("");
      console.log("  🔌 Plugins");
      const plugins = config.plugins as Record<string, boolean>;
      for (const [name, enabled] of Object.entries(plugins)) {
        const icon = enabled ? "✅" : "❌";
        const key = name.replace(/([A-Z])/g, " $1").trim();
        console.log(`    ${icon} ${key}`);
      }
      console.log("");
      console.log("  🌐 Localization");
      console.log(`    Default:         ${config.localization.defaultLanguage}`);
      console.log(`    Languages:       ${config.localization.supportedLanguages.join(", ")}`);
      console.log("");
      console.log("  🎨 Formatting");
      console.log(`    JSON Indent:     ${config.formatting.jsonIndent}`);
      console.log(`    Sort:            ${config.formatting.sortAlphabetically ? "Yes" : "No"}`);
      console.log(`    Deterministic:   ${config.formatting.deterministicOutput ? "Yes" : "No"}`);
      console.log("");
      console.log("  ✅ Validation");
      console.log(`    Stop on Error:   ${config.validation.stopOnError ? "Yes" : "No"}`);
      console.log(`    Show Warnings:   ${config.validation.showWarnings ? "Yes" : "No"}`);
      console.log(`    Auto Fix:        ${config.validation.autoFixBeforeValidation ? "Yes" : "No"}`);
      console.log("═══════════════════════════════════════\n");
      return;
    }

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

    // Run all analysis plugins
    const pluginContext: PluginContext = {
      calculatorKnowledge: {} as typeof import("../knowledge").calculatorKnowledge,
      logger: {
        info: (msg: string) => console.log(msg),
        warn: (msg: string) => console.warn(msg),
        error: (msg: string) => console.error(msg),
      },
    };

    const plugins = loadPlugins();
    for (const plugin of plugins) {
      const line = "─".repeat(50);
      console.log(`\n${line}`);
      console.log(`  Running Plugin: ${plugin.name}`);
      console.log(`${line}\n`);
      plugin.execute(pluginContext);
    }


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



    const classification =
      metadata.classification ?? [];

    const clinicalGuidance =
      metadata.clinicalGuidance ?? {};




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

<<<<<<< HEAD
      clinical: metadata.clinical,

      faq: metadata.faq,

      comparison: metadata.comparison,

      evidence: metadata.evidence,

      relatedCalculators: metadata.relatedCalculators,

      name,

      shortName,

      slug,

      category,

      specialty,

      description,

      formula,

      normalRange,

      keywords,

      reference,

      reviewedBy,

      featured,

=======
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
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