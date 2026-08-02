import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",

  slug: "bmi",

  name: "bmi",

  shortName: "bmi",

  description:
    "Calculates Body Mass Index.",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-02",

  keywords: [],

  formula: "BMI = weight / height²",

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


const weight =
    Number(values.weight);

const height =
    Number(values.height) / 100;


  const result =
    weight / (height * height);




if (
  !Number.isFinite(result)
) {

  return {
    value: 0,

    interpretation:
      "Invalid calculation result.",

    status:
      "critical",
  };

}




  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

if (false) {}


else if (result <= 18.4) {

  interpretation =
    "Underweight";

  status =
    "low";
}


else if (result >= 18.5 && result <= 24.9) {

  interpretation =
    "Normal weight";

  status =
    "normal";
}


else if (result >= 25 && result <= 29.9) {

  interpretation =
    "Overweight";

  status =
    "high";
}


else if (result >= 30) {

  interpretation =
    "Obesity";

  status =
    "critical";
}





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,
};
},

};