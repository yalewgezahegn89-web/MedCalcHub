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

export const daptCalculator: CalculatorDefinition = {
  id: "dapt",

  slug: "dapt",

  name: "DAPT Score",

  shortName: "DAPT",

  description:
    "Dual Antiplatelet Therapy (DAPT) score for decision-making about the duration of dual antiplatelet therapy after coronary stenting, balancing ischemic benefit against bleeding risk (score −2 to +10).",

  category: "Cardiology",

  specialty: "Cardiology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["DAPT", "Dual Antiplatelet Therapy", "Stent", "PCI", "Clopidogrel", "Prasugrel", "Ticagrelor", "Bleeding Risk", "Cardiology"],

  formula:
    "Age ≥75 (−2), 65–<75 (−1), <65 (0); Cigarette smoking (+1); Diabetes (+1); MI at presentation (+1); Prior MI or PCI (+1); Stent diameter <3 mm (+1); Paclitaxel-eluting stent (+1); CHF or LVEF <30% (+2); Saphenous vein graft PCI (+2) = total −2 to +10",

  normalRange: "−2 to +10 points",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "The DAPT score was derived from the DAPT Study to identify patients who derive net benefit from continuing DAPT beyond 12 months after coronary stenting. A score ≥2 favors extended DAPT (up to 30 months), while a score <2 favors standard 12-month therapy, balancing ischemic reduction against moderate/severe bleeding risk.",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Yeh RW, et al. Development and validation of a prediction rule for benefit and harm of dual antiplatelet therapy beyond 1 year after percutaneous coronary intervention. JAMA. 2016;315(16):1735-1749.",
  ],

  relatedCalculators: ["timi", "heart-score", "has-bled"],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "select",
    required: true,
    options: [
      { label: "< 65 years (0)", value: "0" },
      { label: "65 to < 75 years (−1)", value: "-1" },
      { label: "≥ 75 years (−2)", value: "-2" },
    ],
  },
  {
    id: "smoking",
    label: "Current cigarette smoking",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
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
    id: "mi-at-presentation",
    label: "Myocardial infarction at presentation",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "prior-mi-pci",
    label: "Prior MI or prior PCI",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "stent-diameter",
    label: "Stent diameter < 3 mm",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "paclitaxel",
    label: "Paclitaxel-eluting stent",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "chf-lvef",
    label: "Congestive heart failure or LVEF < 30%",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "2" },
    ],
  },
  {
    id: "svg-pci",
    label: "Saphenous vein graft PCI",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "2" },
    ],
  }
],

  calculate(values: Record<string, string>) {
    const age = readSelect(values["age"], ["0", "-1", "-2"]);
    if (age === null) {
      return critical("Age is required.");
    }

    const weightedItems: Array<{ id: string; label: string; points: number }> = [
      { id: "smoking", label: "Cigarette smoking", points: 1 },
      { id: "diabetes", label: "Diabetes", points: 1 },
      { id: "mi-at-presentation", label: "MI at presentation", points: 1 },
      { id: "prior-mi-pci", label: "Prior MI or PCI", points: 1 },
      { id: "stent-diameter", label: "Stent diameter < 3 mm", points: 1 },
      { id: "paclitaxel", label: "Paclitaxel-eluting stent", points: 1 },
      { id: "chf-lvef", label: "CHF or LVEF < 30%", points: 2 },
      { id: "svg-pci", label: "Saphenous vein graft PCI", points: 2 },
    ];

    let score = Number(age);
    for (const item of weightedItems) {
      const value = readYesNo(values[item.id]);
      if (value === null) {
        return critical(`${item.label} is required.`);
      }
      if (value === 1) {
        score += item.points;
      }
    }

    if (score >= 2) {
      return {
        value: score,
        unit: "points",
        interpretation:
          `DAPT score ${score} — favors EXTENDED dual antiplatelet therapy (beyond 12 months). ` +
          "Expected reduction in ischemic events outweighs the increase in moderate/severe bleeding.",
        status: "high",
      };
    }

    return {
      value: score,
      unit: "points",
      interpretation:
        `DAPT score ${score} — favors STANDARD 12-month dual antiplatelet therapy. ` +
        "Bleeding risk is expected to outweigh the ischemic benefit of extended treatment.",
      status: "normal",
    };
  },
};