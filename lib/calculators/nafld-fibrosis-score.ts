import type { CalculatorDefinition } from "./calculator.types";

export const nafldFibrosisCalculator: CalculatorDefinition = {
  id: "nafld-fibrosis",

  slug: "nafld-fibrosis-score",

  name: "NAFLD Fibrosis Score",

  shortName: "NFS",

  description:
    "Non-invasive score used to estimate advanced fibrosis in patients with NAFLD/MASLD.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "NAFLD",
    "MASLD",
    "Fibrosis",
    "Liver",
    "NFS",
    "Fatty Liver",
  ],



  formula:
    "-1.675 + (0.037×Age) + (0.094×BMI) + (1.13×Diabetes) + (0.99×AST/ALT) − (0.013×Platelets) − (0.66×Albumin)",

  referenceRanges: [
    {
      label: "Low Probability",
      range: "< -1.455",
    },
    {
      label: "Indeterminate",
      range: "-1.455 to 0.676",
    },
    {
      label: "High Probability",
      range: "> 0.676",
    },
  ],

  clinicalNotes:
    "The NAFLD Fibrosis Score helps identify patients at low or high risk of advanced fibrosis without liver biopsy.",

  references: [
    "Angulo P, Hepatology. 2007.",
    "AASLD Practice Guidance.",
    "EASL Clinical Practice Guidelines.",
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
      id: "bmi",
      label: "BMI",
      type: "number",
      unit: "kg/m²",
      required: true,
      min: 10,
      max: 80,
      step: 0.1,
    },
    {
      id: "diabetes",
      label: "Diabetes / IFG",
      type: "select",
      required: true,
      options: [
        {
          label: "No",
          value: "0",
        },
        {
          label: "Yes",
          value: "1",
        },
      ],
    },
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
      id: "alt",
      label: "ALT",
      type: "number",
      unit: "U/L",
      required: true,
      min: 1,
      max: 5000,
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
    {
      id: "albumin",
      label: "Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 1,
      max: 10,
      step: 0.1,
    },
  ],

  calculate(values) {    const age = parseFloat(values.age);
    const bmi = parseFloat(values.bmi);
    const diabetes = parseFloat(values.diabetes);
    const ast = parseFloat(values.ast);
    const alt = parseFloat(values.alt);
    const platelets = parseFloat(values.platelets);
    const albumin = parseFloat(values.albumin);

    const ratio = ast / alt;

    const nfs =
      -1.675 +
      (0.037 * age) +
      (0.094 * bmi) +
      (1.13 * diabetes) +
      (0.99 * ratio) -
      (0.013 * platelets) -
      (0.66 * albumin);

    const score = Math.round(nfs * 1000) / 1000;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score < -1.455) {
      interpretation =
        "Low probability of advanced fibrosis.";
      status = "normal";
    } else if (score <= 0.676) {
      interpretation =
        "Indeterminate probability of advanced fibrosis.";
      status = "high";
    } else {
      interpretation =
        "High probability of advanced fibrosis.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };
  },
};