import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readSelect(
  value: string | undefined,
  allowed: string[],
): string | null {
  if (value === "" || value === undefined) return null;
  return allowed.includes(value) ? value : null;
}

export const graceCalculator: CalculatorDefinition = {
  id: "grace",

  slug: "grace",

  name: "GRACE Risk Score (In-Hospital)",

  shortName: "GRACE",

  description:
    "Global Registry of Acute Coronary Events (GRACE) in-hospital risk score for acute coronary syndromes, estimating in-hospital mortality from age, heart rate, systolic blood pressure, creatinine, Killip class, cardiac arrest, ST-segment deviation, and cardiac enzymes.",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["GRACE", "ACS", "Acute Coronary Syndrome", "Mortality", "Risk Score", "Cardiology", "Prognosis"],

  formula:
    "Sum of points from the GRACE in-hospital nomogram (age, heart rate, systolic blood pressure, creatinine, Killip class, cardiac arrest at admission, ST-segment deviation, elevated cardiac enzymes). Total range approximately 2–372; higher scores indicate higher in-hospital mortality.",

  normalRange: "2–372 points",

  referenceRanges: [],



  clinicalNotes:
    "GRACE in-hospital score predicts in-hospital mortality in ACS: ≤108 points (low risk, <1%), 109–140 (intermediate risk, 1–3%), >140 (high risk, >3%). The GRACE model is the only widely validated ACS risk score using continuous variables; the discrete nomogram is the point-based version used at the bedside.",





  comparison: undefined,

  references: [
    "Granger CB, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.",
  ],

  relatedCalculators: ["timi", "heart-score", "h2fpef"],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "select",
    required: true,
    options: [
      { label: "< 30 years (0)", value: "0" },
      { label: "30–39 years (8)", value: "8" },
      { label: "40–49 years (25)", value: "25" },
      { label: "50–59 years (41)", value: "41" },
      { label: "60–69 years (58)", value: "58" },
      { label: "70–79 years (75)", value: "75" },
      { label: "80–89 years (91)", value: "91" },
      { label: "≥ 90 years (100)", value: "100" },
    ],
  },
  {
    id: "heart-rate",
    label: "Heart rate on admission",
    type: "select",
    required: true,
    options: [
      { label: "< 50 bpm (0)", value: "0" },
      { label: "50–69 bpm (3)", value: "3" },
      { label: "70–89 bpm (9)", value: "9" },
      { label: "90–109 bpm (15)", value: "15" },
      { label: "110–149 bpm (24)", value: "24" },
      { label: "150–199 bpm (38)", value: "38" },
      { label: "≥ 200 bpm (46)", value: "46" },
    ],
  },
  {
    id: "sbp",
    label: "Systolic blood pressure on admission",
    type: "select",
    required: true,
    options: [
      { label: "< 80 mmHg (58)", value: "58" },
      { label: "80–99 mmHg (53)", value: "53" },
      { label: "100–119 mmHg (43)", value: "43" },
      { label: "120–139 mmHg (34)", value: "34" },
      { label: "140–159 mmHg (24)", value: "24" },
      { label: "160–199 mmHg (10)", value: "10" },
      { label: "≥ 200 mmHg (0)", value: "0" },
    ],
  },
  {
    id: "creatinine",
    label: "Serum creatinine on admission",
    type: "select",
    required: true,
    options: [
      { label: "0–0.39 mg/dL (1)", value: "1" },
      { label: "0.4–0.79 mg/dL (4)", value: "4" },
      { label: "0.8–1.19 mg/dL (7)", value: "7" },
      { label: "1.2–1.59 mg/dL (10)", value: "10" },
      { label: "1.6–1.99 mg/dL (13)", value: "13" },
      { label: "2.0–3.99 mg/dL (21)", value: "21" },
      { label: "≥ 4.0 mg/dL (28)", value: "28" },
    ],
  },
  {
    id: "killip",
    label: "Killip class",
    type: "select",
    required: true,
    options: [
      { label: "Class I — no heart failure (0)", value: "0" },
      { label: "Class II — rales/crackles, S3 gallop (20)", value: "20" },
      { label: "Class III — frank pulmonary edema (39)", value: "39" },
      { label: "Class IV — cardiogenic shock (59)", value: "59" },
    ],
  },
  {
    id: "cardiac-arrest",
    label: "Cardiac arrest at admission",
    type: "select",
    required: true,
    options: [
      { label: "No (0)", value: "0" },
      { label: "Yes (39)", value: "39" },
    ],
  },
  {
    id: "st-deviation",
    label: "ST-segment deviation on admission ECG",
    type: "select",
    required: true,
    options: [
      { label: "No (0)", value: "0" },
      { label: "Yes (28)", value: "28" },
    ],
  },
  {
    id: "elevated-enzymes",
    label: "Elevated cardiac enzymes on admission",
    type: "select",
    required: true,
    options: [
      { label: "No (0)", value: "0" },
      { label: "Yes (14)", value: "14" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const categories: Array<{ id: string; label: string }> = [
      { id: "age", label: "Age" },
      { id: "heart-rate", label: "Heart rate" },
      { id: "sbp", label: "Systolic blood pressure" },
      { id: "creatinine", label: "Serum creatinine" },
      { id: "killip", label: "Killip class" },
      { id: "cardiac-arrest", label: "Cardiac arrest" },
      { id: "st-deviation", label: "ST-segment deviation" },
      { id: "elevated-enzymes", label: "Elevated cardiac enzymes" },
    ];

    let score = 0;
    for (const category of categories) {
      const value = readSelect(values[category.id], [
        "0", "1", "3", "4", "7", "8", "9", "10", "13", "14", "15", "20", "21", "24", "25", "28", "34", "38", "39", "41", "43", "46", "53", "58", "59", "75", "91", "100",
      ]);
      if (value === null) {
        return critical(`${category.label} is required.`);
      }
      score += Number(value);
    }

    const graceWarnings = [
      "GRACE estimates in-hospital mortality risk in ACS populations; it does not establish a diagnosis by itself.",
      "Risk estimates depend on accurate admission data and clinical context — recheck inputs if the estimate conflicts with the clinical picture.",
    ];

    if (score <= 108) {
      return {
        value: score,
        unit: "points",
        interpretation:
          `GRACE in-hospital score ${score} — LOW risk. Predicted in-hospital mortality < 1%.`,
        status: "normal",
        warnings: graceWarnings,
        advice: [
          "Low predicted mortality does not preclude ischemic events; continue guideline-based ACS care and monitoring.",
        ],
        followUp: [
          "Reassess risk if the clinical course changes, including new ECG findings, hemodynamic instability, or biomarker trends.",
        ],
      };
    }

    if (score <= 140) {
      return {
        value: score,
        unit: "points",
        interpretation:
          `GRACE in-hospital score ${score} — INTERMEDIATE risk. Predicted in-hospital mortality 1–3%.`,
        status: "low",
        warnings: graceWarnings,
        advice: [
          "Intermediate-risk patients benefit from structured observation and timely decision-making on further management.",
        ],
        followUp: [
          "Repeat the assessment as the clinical course evolves and before major management decisions.",
        ],
      };
    }

    return {
      value: score,
      unit: "points",
      interpretation:
        `GRACE in-hospital score ${score} — HIGH risk. Predicted in-hospital mortality > 3%. ` +
        "Urgent risk-directed therapy, including possible early invasive strategy.",
      status: "critical",
      warnings: [
        ...graceWarnings,
        "A high GRACE score reflects elevated event probability but the choice of invasive strategy should integrate the full clinical context and current guidelines.",
      ],
      advice: [
        "Urgent risk-directed management is appropriate at this level, coordinated with cardiology according to local pathways.",
      ],
      followUp: [
        "Monitor closely and reassess after each intervention or clinical change while inpatient.",
      ],
    };
  },
};