import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",

  slug: "bmi",

  name: "Body Mass Index (BMI)",

  shortName: "bmi",

  description:
    "Calculates Body Mass Index.",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Body Mass Index", "BMI", "Obesity", "Weight", "Anthropometry", "Body Weight"],

  formula: "weight / (height * height)",

  normalRange: "18.5–24.9 kg/m²",

  referenceRanges: [
  {
    label: "Underweight",
    range: "<18.5",
  },
  {
    label: "Normal weight",
    range: "18.5–24.9",
  },
  {
    label: "Overweight",
    range: "25–29.9",
  },
  {
    label: "Obesity",
    range: "≥30",
  }
],



  clinicalNotes:
    "Body Mass Index (BMI) is a weight-for-height index calculated as weight (kg) divided by height (m\u00B2). It is used internationally to classify adult weight status: underweight (BMI <18.5), normal weight (18.5\u201324.9), overweight (25\u201329.9), and obesity (\u226530), as defined by the World Health Organization.\n\nBMI is a screening tool, not a direct measure of body fat. It does not distinguish between fat mass and lean mass, so muscular individuals, athletes, and persons with high bone density may be misclassified. In elderly patients, reduced height from vertebral compression can artificially elevate BMI.\n\nBMI should not be used as the sole criterion for clinical decisions about weight management. It must be interpreted alongside waist circumference, metabolic markers, and the patient\u2019s overall clinical context. For children and adolescents, age- and sex-specific BMI percentiles are required. In pregnancy, BMI interpretation requires separate guidelines.\n\nThis calculator is intended for adult screening only and does not diagnose obesity or body fatness.",





  comparison: undefined,

  references: [
    "WHO. Obesity and Overweight. World Health Organization Fact Sheet.",
    "Nuttall FQ. Body Mass Index: Obesity, BMI, Health, and Nutritional Risks. Nutrients. 2015;7(9):8184-8191.",
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
    conversion: {
      type: "divide",
      factor: 100,
    },
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
const height = Number(values.height) / 100;
const ht = height;


  const result =
    weight / (height * height);


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";

if (result < 18.5) {

  interpretation =
    "Underweight";

  status =
    "low";

  referenceRange =
  "<18.5";
}


else if (result < 25) {

  interpretation =
    "Normal weight";

  status =
    "normal";

  referenceRange =
  "18.5–24.9";
}


else if (result < 30) {

  interpretation =
    "Overweight";

  status =
    "high";

  referenceRange =
  "25–29.9";
}


else {

  interpretation =
    "Obesity";

  status =
    "critical";

  referenceRange =
  "≥30";
}





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};