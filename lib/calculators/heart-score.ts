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

export const heartScoreCalculator: CalculatorDefinition = {
  id: "heart-score",

  slug: "heart-score",

  name: "HEART Score",

  shortName: "HEART",

  description:
    "HEART score for risk stratification of undifferentiated chest pain in the emergency department, predicting 6-week risk of major adverse cardiac events (MACE).",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["HEART", "Chest Pain", "MACE", "ACS", "Emergency", "Risk Stratification", "Troponin", "Cardiology"],

  formula:
    "History (0–2) + ECG (0–2) + Age (0–2) + Risk Factors (0–2) + Troponin (0–2) = total 0–10",

  normalRange: "0–10 points",

  referenceRanges: [],



  clinicalNotes:
    "HEART score stratifies 6-week MACE risk (MI, PCI, CABG, death). 0–3 low risk (~1–2% MACE, candidates for early discharge); 4–6 moderate risk (~12–17% MACE, observation with serial troponins); 7–10 high risk (~50–65% MACE, early invasive strategy).",





  comparison: undefined,

  references: [
    "Six AJ, et al. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008;16(6):191-196.",
    "Backus BE, et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013;168(3):2153-2158.",
  ],

  relatedCalculators: ["corrected-qt", "map", "shock-index"],

  inputs: [
  {
    id: "history",
    label: "History (suspicion of ACS)",
    type: "select",
    required: true,
    options: [
      { label: "Slightly or non-suspicious (0)", value: "0" },
      { label: "Moderately suspicious (1)", value: "1" },
      { label: "Highly suspicious (2)", value: "2" },
    ],
  },
  {
    id: "ecg",
    label: "ECG findings",
    type: "select",
    required: true,
    options: [
      { label: "Normal (0)", value: "0" },
      { label: "Non-specific repolarization disturbance (1)", value: "1" },
      { label: "Significant ST-segment deviation (2)", value: "2" },
    ],
  },
  {
    id: "age",
    label: "Age",
    type: "select",
    required: true,
    options: [
      { label: "< 45 years (0)", value: "0" },
      { label: "45–64 years (1)", value: "1" },
      { label: "≥ 65 years (2)", value: "2" },
    ],
  },
  {
    id: "risk-factors",
    label: "Risk factors (HTN, DM, hyperlipidemia, smoking, obesity, family history of CAD, atherosclerotic disease)",
    type: "select",
    required: true,
    options: [
      { label: "No known risk factors (0)", value: "0" },
      { label: "1–2 risk factors (1)", value: "1" },
      { label: "≥ 3 risk factors or history of atherosclerotic disease (2)", value: "2" },
    ],
  },
  {
    id: "troponin",
    label: "Troponin (relative to the assay upper reference limit)",
    type: "select",
    required: true,
    options: [
      { label: "≤ Normal limit (0)", value: "0" },
      { label: "1–3× normal limit (1)", value: "1" },
      { label: "> 3× normal limit (2)", value: "2" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const items: Array<{ id: string; label: string }> = [
      { id: "history", label: "History" },
      { id: "ecg", label: "ECG" },
      { id: "age", label: "Age" },
      { id: "risk-factors", label: "Risk factors" },
      { id: "troponin", label: "Troponin" },
    ];

    let score = 0;
    for (const item of items) {
      const value = readSelect(values[item.id], ["0", "1", "2"]);
      if (value === null) {
        return critical(`${item.label} is required.`);
      }
      score += Number(value);
    }

    if (score <= 3) {
      return {
        value: score,
        unit: "/10",
        interpretation:
          `HEART score ${score} — LOW risk. 6-week MACE risk approximately 1–2%. ` +
          "Candidate for early discharge with serial troponins and outpatient follow-up.",
        status: "normal",
        warnings: [
          "The HEART score is a risk-stratification tool for undifferentiated chest pain, not an independent diagnosis of ACS.",
          "Clinical assessment, ECG review, serial biomarkers, and local chest-pain protocols remain necessary regardless of the score.",
          "A low-risk score applies to the evaluated episode only — recurrent or progressive symptoms require reassessment.",
        ],
        advice: [
          "Early discharge pathways should include clear return precautions and documented outpatient follow-up.",
        ],
        followUp: [
          "Complete the planned serial troponin schedule before final discharge decisions.",
          "Advise the patient to seek immediate reassessment if chest pain recurs or worsens.",
        ],
      };
    }

    if (score <= 6) {
      return {
        value: score,
        unit: "/10",
        interpretation:
          `HEART score ${score} — MODERATE risk. 6-week MACE risk approximately 12–17%. ` +
          "Admit for observation and serial troponin measurement.",
        status: "low",
        warnings: [
          "The HEART score is a risk-stratification tool for undifferentiated chest pain, not an independent diagnosis of ACS.",
          "Moderate risk does not exclude an acute coronary syndrome — observation with serial biomarkers is still required.",
        ],
        advice: [
          "Admission for observation with serial troponins and repeat ECGs is appropriate for this risk band; escalate if any component worsens.",
        ],
        followUp: [
          "Repeat ECG and troponin on the observation protocol and reassess the HEART score as new data become available.",
          "Arrange cardiology review before discharge if serial testing is inconclusive or symptoms continue.",
        ],
      };
    }

    return {
      value: score,
      unit: "/10",
      interpretation:
        `HEART score ${score} — HIGH risk. 6-week MACE risk approximately 50–65%. ` +
        "Consider early invasive strategy and cardiology consultation.",
      status: "critical",
      warnings: [
        "The HEART score identifies high MACE risk but does not by itself establish a diagnosis of ACS or dictate therapy choice.",
        "Interpret alongside ongoing ECG changes, biomarker trends, hemodynamic status, and local revascularization pathways.",
      ],
      advice: [
        "Urgent cardiology consultation is appropriate at this risk level; continue guideline-directed medical management while the invasive decision is made.",
      ],
      followUp: [
        "Maintain continuous monitoring and reassess after each intervention or clinical change.",
      ],
    };
  },
};
