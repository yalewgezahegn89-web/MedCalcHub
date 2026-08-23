import type { CalculatorDefinition } from "./calculator.types";

export const saagCalculator: CalculatorDefinition = {
  id: "saag",

  slug: "saag",

  name: "Serum-Ascites Albumin Gradient (SAAG)",

  shortName: "SAAG",

  description:
    "Calculates the gradient between serum albumin and ascitic fluid albumin to classify ascites as portal hypertensive (SAAG ≥1.1 g/dL) or non-portal hypertensive (SAAG <1.1 g/dL). First-line diagnostic tool for ascites workup.",

  category: "Gastroenterology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "SAAG",
    "Serum-Ascites Albumin Gradient",
    "Ascites",
    "Portal Hypertension",
    "Liver Disease",
    "Albumin",
    "Gastroenterology",
    "Hepatology",
  ],

  formula:
    "SAAG = Serum albumin (g/dL) − Ascites albumin (g/dL)",

  normalRange: "≥1.1 g/dL (portal hypertension)",

  referenceRanges: [
    {
      label: "Portal hypertension",
      range: "≥1.1",
      unit: "g/dL",
    },
    {
      label: "Non-portal hypertension",
      range: "<1.1",
      unit: "g/dL",
    },
  ],



  clinicalNotes:
    "The SAAG was introduced by Boyer et al. in 1968 and is the single most reliable test for classifying ascites. A SAAG ≥1.1 g/dL correctly identifies portal hypertension with >90% accuracy. It replaces the older transudate/exudate classification, which was unreliable for ascites due to the confounding effect of serum albumin on ascitic fluid protein.",





  comparison: {
    title: "Ascites Classification Methods",
    calculators: [
      {
        name: "SAAG",
        href: "/calculators/saag",
        bestFor:
          "First-line classification of ascites into portal hypertensive vs. non-portal hypertensive causes.",
        limitation:
          "Does not identify the specific cause of portal hypertension or non-portal hypertensive ascites.",
      },
      {
        name: "Child-Pugh Score",
        href: "/calculators/child-pugh",
        bestFor:
          "Assessing liver disease severity and prognosis in patients with known cirrhosis.",
        limitation:
          "Does not classify ascites; evaluates overall liver function.",
      },
      {
        name: "MELD Score",
        href: "/calculators/meld-score",
        bestFor:
          "Predicting short-term mortality in liver disease and prioritizing transplant listing.",
        limitation:
          "Does not classify ascites; focuses on liver disease severity.",
      },
    ],
  },

  relatedCalculators: [
    "child-pugh",
    "meld-score",
    "meld-na-score",
    "albumin-globulin-ratio",
  ],

  inputs: [
    {
      id: "serum-albumin",
      label: "Serum Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      helpText:
        "Serum albumin measured in g/dL (multiply g/L by 0.1 to convert).",
    },
    {
      id: "ascites-albumin",
      label: "Ascitic Fluid Albumin",
      type: "number",
      unit: "g/dL",
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      helpText:
        "Ascitic fluid albumin measured in g/dL (multiply g/L by 0.1 to convert).",
    },
  ],

  calculate(values: Record<string, string>) {
    const serumRaw = values["serum-albumin"];
    const ascitesRaw = values["ascites-albumin"];

    if (serumRaw === "" || serumRaw === undefined) {
      return {
        value: 0,
        interpretation: "Serum albumin is required.",
        status: "critical" as const,
      };
    }
    if (ascitesRaw === "" || ascitesRaw === undefined) {
      return {
        value: 0,
        interpretation: "Ascitic fluid albumin is required.",
        status: "critical" as const,
      };
    }

    const serum = Number(serumRaw);
    const ascites = Number(ascitesRaw);

    if (Number.isNaN(serum) || Number.isNaN(ascites)) {
      return {
        value: 0,
        interpretation: "Both albumin values must be valid numbers.",
        status: "critical" as const,
      };
    }
    if (serum <= 0 || ascites <= 0) {
      return {
        value: 0,
        interpretation: "Both albumin values must be greater than zero.",
        status: "critical" as const,
      };
    }

    const saag = Math.round((serum - ascites) * 10) / 10;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (saag >= 1.1) {
      interpretation =
        `SAAG = ${saag.toFixed(1)} g/dL (≥1.1 g/dL). This result is consistent with portal hypertension as the cause of ascites. Common causes include liver cirrhosis, congestive heart failure, and Budd-Chiari syndrome. Further evaluation is required to identify the specific etiology.`;
      status = "high";
    } else {
      interpretation =
        `SAAG = ${saag.toFixed(1)} g/dL (<1.1 g/dL). This result indicates non-portal hypertensive causes of ascites. Consider peritoneal carcinomatosis, tuberculosis, nephrotic syndrome, or pancreatic ascites. Ascitic fluid cytology, culture, glucose, and amylase may help identify the specific cause.`;
      status = "low";
    }

    return {
      value: saag,
      interpretation,
      status,
      referenceRange: "≥1.1 g/dL → portal hypertension; <1.1 g/dL → non-portal hypertension",
    };
  },
};
