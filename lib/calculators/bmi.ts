import type { CalculatorDefinition } from "./calculator.types";

export const bmiCalculator: CalculatorDefinition = {
  id: "bmi",
  slug: "body-mass-index",
  name: "Body Mass Index",
  shortName: "BMI",
  description: "Calculates Body Mass Index using height and weight.",
  category: "General",

specialty: "Internal Medicine",

subcategory: "Body Composition",

difficulty: "Basic",

tags: [
  "weight",
  "obesity",
  "nutrition",
  "body composition",
  "screening",
],

estimatedTime: "10 seconds",

author: "MedCalcHub",

reviewedBy: "MedCalcHub Clinical Team",

  featured: true,

  formula: "BMI = Weight (kg) / Height² (m²)",

  referenceRanges: [
    {
      label: "Underweight",
      range: "<18.5 kg/m²",
    },
    {
      label: "Normal",
      range: "18.5–24.9 kg/m²",
    },
    {
      label: "Overweight",
      range: "25.0–29.9 kg/m²",
    },
    {
      label: "Obesity Class I",
      range: "30.0–34.9 kg/m²",
    },
    {
      label: "Obesity Class II",
      range: "35.0–39.9 kg/m²",
    },
    {
      label: "Obesity Class III",
      range: "≥40.0 kg/m²",
    },
  ],

  clinicalNotes:
    "Body Mass Index (BMI) is a screening tool and should always be interpreted with clinical judgment.",

  references: [
    "World Health Organization (WHO)",
    "CDC Adult BMI Calculator",
  ],

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "BMI",
    "Body Mass Index",
    "Obesity",
    "Weight",
    "Height",
  ],

  warnings: [
    "BMI is a screening tool and should not be used alone to diagnose obesity.",
  ],
clinical: {
  pearl:
    "BMI is a valuable screening tool for overweight and obesity, but it should always be interpreted alongside waist circumference, body composition, and the patient's overall clinical context.",

  commonMistakes: [
    "Using BMI alone to diagnose obesity.",
    "Applying BMI in pregnant women.",
    "Using BMI to assess highly muscular athletes.",
    "Ignoring ethnicity-specific BMI recommendations.",
  ],

  clinicalUse: [
    "Screening for overweight and obesity.",
    "Assessing cardiometabolic risk.",
    "Monitoring weight management interventions.",
    "Population health surveillance.",
  ],

  contraindications: [
    "Pregnancy.",
    "Professional athletes with high muscle mass.",
    "Severe edema or ascites.",
    "Patients with limb amputations.",
  ],

  followUp: [
    "Measure waist circumference.",
    "Assess cardiovascular risk factors.",
    "Evaluate diet and physical activity.",
    "Consider referral for weight management if indicated.",
  ],
},

evidence: {
  source: "World Health Organization (WHO)",

  reference:
    "WHO Expert Consultation on BMI Classification",

  reviewedBy:
    "MedCalcHub Clinical Team",

  version: "1.0",

  updatedAt: "2026-07",

  link:
    "https://www.who.int",
},

relatedCalculators: [
  "bsa",
  "ideal-body-weight",
  "waist-height-ratio",
],
  inputs: [
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 1,
      max: 300,
      step: 0.1,
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 1,
      max: 500,
      step: 0.1,
    },
  ],

  calculate(values) {
    const heightCm = parseFloat(values.height);
    const weight = parseFloat(values.weight);

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    const rounded = Math.round(bmi * 10) / 10;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (rounded < 18.5) {
      interpretation = "Underweight";
      status = "low";
    } else if (rounded < 25) {
      interpretation = "Normal weight";
      status = "normal";
    } else if (rounded < 30) {
      interpretation = "Overweight";
      status = "high";
    } else if (rounded < 35) {
      interpretation = "Obesity Class I";
      status = "high";
    } else if (rounded < 40) {
      interpretation = "Obesity Class II";
      status = "critical";
    } else {
      interpretation = "Obesity Class III";
      status = "critical";
    }

    return {
      value: rounded,
      unit: "kg/m²",
      interpretation,
      status,
    };
  },
};