import type { CalculatorDefinition } from "./calculator.types";

export const childPughCalculator: CalculatorDefinition = {
  id: "child-pugh",

  slug: "child-pugh",

  name: "Child-Pugh Score",

  shortName: "Child-Pugh",

  description:
    "Estimates severity and prognosis of chronic liver disease and cirrhosis.",

  category: "Internal Medicine",

  specialty: "Internal Medicine",

  featured: true,

  updatedAt: "2026-07",

  version: "1.0",

  keywords: [
    "Child-Pugh",
    "Cirrhosis",
    "Liver",
    "Hepatology",
    "Portal Hypertension",
    "Liver Failure",
  ],



  formula:
    "Child-Pugh Score = Bilirubin + Albumin + INR + Ascites + Encephalopathy",

  normalRange: "Class A (5–6 points)",

  referenceRanges: [
    {
      label: "Class A",
      range: "5–6 points",
    },
    {
      label: "Class B",
      range: "7–9 points",
    },
    {
      label: "Class C",
      range: "10–15 points",
    },
  ],

  classification: [
    {
      label: "Class A",
      range: "5–6",
      min: 5,
      max: 6,
      color: "green",
    },
    {
      label: "Class B",
      range: "7–9",
      min: 7,
      max: 9,
      color: "yellow",
    },
    {
      label: "Class C",
      range: "10–15",
      min: 10,
      max: 15,
      color: "red",
    },
  ],

  clinicalNotes:
    "Child-Pugh Score estimates prognosis in chronic liver disease and cirrhosis. It is commonly used for mortality prediction, surgical risk assessment, and treatment planning.",

  references: [
    "Child CG, Turcotte JG. Surgery and Portal Hypertension.",
    "Pugh RNH, et al. Br J Surg. 1973.",
    "AASLD Practice Guidance.",
  ],

  inputs: [
    {
      id: "bilirubin",
      label: "Total Bilirubin",
      type: "select",
      required: true,
      options: [
        {
          label: "<2 mg/dL (1 point)",
          value: "1",
        },
        {
          label: "2–3 mg/dL (2 points)",
          value: "2",
        },
        {
          label: ">3 mg/dL (3 points)",
          value: "3",
        },
      ],
    },

    {
      id: "albumin",
      label: "Serum Albumin",
      type: "select",
      required: true,
      options: [
        {
          label: ">3.5 g/dL (1 point)",
          value: "1",
        },
        {
          label: "2.8–3.5 g/dL (2 points)",
          value: "2",
        },
        {
          label: "<2.8 g/dL (3 points)",
          value: "3",
        },
      ],
    },

    {
      id: "inr",
      label: "INR",
      type: "select",
      required: true,
      options: [
        {
          label: "<1.7 (1 point)",
          value: "1",
        },
        {
          label: "1.7–2.3 (2 points)",
          value: "2",
        },
        {
          label: ">2.3 (3 points)",
          value: "3",
        },
      ],
    },

    {
      id: "ascites",
      label: "Ascites",
      type: "select",
      required: true,
      options: [
        {
          label: "None (1 point)",
          value: "1",
        },
        {
          label: "Mild (2 points)",
          value: "2",
        },
        {
          label: "Moderate/Severe (3 points)",
          value: "3",
        },
      ],
    },

    {
      id: "encephalopathy",
      label: "Hepatic Encephalopathy",
      type: "select",
      required: true,
      options: [
        {
          label: "None (1 point)",
          value: "1",
        },
        {
          label: "Grade I–II (2 points)",
          value: "2",
        },
        {
          label: "Grade III–IV (3 points)",
          value: "3",
        },
      ],
    },
  ],  calculate(values) {
    const bilirubin = parseInt(values.bilirubin);
    const albumin = parseInt(values.albumin);
    const inr = parseInt(values.inr);
    const ascites = parseInt(values.ascites);
    const encephalopathy = parseInt(values.encephalopathy);

    const score =
      bilirubin +
      albumin +
      inr +
      ascites +
      encephalopathy;

    let childClass = "";
    let interpretation = "";
    let status: "normal" | "low" | "high" | "critical" =
      "normal";

    if (score <= 6) {
      childClass = "Child-Pugh Class A";
      interpretation =
        "Well-compensated liver disease. Estimated 1-year survival ≈95%.";
      status = "normal";
    } else if (score <= 9) {
      childClass = "Child-Pugh Class B";
      interpretation =
        "Significant functional compromise. Estimated 1-year survival ≈80%.";
      status = "high";
    } else {
      childClass = "Child-Pugh Class C";
      interpretation =
        "Decompensated liver disease with poor prognosis. Estimated 1-year survival ≈45%.";
      status = "critical";
    }

    return {
      value: childClass,
      score,
      interpretation,
      status,
    };
  },
  };