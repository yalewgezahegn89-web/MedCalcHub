import type { CalculatorDefinition } from "./calculator.types";

export const correctedCalciumCalculator: CalculatorDefinition = {
  id: "corrected-calcium",

  slug: "corrected-calcium",

  name: "corrected-calcium",

  shortName: "corrected-calcium",

  description:
    "Calculates corrected serum calcium based on albumin concentration.",

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: [],

  formula: "Corrected Calcium = Measured Calcium + 0.8 × (4 − Albumin)",

  normalRange: "8.5–10.5 mg/dL",

  referenceRanges: [
  {
    label: "Severe hypocalcemia",
    range: "<7",
  },
  {
    label: "Hypocalcemia",
    range: "7–8.4",
  },
  {
    label: "Normal",
    range: "8.5–10.5",
  },
  {
    label: "Hypercalcemia",
    range: "10.6–12",
  },
  {
    label: "Severe hypercalcemia",
    range: "≥12.1",
  }
],

  clinicalGuidance: {
    advice: [
      "Corrected calcium adjusts for the effect of albumin on total calcium measurement.",
      "This correction is essential when albumin is low, as total calcium may appear falsely normal."
    ],
    warnings: [
      "This correction assumes albumin of 4.0 g/dL as normal. It may not be accurate in hypoalbuminemia due to other causes.",
      "Ionized calcium measurement is preferred when available and is not affected by albumin."
    ],
    followUp: [
      "If corrected calcium is abnormal, check ionized calcium and PTH levels.",
      "Consider vitamin D deficiency, malignancy, or primary hyperparathyroidism as causes."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "Why correct calcium for albumin?",
      "answer": "About 40% of serum calcium is bound to albumin. When albumin is low (e.g., in liver disease, nephrotic syndrome, malnutrition), total calcium appears falsely low. Corrected calcium estimates what the total calcium would be with a normal albumin."
    },
    {
      "question": "What is the corrected calcium formula?",
      "answer": "Corrected Calcium = Measured Calcium + 0.8 × (4.0 − Measured Albumin). This assumes 4.0 g/dL is normal albumin."
    }
  ],

  comparison: {
    "title": "Calcium and Electrolyte Calculators",
    "calculators": [
      {
        "name": "Anion Gap",
        "href": "/calculators/anion-gap",
        "use": "Metabolic acidosis evaluation"
      },
      {
        "name": "Calcium-Phosphate Product",
        "href": "/calculators/calcium-phosphate-product",
        "use": "Calcification risk"
      }
    ]
  },

  clinical: {
    "advice": [
      "Corrected calcium adjusts for the effect of albumin on total calcium measurement.",
      "This correction is essential when albumin is low, as total calcium may appear falsely normal."
    ],
    "warnings": [
      "This correction assumes albumin of 4.0 g/dL as normal. It may not be accurate in hypoalbuminemia due to other causes.",
      "Ionized calcium measurement is preferred when available and is not affected by albumin."
    ],
    "followUp": [
      "If corrected calcium is abnormal, check ionized calcium and PTH levels.",
      "Consider vitamin D deficiency, malignancy, or primary hyperparathyroidism as causes."
    ]
  },

  evidence: {
    "source": "Clinical Guidelines",
    "reference": "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990.",
    "references": [
      "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990;27:497-503.",
      "Labriola L, et al. New formula for correcting total calcium for albumin. Nephrol Dial Transplant. 2007."
    ]
  },

  relatedCalculators: [
    "anion-gap",
    "calcium-phosphate-product"
  ],

  inputs: [
  {
    id: "calcium",
    label: "Measured Calcium",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "albumin",
    label: "Albumin",
    type: "number",
    unit: "g/dL",
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





const calcium =
    Number(values.calcium);

const albumin =
    Number(values.albumin);


  const result =
    calcium + 0.8 * (4 - albumin);


  
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


else if (result <= 6.9) {

  interpretation =
    "Severe hypocalcemia";

  status =
    "critical";

  referenceRange =
  "<7";
}


else if (result >= 7 && result <= 8.4) {

  interpretation =
    "Hypocalcemia";

  status =
    "low";

  referenceRange =
  "7–8.4";
}


else if (result >= 8.5 && result <= 10.5) {

  interpretation =
    "Normal";

  status =
    "normal";

  referenceRange =
  "8.5–10.5";
}


else if (result >= 10.6 && result <= 12) {

  interpretation =
    "Hypercalcemia";

  status =
    "high";

  referenceRange =
  "10.6–12";
}


else if (result >= 12.1) {

  interpretation =
    "Severe hypercalcemia";

  status =
    "critical";

  referenceRange =
  "≥12.1";
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