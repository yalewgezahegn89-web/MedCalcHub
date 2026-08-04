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

  updatedAt: "2026-08-04",

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

  clinicalGuidance: {
    advice: ["Maintain a balanced diet and regular physical activity.","Assess cardiovascular and metabolic risk factors when clinically indicated."],
    warnings: ["BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass."],
    followUp: ["Interpret BMI together with clinical history and physical examination.","Consider additional risk assessment based on the patient's overall health profile."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: undefined,

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



for (
  const key of Object.keys(values)
) {

  const inputValue =
    Number(values[key]);


  if (
    values[key] === "" ||
    values[key] === undefined
  ) {

    return {

      value: 0,

      interpretation:
        "Required input missing.",

      status:
        "critical",

    };

  }


  if (
    Number.isNaN(inputValue)
  ) {

    return {

      value: 0,

      interpretation:
        "Invalid numeric input.",

      status:
        "critical",

    };

  }


  if (
    inputValue < 0
  ) {

    return {

      value: 0,

      interpretation:
        "Negative values are not allowed.",

      status:
        "critical",

    };

  }

}





const weight =
    Number(values.weight);

const height =
    Number(values.height) / 100;


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

if (false) {}


else if (result <= 18.4) {

  interpretation =
    "Underweight";

  status =
    "low";

  referenceRange =
  "<18.5";
}


else if (result >= 18.5 && result <= 24.9) {

  interpretation =
    "Normal weight";

  status =
    "normal";

  referenceRange =
  "18.5–24.9";
}


else if (result >= 25 && result <= 29.9) {

  interpretation =
    "Overweight";

  status =
    "high";

  referenceRange =
  "25–29.9";
}


else if (result >= 30) {

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