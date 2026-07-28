import readline from "node:readline";

import { generateCalculator } from "./generate-calculator";
import { validateSlug } from "./validator";

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

    generateCalculator({
      name,
      slug,
      category,
      specialty,
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