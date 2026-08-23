import type { CalculatorDefinition } from "./calculator.types";

export const alvaradoScoreCalculator: CalculatorDefinition = {
  id: "alvarado-score",

  slug: "alvarado-score",

  name: "Alvarado Score (Appendicitis)",

  shortName: "Alvarado",

  description:
    "Risk-stratifies patients with suspected acute appendicitis using the Alvarado (MANTRELS) scoring system. Assists in clinical decision-making regarding imaging, observation, and surgical consultation.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08",

  keywords: [
    "Alvarado",
    "MANTRELS",
    "Appendicitis",
    "Abdominal Pain",
    "Right Lower Quadrant",
    "Emergency",
    "Surgery",
    "Acute Abdomen",
  ],

  formula:
    "Score = Migration (1) + Anorexia (1) + Nausea/Vomiting (1) + RLQ Tenderness (2) + Rebound Pain (1) + Fever (1) + Leukocytosis (2) + Left Shift (1)",

  normalRange: "0–10",

  referenceRanges: [
    {
      label: "Low probability",
      range: "1–4",
    },
    {
      label: "Moderate probability",
      range: "5–6",
    },
    {
      label: "High probability",
      range: "7–8",
    },
    {
      label: "Very high probability",
      range: "9–10",
    },
  ],



  clinicalNotes:
    "The Alvarado score (also known as MANTRELS) was described by Alvarado in 1986 and has been extensively validated. It uses 8 clinical and laboratory parameters to estimate the probability of acute appendicitis. The maximum score is 10. Scores ≥7 are considered high probability and warrant strong consideration for surgical intervention. Scores 5–6 are equivocal and typically require further imaging or observation.",





  comparison: {
    title: "Appendicitis Assessment Tools",
    calculators: [
      {
        name: "Alvarado Score",
        href: "/calculators/alvarado-score",
        bestFor: "Initial clinical screening for suspected appendicitis in adults.",
        limitation: "Lower sensitivity in elderly, pregnant, and pediatric patients.",
      },
    ],
  },

  references: [
    "Alvarado A. Ann Emerg Med. 1986;15(5):557-564.",
    "Ohmann C, et al. Dig Surg. 1999;16(6):449-457.",
    "Tehrani HY, et al. Am J Emerg Med. 2009;27(3):347-350.",
  ],

  relatedCalculators: ["heart-score", "wells-pe", "wells-dvt"],

  inputs: [
    {
      id: "migration",
      label: "Migration of Pain to RLQ",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
    {
      id: "anorexia",
      label: "Anorexia",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
    {
      id: "nausea",
      label: "Nausea / Vomiting",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
    {
      id: "rlq-tenderness",
      label: "Tenderness in Right Lower Quadrant",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "2" },
      ],
    },
    {
      id: "rebound",
      label: "Rebound Pain (Rebound Tenderness)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
    {
      id: "fever",
      label: "Fever (Temperature ≥ 37.3°C / 99.1°F)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
    {
      id: "leukocytosis",
      label: "Leukocytosis (WBC > 10,000/µL)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "2" },
      ],
    },
    {
      id: "left-shift",
      label: "Left Shift (Neutrophilia > 75%)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "0" },
        { label: "Yes", value: "1" },
      ],
    },
  ],

  calculate(values: Record<string, string>) {
    const migrationRaw = values.migration;
    if (migrationRaw === "" || migrationRaw === undefined) {
      return {
        value: 0,
        interpretation: "Migration of Pain is required.",
        status: "critical" as const,
      };
    }
    const migration = Number(migrationRaw);
    if (!Number.isFinite(migration) || (migration !== 0 && migration !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Migration of Pain.",
        status: "critical" as const,
      };
    }

    const anorexiaRaw = values.anorexia;
    if (anorexiaRaw === "" || anorexiaRaw === undefined) {
      return {
        value: 0,
        interpretation: "Anorexia is required.",
        status: "critical" as const,
      };
    }
    const anorexia = Number(anorexiaRaw);
    if (!Number.isFinite(anorexia) || (anorexia !== 0 && anorexia !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Anorexia.",
        status: "critical" as const,
      };
    }

    const nauseaRaw = values.nausea;
    if (nauseaRaw === "" || nauseaRaw === undefined) {
      return {
        value: 0,
        interpretation: "Nausea / Vomiting is required.",
        status: "critical" as const,
      };
    }
    const nausea = Number(nauseaRaw);
    if (!Number.isFinite(nausea) || (nausea !== 0 && nausea !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Nausea / Vomiting.",
        status: "critical" as const,
      };
    }

    const rlqRaw = values["rlq-tenderness"];
    if (rlqRaw === "" || rlqRaw === undefined) {
      return {
        value: 0,
        interpretation: "Tenderness in Right Lower Quadrant is required.",
        status: "critical" as const,
      };
    }
    const rlq = Number(rlqRaw);
    if (!Number.isFinite(rlq) || (rlq !== 0 && rlq !== 2)) {
      return {
        value: 0,
        interpretation: "Invalid Tenderness in Right Lower Quadrant.",
        status: "critical" as const,
      };
    }

    const reboundRaw = values.rebound;
    if (reboundRaw === "" || reboundRaw === undefined) {
      return {
        value: 0,
        interpretation: "Rebound Pain is required.",
        status: "critical" as const,
      };
    }
    const rebound = Number(reboundRaw);
    if (!Number.isFinite(rebound) || (rebound !== 0 && rebound !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Rebound Pain.",
        status: "critical" as const,
      };
    }

    const feverRaw = values.fever;
    if (feverRaw === "" || feverRaw === undefined) {
      return {
        value: 0,
        interpretation: "Fever is required.",
        status: "critical" as const,
      };
    }
    const fever = Number(feverRaw);
    if (!Number.isFinite(fever) || (fever !== 0 && fever !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Fever.",
        status: "critical" as const,
      };
    }

    const leukocytosisRaw = values.leukocytosis;
    if (leukocytosisRaw === "" || leukocytosisRaw === undefined) {
      return {
        value: 0,
        interpretation: "Leukocytosis is required.",
        status: "critical" as const,
      };
    }
    const leukocytosis = Number(leukocytosisRaw);
    if (
      !Number.isFinite(leukocytosis) ||
      (leukocytosis !== 0 && leukocytosis !== 2)
    ) {
      return {
        value: 0,
        interpretation: "Invalid Leukocytosis.",
        status: "critical" as const,
      };
    }

    const leftShiftRaw = values["left-shift"];
    if (leftShiftRaw === "" || leftShiftRaw === undefined) {
      return {
        value: 0,
        interpretation: "Left Shift is required.",
        status: "critical" as const,
      };
    }
    const leftShift = Number(leftShiftRaw);
    if (!Number.isFinite(leftShift) || (leftShift !== 0 && leftShift !== 1)) {
      return {
        value: 0,
        interpretation: "Invalid Left Shift.",
        status: "critical" as const,
      };
    }

    const score =
      migration + anorexia + nausea + rlq + rebound + fever + leukocytosis + leftShift;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";

    if (score <= 4) {
      interpretation =
        "Alvarado Score 1–4 – Low probability for appendicitis. Consider alternative diagnoses. Clinical observation and imaging may be warranted if suspicion persists.";
      status = "normal";
    } else if (score <= 6) {
      interpretation =
        "Alvarado Score 5–6 – Moderate probability for appendicitis. Recommend serial abdominal examinations, laboratory monitoring, and imaging (CT or ultrasound).";
      status = "low";
    } else if (score <= 8) {
      interpretation =
        "Alvarado Score 7–8 – High probability for appendicitis. Strongly consider surgical consultation and imaging. Appendectomy should be discussed.";
      status = "high";
    } else {
      interpretation =
        "Alvarado Score 9–10 – Very high probability for appendicitis. Urgent surgical consultation and imaging recommended. Appendectomy is strongly indicated.";
      status = "critical";
    }

    const referenceRange = "0–10";

    return {
      value: Number(score.toFixed(2)),
      interpretation,
      status,
      referenceRange,
    };
  },
};
