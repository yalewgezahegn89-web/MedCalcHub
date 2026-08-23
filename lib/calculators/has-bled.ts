import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const hasBledCalculator: CalculatorDefinition = {
  id: "has-bled",

  slug: "has-bled",

  name: "HAS-BLED Score",

  shortName: "HAS-BLED",

  description:
    "HAS-BLED score for estimating 1-year risk of major bleeding in patients on anticoagulation, most commonly for atrial fibrillation, guiding bleeding-risk assessment (score 0–9).",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["HAS-BLED", "Bleeding Risk", "Anticoagulation", "Atrial Fibrillation", "Warfarin", "DOAC", "Safety", "Cardiology"],

  formula:
    "Hypertension (1) + Abnormal renal function (1) + Abnormal liver function (1) + Stroke (1) + Bleeding history (1) + Labile INR (1) + Elderly >65 (1) + Drugs (1) + Alcohol (1) = total 0–9",

  normalRange: "0–9 points",

  referenceRanges: [],



  clinicalNotes:
    "HAS-BLED estimates 1-year major bleeding risk on anticoagulation: 0–1 points (low risk, ~1%), 2 points (moderate risk, ~2%), ≥3 points (high risk, ~4% per year). A high score should prompt review and correction of modifiable risk factors, not the automatic withholding of anticoagulation, particularly in AF where the net clinical benefit may still favor treatment.",





  comparison: undefined,

  references: [
    "Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.",
  ],

  relatedCalculators: ["cha2ds2-vasc", "heart-score"],

  inputs: [
  {
    id: "hypertension",
    label: "Uncontrolled hypertension (systolic BP > 160 mmHg)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "renal",
    label: "Abnormal renal function (dialysis, transplant, creatinine > 2.26 mg/dL)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "liver",
    label: "Abnormal liver function (cirrhosis or bilirubin > 2× ULN with ALT/AST > 3× ULN)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "stroke",
    label: "Prior stroke (especially lacunar)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "bleeding",
    label: "Prior major bleeding or predisposition to bleeding",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "labile-inr",
    label: "Labile INR (time in therapeutic range < 60%)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "elderly",
    label: "Age > 65 years",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "drugs",
    label: "Concomitant drugs (antiplatelets, NSAIDs)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "alcohol",
    label: "Alcohol excess (≥ 8 drinks per week)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const criteria: Array<{ id: string; label: string }> = [
      { id: "hypertension", label: "Uncontrolled hypertension" },
      { id: "renal", label: "Abnormal renal function" },
      { id: "liver", label: "Abnormal liver function" },
      { id: "stroke", label: "Prior stroke" },
      { id: "bleeding", label: "Prior major bleeding" },
      { id: "labile-inr", label: "Labile INR" },
      { id: "elderly", label: "Age > 65" },
      { id: "drugs", label: "Concomitant drugs" },
      { id: "alcohol", label: "Alcohol excess" },
    ];

    let score = 0;
    for (const criterion of criteria) {
      const value = readYesNo(values[criterion.id]);
      if (value === null) {
        return critical(`${criterion.label} is required.`);
      }
      score += value;
    }

    const hasBledWarnings = [
      "HAS-BLED estimates 1-year major bleeding risk; a high score is not by itself a reason to withhold anticoagulation.",
      "Modifiable bleeding-risk factors (uncontrolled hypertension, labile INR, antiplatelet/NSAID use, alcohol excess) should be identified and corrected where possible.",
      "Bleeding risk must be weighed against stroke/thromboembolic risk — the score does not produce a treat-or-withhold answer.",
    ];

    if (score <= 1) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `HAS-BLED score ${score} — LOW bleeding risk. Estimated 1-year major bleeding risk approximately 1%.`,
        status: "normal",
        warnings: hasBledWarnings,
        advice: [
          "Continue routine clinical monitoring and review of medications that affect bleeding risk.",
        ],
        followUp: [
          "Reassess when medications, blood pressure control, or relevant laboratory values change.",
        ],
      };
    }

    if (score === 2) {
      return {
        value: score,
        unit: "/9",
        interpretation:
          `HAS-BLED score ${score} — MODERATE bleeding risk. Estimated 1-year major bleeding risk approximately 2%. ` +
          "Monitor carefully and review modifiable risk factors.",
        status: "high",
        warnings: hasBledWarnings,
        advice: [
          "Focus on correcting modifiable contributors (blood pressure control, avoid unnecessary antiplatelets/NSAIDs, address alcohol excess) rather than on the score alone.",
        ],
        followUp: [
          "Recheck the score after any intervention on modifiable factors or changes in anticoagulation management.",
        ],
      };
    }

    return {
      value: score,
      unit: "/9",
      interpretation:
        `HAS-BLED score ${score} — HIGH bleeding risk. Estimated 1-year major bleeding risk approximately 4% or more. ` +
        "Address and correct modifiable bleeding risk factors and reassess anticoagulation strategy, considering the net clinical benefit.",
      status: "critical",
      warnings: [
        ...hasBledWarnings,
        "In atrial fibrillation the net clinical benefit may still favor anticoagulation despite a high HAS-BLED score — do not convert the score into an automatic yes/no rule.",
      ],
      advice: [
        "Prioritize correction of modifiable risk factors and closer follow-up; any change to anticoagulation strategy should weigh both thrombotic and bleeding risk together.",
      ],
      followUp: [
        "Reassess frequently while modifiable factors are being corrected and whenever the medication list or clinical status changes.",
      ],
    };
  },
};