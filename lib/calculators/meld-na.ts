import type { CalculatorDefinition } from "./calculator.types";

export const meldNaCalculator: CalculatorDefinition = {
  id: "meld-na",

  slug: "meld-na-score",

  name: "MELD-Na Score",

  shortName: "MELD-Na",

  description:
    "Model for End-stage Liver Disease Sodium (MELD-Na) score for predicting 3-month mortality in advanced liver disease.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "MELD-Na",
    "MELD Sodium",
    "Liver",
    "Cirrhosis",
    "Hepatology",
    "Transplant",
    "Mortality",
  ],



  formula:
    "MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)]",

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
    "MELD-Na improves mortality prediction compared with MELD alone and is used for liver transplant allocation.",

  references: [
    "Kim WR, Hepatology 2008.",
    "UNOS MELD-Na Policy.",
    "AASLD Practice Guidance.",
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
      id: "sodium",
      label: "Serum Sodium",
      type: "number",
      unit: "mmol/L",
      required: true,
      min: 100,
      max: 170,
      step: 1,
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

  calculate(values) {    let bilirubin = parseFloat(values.bilirubin);
    let creatinine = parseFloat(values.creatinine);
    let inr = parseFloat(values.inr);
    let sodium = parseFloat(values.sodium);

    const dialysis = values.dialysis === "yes";

    if (isNaN(bilirubin)) bilirubin = 1;
    if (isNaN(creatinine)) creatinine = 1;
    if (isNaN(inr)) inr = 1;
    if (isNaN(sodium)) sodium = 137;

    // MELD rules
    bilirubin = Math.max(bilirubin, 1);
    inr = Math.max(inr, 1);

    if (dialysis) {
      creatinine = 4;
    } else {
      creatinine = Math.max(creatinine, 1);
      creatinine = Math.min(creatinine, 4);
    }

    // Sodium limits
    sodium = Math.max(125, Math.min(137, sodium));

    // Calculate MELD
    const meld =
      3.78 * Math.log(bilirubin) +
      11.2 * Math.log(inr) +
      9.57 * Math.log(creatinine) +
      6.43;

    // MELD-Na
    const meldNa =
      meld +
      1.32 * (137 - sodium) -
      (0.033 * meld * (137 - sodium));

    const score = Math.round(meldNa);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (score < 10) {
      interpretation = "Low 3-month mortality risk.";
      status = "normal";
    } else if (score < 20) {
      interpretation = "Moderate 3-month mortality risk.";
      status = "high";
    } else if (score < 30) {
      interpretation = "High 3-month mortality risk.";
      status = "high";
    } else if (score < 40) {
      interpretation = "Very high 3-month mortality risk.";
      status = "critical";
    } else {
      interpretation = "Extremely high 3-month mortality risk.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};