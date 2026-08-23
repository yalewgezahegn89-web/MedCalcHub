import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const wellsPeCalculator: CalculatorDefinition = {
  id: "wells-pe",

  slug: "wells-pe",

  name: "Wells Score (PE)",

  shortName: "Wells PE",

  description:
    "Wells criteria for pulmonary embolism — pre-test clinical probability of PE to guide D-dimer testing and imaging.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["Wells", "Pulmonary Embolism", "PE", "Pre-test Probability", "Emergency", "VTE", "D-Dimer", "Thromboembolism"],

  formula:
    "Clinical signs of DVT (+3) + PE most likely diagnosis (+3) + HR >100 (+1.5) + immobilization/surgery 4 weeks (+1.5) + prior DVT/PE (+1.5) + hemoptysis (+1) + malignancy (+1)",

  normalRange: "0–12.5 points",

  referenceRanges: [],



  clinicalNotes:
    "Two-tier interpretation (most commonly used): ≤4 points = PE unlikely; >4 points = PE likely. In PE-unlikely patients a negative high-sensitivity D-dimer safely excludes PE. Three-tier interpretation: 0–1 low, 2–6 moderate, >6 high probability.",





  comparison: undefined,

  references: [
    "Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000;83(3):416-420.",
    "Wells PS, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected pulmonary embolism presenting to the emergency department by using a simple clinical model and D-dimer. Ann Intern Med. 2001;135(2):98-107.",
  ],

  relatedCalculators: ["perc-rule", "wells-dvt"],

  inputs: [
  {
    id: "dvt-signs",
    label: "Clinical signs/symptoms of DVT (leg swelling, pain on palpation)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "pe-most-likely",
    label: "PE judged to be the most likely diagnosis",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "tachycardia",
    label: "Heart rate > 100 bpm",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "immobilization",
    label: "Immobilization ≥ 3 days or surgery within previous 4 weeks",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "prior-dvt-pe",
    label: "Previous objectively diagnosed DVT or PE",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "hemoptysis",
    label: "Hemoptysis",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "malignancy",
    label: "Active malignancy (treatment within 6 months or palliative)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const items: Array<{ id: string; points: number; label: string }> = [
      { id: "dvt-signs", points: 3, label: "Clinical signs of DVT" },
      { id: "pe-most-likely", points: 3, label: "PE most likely diagnosis" },
      { id: "tachycardia", points: 1.5, label: "Heart rate > 100" },
      { id: "immobilization", points: 1.5, label: "Immobilization/surgery" },
      { id: "prior-dvt-pe", points: 1.5, label: "Prior DVT/PE" },
      { id: "hemoptysis", points: 1, label: "Hemoptysis" },
      { id: "malignancy", points: 1, label: "Malignancy" },
    ];

    let score = 0;
    for (const item of items) {
      const value = readYesNo(values[item.id]);
      if (value === null) {
        return critical(`${item.label} is required.`);
      }
      if (value === 1) score += item.points;
    }

    const rounded = Math.round(score * 10) / 10;

    const threeTier =
      score <= 1
        ? "low"
        : score <= 6
          ? "moderate"
          : "high";

    if (score > 4) {
      return {
        value: rounded,
        unit: "points",
        interpretation:
          `Wells score ${rounded} (${threeTier} probability, three-tier) — PE LIKELY (two-tier). ` +
          "Proceed directly to CT pulmonary angiography; D-dimer is not recommended.",
        status: "high",
        warnings: [
          "The Wells PE score is a pretest-probability tool, not a diagnostic test — it neither confirms nor excludes PE by itself.",
          "PE may still be present even when the score suggests lower probability; clinical suspicion should drive the pathway if discordant.",
        ],
        advice: [
          "With PE-likely status, proceed along established diagnostic pathways (imaging-first) rather than relying on D-dimer exclusion.",
        ],
        followUp: [
          "If imaging is delayed or the patient deteriorates while awaiting investigation, escalate care immediately.",
        ],
      };
    }

    return {
      value: rounded,
      unit: "points",
      interpretation:
        `Wells score ${rounded} (${threeTier} probability, three-tier) — PE UNLIKELY (two-tier). ` +
        "A negative high-sensitivity D-dimer safely excludes PE without imaging.",
      status: "normal",
      warnings: [
        "The Wells PE score is a pretest-probability tool, not a diagnostic test; it must be combined with an appropriate D-dimer or imaging pathway for the clinical setting.",
        "A low score does not independently exclude PE in every patient — persistent clinical suspicion warrants continued evaluation regardless of the score.",
      ],
      advice: [
        "Use this result within an established PE assessment pathway; a positive D-dimer returns the patient to full diagnostic evaluation.",
      ],
      followUp: [
        "If symptoms persist or evolve after a negative D-dimer, reassess and consider further evaluation rather than closing the workup on the score alone.",
      ],
    };
  },
};
