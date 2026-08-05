import type { CalculatorDefinition } from "./calculator.types";

export const adjbwCalculator: CalculatorDefinition = {
  id: "adjbw",

  slug: "adjbw",

  name: "adjbw",

  shortName: "adjbw",

  description:
    "Calculates Adjusted Body Weight for drug dosing in overweight and obese patients.",

  category: "Anthropometry",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "AdjBW = IBW + 0.4 × (Actual Weight − IBW)",

  normalRange: "Varies by height and actual weight",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [
      "Adjusted body weight is used for drug dosing when actual body weight may overestimate and ideal body weight may underestimate requirements.",
      "Commonly used for aminoglycoside and vancomycin dosing in obese patients."
    ],
    warnings: [
      "Adjusted body weight is primarily validated for aminoglycoside dosing.",
      "Clinical judgment should always supplement weight-based dosing calculations."
    ],
    followUp: [
      "Monitor drug levels when using adjusted body weight for dosing.",
      "Reassess weight status periodically during treatment."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What is Adjusted Body Weight?",
      "answer": "Adjusted Body Weight (AdjBW) is calculated as IBW + 0.4 × (Actual Weight − IBW). It is used for drug dosing in overweight and obese patients."
    },
    {
      "question": "When should Adjusted Body Weight be used?",
      "answer": "AdjBW is used when dosing aminoglycosides and other drugs in obese patients where actual body weight may lead to overdosing."
    }
  ],

  comparison: {
    "title": "Body Weight Calculators",
    "calculators": [
      {
        "name": "Ideal Body Weight",
        "href": "/calculators/ibw",
        "use": "Reference weight from height"
      },
      {
        "name": "Lean Body Mass",
        "href": "/calculators/lean-body-weight",
        "use": "Fat-free body weight estimation"
      }
    ]
  },

  clinical: {
    "advice": [
      "Adjusted body weight is used for drug dosing when actual body weight may overestimate and ideal body weight may underestimate requirements.",
      "Commonly used for aminoglycoside and vancomycin dosing in obese patients."
    ],
    "warnings": [
      "Adjusted body weight is primarily validated for aminoglycoside dosing.",
      "Clinical judgment should always supplement weight-based dosing calculations."
    ],
    "followUp": [
      "Monitor drug levels when using adjusted body weight for dosing.",
      "Reassess weight status periodically during treatment."
    ]
  },

  evidence: {
    "source": "ASHP Guidelines",
    "reference": "ASHP Therapeutic Guidelines on Antimicrobial Dosing in Adults.",
    "references": [
      "ASHP. Therapeutic Guidelines on Antimicrobial Dosing in Adults. Am J Health-Syst Pharm."
    ]
  },

  relatedCalculators: [
    "ibw",
    "bmi",
    "bsa",
    "lbm"
  ],

  inputs: [
  {
    id: "sex",
    label: "Sex",
    type: "select",
    required: true,
  },
  {
    id: "height",
    label: "Height",
    type: "number",
    unit: "cm",
    conversion: {
      type: "divide",
      factor: 2.54,
    },
    required: true,
  },
  {
    id: "weight",
    label: "Actual Weight",
    type: "number",
    unit: "kg",
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





const sex =
    values.sex;

const height =
    Number(values.height) / 2.54;

const weight =
    Number(values.weight);

// Devine IBW formula
let ibw: number;
if (sex === "male") {
  ibw = 50 + 2.3 * (height - 60);
} else {
  ibw = 45.5 + 2.3 * (height - 60);
}

const result =
    ibw + 0.4 * (weight - ibw);

let interpretation =
  "Adjusted body weight for drug dosing.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "Varies by height and weight";

return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};