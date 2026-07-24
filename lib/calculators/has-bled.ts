import type { CalculatorDefinition } from "./calculator.types";

export const hasBledCalculator: CalculatorDefinition = {
  id: "has-bled",

  slug: "has-bled",

  name: "HAS-BLED Score",

  shortName: "HAS-BLED",

  description:
    "Assesses bleeding risk in patients receiving anticoagulation.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "HAS-BLED",
    "Bleeding Risk",
    "Anticoagulation",
    "Cardiology",
  ],

  warnings: [
    "HAS-BLED is a bleeding risk screen and should be used alongside clinical judgment.",
  ],

  formula: "HAS-BLED = Hypertension + Abnormal renal/liver function + Stroke + Bleeding history + Labile INR + Elderly + Drugs/alcohol",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low bleeding risk",
      range: "0–1",
    },
    {
      label: "Intermediate bleeding risk",
      range: "2",
    },
    {
      label: "High bleeding risk",
      range: "3+",
    },
  ],

  clinicalNotes:
    "Higher HAS-BLED scores suggest greater bleeding risk and the need for closer follow-up and review of modifiable factors.",

  references: [
    "Pisters R, et al. Chest. 2010.",
    "Cardiology anticoagulation guidance",
  ],

  inputs: [
    {
      id: "hypertension",
      label: "Hypertension",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "renalLiver",
      label: "Abnormal renal or liver function",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "stroke",
      label: "Prior stroke",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "bleedingHistory",
      label: "Bleeding history or predisposition",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "labileInr",
      label: "Labile INR",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
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
      id: "drugsAlcohol",
      label: "Drugs/alcohol use",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],

  calculate(values) {
    let score = 0;

    if (values.hypertension === "yes") score += 1;
    if (values.renalLiver === "yes") score += 1;
    if (values.stroke === "yes") score += 1;
    if (values.bleedingHistory === "yes") score += 1;
    if (values.labileInr === "yes") score += 1;
    if (parseFloat(values.age) > 65) score += 1;
    if (values.drugsAlcohol === "yes") score += 1;

    let interpretation = "Low bleeding risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 3) {
      interpretation = "High bleeding risk; review anticoagulation and mitigate factors";
      status = "critical";
    } else if (score === 2) {
      interpretation = "Intermediate bleeding risk";
      status = "high";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
