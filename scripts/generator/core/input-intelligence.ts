import type {
  CalculatorInputDefinition,
} from "../../types";

import { calculatorKnowledge } from "../knowledge";


function normalizeInput(
  input: CalculatorInputDefinition,
): CalculatorInputDefinition {

  const validTypes = [
    "number",
    "text",
    "select",
  ] as const;


  let type =
    input.type;


  if (
    !validTypes.includes(
      type as typeof validTypes[number],
    )
  ) {
    type = "number";
  }


  return {
    ...input,

    id:
      input.id
        .toLowerCase()
        .replace(/\s+/g, "-"),

    label:
      input.label.trim(),

    type,

    unit:
      input.unit
        ? input.unit.trim()
        : undefined,

    required:
      Boolean(
        input.required,
      ),
  };
}



export function suggestInputs(
  calculatorName: string,
): CalculatorInputDefinition[] {

  const key =
    calculatorName
      .toLowerCase()
      .replace(" calculator", "")
      .replace(/\s+/g, "-")
      .trim();


  const calculator =
    calculatorKnowledge[
      key as keyof typeof calculatorKnowledge
    ];


  if (
    calculator &&
    calculator.inputs
  ) {

    return calculator.inputs.map(
      (input) =>
        normalizeInput(
          input as CalculatorInputDefinition,
        ),
    );
  }


  return [];
}