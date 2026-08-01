import type {
  CalculatorInputDefinition,
} from "../../types";


export function buildInputs(
  inputs: CalculatorInputDefinition[],
): string {

  if (inputs.length === 0) {
    return "[]";
  }


  return `[
${inputs
  .map(
    (input) => {

      const conversion =
        input.conversion
          ? `
    conversion: {
      type: "${input.conversion.type}",
      factor: ${input.conversion.factor},
    },`
          : "";


      return `  {
    id: "${input.id}",
    label: "${input.label}",
    type: "${input.type}",${
      input.unit
        ? `
    unit: "${input.unit}",`
        : ""
    }${conversion}
    required: ${input.required ?? false},
  }`;

    },
  )
  .join(",\n")}
]`;
}