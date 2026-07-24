import type { CalculatorDefinition } from "./calculator.types";

export const graceScoreCalculator: CalculatorDefinition = {
  id: "grace-score",

  slug: "grace-score",

  name: "GRACE Score",

  shortName: "GRACE",

  description:
    "Estimates in-hospital mortality risk in acute coronary syndrome patients.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "GRACE",
    "ACS",
    "Coronary Syndrome",
    "Cardiology",
  ],

  warnings: [
    "The GRACE score provides risk estimation and should be used together with clinical assessment.",
  ],

  formula: "GRACE = age + heart rate + systolic BP + creatinine + Killip class + cardiac arrest + ST deviation + biomarkers",

  normalRange: "0–100 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "<108",
    },
    {
      label: "Intermediate risk",
      range: "108–140",
    },
    {
      label: "High risk",
      range: ">140",
    },
  ],

  clinicalNotes:
    "Higher GRACE scores correlate with greater in-hospital mortality risk following acute coronary syndrome.",

  references: [
    "Fox KA, et al. Eur Heart J. 2006.",
    "ACS risk modeling",
  ],

  inputs: [
    {
      id: "age",
      label: "Age",
      type: "number",
      unit: "years",
      required: true,
      min: 18,
      max: 120,
      step: 1,
    },
    {
      id: "heartRate",
      label: "Heart Rate",
      type: "number",
      unit: "bpm",
      required: true,
      min: 20,
      max: 220,
      step: 1,
    },
    {
      id: "systolicBp",
      label: "Systolic BP",
      type: "number",
      unit: "mmHg",
      required: true,
      min: 40,
      max: 220,
      step: 1,
    },
    {
      id: "creatinine",
      label: "Creatinine",
      type: "number",
      unit: "mg/dL",
      required: true,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    {
      id: "killipClass",
      label: "Killip class",
      type: "number",
      required: true,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      id: "cardiacArrest",
      label: "Cardiac arrest at presentation",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "stDeviation",
      label: "ST-segment deviation",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "biomarkers",
      label: "Elevated cardiac biomarkers",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values) {
    const age = parseFloat(values.age);
    const heartRate = parseFloat(values.heartRate);
    const systolicBp = parseFloat(values.systolicBp);
    const creatinine = parseFloat(values.creatinine);
    const killipClass = parseFloat(values.killipClass);
    const cardiacArrest = values.cardiacArrest === "yes" ? 1 : 0;
    const stDeviation = values.stDeviation === "yes" ? 1 : 0;
    const biomarkers = values.biomarkers === "yes" ? 1 : 0;

    const score = age * 0.3 + heartRate * 0.1 + (180 - systolicBp) * 0.05 + creatinine * 8 + killipClass * 20 + cardiacArrest * 30 + stDeviation * 15 + biomarkers * 15;
    const rounded = Math.round(score);

    let interpretation = "Low risk of in-hospital mortality";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (rounded > 140) {
      interpretation = "High risk of in-hospital mortality";
      status = "critical";
    } else if (rounded > 108) {
      interpretation = "Intermediate risk of in-hospital mortality";
      status = "high";
    }

    return {
      value: rounded,
      unit: "points",
      interpretation,
      status,
    };
  },
};
