import type { CalculatorDefinition } from "./calculator.types";

export const wellsScoreDvtCalculator: CalculatorDefinition = {
  id: "wells-score-dvt",

  slug: "wells-score-dvt",

  name: "Wells Score for DVT",

  shortName: "Wells DVT",

  description:
    "Estimates the pre-test probability of deep vein thrombosis.",

  category: "Emergency",

  specialty: "emergency",
  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Wells",
    "DVT",
    "Deep Vein Thrombosis",
    "Thrombosis",
    "Emergency",
  ],

  warnings: [
    "This score is a probabilistic assessment and should not replace imaging or clinical evaluation.",
  ],

  formula:
    "Wells DVT score = active cancer + paralysis/immobilization + bedridden >3 d + local tenderness + swelling + calf swelling >3 cm + pitting edema + collateral veins + alternative diagnosis",

  normalRange: "0 points",

  referenceRanges: [
    {
      label: "Low probability",
      range: "0–0",
    },
    {
      label: "Moderate probability",
      range: "1–2",
    },
    {
      label: "High probability",
      range: "3+",
    },
  ],

  clinicalNotes:
    "The Wells score supports rapid triage for DVT and helps direct further diagnostic testing.",

  references: [
    "Wells PS, et al. Thromb Haemost. 1997.",
    "ACCP guidelines",
  ],

  inputs: [
    {
      id: "activeCancer",
      label: "Active cancer",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "paralysis",
      label: "Paralysis, paresis, or immobilization",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "bedridden",
      label: "Recently bedridden >3 days",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "tenderness",
      label: "Localized tenderness along the deep venous system",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "swelling",
      label: "Entire leg swelling",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "calfSwelling",
      label: "Calf swelling >3 cm",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "pittingEdema",
      label: "Pitting edema",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "collateralVeins",
      label: "Collateral superficial veins",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "alternativeDiagnosis",
      label: "Alternative diagnosis at least as likely",
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

    if (values.activeCancer === "yes") score += 1;
    if (values.paralysis === "yes") score += 1;
    if (values.bedridden === "yes") score += 1;
    if (values.tenderness === "yes") score += 1;
    if (values.swelling === "yes") score += 1;
    if (values.calfSwelling === "yes") score += 1;
    if (values.pittingEdema === "yes") score += 1;
    if (values.collateralVeins === "yes") score += 1;
    if (values.alternativeDiagnosis === "yes") score -= 2;

    let interpretation = "Low probability of DVT";
    let status: "normal" | "low" | "high" | "critical" = "normal";

    if (score >= 3) {
      interpretation = "High probability of DVT";
      status = "critical";
    } else if (score >= 1) {
      interpretation = "Moderate probability of DVT";
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
