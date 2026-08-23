import type { CalculatorDefinition } from "./calculator.types";

export const bodeIndexCalculator: CalculatorDefinition = {
  id: "bode-index",

  slug: "bode-index",

  name: "BODE Index (COPD Prognosis)",

  shortName: "BODE Index",

  description:
    "Multidimensional prognostic index for COPD based on Body mass index, airflow Obstruction, Dyspnea, and Exercise capacity. Predicts mortality and guides clinical decision-making including transplant evaluation.",

  category: "Pulmonology",

  specialty: "Pulmonology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "BODE",
    "COPD",
    "Prognosis",
    "Dyspnea",
    "FEV1",
    "Exercise Capacity",
    "6-Minute Walk",
    "Body Mass Index",
    "Pulmonology",
    "Respiratory",
  ],

  formula:
    "BODE = BMI score (0–1) + FEV1 score (0–3) + mMRC dyspnea score (0–3) + 6MWD score (0–3). Total 0–10.",

  normalRange: "0–2",

  referenceRanges: [
    {
      label: "Low risk",
      range: "0–2",
    },
    {
      label: "Moderate risk",
      range: "3–4",
    },
    {
      label: "High risk",
      range: "5–6",
    },
    {
      label: "Very high risk",
      range: "7–10",
    },
  ],



  clinicalNotes:
    "The BODE Index was published by Celli et al. in 2004 (NEJM 350:1005-1012) and validated in a large international cohort. It is a validated multidimensional scoring system that outperforms FEV1 alone for predicting mortality in COPD. The BODE Index has been incorporated into international COPD guidelines (GOLD) as a tool for assessing disease severity and guiding treatment decisions, including lung transplant eligibility.",





  comparison: {
    title: "COPD Severity and Prognosis Tools",
    calculators: [
      {
        name: "BODE Index",
        href: "/calculators/bode-index",
        bestFor:
          "Multidimensional mortality prediction and treatment guidance in COPD.",
        limitation:
          "Requires 6-minute walk test; not suitable for acutely ill or immobile patients.",
      },
      {
        name: "GOLD Spirometric Grade",
        href: "/calculators/ckd-epi-2021",
        bestFor:
          "Initial COPD severity classification based on FEV1 alone.",
        limitation:
          "FEV1 alone underestimates mortality risk compared to BODE Index.",
      },
    ],
  },

  relatedCalculators: [
    "a-a-gradient",
    "oxygen-index",
    "pf-ratio",
    "rox-index",
    "charlson",
  ],

  inputs: [
    {
      id: "bmi",
      label: "Body Mass Index (BMI)",
      type: "number",
      unit: "kg/m²",
      required: true,
      min: 10,
      max: 60,
      step: 0.1,
      helpText: "Patient's body mass index.",
    },
    {
      id: "fev1-percent",
      label: "FEV1 % Predicted",
      type: "number",
      unit: "%",
      required: true,
      min: 0,
      max: 200,
      step: 1,
      helpText: "Forced expiratory volume in 1 second as percentage of predicted.",
    },
    {
      id: "mmrc-dyspnea",
      label: "mMRC Dyspnea Grade",
      type: "select",
      required: true,
      options: [
        { label: "0 - Breathless only with strenuous exercise", value: "0" },
        { label: "1 - Short of breath when hurrying on level ground or walking up a slight hill", value: "1" },
        { label: "2 - Walks slower than people of the same age on level ground or has to stop for breath when walking at own pace on level ground", value: "2" },
        { label: "3 - Stops for breath after walking about 100 meters or after a few minutes on level ground", value: "3" },
        { label: "4 - Too breathless to leave the house or breathless when dressing or undressing", value: "4" },
      ],
      helpText:
        "Modified Medical Research Council dyspnea scale (0–4).",
    },
    {
      id: "six-minute-walk",
      label: "6-Minute Walk Distance",
      type: "number",
      unit: "meters",
      required: true,
      min: 0,
      max: 1000,
      step: 1,
      helpText:
        "Distance walked in 6 minutes in meters.",
    },
  ],

  calculate(values: Record<string, string>) {
    const bmiRaw = values.bmi;
    const fev1Raw = values["fev1-percent"];
    const mmrcRaw = values["mmrc-dyspnea"];
    const walkRaw = values["six-minute-walk"];

    if (bmiRaw === "" || bmiRaw === undefined) {
      return {
        value: 0,
        interpretation: "BMI is required.",
        status: "critical" as const,
      };
    }
    if (fev1Raw === "" || fev1Raw === undefined) {
      return {
        value: 0,
        interpretation: "FEV1 % predicted is required.",
        status: "critical" as const,
      };
    }
    if (mmrcRaw === "" || mmrcRaw === undefined) {
      return {
        value: 0,
        interpretation: "mMRC dyspnea grade is required.",
        status: "critical" as const,
      };
    }
    if (walkRaw === "" || walkRaw === undefined) {
      return {
        value: 0,
        interpretation: "6-minute walk distance is required.",
        status: "critical" as const,
      };
    }

    const bmi = Number(bmiRaw);
    const fev1 = Number(fev1Raw);
    const mmrc = Number(mmrcRaw);
    const walk = Number(walkRaw);

    if (Number.isNaN(bmi) || Number.isNaN(fev1) || Number.isNaN(mmrc) || Number.isNaN(walk)) {
      return {
        value: 0,
        interpretation: "All values must be valid numbers.",
        status: "critical" as const,
      };
    }
    if (bmi <= 0 || fev1 < 0 || mmrc < 0 || mmrc > 4 || walk < 0) {
      return {
        value: 0,
        interpretation: "Invalid input values detected. BMI and walk distance must be positive; mMRC must be 0–4.",
        status: "critical" as const,
      };
    }

    const bmiScore = bmi > 21 ? 0 : 1;

    let fev1Score: number;
    if (fev1 >= 65) {
      fev1Score = 0;
    } else if (fev1 >= 50) {
      fev1Score = 1;
    } else if (fev1 >= 36) {
      fev1Score = 2;
    } else {
      fev1Score = 3;
    }

    let mmrcScore: number;
    if (mmrc <= 1) {
      mmrcScore = 0;
    } else if (mmrc === 2) {
      mmrcScore = 1;
    } else if (mmrc === 3) {
      mmrcScore = 2;
    } else {
      mmrcScore = 3;
    }

    let walkScore: number;
    if (walk >= 350) {
      walkScore = 0;
    } else if (walk >= 250) {
      walkScore = 1;
    } else if (walk >= 150) {
      walkScore = 2;
    } else {
      walkScore = 3;
    }

    const bodeScore = bmiScore + fev1Score + mmrcScore + walkScore;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (bodeScore <= 2) {
      interpretation =
        `BODE Index = ${bodeScore} (low risk). BMI score ${bmiScore}, FEV1 score ${fev1Score}, mMRC score ${mmrcScore}, 6MWD score ${walkScore}. Estimated 4-year mortality approximately 10%. Continue current COPD management and reassess in 6–12 months.`;
      status = "normal";
    } else if (bodeScore <= 4) {
      interpretation =
        `BODE Index = ${bodeScore} (moderate risk). BMI score ${bmiScore}, FEV1 score ${fev1Score}, mMRC score ${mmrcScore}, 6MWD score ${walkScore}. Estimated 4-year mortality approximately 25%. Optimize pharmacotherapy and consider pulmonary rehabilitation.`;
      status = "low";
    } else if (bodeScore <= 6) {
      interpretation =
        `BODE Index = ${bodeScore} (high risk). BMI score ${bmiScore}, FEV1 score ${fev1Score}, mMRC score ${mmrcScore}, 6MWD score ${walkScore}. Estimated 4-year mortality approximately 50%. Urgent pulmonary rehabilitation referral recommended. Consider specialist consultation.`;
      status = "high";
    } else {
      interpretation =
        `BODE Index = ${bodeScore} (very high risk). BMI score ${bmiScore}, FEV1 score ${fev1Score}, mMRC score ${mmrcScore}, 6MWD score ${walkScore}. Estimated 4-year mortality approximately 80%. Consider lung transplant referral. Implement advanced care planning and aggressive symptom management.`;
      status = "critical";
    }

    return {
      value: bodeScore,
      interpretation,
      status,
      referenceRange: "0–2 low risk; 3–4 moderate; 5–6 high; 7–10 very high",
    };
  },
};
