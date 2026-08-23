import type { CalculatorDefinition } from "./calculator.types";

export const meldCalculator: CalculatorDefinition = {
  id: "meld",

  slug: "meld-score",

  name: "MELD Score",

  shortName: "MELD",

  description:
    "Model for End-stage Liver Disease (MELD) score for predicting 3-month mortality in patients with advanced liver disease.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "MELD",
    "Liver",
    "Cirrhosis",
    "Liver Failure",
    "Transplant",
    "Mortality",
    "Hepatology",
  ],

  warnings: [
    "The MELD score should be interpreted together with the patient's overall clinical condition.",
    "This calculator is intended for adults with chronic liver disease.",
  ],

  formula:
    "3.78 × ln(Bilirubin) + 11.2 × ln(INR) + 9.57 × ln(Creatinine) + 6.43",

  referenceRanges: [
    {
      label: "Low Risk",
      range: "<10",
    },
    {
      label: "Moderate Risk",
      range: "10–19",
    },
    {
      label: "High Risk",
      range: "20–29",
    },
    {
      label: "Very High Risk",
      range: "30–39",
    },
    {
      label: "Extremely High Risk",
      range: "≥40",
    },
  ],

  clinicalNotes:
    "The MELD score predicts 3-month mortality in patients with chronic liver disease and is widely used for liver transplant prioritization.",

  references: [
    "Kamath PS, et al. Hepatology. 2001.",
    "AASLD Practice Guidance.",
    "United Network for Organ Sharing (UNOS).",
  ],

  inputs: [
    {
      id: "bilirubin",
      label: "Serum Bilirubin",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 60,
      step: 0.1,
    },
    {
      id: "creatinine",
      label: "Serum Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 15,
      step: 0.1,
    },
    {
      id: "inr",
      label: "INR",
      type: "number",
      required: true,
      min: 0.5,
      max: 10,
      step: 0.1,
    },
    {
      id: "dialysis",
      label: "Dialysis at least twice in the last week?",
      type: "select",
      required: true,
      options: [
        {
          label: "No",
          value: "no",
        },
        {
          label: "Yes",
          value: "yes",
        },
      ],
    },
  ],

  calculate(values) {
      let bilirubin = parseFloat(values.bilirubin);
    let creatinine = parseFloat(values.creatinine);
    let inr = parseFloat(values.inr);

    const dialysis = values.dialysis === "yes";

    if (isNaN(bilirubin)) bilirubin = 1;
    if (isNaN(creatinine)) creatinine = 1;
    if (isNaN(inr)) inr = 1;

    // MELD rules
    bilirubin = Math.max(bilirubin, 1);
    inr = Math.max(inr, 1);

    if (dialysis) {
      creatinine = 4;
    } else {
      creatinine = Math.max(creatinine, 1);
      creatinine = Math.min(creatinine, 4);
    }

    const meld =
      3.78 * Math.log(bilirubin) +
      11.2 * Math.log(inr) +
      9.57 * Math.log(creatinine) +
      6.43;

    const score = Math.round(meld);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (score < 10) {
      interpretation =
        "Low 3-month mortality risk.";
      status = "normal";
    } else if (score < 20) {
      interpretation =
        "Moderate 3-month mortality risk.";
      status = "high";
    } else if (score < 30) {
      interpretation =
        "High 3-month mortality risk.";
      status = "high";
    } else if (score < 40) {
      interpretation =
        "Very high 3-month mortality risk.";
      status = "critical";
    } else {
      interpretation =
        "Extremely high 3-month mortality risk.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};