import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const percRuleCalculator: CalculatorDefinition = {
  id: "perc-rule",

  slug: "perc-rule",

  name: "PERC Rule",

  shortName: "PERC",

  description:
    "Pulmonary Embolism Rule-Out Criteria (PERC) for identifying patients in whom PE can be safely ruled out without further testing when clinical pre-test probability is low.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["PERC", "Pulmonary Embolism", "PE", "Rule-Out", "Emergency", "VTE", "D-Dimer"],

  formula:
    "All 8 criteria met (age <50, HR <100, SpO2 ≥95%, no hemoptysis, no estrogen, no prior DVT/PE, no unilateral leg swelling, no surgery/trauma in past 4 weeks) → PE ruled out",

  normalRange: "8/8 criteria met",

  referenceRanges: [],



  clinicalNotes:
    "The PERC rule is applied to patients with a low pre-test probability of PE (e.g., Wells score <4). If all eight criteria are met, PE can be considered ruled out without D-dimer or imaging. It must not be used in patients with intermediate or high pre-test probability.",





  comparison: undefined,

  references: [
    "Kline JA, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.",
  ],

  relatedCalculators: ["wells-pe", "wells-dvt"],

  inputs: [
  {
    id: "age",
    label: "Age less than 50 years",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "heart-rate",
    label: "Heart rate less than 100 bpm",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "oxygen-saturation",
    label: "Oxygen saturation ≥ 95% on room air",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "hemoptysis",
    label: "No hemoptysis",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "estrogen",
    label: "No estrogen use",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "prior-dvt-pe",
    label: "No prior DVT or PE",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "leg-swelling",
    label: "No unilateral leg swelling",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  },
  {
    id: "surgery-trauma",
    label: "No surgery/trauma requiring hospitalization in past 4 weeks",
    type: "select",
    required: true,
    options: [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const criteria: Array<{ id: string; label: string }> = [
      { id: "age", label: "Age < 50" },
      { id: "heart-rate", label: "Heart rate < 100" },
      { id: "oxygen-saturation", label: "SpO2 ≥ 95%" },
      { id: "hemoptysis", label: "No hemoptysis" },
      { id: "estrogen", label: "No estrogen" },
      { id: "prior-dvt-pe", label: "No prior DVT/PE" },
      { id: "leg-swelling", label: "No leg swelling" },
      { id: "surgery-trauma", label: "No surgery/trauma (4 weeks)" },
    ];

    let criteriaMet = 0;
    for (const criterion of criteria) {
      const value = readYesNo(values[criterion.id]);
      if (value === null) {
        return critical(`${criterion.label} is required.`);
      }
      criteriaMet += value;
    }

    if (criteriaMet === 8) {
      return {
        value: criteriaMet,
        unit: "/8 criteria",
        interpretation:
          "PERC negative — all 8 criteria met. PE can be considered ruled out without D-dimer or imaging when pre-test probability is low.",
        status: "normal",
        warnings: [
          "PERC applies only to patients already judged to have a low pretest probability by an accepted risk tool — it is not a universal exclusion rule.",
          "Do not apply PERC without first establishing appropriately low pretest probability; in higher-prevalence settings a PERC-negative result does not exclude PE.",
        ],
        advice: [
          "PERC-negative status supports deferring D-dimer and imaging only when the gestalt/clinical probability is genuinely low; document the pretest assessment.",
        ],
        followUp: [
          "Advise the patient to return promptly if symptoms worsen, as the assessment reflects this encounter only.",
        ],
      };
    }

    const failed = criteria
      .filter((c) => values[c.id] === "0")
      .map((c) => c.label);

    return {
      value: criteriaMet,
      unit: "/8 criteria",
      interpretation:
        "PERC positive — not all 8 criteria met. PE cannot be ruled out by the PERC rule; proceed with D-dimer and/or imaging as indicated.",
      status: "high",
      warnings: [
        "A positive PERC result means exclusion status is not met — each unmet criterion represents a feature that keeps PE possible.",
        "PERC was designed for low-risk populations; it should never override clinical suspicion of PE.",
      ],
      advice: [
        `Continue diagnostic evaluation with D-dimer and/or imaging per your local pathway. Unmet criteria: ${failed.join("; ") || "none identified"}.`,
      ],
      followUp: [
        "Complete the diagnostic pathway; do not discharge on the basis of a PERC-positive screen without further evaluation when PE remains suspected.",
      ],
    };
  },
};
