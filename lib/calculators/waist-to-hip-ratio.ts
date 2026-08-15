import type { CalculatorDefinition } from "./calculator.types";

export const waistToHipRatioCalculator: CalculatorDefinition = {
  id: "waist-to-hip-ratio",

  slug: "waist-to-hip-ratio",

  name: "waist-to-hip-ratio",

  shortName: "waist-to-hip-ratio",

  description:
    "Calculates Waist-to-Hip Ratio to assess central adiposity and cardiovascular risk.",

  category: "Anthropometry",

  specialty: "General Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-05",

  keywords: ["Waist Hip Ratio", "WHR", "Obesity", "Cardiovascular Risk", "Metabolic Syndrome", "Anthropometry"],

  formula: "WHR = Waist Circumference / Hip Circumference",

  normalRange: "Males: <0.90; Females: <0.85",

  referenceRanges: [
  {
    label: "Low risk (Males)",
    range: "<0.90",
  },
  {
    label: "Moderate risk (Males)",
    range: "0.90–0.99",
  },
  {
    label: "High risk (Males)",
    range: "≥1.0",
  },
  {
    label: "Low risk (Females)",
    range: "<0.85",
  },
  {
    label: "Increased risk (Females)",
    range: "≥0.85",
  }
],

  clinicalGuidance: {
    advice: [
      "WHR is a strong predictor of cardiovascular disease and type 2 diabetes.",
      "Measure waist at the narrowest point between the rib cage and iliac crest.",
      "Measure hips at the widest point of the buttocks."
    ],
    warnings: [
      "WHR measurements require standardized technique for consistent results.",
      "WHR should be interpreted alongside other cardiovascular risk factors."
    ],
    followUp: [
      "If WHR is elevated, assess other cardiovascular risk factors including blood pressure, lipids, and glucose.",
      "Lifestyle modifications including diet and exercise are primary interventions."
    ],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "What does Waist-to-Hip Ratio measure?",
      "answer": "WHR measures the distribution of body fat, specifically central (abdominal) adiposity, which is a strong predictor of cardiovascular risk."
    },
    {
      "question": "What WHR indicates increased risk?",
      "answer": "For males, WHR ≥ 0.90 indicates increased risk. For females, WHR ≥ 0.85 indicates increased risk."
    },
    {
      "question": "How is WHR measured?",
      "answer": "Measure waist circumference at the narrowest point between the rib cage and iliac crest. Measure hip circumference at the widest point of the buttocks. Divide waist by hip."
    }
  ],

  comparison: {
    "title": "Body Composition and Risk Assessment",
    "calculators": [
      {
        "name": "BMI",
        "href": "/calculators/bmi",
        "use": "General body fat screening"
      },
      {
        "name": "Body Surface Area",
        "href": "/calculators/bsa",
        "use": "Drug dosing and scaling"
      }
    ]
  },

  clinical: {
    "advice": [
      "WHR is a strong predictor of cardiovascular disease and type 2 diabetes.",
      "Measure waist at the narrowest point between the rib cage and iliac crest.",
      "Measure hips at the widest point of the buttocks."
    ],
    "warnings": [
      "WHR measurements require standardized technique for consistent results.",
      "WHR should be interpreted alongside other cardiovascular risk factors."
    ],
    "followUp": [
      "If WHR is elevated, assess other cardiovascular risk factors including blood pressure, lipids, and glucose.",
      "Lifestyle modifications including diet and exercise are primary interventions."
    ]
  },

  evidence: {
    "source": "WHO",
    "reference": "Waist circumference and waist-hip ratio: report of a WHO expert consultation. WHO, 2008.",
    "references": [
      "WHO. Waist circumference and waist-hip ratio: report of a WHO expert consultation. Geneva: World Health Organization, 2008.",
      "Yusuf S, et al. Obesity and the risk of myocardial infarction in 27 000 participants from 52 countries. Lancet. 2005."
    ]
  },

  relatedCalculators: [
    "bmi",
    "bsa"
  ],

  inputs: [
  {
    id: "waist",
    label: "Waist Circumference",
    type: "number",
    unit: "cm",
    required: true,
  },
  {
    id: "hip",
    label: "Hip Circumference",
    type: "number",
    unit: "cm",
    required: true,
  },
  {
    id: "sex",
    label: "Sex",
    type: "select",
    required: true,
    options: [
      { label: "Male", value: "1" },
      { label: "Female", value: "2" },
    ],
  }
],

  
calculate(
  values: Record<string, string>,
) {



for (
  const key of ["waist", "hip"]
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





const waist =
    Number(values.waist);

const hip =
    Number(values.hip);


if (hip === 0) {
  return {
    value: 0,
    interpretation: "Hip Circumference cannot be zero.",
    status: "critical",
  };
}


  const result =
    waist / hip;


  
const isFemale = values.sex === "2" || values.sex?.toLowerCase() === "female";

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

if (isFemale) {


  if (result < 0.85) {

    interpretation =
      "Low risk (Females)";

    status =
      "normal";

    referenceRange =
    "<0.85";
  }

  else {

    interpretation =
      "Increased risk (Females)";

    status =
      "high";

    referenceRange =
    "≥0.85";
  }

}
else if (result < 0.9) {

  interpretation =
    "Low risk (Males)";

  status =
    "normal";

  referenceRange =
  "<0.9";
}


else if (result < 1) {

  interpretation =
    "Moderate risk (Males)";

  status =
    "high";

  referenceRange =
  "0.9–0.99";
}


else {

  interpretation =
    "High risk (Males)";

  status =
    "critical";

  referenceRange =
  "≥1";
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