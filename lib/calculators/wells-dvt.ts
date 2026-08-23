import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readYesNo(value: string | undefined): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return n === 0 || n === 1 ? n : null;
}

export const wellsDvtCalculator: CalculatorDefinition = {
  id: "wells-dvt",

  slug: "wells-dvt",

  name: "Wells Score (DVT)",

  shortName: "Wells DVT",

  description:
    "Wells criteria for deep vein thrombosis — pre-test clinical probability of DVT to guide D-dimer testing and compression ultrasound.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["Wells", "Deep Vein Thrombosis", "DVT", "Pre-test Probability", "Emergency", "VTE", "D-Dimer", "Compression Ultrasound"],

  formula:
    "Sum of present criteria (+1 each): active cancer, paralysis/paresis, bedridden >3 days or major surgery <12 weeks, localized deep-vein tenderness, entire leg swollen, calf swelling >3 cm, pitting edema, collateral superficial veins, previous DVT — minus 2 if an alternative diagnosis is at least as likely.",

  normalRange: "−2 to 9 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "Two-tier interpretation (most commonly used): ≤1 point = DVT unlikely; ≥2 points = DVT likely. In DVT-unlikely patients a negative high-sensitivity D-dimer safely excludes DVT. Three-tier interpretation: ≤0 low, 1–2 moderate, ≥3 high probability.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.",
    "Wells PS, et al. Accuracy of clinical assessment of deep-vein thrombosis. Lancet. 1995;345(8960):1326-1330.",
  ],

  relatedCalculators: ["wells-pe", "perc-rule"],

  inputs: [
  {
    id: "active-cancer",
    label: "Active cancer (treatment within 6 months or palliative)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "paralysis",
    label: "Paralysis, paresis, or recent plaster immobilization of the lower extremities",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "bedridden",
    label: "Recently bedridden >3 days or major surgery within previous 12 weeks",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "localized-tenderness",
    label: "Localized tenderness along the distribution of the deep venous system",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "entire-leg-swollen",
    label: "Entire leg swollen",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "calf-swelling",
    label: "Calf swelling >3 cm compared with the asymptomatic leg",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "pitting-edema",
    label: "Pitting edema confined to the symptomatic leg",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "collateral-veins",
    label: "Collateral superficial veins (non-varicose)",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "previous-dvt",
    label: "Previously documented DVT",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "alternative-diagnosis",
    label: "Alternative diagnosis at least as likely as DVT",
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
      { id: "active-cancer", points: 1, label: "Active cancer" },
      { id: "paralysis", points: 1, label: "Paralysis/paresis" },
      { id: "bedridden", points: 1, label: "Bedridden >3 days or recent surgery" },
      { id: "localized-tenderness", points: 1, label: "Deep-vein tenderness" },
      { id: "entire-leg-swollen", points: 1, label: "Entire leg swollen" },
      { id: "calf-swelling", points: 1, label: "Calf swelling >3 cm" },
      { id: "pitting-edema", points: 1, label: "Pitting edema" },
      { id: "collateral-veins", points: 1, label: "Collateral superficial veins" },
      { id: "previous-dvt", points: 1, label: "Previous DVT" },
    ];

    let score = 0;
    for (const item of items) {
      const value = readYesNo(values[item.id]);
      if (value === null) {
        return critical(`${item.label} is required.`);
      }
      if (value === 1) score += item.points;
    }

    const alternative = readYesNo(values["alternative-diagnosis"]);
    if (alternative === null) {
      return critical("Alternative diagnosis assessment is required.");
    }
    if (alternative === 1) score -= 2;

    const threeTier =
      score <= 0 ? "low" : score <= 2 ? "moderate" : "high";

    if (score >= 2) {
      return {
        value: score,
        unit: "points",
        interpretation:
          `Wells DVT score ${score} (${threeTier} probability, three-tier) — DVT LIKELY (two-tier). ` +
          "Proceed directly to compression ultrasound; D-dimer is not recommended.",
        status: "high",
        warnings: [
          "The Wells DVT score estimates pretest probability; it does not confirm or exclude DVT by itself.",
          "Clinical suspicion discordant with the score should prompt continued evaluation regardless of the result.",
        ],
        advice: [
          "With DVT-likely status, proceed along established imaging pathways rather than D-dimer exclusion.",
        ],
        followUp: [
          "Escalate promptly if symptoms progress or the limb becomes threatened while awaiting investigation.",
        ],
      };
    }

    return {
      value: score,
      unit: "points",
      interpretation:
        `Wells DVT score ${score} (${threeTier} probability, three-tier) — DVT UNLIKELY (two-tier). ` +
        "A negative high-sensitivity D-dimer safely excludes DVT without imaging.",
      status: "normal",
      warnings: [
        "The Wells DVT score estimates pretest probability; it does not confirm or exclude DVT by itself.",
        "Results must be combined with appropriate imaging and laboratory pathways for the clinical setting.",
      ],
      advice: [
        "Use this result within an established DVT assessment pathway; a positive D-dimer returns the patient to diagnostic imaging.",
      ],
      followUp: [
        "Reassess if symptoms evolve, worsen, or fail to resolve, or if diagnostic uncertainty remains after initial testing.",
      ],
    };
  },
};
