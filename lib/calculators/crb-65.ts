import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export const crb65Calculator: CalculatorDefinition = {
  id: "crb-65",

  slug: "crb-65",

  name: "CRB-65",

  shortName: "CRB-65",

  description:
    "CRB-65 severity score for community-acquired pneumonia risk stratification, usable without laboratory testing (Confusion, Respiratory rate, Blood pressure, age 65+).",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["CRB-65", "Pneumonia", "CAP", "Community-Acquired Pneumonia", "Severity Score", "Emergency", "Risk Stratification"],

  formula:
    "Confusion (+1) + respiratory rate ≥30/min (+1) + SBP <90 or DBP ≤60 mmHg (+1) + age ≥65 years (+1) = total 0–4",

  normalRange: "0–4 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "CRB-65 is the lab-free version of CURB-65 and is intended for primary care/out-of-hospital use. Score 0 = low mortality risk (approximately 1%), consider outpatient care. Score 1–2 = intermediate risk (approximately 8%), consider hospital admission. Score 3–4 = high risk (approximately 30%), urgent hospital admission and consider ICU.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
    "NICE. Pneumonia in adults: diagnosis and management. Clinical guideline [CG191]. 2014.",
  ],

  relatedCalculators: ["curb-65", "psi-port"],

  inputs: [
  {
    id: "confusion",
    label: "New mental confusion",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "respiratory-rate",
    label: "Respiratory rate",
    type: "number",
    unit: "breaths/min",
    required: true,
    min: 4,
    max: 80,
    step: 1,
  },
  {
    id: "sbp",
    label: "Systolic blood pressure",
    type: "number",
    unit: "mmHg",
    required: true,
    min: 50,
    max: 250,
    step: 1,
  },
  {
    id: "dbp",
    label: "Diastolic blood pressure",
    type: "number",
    unit: "mmHg",
    required: true,
    min: 20,
    max: 150,
    step: 1,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
    min: 18,
    max: 110,
    step: 1,
  }
],

  calculate(values: Record<string, string>) {
    const confusion = readYesNo(values["confusion"]);
    if (confusion === null) {
      return critical("Confusion assessment is required.");
    }

    const respiratoryRate = readNumber(values["respiratory-rate"], "Respiratory rate");
    if (respiratoryRate === null) {
      return critical("Respiratory rate is required.");
    }
    if (respiratoryRate < 4 || respiratoryRate > 80) {
      return critical("Respiratory rate must be between 4 and 80 breaths/min.");
    }

    const sbp = readNumber(values["sbp"], "Systolic blood pressure");
    if (sbp === null) {
      return critical("Systolic blood pressure is required.");
    }
    if (sbp < 50 || sbp > 250) {
      return critical("Systolic blood pressure must be between 50 and 250 mmHg.");
    }

    const dbp = readNumber(values["dbp"], "Diastolic blood pressure");
    if (dbp === null) {
      return critical("Diastolic blood pressure is required.");
    }
    if (dbp < 20 || dbp > 150) {
      return critical("Diastolic blood pressure must be between 20 and 150 mmHg.");
    }

    const age = readNumber(values["age"], "Age");
    if (age === null) {
      return critical("Age is required.");
    }
    if (age < 18 || age > 110) {
      return critical("Age must be between 18 and 110 years.");
    }

    let score = 0;
    const met: string[] = [];

    if (confusion === 1) {
      score += 1;
      met.push("Confusion");
    }
    if (respiratoryRate >= 30) {
      score += 1;
      met.push(`Respiratory rate ${respiratoryRate} ≥30/min`);
    }
    if (sbp < 90 || dbp <= 60) {
      score += 1;
      met.push(`BP ${sbp}/${dbp} mmHg`);
    }
    if (age >= 65) {
      score += 1;
      met.push(`Age ${age} ≥65 years`);
    }

    const crbWarnings = [
      "CRB-65 is a clinical severity tool for community-acquired pneumonia; it does not replace assessment of oxygenation or systemic illness.",
      "The score omits laboratory and imaging data (unlike CURB-65) and should be combined with clinical judgment and available investigations.",
      "It can be applied in community or office settings where urea is unavailable, but results should be interpreted conservatively.",
    ];

    if (score === 0) {
      return {
        value: score,
        unit: "/4",
        score,
        interpretation:
          "CRB-65 score 0 — LOW risk (mortality ~1%). Consider management as an outpatient.",
        status: "normal",
        warnings: crbWarnings,
        advice: [
          "Outpatient suitability still depends on oxygen saturation, oral intake, comorbidity, and reliable follow-up.",
        ],
        followUp: [
          "Arrange clinical review within an appropriate interval and advise return precautions for deterioration.",
        ],
      };
    }

    if (score <= 2) {
      return {
        value: score,
        unit: "/4",
        score,
        interpretation:
          `CRB-65 score ${score} — INTERMEDIATE risk (mortality ~8%). Consider hospital admission. ` +
          (met.length > 0 ? `Findings: ${met.join("; ")}.` : ""),
        status: "high",
        warnings: crbWarnings,
        advice: [
          "Hospital assessment is generally advised at this band; where observation at home is considered, confirm adequate oxygenation and safe follow-up.",
        ],
        followUp: [
          "Reassess promptly if respiratory status, confusion, or blood pressure changes after the initial decision.",
        ],
      };
    }

    return {
      value: score,
      unit: "/4",
      score,
      interpretation:
        `CRB-65 score ${score} — HIGH risk (mortality ~30%). Urgent hospital admission; assess for ICU level of care. ` +
        (met.length > 0 ? `Findings: ${met.join("; ")}.` : ""),
      status: "critical",
      warnings: crbWarnings,
      advice: [
        "Urgent hospital assessment is indicated; evaluate severity fully on arrival, including oxygenation and sepsis physiology.",
      ],
      followUp: [
        "Monitor closely during transfer/arrival and reassess severity with full investigations in hospital.",
      ],
    };
  },
};

