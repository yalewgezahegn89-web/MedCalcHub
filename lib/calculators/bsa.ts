import type { CalculatorDefinition } from "./calculator.types";

export const bsaCalculator: CalculatorDefinition = {
  id: "bsa",

  slug: "bsa",

  name: "Body Surface Area (BSA)",

  shortName: "bsa",

  description:
    "Calculates Body Surface Area (Mosteller formula).",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Body Surface Area", "BSA", "Mosteller", "DuBois", "Drug Dosing", "Chemotherapy Dosing"],

  formula: "BSA = √((height × weight) / 3600)",

  normalRange: "Typical adult: 1.4–2.2 m²",

  referenceRanges: [],



  clinicalNotes:
    "Body surface area (BSA) is an estimate of the external surface area of the body derived from height and weight. This calculator uses the Mosteller formula, BSA (m²) = √(height × weight / 3600), with height in centimeters and weight in kilograms. It is a widely used way to express physiologic measures that scale with body size.\n\nBSA is used clinically to index physiologic parameters such as cardiac output or glomerular filtration rate (for example, eGFR expressed per 1.73 m²) and to scale certain drug doses, most notably in oncology, where chemotherapy is often dosed per square meter. Because it is a derived estimate, its accuracy depends on the quality of the height and weight measurements.\n\nBSA reflects body size but not body composition; it does not distinguish lean mass from fat mass, and it becomes less informative at the extremes of weight where body proportions are unusual. It is not drug-specific guidance on its own, and dosing decisions should always follow the relevant medication monograph or protocol rather than the BSA value alone.",





  comparison: undefined,

  references: [
    "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
  },
  {
    id: "height",
    label: "Height",
    type: "number",
    unit: "cm",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.weight === "" ||
  values.weight === undefined
) {
  return {
    value: 0,
    interpretation: "Weight is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.weight))
) {
  return {
    value: 0,
    interpretation: "Invalid Weight.",
    status: "critical",
  };
}


if (Number(values.weight) < 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be negative.",
    status: "critical",
  };
}


if (Number(values.weight) === 0) {
  return {
    value: 0,
    interpretation: "Weight cannot be zero.",
    status: "critical",
  };
}


if (
  values.height === "" ||
  values.height === undefined
) {
  return {
    value: 0,
    interpretation: "Height is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.height))
) {
  return {
    value: 0,
    interpretation: "Invalid Height.",
    status: "critical",
  };
}


if (Number(values.height) < 0) {
  return {
    value: 0,
    interpretation: "Height cannot be negative.",
    status: "critical",
  };
}


if (Number(values.height) === 0) {
  return {
    value: 0,
    interpretation: "Height cannot be zero.",
    status: "critical",
  };
}



const weight = Number(values.weight);
const wt = weight;
const height = Number(values.height);
const ht = height;


  const result =
    Math.sqrt((height * weight) / 3600);


  
const interpretation =
  "Body surface area " +
  Number(result.toFixed(2)) +
  " m².";

const status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

const referenceRange =
  "";




return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};