import type { CalculatorDefinition } from "./calculator.types";

export const fib4Calculator: CalculatorDefinition = {
  id: "fib-4",

  slug: "fib-4-index",

  name: "FIB-4 Index",

  shortName: "FIB-4",

  description:
    "Non-invasive score used to estimate liver fibrosis in chronic liver disease.",

  category: "Gastroenterology",

  specialty: "Gastroenterology",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "FIB-4",
    "Fibrosis",
    "Liver",
    "NAFLD",
    "MASLD",
    "Hepatitis",
    "Cirrhosis",
  ],

  warnings: [
    "FIB-4 is a screening tool and should be interpreted with clinical findings.",
    "Performance is reduced in patients younger than 35 years.",
  ],

  formula:
    "(Age × AST) / (Platelets × √ALT)",

  referenceRanges: [
    {
      label: "Low Risk",
      range: "<1.30",
    },
    {
      label: "Intermediate Risk",
      range: "1.30–2.67",
    },
    {
      label: "High Risk",
      range: ">2.67",
    },
  ],

  clinicalNotes:
    "The FIB-4 Index is widely used to estimate the risk of advanced liver fibrosis in chronic hepatitis and fatty liver disease.",

  references: [
    "Sterling RK et al. Hepatology. 2006.",
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
  ],

  calculate(values) {    const age = parseFloat(values.age);
    const ast = parseFloat(values.ast);
    const alt = parseFloat(values.alt);
    const platelets = parseFloat(values.platelets);

    const fib4 =
      (age * ast) /
      (platelets * Math.sqrt(alt));

    const score =
      Math.round(fib4 * 100) / 100;

    let interpretation: string;
    let status:
      | "normal"
      | "low"
      | "high"
      | "critical";

    if (score < 1.3) {
      interpretation =
        "Low risk of advanced liver fibrosis.";
      status = "normal";
    } else if (score <= 2.67) {
      interpretation =
        "Intermediate risk of advanced liver fibrosis.";
      status = "high";
    } else {
      interpretation =
        "High risk of advanced liver fibrosis.";
      status = "critical";
    }

    return {
      value: score,
      interpretation,
      status,
    };  
  },
};