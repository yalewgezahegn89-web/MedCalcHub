import readline from "node:readline";

import { suggestCalculator } from "../core/calculator-intelligence";
import { suggestInputs } from "../core/input-intelligence";
import { generateCalculator } from "../core/generate-calculator";
import { validateSlug } from "../../validator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) =>
    rl.question(question, (answer) =>
      resolve(answer.trim()),
    ),
  );
}

async function askRequired(
  question: string,
): Promise<string> {
  while (true) {
    const value = await ask(question);

    if (value.length > 0) {
      return value;
    }

    console.log("❌ This field is required.\n");
  }
}

async function main() {
  try {
    const name = await askRequired(
      "Calculator Name: ",
    );

    const suggestion =
      suggestCalculator(name);

    const shortName =
      await askRequired(
        "Short Name: ",
      );

    const slug =
      await askRequired(
        "Slug: ",
      );

    validateSlug(slug);

    const category =
      (
        await ask(
          `Category [${suggestion.category ?? "General"}]: `,
        )
      ) ||
      suggestion.category ||
      "General";

    const specialty =
      (
        await ask(
          `Specialty [${suggestion.specialty ?? "General"}]: `,
        )
      ) ||
      suggestion.specialty ||
      "General";

    const description =
      (
        await ask(
          `Description [${suggestion.description ?? ""}]: `,
        )
      ) ||
      suggestion.description ||
      "";

    const formula =
      (
        await ask(
          `Formula [${suggestion.formula ?? ""}]: `,
        )
      ) ||
      suggestion.formula ||
      "";

    const normalRange =
      (
        await ask(
          `Normal Range [${suggestion.normalRange ?? ""}]: `,
        )
      ) ||
      suggestion.normalRange ||
      "";

    const keywordsInput =
      (
        await ask(
          `Keywords [${suggestion.keywords?.join(", ") ?? ""}]: `,
        )
      ) ||
      suggestion.keywords?.join(", ") ||
      "";

    const reference =
      await askRequired(
        "Primary Reference: ",
      );

    const reviewedBy =
      await askRequired(
        "Reviewed By: ",
      );

    const featuredInput =
      await ask(
        "Featured? (y/n): ",
      );

    const featured =
      featuredInput.toLowerCase() === "y";

    let inputs =
      suggestInputs(name);

    if (inputs.length > 0) {
      console.log(
        `\n✓ Found ${inputs.length} recommended inputs.`,
      );

      const useSuggested =
        (
          await ask(
            "Use recommended inputs? (Y/n): ",
          )
        ).toLowerCase();

      if (useSuggested === "n") {
        inputs = [];
      }
    }

    if (inputs.length === 0) {
      const inputCount = Number(
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
          ).toLowerCase() === "y";

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
    }

    generateCalculator({
      name,
      shortName,
      slug,
      category,
      specialty,
      description,
      formula,
      normalRange,
      keywords: keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      reference,
      reviewedBy,
      featured,
      inputs,
    });

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