import type { CalculatorDefinition } from "./calculator.types";

export const ibwCalculator: CalculatorDefinition = {
  id: "ibw",

  slug: "ibw",

  name: "ibw",

  shortName: "ibw",

  description:
    "Calculates Ideal Body Weight using the Devine formula.",

  category: "Anthropometry",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "Male: IBW = 50 + 2.3 × (height_in_inches − 60); Female: IBW = 45.5 + 2.3 × (height_in_inches − 60)",

  normalRange: "Varies by height and sex",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [
      "IBW is primarily used as a reference for drug dosing and ventilator settings.",
      "The Devine formula is the most widely used IBW equation."
    ],
    warnings: [
      "IBW is an estimate and may not reflect actual healthy weight for all body types.",
      "In clinical practice, actual body weight is often preferred for drug dosing unless the patient is significantly obese."
    ],
    followUp: [
      "Consider using adjusted body weight for drug dosing in obese patients.",
      "Compare IBW with actual weight to assess nutritional status."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What is Ideal Body Weight?",
      "answer": "Ideal Body Weight (IBW) is a reference weight calculated from height, used primarily for drug dosing and ventilator settings."
    },
    {
      "question": "When is IBW used clinically?",
      "answer": "IBW is used for drug dosing (e.g., aminoglycosides, vancomycin), ventilator settings, and nutritional assessment."
    },
    {
      "question": "What is the Devine formula?",
      "answer": "The Devine formula calculates IBW as 50 + 2.3 × (height in inches − 60) for males, and 45.5 + 2.3 × (height in inches − 60) for females."
    }
  ],

  comparison: {
    "title": "Body Weight Calculators",
    "calculators": [
      {
        "name": "Adjusted Body Weight",
        "href": "/calculators/adjbw",
        "use": "Drug dosing in obese patients"
      },
      {
        "name": "Lean Body Mass",
        "href": "/calculators/lean-body-weight",
        "use": "Body composition and dosing"
      }
    ]
  },

  clinical: {
    "advice": [
      "IBW is primarily used as a reference for drug dosing and ventilator settings.",
      "The Devine formula is the most widely used IBW equation."
    ],
    "warnings": [
      "IBW is an estimate and may not reflect actual healthy weight for all body types.",
      "In clinical practice, actual body weight is often preferred for drug dosing unless the patient is significantly obese."
    ],
    "followUp": [
      "Consider using adjusted body weight for drug dosing in obese patients.",
      "Compare IBW with actual weight to assess nutritional status."
    ]
  },

  evidence: {
    "source": "Devine BJ",
    "reference": "Gentamicin therapy. Drug Intell Clin Pharm. 1974.",
    "references": [
      "Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655."
    ]
  },

  relatedCalculators: [
    "adjbw",
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

let result: number;

if (sex === "male") {
  result = 50 + 2.3 * (height - 60);
} else {
  result = 45.5 + 2.3 * (height - 60);
}

let interpretation =
  "Ideal body weight.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "Varies by height";

return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};