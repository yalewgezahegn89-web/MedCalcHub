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

export const sofaScoreCalculator: CalculatorDefinition = {
  id: "sofa-score",

  slug: "sofa-score",

  name: "SOFA Score",

  shortName: "SOFA",

  description:
    "Sequential Organ Failure Assessment (SOFA) score quantifying six organ systems (respiratory, coagulation, liver, cardiovascular, neurologic, renal) in critically ill patients.",

  category: "Emergency",

  specialty: "Critical Care",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["SOFA", "Sepsis", "Organ Failure", "Critical Care", "ICU", "Organ Dysfunction", "Sepsis-3"],

  formula:
    "Respiration (0–4) + Coagulation (0–4) + Liver (0–4) + Cardiovascular (0–4) + CNS (0–4) + Renal (0–4) = total 0–24",

  normalRange: "0–24 points",

  referenceRanges: [],



  clinicalNotes:
    "SOFA is used to describe organ dysfunction in sepsis (Sepsis-3). An acute increase of ≥2 points from baseline indicates organ dysfunction consistent with sepsis. Higher scores correlate with higher ICU mortality.",





  comparison: undefined,

  references: [
    "Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22(7):707-710.",
    "Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.",
  ],

  relatedCalculators: ["qsofa", "sirs-criteria"],

  inputs: [
  {
    id: "pao2-fio2",
    label: "PaO2/FiO2 ratio",
    type: "select",
    required: true,
    options: [
      { label: "≥ 400 mmHg (0)", value: "0" },
      { label: "< 400 mmHg (1)", value: "1" },
      { label: "< 300 mmHg (2)", value: "2" },
      { label: "< 200 mmHg, ventilated (3)", value: "3" },
      { label: "< 100 mmHg, ventilated (4)", value: "4" },
    ],
  },
  {
    id: "platelets",
    label: "Platelet count",
    type: "number",
    unit: "×10⁹/L",
    required: true,
    min: 0,
    max: 2000,
    step: 1,
  },
  {
    id: "bilirubin",
    label: "Bilirubin",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 0,
    max: 40,
    step: 0.1,
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular status (MAP / vasopressors)",
    type: "select",
    required: true,
    options: [
      { label: "MAP ≥ 70 mmHg (0)", value: "0" },
      { label: "MAP < 70 mmHg (1)", value: "1" },
      { label: "Dopamine ≤ 5 µg/kg/min or dobutamine any dose (2)", value: "2" },
      { label: "Dopamine > 5 µg/kg/min or epinephrine/norepinephrine ≤ 0.1 µg/kg/min (3)", value: "3" },
      { label: "Dopamine > 15 µg/kg/min or epinephrine/norepinephrine > 0.1 µg/kg/min (4)", value: "4" },
    ],
  },
  {
    id: "gcs",
    label: "Glasgow Coma Scale",
    type: "number",
    unit: "points",
    required: true,
    min: 3,
    max: 15,
    step: 1,
  },
  {
    id: "creatinine",
    label: "Creatinine",
    type: "number",
    unit: "mg/dL",
    required: true,
    min: 0,
    max: 12,
    step: 0.1,
  }
],

  calculate(values: Record<string, string>) {
    const resp = readSelect(values["pao2-fio2"], ["0", "1", "2", "3", "4"]);
    if (resp === null) {
      return critical("PaO2/FiO2 ratio is required.");
    }

    const plateletsRaw = readNumber(values["platelets"], "Platelets");
    if (plateletsRaw === null) {
      return critical("Platelet count is required.");
    }
    if (plateletsRaw < 0) {
      return critical("Platelet count cannot be negative.");
    }

    const bilirubinRaw = readNumber(values["bilirubin"], "Bilirubin");
    if (bilirubinRaw === null) {
      return critical("Bilirubin is required.");
    }
    if (bilirubinRaw < 0) {
      return critical("Bilirubin cannot be negative.");
    }

    const cv = readSelect(values["cardiovascular"], ["0", "1", "2", "3", "4"]);
    if (cv === null) {
      return critical("Cardiovascular status is required.");
    }

    const gcsRaw = readNumber(values["gcs"], "GCS");
    if (gcsRaw === null) {
      return critical("Glasgow Coma Scale is required.");
    }
    if (gcsRaw < 3 || gcsRaw > 15) {
      return critical("GCS must be between 3 and 15.");
    }

    const creatinineRaw = readNumber(values["creatinine"], "Creatinine");
    if (creatinineRaw === null) {
      return critical("Creatinine is required.");
    }
    if (creatinineRaw < 0) {
      return critical("Creatinine cannot be negative.");
    }

    const platelets = plateletsRaw;
    const bilirubin = bilirubinRaw;
    const gcs = gcsRaw;
    const creatinine = creatinineRaw;

    const respScore = Number(resp);
    const cvScore = Number(cv);

    let coagulationScore: number;
    if (platelets >= 150) coagulationScore = 0;
    else if (platelets >= 100) coagulationScore = 1;
    else if (platelets >= 50) coagulationScore = 2;
    else if (platelets >= 20) coagulationScore = 3;
    else coagulationScore = 4;

    let liverScore: number;
    if (bilirubin < 1.2) liverScore = 0;
    else if (bilirubin < 2.0) liverScore = 1;
    else if (bilirubin < 6.0) liverScore = 2;
    else if (bilirubin < 12.0) liverScore = 3;
    else liverScore = 4;

    let cnsScore: number;
    if (gcs >= 15) cnsScore = 0;
    else if (gcs >= 13) cnsScore = 1;
    else if (gcs >= 10) cnsScore = 2;
    else if (gcs >= 6) cnsScore = 3;
    else cnsScore = 4;

    let renalScore: number;
    if (creatinine < 1.2) renalScore = 0;
    else if (creatinine < 2.0) renalScore = 1;
    else if (creatinine < 3.5) renalScore = 2;
    else if (creatinine < 5.0) renalScore = 3;
    else renalScore = 4;

    const total = respScore + coagulationScore + liverScore + cvScore + cnsScore + renalScore;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    if (total <= 1) {
      interpretation =
        `SOFA score ${total} — no significant organ dysfunction.`;
      status = "normal";
    } else if (total <= 5) {
      interpretation =
        `SOFA score ${total} — mild-to-moderate organ dysfunction. ` +
        "An acute increase ≥2 points from baseline is consistent with sepsis (Sepsis-3).";
      status = "high";
    } else {
      interpretation =
        `SOFA score ${total} — severe organ dysfunction with high ICU mortality risk. ` +
        "Escalate organ support and reassess frequently.";
      status = "critical";
    }

    let guidanceAdvice: string;
    let guidanceFollowUp: string[];
    if (total <= 1) {
      guidanceAdvice =
        "No significant organ dysfunction is identified on this assessment; continue routine critical-care monitoring appropriate to the patient's condition.";
      guidanceFollowUp = [
        "Repeat the SOFA score as organ function evolves and whenever new physiologic or laboratory data become available.",
      ];
    } else if (total <= 5) {
      guidanceAdvice =
        "Higher scores indicate greater organ dysfunction; this level of abnormality should prompt closer monitoring, review of each organ component, and clinical reassessment.";
      guidanceFollowUp = [
        "Reassess SOFA serially — a worsening score indicates evolving organ dysfunction and warrants urgent review.",
      ];
    } else {
      guidanceAdvice =
        "Severe multi-organ dysfunction is present; ensure each contributing organ component has been reviewed and that organ-support measures match the degree of dysfunction.";
      guidanceFollowUp = [
        "Reassess SOFA frequently during the evolving phase of illness and after any change in organ support.",
      ];
    }

    return {
      value: total,
      unit: "/24",
      score: total,
      interpretation,
      status,
      warnings: [
        "SOFA is a severity-of-organ-dysfunction score, not a diagnostic test for any single condition.",
        "An acute increase of \u22652 points in the setting of suspected infection is part of Sepsis-3 assessment, but a SOFA score alone does not establish infection.",
        "Baseline SOFA is often unknown in patients without prior measurements, which can make an acute change difficult to quantify.",
        "Score interpretation depends on clinical context, including pre-existing chronic organ dysfunction.",
      ],
      advice: [guidanceAdvice],
      followUp: guidanceFollowUp,
    };
  },
};
