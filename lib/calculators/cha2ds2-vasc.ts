import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

function readSelect(
  value: string | undefined,
  allowed: string[],
): string | null {
  if (value === "" || value === undefined) return null;
  return allowed.includes(value) ? value : null;
}

export const cha2ds2VascCalculator: CalculatorDefinition = {
  id: "cha2ds2-vasc",

  slug: "cha2ds2-vasc",

  name: "CHA₂DS₂-VASc Score",

  shortName: "CHA₂DS₂-VASc",

  description:
    "CHA₂DS₂-VASc score for stroke risk stratification in patients with non-valvular atrial fibrillation, guiding anticoagulation decisions (score 0–9).",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["CHA2DS2-VASc", "Atrial Fibrillation", "AFib", "Stroke Risk", "Anticoagulation", "Warfarin", "DOAC", "Cardiology"],

  formula:
    "Congestive heart failure (1) + Hypertension (1) + Age 65–74 (1) or ≥75 (2) + Diabetes (1) + Stroke/TIA/thromboembolism (2) + Vascular disease (1) + Sex category female (1) = total 0–9",

  normalRange: "0–9 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "CHA₂DS₂-VASc estimates annual ischemic stroke risk in non-valvular AF. Per 2019 AHA/ACC/HRS and 2020 ESC guidelines, oral anticoagulation is recommended for men with score ≥2 and women with score ≥3. Men with score 1 and women with score 2 may be considered for anticoagulation based on net clinical benefit.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on atrial fibrillation. Chest. 2010;137(2):263-272.",
    "January CT, et al. 2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation. Circulation. 2019;140(2):e125-e151.",
  ],

  relatedCalculators: ["has-bled", "heart-score"],

  inputs: [
  {
    id: "chf",
    label: "Congestive heart failure / LV dysfunction",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "hypertension",
    label: "Hypertension (treated or untreated)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "age",
    label: "Age",
    type: "select",
    required: true,
    options: [
      { label: "< 65 years (0)", value: "0" },
      { label: "65–74 years (1)", value: "1" },
      { label: "≥ 75 years (2)", value: "2" },
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
  },
  {
    id: "stroke",
    label: "Stroke, TIA, or systemic thromboembolism",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "2" },
    ],
  },
  {
    id: "vascular-disease",
    label: "Vascular disease (prior MI, peripheral artery disease, aortic plaque)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "sex",
    label: "Sex category",
    type: "select",
    required: true,
    options: [
      { label: "Male (0)", value: "0" },
      { label: "Female (1)", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const binaryItems: Array<{ id: string; label: string }> = [
      { id: "chf", label: "Heart failure" },
      { id: "hypertension", label: "Hypertension" },
      { id: "diabetes", label: "Diabetes" },
      { id: "vascular-disease", label: "Vascular disease" },
      { id: "sex", label: "Sex category" },
    ];

    let score = 0;
    for (const item of binaryItems) {
      const value = readYesNo(values[item.id]);
      if (value === null) {
        return critical(`${item.label} is required.`);
      }
      score += value;
    }

    const age = readSelect(values["age"], ["0", "1", "2"]);
    if (age === null) {
      return critical("Age is required.");
    }
    score += Number(age);

    const stroke = readSelect(values["stroke"], ["0", "2"]);
    if (stroke === null) {
      return critical("Stroke/TIA/thromboembolism is required.");
    }
    score += Number(stroke);

    const sex = readYesNo(values["sex"]);
    if (sex === null) {
      return critical("Sex category is required.");
    }
    const isFemale = sex === 1;

    if (score <= 0) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `CHA₂DS₂-VASc score ${score} — LOW stroke risk. Annual ischemic stroke risk approximately 0.2%. ` +
          "No antithrombotic therapy is generally recommended.",
        status: "normal",
      };
    }

    if ((!isFemale && score === 1) || (isFemale && score === 2)) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `CHA₂DS₂-VASc score ${score} — INTERMEDIATE stroke risk. Annual ischemic stroke risk approximately 1.3–2.2%. ` +
          "Consider oral anticoagulation based on net clinical benefit and patient preference.",
        status: "high",
      };
    }

    return {
      value: score,
      unit: "/9",
      interpretation:
        `CHA₂DS₂-VASc score ${score} — HIGH stroke risk. Annual ischemic stroke risk approximately 2.2–15.2%. ` +
        "Oral anticoagulation is recommended.",
      status: "critical",
    };
  },
};