import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function readSelect(
  value: string | undefined,
  allowed: string[],
): string | null {
  if (value === "" || value === undefined) return null;
  return allowed.includes(value) ? value : null;
}

type AscvdCoefficients = {
  lnAge: number;
  lnAgeSq?: number;
  lnTC: number;
  lnAgeLntc: number;
  lnHDL: number;
  lnAgeLnhdl: number;
  lnTreatedSbp: number;
  lnAgeLntreatedSbp?: number;
  lnUntreatedSbp: number;
  lnAgeLnuntreatedSbp?: number;
  smoker: number;
  lnAgeSmoker: number;
  diabetes: number;
  mean: number;
  baselineSurvival: number;
};

const EQUATIONS: Record<string, AscvdCoefficients> = {
  "white-male": {
    lnAge: 12.344,
    lnTC: 11.853,
    lnAgeLntc: -2.664,
    lnHDL: -7.99,
    lnAgeLnhdl: 1.769,
    lnTreatedSbp: 1.797,
    lnUntreatedSbp: 1.764,
    smoker: 7.837,
    lnAgeSmoker: -1.795,
    diabetes: 0.658,
    mean: 61.1816,
    baselineSurvival: 0.91436,
  },
  "white-female": {
    lnAge: -29.799,
    lnAgeSq: 4.884,
    lnTC: 13.54,
    lnAgeLntc: -3.114,
    lnHDL: -13.578,
    lnAgeLnhdl: 3.149,
    lnTreatedSbp: 2.019,
    lnUntreatedSbp: 1.957,
    smoker: 7.574,
    lnAgeSmoker: -1.665,
    diabetes: 0.661,
    mean: -29.1817,
    baselineSurvival: 0.96652,
  },
  "black-male": {
    lnAge: 2.469,
    lnTC: 0.302,
    lnAgeLntc: 0,
    lnHDL: -0.307,
    lnAgeLnhdl: 0,
    lnTreatedSbp: 1.916,
    lnUntreatedSbp: 1.809,
    smoker: 0.549,
    lnAgeSmoker: 0,
    diabetes: 0.645,
    mean: 19.5425,
    baselineSurvival: 0.89536,
  },
  "black-female": {
    lnAge: 17.1141,
    lnTC: 0.9396,
    lnAgeLntc: 0,
    lnHDL: -18.9196,
    lnAgeLnhdl: 4.4748,
    lnTreatedSbp: 29.2907,
    lnAgeLntreatedSbp: -6.4321,
    lnUntreatedSbp: 27.8197,
    lnAgeLnuntreatedSbp: -6.0873,
    smoker: 0.6908,
    lnAgeSmoker: 0,
    diabetes: 0.8738,
    mean: 86.6081,
    baselineSurvival: 0.95334,
  },
};

export const ascvdCalculator: CalculatorDefinition = {
  id: "ascvd",

  slug: "ascvd",

  name: "ASCVD Risk (Pooled Cohort Equations)",

  shortName: "ASCVD",

  description:
    "10-year risk of atherosclerotic cardiovascular disease (first nonfatal myocardial infarction, coronary heart disease death, or fatal/nonfatal stroke) using the 2013 ACC/AHA Pooled Cohort Equations, the basis of the 2018 ACC/AHA cholesterol guideline statin decisions.",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["ASCVD", "Pooled Cohort Equations", "Cardiovascular Risk", "Statin", "Cholesterol", "Primary Prevention", "10-Year Risk", "Cardiology"],

  formula:
    "Risk = 1 − S₀^exp(ΣβᵢXᵢ − mean), where Xᵢ are ln-transformed continuous predictors (age, total cholesterol, HDL, treated or untreated SBP) plus smoking and diabetes, with sex- and race-specific coefficients (4 equations).",

  normalRange: "0–100% 10-year risk",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "ASCVD risk categories (2018 ACC/AHA): <5% low, 5–7.4% borderline, 7.5–19.9% intermediate, ≥20% high. In adults 40–75 years without clinical ASCVD, risk estimates guide statin therapy. The equations are validated for ages 40–79, total cholesterol 130–320 mg/dL, HDL 20–100 mg/dL, and SBP 90–200 mmHg. White/other equations are applied to all non-Black races.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Goff DC Jr, et al. 2013 ACC/AHA guideline on the assessment of cardiovascular risk. J Am Coll Cardiol. 2014;63(25 Pt B):2935-2959.",
    "Grundy SM, et al. 2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA guideline on the management of blood cholesterol. Circulation. 2019;139(25):e1082-e1143.",
  ],

  relatedCalculators: ["h2fpef", "cha2ds2-vasc", "rcri"],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
    min: 40,
    max: 79,
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
  {
    id: "race",
    label: "Race",
    type: "select",
    required: true,
    options: [
      { label: "African American", value: "black" },
      { label: "White or other", value: "white" },
    ],
  },
  {
    id: "total-cholesterol",
    label: "Total cholesterol",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 130,
    max: 320,
    step: 1,
  },
  {
    id: "hdl",
    label: "HDL cholesterol",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 20,
    max: 100,
    step: 1,
  },
  {
    id: "sbp",
    label: "Systolic blood pressure",
    type: "number",
    unit: "mmHg",
    required: true,
    min: 90,
    max: 200,
    step: 1,
  },
  {
    id: "hypertension-treated",
    label: "Hypertension treatment",
    type: "select",
    required: true,
    options: [
      { label: "Untreated", value: "untreated" },
      { label: "Treated", value: "treated" },
    ],
  },
  {
    id: "smoker",
    label: "Current smoker",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "diabetes",
    label: "Diabetes mellitus",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const age = readNumber(values["age"], "Age");
    if (age === null || age < 40 || age > 79) {
      return critical("Age must be between 40 and 79 years.");
    }

    const sex = readSelect(values["sex"], ["male", "female"]);
    if (sex === null) {
      return critical("Sex is required.");
    }

    const race = readSelect(values["race"], ["black", "white"]);
    if (race === null) {
      return critical("Race is required.");
    }

    const totalCholesterol = readNumber(values["total-cholesterol"], "Total cholesterol");
    if (totalCholesterol === null || totalCholesterol < 130 || totalCholesterol > 320) {
      return critical("Total cholesterol must be between 130 and 320 mg/dL.");
    }

    const hdl = readNumber(values["hdl"], "HDL cholesterol");
    if (hdl === null || hdl < 20 || hdl > 100) {
      return critical("HDL cholesterol must be between 20 and 100 mg/dL.");
    }

    const sbp = readNumber(values["sbp"], "Systolic blood pressure");
    if (sbp === null || sbp < 90 || sbp > 200) {
      return critical("Systolic blood pressure must be between 90 and 200 mmHg.");
    }

    const treated = readSelect(values["hypertension-treated"], ["untreated", "treated"]);
    if (treated === null) {
      return critical("Hypertension treatment status is required.");
    }

    const smoker = readSelect(values["smoker"], ["0", "1"]);
    if (smoker === null) {
      return critical("Smoking status is required.");
    }

    const diabetes = readSelect(values["diabetes"], ["0", "1"]);
    if (diabetes === null) {
      return critical("Diabetes status is required.");
    }

    const eq = EQUATIONS[`${race}-${sex}`];

    const lnAge = Math.log(age);
    const lnTC = Math.log(totalCholesterol);
    const lnHDL = Math.log(hdl);
    const lnSbp = Math.log(sbp);
    const smokerN = Number(smoker);
    const diabetesN = Number(diabetes);

    let lp =
      eq.lnAge * lnAge +
      (eq.lnAgeSq ?? 0) * lnAge * lnAge +
      eq.lnTC * lnTC +
      eq.lnAgeLntc * lnAge * lnTC +
      eq.lnHDL * lnHDL +
      eq.lnAgeLnhdl * lnAge * lnHDL;

    if (treated === "treated") {
      lp += eq.lnTreatedSbp * lnSbp;
      if (eq.lnAgeLntreatedSbp !== undefined) {
        lp += eq.lnAgeLntreatedSbp * lnAge * lnSbp;
      }
    } else {
      lp += eq.lnUntreatedSbp * lnSbp;
      if (eq.lnAgeLnuntreatedSbp !== undefined) {
        lp += eq.lnAgeLnuntreatedSbp * lnAge * lnSbp;
      }
    }

    lp += eq.smoker * smokerN;
    if (eq.lnAgeSmoker !== 0) {
      lp += eq.lnAgeSmoker * lnAge * smokerN;
    }
    lp += eq.diabetes * diabetesN;

    const risk = 1 - Math.pow(eq.baselineSurvival, Math.exp(lp - eq.mean));
    const riskPercent = risk * 100;

    if (riskPercent < 5) {
      return {
        value: riskPercent,
        unit: "%",
        interpretation:
          `10-year ASCVD risk ${riskPercent.toFixed(1)}% — LOW risk (<5%). ` +
          "No statin generally indicated based on risk alone.",
        status: "normal",
      };
    }

    if (riskPercent < 7.5) {
      return {
        value: riskPercent,
        unit: "%",
        interpretation:
          `10-year ASCVD risk ${riskPercent.toFixed(1)}% — BORDERLINE risk (5–7.4%). ` +
          "Consider a risk discussion; additional risk-enhancing factors may support statin therapy.",
        status: "low",
      };
    }

    if (riskPercent < 20) {
      return {
        value: riskPercent,
        unit: "%",
        interpretation:
          `10-year ASCVD risk ${riskPercent.toFixed(1)}% — INTERMEDIATE risk (7.5–19.9%). ` +
          "A moderate-intensity statin is generally indicated; consider additional risk assessment if uncertainty remains.",
        status: "high",
      };
    }

    return {
      value: riskPercent,
      unit: "%",
      interpretation:
        `10-year ASCVD risk ${riskPercent.toFixed(1)}% — HIGH risk (≥20%). ` +
        "High-intensity statin therapy is generally indicated; optimize all cardiovascular risk factors.",
      status: "critical",
    };
  },
};