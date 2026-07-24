import type { CalculatorDefinition } from "./calculator.types";

export const cha2ds2VascCalculator: CalculatorDefinition = {
  id: "cha2ds2-vasc",

  slug: "cha2ds2-vasc",

  name: "CHA2DS2-VASc Score",

  shortName: "CHA2DS2-VASc",

  description:
    "Estimates stroke risk in patients with atrial fibrillation.",

  category: "Cardiology",

  specialty: "cardiology",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "CHA2DS2-VASc",
    "AF",
    "Stroke Risk",
    "Atrial Fibrillation",
    "Cardiology",
  ],

  warnings: [
    "The CHA2DS2-VASc score guides anticoagulation decisions but should be interpreted with clinical context.",
  ],

  formula: "CHA2DS2-VASc = Congestive heart failure + Hypertension + Age ≥75 + Diabetes + Stroke/TIA + Vascular disease + Age 65–74 + Sex category",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0",
    },
    {
      label: "Intermediate risk",
      range: "1",
    },
    {
      label: "High risk",
      range: "2+",
    },
  ],

  clinicalNotes:
    "Patients with higher CHA2DS2-VASc scores have an increased annual stroke risk and may benefit from anticoagulation.",

  references: [
    "Lip GYH, et al. Chest. 2010.",
    "ESC guidelines",
  ],

  inputs: [
    {
      id: "heartFailure",
      label: "Heart failure",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
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
      id: "diabetes",
      label: "Diabetes",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "stroke",
      label: "Prior stroke/TIA/thromboembolism",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "vascularDisease",
      label: "Vascular disease",
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
      id: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ],

  calculate(values) {
    let score = 0;

    if (values.heartFailure === "yes") score += 1;
    if (values.hypertension === "yes") score += 1;
    if (values.diabetes === "yes") score += 1;
    if (values.stroke === "yes") score += 2;
    if (values.vascularDisease === "yes") score += 1;

    const age = parseFloat(values.age);
    if (age >= 75) score += 2;
    else if (age >= 65) score += 1;

    if (values.sex === "female") score += 1;

    let interpretation = "Low stroke risk";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 2) {
      interpretation = "Increased stroke risk; anticoagulation should be considered";
      status = score >= 5 ? "critical" : "high";
    }

    return {
      value: score,
      unit: "points",
      interpretation,
      status,
    };
  },
};
