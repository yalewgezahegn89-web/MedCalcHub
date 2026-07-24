import type { CalculatorDefinition } from "./calculator.types";

export const apriCalculator: CalculatorDefinition = {
  id: "apri",

  slug: "apri-score",

  name: "APRI Score",

  shortName: "APRI",

  description:
    "AST to Platelet Ratio Index (APRI) for estimating liver fibrosis and cirrhosis.",

  category: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "APRI",
    "Fibrosis",
    "Liver",
    "Hepatitis",
    "Cirrhosis",
    "Platelets",
    "AST",
  ],

  warnings: [
    "Interpret together with clinical findings.",
    "Different AST upper limits of normal (ULN) may affect the result.",
  ],

  formula:
    "[(AST / AST ULN) × 100] / Platelet Count",

  referenceRanges: [
    {
      label: "Low Risk",
      range: "<0.5",
    },
    {
      label: "Intermediate Risk",
      range: "0.5–1.5",
    },
    {
      label: "Significant Fibrosis",
      range: ">1.5",
    },
    {
      label: "Suggestive of Cirrhosis",
      range: ">2.0",
    },
  ],

  clinicalNotes:
    "The APRI Score is a simple non-invasive marker for liver fibrosis using AST and platelet count.",

  references: [
    "Wai CT et al. Hepatology. 2003.",
    "WHO Hepatitis Guidelines.",
    "AASLD Practice Guidance.",
  ],

  inputs: [
    {
      id: "ast",
      label: "AST",
      type: "number",
      unit: "U/L",
      required: true,
      min: 1,
      max: 5000,
      step: 1,
    },
    {
      id: "uln",
      label: "AST Upper Limit of Normal",
      type: "number",
      unit: "U/L",
      required: true,
      min: 1,
      max: 500,
      step: 1,
    },
    {
      id: "platelets",
      label: "Platelet Count",
      type: "number",
      unit: "×10⁹/L",
      required: true,
      min: 1,
      max: 1000,
      step: 1,
    },
  ],

  calculate(values) {    const ast = parseFloat(values.ast);
    const uln = parseFloat(values.uln);
    const platelets = parseFloat(values.platelets);

    const apri =
      ((ast / uln) * 100) /
      platelets;

    const score =
      Math.round(apri * 100) / 100;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score < 0.5) {
      interpretation =
        "Low likelihood of significant fibrosis.";
      status = "normal";
    } else if (score <= 1.5) {
      interpretation =
        "Intermediate probability of liver fibrosis.";
      status = "high";
    } else if (score <= 2.0) {
      interpretation =
        "Significant fibrosis likely.";
      status = "high";
    } else {
      interpretation =
        "Suggestive of cirrhosis.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};