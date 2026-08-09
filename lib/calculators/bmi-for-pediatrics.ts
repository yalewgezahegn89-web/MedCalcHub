import type { CalculatorDefinition } from "./calculator.types";
import {
  calculatePediatricBmi,
  cdcBmiPercentile,
  classifyBmiPercentile,
} from "./utils/endocrinology";

export const bmiForPediatricsCalculator: CalculatorDefinition = {
  id: "bmi-for-pediatrics",

  slug: "bmi-for-pediatrics",

  name: "Pediatric BMI Calculator (BMI-for-Age)",

  shortName: "pBMI",

  description:
    "Calculates BMI for children and adolescents (ages 2–20) and classifies weight status using CDC 2000 BMI-for-age percentile references.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "2.0",

  updatedAt: "2026-08-09",

  keywords: [
    "bmi",
    "pediatric",
    "children",
    "adolescent",
    "weight",
    "growth",
    "cdc",
    "percentile",
  ],

  formula:
    "BMI = weight (kg) / height (m)²; Percentile via CDC 2000 LMS method (Z = ((BMI/M)^L - 1) / (L × S)); Classification: <5th = Underweight, 5th–<85th = Healthy, 85th–<95th = Overweight, ≥95th = Obesity",

  normalRange: "5th to <85th percentile (Healthy weight)",

  referenceRanges: [
    {
      label: "Underweight",
      range: "< 5th percentile",
    },
    {
      label: "Healthy weight",
      range: "5th – <85th percentile",
    },
    {
      label: "Overweight",
      range: "85th – <95th percentile",
    },
    {
      label: "Obesity",
      range: "≥ 95th percentile",
    },
  ],

  classification: [
    {
      label: "Underweight",
      range: "< 5th percentile",
      color: "yellow",
    },
    {
      label: "Healthy weight",
      range: "5th – <85th percentile",
      color: "green",
    },
    {
      label: "Overweight",
      range: "85th – <95th percentile",
      color: "orange",
    },
    {
      label: "Obesity",
      range: "≥ 95th percentile",
      color: "red",
    },
  ],

  clinicalNotes:
    "Pediatric BMI is interpreted using age- and sex-specific CDC BMI-for-age percentiles (ages 2–20 years). Unlike adult BMI, a raw BMI value cannot be interpreted without knowing the child's age and sex.",

  clinicalGuidance: {
    advice: [
      "Pediatric BMI should be interpreted using age- and sex-specific CDC percentiles.",
      "BMI-for-age percentiles are appropriate for children aged 2–20 years.",
      "Use the CDC growth charts (2000) as the reference standard.",
    ],
    warnings: [
      "BMI-for-age percentiles are not valid for children under 2 years.",
      "BMI does not distinguish between fat and muscle mass.",
      "Clinical assessment should also consider growth velocity, pubertal stage, and family history.",
    ],
    followUp: [
      "For children with BMI ≥95th percentile, evaluate for comorbidities and consider referral.",
      "For children with BMI <5th percentile, evaluate for underlying conditions and nutritional status.",
    ],
  },

  evidence: {
    source: "CDC Growth Charts",
    reference:
      "Kuczmarski RJ, Ogden CL, Guo SS, et al. 2000 CDC Growth Charts for the United States: Methods and Development. Vital Health Stat 11. 2002;(246):1-190.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "2000",
    updatedAt: "2026-08",
    references: [
      "Kuczmarski RJ, et al. Vital Health Stat 11. 2002;(246):1-190.",
      "CDC National Center for Health Statistics: CDC Growth Charts.",
    ],
  },

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 2,
      max: 20,
      placeholder: "2–20",
      helpText: "Age in years (2–20). CDC BMI-for-age is valid for ages 2–20 years.",
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
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      required: true,
      min: 3,
      max: 300,
      step: 0.1,
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      required: true,
      min: 40,
      max: 250,
      step: 0.1,
    },
  ],

  calculate(values: Record<string, string>) {
    // --- Validate age ---
    if (values.age === "" || values.age === undefined) {
      return {
        value: 0,
        interpretation: "Age is required.",
        status: "critical" as const,
      };
    }
    const ageNum = Number(values.age);
    if (Number.isNaN(ageNum)) {
      return {
        value: 0,
        interpretation: "Invalid age.",
        status: "critical" as const,
      };
    }
    if (ageNum < 2 || ageNum > 20) {
      return {
        value: 0,
        interpretation:
          "Age must be between 2 and 20 years. CDC BMI-for-age percentiles are valid for ages 2–20 years.",
        status: "critical" as const,
      };
    }

    // --- Validate sex ---
    if (values.sex === "" || values.sex === undefined) {
      return {
        value: 0,
        interpretation: "Sex is required.",
        status: "critical" as const,
      };
    }
    const sexNum = Number(values.sex);
    if (Number.isNaN(sexNum) || (sexNum !== 1 && sexNum !== 2)) {
      return {
        value: 0,
        interpretation: "Invalid sex selection.",
        status: "critical" as const,
      };
    }
    const sex = sexNum === 2 ? "female" : "male";

    // --- Validate weight ---
    if (values.weight === "" || values.weight === undefined) {
      return {
        value: 0,
        interpretation: "Weight is required.",
        status: "critical" as const,
      };
    }
    const weight = Number(values.weight);
    if (Number.isNaN(weight) || weight <= 0) {
      return {
        value: 0,
        interpretation: "Invalid weight.",
        status: "critical" as const,
      };
    }

    // --- Validate height ---
    if (values.height === "" || values.height === undefined) {
      return {
        value: 0,
        interpretation: "Height is required.",
        status: "critical" as const,
      };
    }
    const height = Number(values.height);
    if (Number.isNaN(height) || height <= 0) {
      return {
        value: 0,
        interpretation: "Invalid height.",
        status: "critical" as const,
      };
    }

    // --- Calculate BMI ---
    const bmi = calculatePediatricBmi(weight, height);

    // --- Calculate BMI-for-age percentile using CDC 2000 LMS ---
    const ageMonths = ageNum * 12;
    const percentile = cdcBmiPercentile(bmi, ageMonths, sex);

    if (Number.isNaN(percentile)) {
      return {
        value: bmi,
        unit: "kg/m²",
        interpretation:
          "Unable to classify: age or sex outside valid CDC range.",
        status: "critical" as const,
      };
    }

    // --- Classify ---
    const classification = classifyBmiPercentile(percentile);

    let status: "normal" | "low" | "high" | "critical";
    if (classification === "Healthy weight") {
      status = "normal";
    } else if (classification === "Underweight") {
      status = "low";
    } else if (classification === "Overweight") {
      status = "high";
    } else {
      // Obesity
      status = "critical";
    }

    const percentileRounded = Math.round(percentile * 10) / 10;

    return {
      value: bmi,
      unit: "kg/m²",
      interpretation: `${classification} (BMI-for-age: ${percentileRounded}th percentile)`,
      status,
    };
  },
};