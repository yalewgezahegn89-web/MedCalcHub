import type { CalculatorDefinition } from "./calculator.types";

export const bsaCalculator: CalculatorDefinition = {
  id: "bsa",

  slug: "bsa",

  name: "bsa",

  shortName: "bsa",

  description:
    "Calculates Body Surface Area using the Mosteller formula.",

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

  formula: "BSA = √((height × weight) / 3600)",

  normalRange: "Typical adult: 1.4–2.2 m²",

  referenceRanges: [
  {
    label: "Small adult",
    range: "<1.4000000000000001",
  },
  {
    label: "Typical adult",
    range: "1.4–2.2",
  },
  {
    label: "Large adult",
    range: "≥2.3",
  }
],

  clinicalGuidance: {
    advice: [
      "BSA is commonly used for drug dosing, particularly in oncology and cardiology.",
      "Mosteller formula is widely accepted for clinical use."
    ],
    warnings: [
      "BSA estimates may be less accurate at extremes of body size.",
      "Different BSA formulas may yield slightly different results."
    ],
    followUp: [
      "Use BSA-based dosing with clinical judgment.",
      "Consider ideal body weight for drug dosing in obese patients."
    ],
  },

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What is BSA used for?",
      "answer": "Body Surface Area is used for drug dosing (especially chemotherapy), cardiac index calculation, and metabolic rate estimation."
    },
    {
      "question": "Which BSA formula is most common?",
      "answer": "The Mosteller formula BSA = √((height × weight) / 3600) is the most widely used in clinical practice."
    }
  ],

  comparison: {
    "title": "Body Composition Calculators",
    "calculators": [
      {
        "name": "BMI",
        "href": "/calculators/bmi",
        "use": "General body fat screening"
      },
      {
        "name": "Ideal Body Weight",
        "href": "/calculators/ibw",
        "use": "Drug dosing reference weight"
      }
    ]
  },

  clinical: {
    "advice": [
      "BSA is commonly used for drug dosing, particularly in oncology and cardiology.",
      "Mosteller formula is widely accepted for clinical use."
    ],
    "warnings": [
      "BSA estimates may be less accurate at extremes of body size.",
      "Different BSA formulas may yield slightly different results."
    ],
    "followUp": [
      "Use BSA-based dosing with clinical judgment.",
      "Consider ideal body weight for drug dosing in obese patients."
    ]
  },

  evidence: {
    "source": "Mosteller RD",
    "reference": "Simplified calculation of body-surface area. N Engl J Med. 1987.",
    "references": [
      "Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098."
    ]
  },

  relatedCalculators: [
    "bmi",
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
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


<<<<<<< HEAD

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
=======
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
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1


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

<<<<<<< HEAD
if (false) {}


else if (result <= 1.3) {

  interpretation =
    "Small adult";

  status =
    "low";

  referenceRange =
  "<1.4000000000000001";
}


else if (result >= 1.4 && result <= 2.2) {

  interpretation =
    "Typical adult";

  status =
    "normal";

  referenceRange =
  "1.4–2.2";
}


else if (result >= 2.3) {

  interpretation =
    "Large adult";

  status =
    "high";

  referenceRange =
  "≥2.3";
}


=======
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1



return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};