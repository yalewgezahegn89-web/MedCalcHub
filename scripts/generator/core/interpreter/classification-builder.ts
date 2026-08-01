import type {
  ClassificationRule,
} from "../../../types";


export function buildClassification(
  classification: readonly ClassificationRule[],
): string {


  if (
    !classification ||
    classification.length === 0
  ) {

    return `
let interpretation =
  "Clinical interpretation pending.";

let status =
  "normal";
`;
  }



  const blocks =
    classification
      .map((rule) => {

        let condition = "";


        if (
          rule.min !== undefined &&
          rule.max !== undefined
        ) {

          condition =
            `result >= ${rule.min} && result <= ${rule.max}`;

        }

        else if (
          rule.min !== undefined
        ) {

          condition =
            `result >= ${rule.min}`;

        }

        else if (
          rule.max !== undefined
        ) {

          condition =
            `result <= ${rule.max}`;

        }



        return `
else if (${condition}) {

  interpretation =
    "${rule.label}";

  status =
    "${rule.status}";
}
`;

      })
      .join("\n");



  return `
let interpretation =
  "Clinical interpretation pending.";

let status =
  "normal";


if (false) {}

${blocks}
`;

}