import type { CalculatorDefinition } from "./calculator.types";

export const glasgowBlatchfordCalculator: CalculatorDefinition = {
  id: "glasgow-blatchford",

  slug: "glasgow-blatchford-score",

  name: "Glasgow-Blatchford Score",

  shortName: "GBS",

  description:
    "Predicts the need for intervention or mortality in patients with upper gastrointestinal bleeding.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Glasgow Blatchford",
    "GBS",
    "Upper GI Bleeding",
    "UGIB",
    "Gastroenterology",
    "Emergency",
  ],



  formula:
    "Composite score based on BUN, Hemoglobin, Systolic BP, Pulse, Melena, Syncope, Hepatic disease and Cardiac failure.",

  referenceRanges: [
    {
      label: "Very Low Risk",
      range: "0",
    },
    {
      label: "Low Risk",
      range: "1–5",
    },
    {
      label: "Moderate Risk",
      range: "6–12",
    },
    {
      label: "High Risk",
      range: "≥13",
    },
  ],

  clinicalNotes:
    "A Glasgow-Blatchford Score of 0 identifies very low-risk patients who may be suitable for outpatient management.",

  references: [
    "Blatchford O et al. Lancet. 2000.",
    "NICE Upper GI Bleeding Guideline.",
    "ESGE Guideline.",
  ],

  inputs: [
    {
      id: "bun",
      label: "Blood Urea Nitrogen",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 1,
      max: 300,
      step: 1,
    },
    {
      id: "hemoglobin",
      label: "Hemoglobin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 1,
      max: 25,
      step: 0.1,
    },
    {
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
    },
    {
      id: "sbp",
      label: "Systolic Blood Pressure",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 250,
      step: 1,
    },
    {
      id: "pulse",
      label: "Pulse Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 250,
      step: 1,
    },
    {
      id: "melena",
      label: "Melena",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "syncope",
      label: "Syncope",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "hepatic",
      label: "Known Hepatic Disease",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "cardiac",
      label: "Known Cardiac Failure",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values) {    let score = 0;

    const bun = parseFloat(values.bun);
    const hb = parseFloat(values.hemoglobin);
    const sbp = parseFloat(values.sbp);
    const pulse = parseFloat(values.pulse);

    // Blood Urea Nitrogen (mg/dL)
    if (bun >= 70) score += 6;
    else if (bun >= 28) score += 4;
    else if (bun >= 22.4) score += 3;
    else if (bun >= 18.2) score += 2;

    // Hemoglobin
    if (values.sex === "male") {
      if (hb < 10) score += 6;
      else if (hb < 12) score += 3;
      else if (hb < 13) score += 1;
    } else {
      if (hb < 10) score += 6;
      else if (hb < 12) score += 1;
    }

    // Systolic Blood Pressure
    if (sbp < 90) score += 3;
    else if (sbp < 100) score += 2;
    else if (sbp < 110) score += 1;

    // Pulse
    if (pulse >= 100) score += 1;

    // Melena
    if (values.melena === "yes") score += 1;

    // Syncope
    if (values.syncope === "yes") score += 2;

    // Hepatic Disease
    if (values.hepatic === "yes") score += 2;

    // Cardiac Failure
    if (values.cardiac === "yes") score += 2;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score === 0) {
      interpretation =
        "Very low risk. Outpatient management may be appropriate.";
      status = "normal";
    } else if (score <= 5) {
      interpretation =
        "Low risk. Hospital assessment is recommended.";
      status = "high";
    } else if (score <= 12) {
      interpretation =
        "Moderate risk. Endoscopic evaluation is recommended.";
      status = "high";
    } else {
      interpretation =
        "High risk. Urgent resuscitation and endoscopy are recommended.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    }; 
  },
};