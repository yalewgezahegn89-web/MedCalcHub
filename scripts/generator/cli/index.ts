import readline from "node:readline";

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

    const shortName =
      await askRequired(
        "Short Name: ",
      );

    const slug = await askRequired(
      "Slug: ",
    );

    validateSlug(slug);

    const category =
      await askRequired(
        "Category: ",
      );

    const specialty =
      await askRequired(
        "Specialty: ",
      );

    const description =
      await askRequired(
        "Description: ",
      );

    const formula =
      await askRequired(
        "Formula: ",
      );

    const normalRange =
      await askRequired(
        "Normal Range: ",
      );

    const keywordsInput =
      await askRequired(
        "Keywords (comma separated): ",
      );

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
      featuredInput.toLowerCase() ===
      "y";

    const inputCount = Number(
      await askRequired(
        "Number of calculator inputs: ",
      ),
    );

    const inputs = [];

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
        (await askRequired(
          "Type (number/text/select): ",
        )) as
          | "number"
          | "text"
          | "select";

      const unit = await ask(
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