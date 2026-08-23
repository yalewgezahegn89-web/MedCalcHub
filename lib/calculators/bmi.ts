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
    "Interpret results together with the patient's clinical presentation.",





  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
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