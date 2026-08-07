import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",

  slug: "bmi",

  name: "bmi",

  shortName: "bmi",

  description:
    "Calculates Body Mass Index from weight and height.",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

<<<<<<< HEAD
  updatedAt: "2026-08-05",
=======
  updatedAt: "2026-08-06",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  keywords: [],

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

  clinicalGuidance: {
<<<<<<< HEAD
    advice: [
      "Maintain a balanced diet and regular physical activity.",
      "Assess cardiovascular and metabolic risk factors when clinically indicated.",
      "Use BMI as a screening tool, not a definitive diagnostic measure."
    ],
    warnings: [
      "BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass.",
      "BMI does not differentiate between fat mass and lean mass."
    ],
    followUp: [
      "Interpret BMI together with clinical history and physical examination.",
      "Consider waist circumference and additional metabolic risk assessment.",
      "Refer for body composition analysis if clinical picture is unclear."
    ],
=======
    advice: ["Maintain a balanced diet and regular physical activity.","Assess cardiovascular and metabolic risk factors when clinically indicated."],
    warnings: ["BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass."],
    followUp: ["Interpret BMI together with clinical history and physical examination.","Consider additional risk assessment based on the patient's overall health profile."],
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: [{"question":"What is BMI?","answer":"BMI is a screening tool that estimates body fat using height and weight."},{"question":"Can BMI diagnose obesity?","answer":"No. BMI is only a screening tool and should always be interpreted together with clinical findings."}],

  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What is BMI?",
      "answer": "Body Mass Index (BMI) is a measure of body fat based on height and weight. It is calculated by dividing weight in kilograms by the square of height in meters."
    },
    {
      "question": "Is BMI accurate for athletes?",
      "answer": "BMI may overestimate body fat in athletes and muscular individuals because it does not distinguish between muscle and fat mass."
    },
    {
      "question": "What BMI indicates obesity?",
      "answer": "A BMI of 30 or higher is classified as obesity according to WHO guidelines."
    }
  ],

  comparison: {
    "title": "BMI vs Other Body Composition Measures",
    "calculators": [
      {
        "name": "Body Surface Area",
        "href": "/calculators/bsa",
        "use": "Drug dosing and physiologic scaling"
      },
      {
        "name": "Waist-to-Hip Ratio",
        "href": "/calculators/waist-to-hip-ratio",
        "use": "Central adiposity assessment"
      }
    ]
  },

  clinical: {
    "advice": [
      "Maintain a balanced diet and regular physical activity.",
      "Assess cardiovascular and metabolic risk factors when clinically indicated.",
      "Use BMI as a screening tool, not a definitive diagnostic measure."
    ],
    "warnings": [
      "BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass.",
      "BMI does not differentiate between fat mass and lean mass."
    ],
    "followUp": [
      "Interpret BMI together with clinical history and physical examination.",
      "Consider waist circumference and additional metabolic risk assessment.",
      "Refer for body composition analysis if clinical picture is unclear."
    ]
  },

  evidence: {
    "source": "World Health Organization",
    "reference": "WHO Obesity: Preventing and managing the global epidemic. WHO Technical Report Series 894.",
    "references": [
      "WHO. Obesity: Preventing and managing the global epidemic. WHO Technical Report Series 894, 2000.",
      "Nuttall FQ. Body Mass Index: Obesity, BMI, and Health. Nutrition. 2015."
    ]
  },

  relatedCalculators: [
    "bsa",
    "ibw",
    "adjbw",
    "lbm"
  ],

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