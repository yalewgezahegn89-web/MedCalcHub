import type { CalculatorDefinition } from "./calculator.types";

import { acrFaq } from "./faqs/acr";
import { acrComparison } from "./comparisons/acr";
import { acrRelatedCalculators } from "./related/acr";
import { acrEvidence } from "./evidence/acr";
import { acrClinical } from "./clinical/acr";

export const acrCalculator: CalculatorDefinition = {
  id: "albumin-creatinine-ratio",

  slug: "albumin-creatinine-ratio",

  name: "Albumin-to-Creatinine Ratio",

  shortName: "ACR",

  description:
    "Calculates urine albumin-to-creatinine ratio (ACR) for CKD screening and staging.",

  category: "Renal",

  specialty: "Nephrology",

  featured: true,

  version: "1.0",

  updatedAt: "2026-07",

  keywords: [
    "ACR",
    "Albumin",
    "Creatinine",
    "Kidney",
    "CKD",
    "Proteinuria",
  ],

  formula:
    "ACR = Urine Albumin (mg/L) ÷ Urine Creatinine (g/L)",

  normalRange: "<30 mg/g",

  referenceRanges: [
    {
      label: "A1",
      range: "<30 mg/g",
    },
    {
      label: "A2",
      range: "30–300 mg/g",
    },
    {
      label: "A3",
      range: ">300 mg/g",
    },
  ],

  clinicalNotes:
    "Persistent albuminuria for at least 3 months is one of the diagnostic criteria for chronic kidney disease.",

  references: [
    "KDIGO Clinical Practice Guideline 2024",
  ],

  faq: acrFaq,

  comparison: acrComparison,

  relatedCalculators: acrRelatedCalculators,

  evidence: acrEvidence,

  clinical: acrClinical,

  inputs: [
    {
      id: "albumin",
      label: "Urine Albumin",

      type: "number",

      unit: "mg/L",

      required: true,

      min: 0,

      step: 0.1,
    },
    {
      id: "creatinine",
      label: "Urine Creatinine",

      type: "number",

      unit: "g/L",

      required: true,

      min: 0.01,

      step: 0.01,
    },
  ],

  calculate(values) {
    const albumin = Number(values.albumin);
    const creatinine = Number(values.creatinine);

    if (
      values.albumin === "" ||
      values.albumin === undefined
    ) {
      return {
        value: 0,
        interpretation: "Urine Albumin is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(albumin)) {
      return {
        value: 0,
        interpretation: "Invalid Urine Albumin.",
        status: "critical",
      };
    }

    if (albumin < 0) {
      return {
        value: 0,
        interpretation: "Urine Albumin cannot be negative.",
        status: "critical",
      };
    }

    if (
      values.creatinine === "" ||
      values.creatinine === undefined
    ) {
      return {
        value: 0,
        interpretation: "Urine Creatinine is required.",
        status: "critical",
      };
    }

    if (Number.isNaN(creatinine)) {
      return {
        value: 0,
        interpretation: "Invalid Urine Creatinine.",
        status: "critical",
      };
    }

    if (creatinine < 0) {
      return {
        value: 0,
        interpretation: "Urine Creatinine cannot be negative.",
        status: "critical",
      };
    }

    if (creatinine === 0) {
      return {
        value: 0,
        interpretation: "Urine Creatinine cannot be zero.",
        status: "critical",
      };
    }

    const acr = albumin / creatinine;

    let interpretation = "";
    let status: "normal" | "low" = "normal";

    if (acr < 30) {
      interpretation =
        "A1: Normal to mildly increased albuminuria.";
    } else if (acr <= 300) {
      interpretation =
        "A2: Moderately increased albuminuria.";
      status = "low";
    } else {
      interpretation =
        "A3: Severely increased albuminuria.";
      status = "low";
    }

    return {
      value: Math.round(acr * 10) / 10,

      unit: "mg/g",

      interpretation,

      status,
    };
  },
};