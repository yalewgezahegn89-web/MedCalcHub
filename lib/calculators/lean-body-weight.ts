import type { CalculatorDefinition } from "./calculator.types";

export const leanBodyWeightCalculator: CalculatorDefinition = {
  id: "lean-body-weight",

  slug: "lean-body-weight",

  name: "lean-body-weight",

  shortName: "lean-body-weight",

  description:
    "Calculates Lean Body Weight using the Boer formula.",

  category: "Anthropometry",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "Male: LBM = 0.407 × Weight + 0.267 × Height − 19.2; Female: LBM = 0.252 × Weight + 0.473 × Height − 48.3",

  normalRange: "Varies by height, weight, and sex",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [
      "Lean Body Mass estimates the weight of the body excluding fat mass.",
      "Commonly used in clinical nutrition, anesthesia, and medication dosing."
    ],
    warnings: [
      "LBM is an estimate and may vary with different measurement methods.",
      "The Boer formula was developed in a specific population and may not apply universally."
    ],
    followUp: [
      "Use LBM alongside other nutritional assessment tools.",
      "Consider bioelectrical impedance or DEXA for more precise body composition analysis."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What is Lean Body Mass?",
      "answer": "Lean Body Mass (LBM) is the weight of the body excluding fat mass. It includes muscles, bones, organs, and water."
    },
    {
      "question": "What is the Boer formula?",
      "answer": "The Boer formula estimates LBM: for males LBM = 0.407 × Weight + 0.267 × Height − 19.2; for females LBM = 0.252 × Weight + 0.473 × Height − 48.3."
    }
  ],

  comparison: {
    "title": "Body Composition Calculators",
    "calculators": [
      {
        "name": "Ideal Body Weight",
        "href": "/calculators/ibw",
        "use": "Reference weight from height"
      },
      {
        "name": "BMI",
        "href": "/calculators/bmi",
        "use": "General body fat screening"
      }
    ]
  },

  clinical: {
    "advice": [
      "Lean Body Mass estimates the weight of the body excluding fat mass.",
      "Commonly used in clinical nutrition, anesthesia, and medication dosing."
    ],
    "warnings": [
      "LBM is an estimate and may vary with different measurement methods.",
      "The Boer formula was developed in a specific population and may not apply universally."
    ],
    "followUp": [
      "Use LBM alongside other nutritional assessment tools.",
      "Consider bioelectrical impedance or DEXA for more precise body composition analysis."
    ]
  },

  evidence: {
    "source": "Boer P",
    "reference": "Estimated lean body mass as an index for normalization of body fluid volumes in humans. Nephron. 1984.",
    "references": [
      "Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Nephron. 1984;36:361-367."
    ]
  },

  relatedCalculators: [
    "ibw",
    "adjbw",
    "bmi",
    "bsa"
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
    required: true,
  },
  {
    id: "weight",
    label: "Weight",
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





const sex = values.sex;
const height = Number(values.height);
const weight = Number(values.weight);

let result: number;

if (sex === "male") {
  result = 0.407 * weight + 0.267 * height - 19.2;
} else {
  result = 0.252 * weight + 0.473 * height - 48.3;
}

const interpretation =
  "Estimated lean body mass.";

const status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

const referenceRange =
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