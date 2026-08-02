import readline from "node:readline";

import { suggestInputs } from "../core/input-intelligence";
import { suggestCalculator } from "../core/calculator-intelligence";
import { generateCalculator } from "../core/generate-calculator";
import { validateSlug } from "../../validator";
import { buildMetadata } from "../core/build-metadata";


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


    const name =
      args[0];


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
  metadata.classification ?? [];




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


    generateCalculator({

      force,

      classification,

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