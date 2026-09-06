import type { CalculatorDefinition } from "./calculator.types";

export const waistToHipRatioCalculator: CalculatorDefinition = {
  id: "waist-to-hip-ratio",

  slug: "waist-to-hip-ratio",

  name: "Waist-to-Hip Ratio",

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



  clinicalNotes:
    "The waist-to-hip ratio (WHR) quantifies central adiposity by comparing waist circumference to hip circumference. A higher ratio indicates proportionally greater abdominal fat deposition, which is an independent predictor of cardiometabolic risk including type 2 diabetes, cardiovascular disease, and all-cause mortality, even after adjusting for body mass index.\n\nRisk thresholds differ by sex. In males, a WHR below 0.90 is low risk, 0.90–0.99 is moderate risk, and ≥1.0 is high risk. In females, a WHR below 0.85 is low risk and ≥0.85 indicates increased cardiometabolic risk. These cutoffs are based on WHO expert consultation recommendations and represent population-level risk stratification rather than individual diagnostic thresholds.\n\nLimitations: WHR is sensitive to measurement technique; the waist should be measured at the midpoint between the lowest rib and the iliac crest, and the hip at the widest point of the buttocks, with consistent positioning and tape tension. Results may vary with age, ethnicity, and body composition. WHR does not distinguish between subcutaneous and visceral fat, does not directly measure insulin resistance or lipid profiles, and should be interpreted alongside other clinical and metabolic assessments. It is a screening and risk-stratification tool, not a diagnostic test.",

  references: [
    "World Health Organization. Waist circumference and waist–hip ratio: report of a WHO expert consultation. Geneva: WHO; 2008.",
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