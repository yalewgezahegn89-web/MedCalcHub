import type { CalculatorDefinition } from "./calculator.types";

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function readNumber(value: string | undefined, label: string): number | null {
  if (value === "" || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const REGIONS: Array<{ id: string; label: string; max: number }> = [
  { id: "head", label: "Head", max: 9 },
  { id: "anterior-trunk", label: "Anterior trunk", max: 18 },
  { id: "posterior-trunk", label: "Posterior trunk", max: 18 },
  { id: "right-upper-limb", label: "Right upper limb", max: 9 },
  { id: "left-upper-limb", label: "Left upper limb", max: 9 },
  { id: "right-lower-limb", label: "Right lower limb", max: 18 },
  { id: "left-lower-limb", label: "Left lower limb", max: 18 },
  { id: "perineum", label: "Perineum", max: 1 },
];

export const parklandFormulaCalculator: CalculatorDefinition = {
  id: "parkland-formula",

  slug: "parkland-formula",

  name: "Parkland Formula",

  shortName: "Parkland",

  description:
    "Parkland (Baxter) formula for initial crystalloid resuscitation of adults with thermal burns: 4 mL/kg/%TBSA over 24 hours, with half in the first 8 hours and half over the following 16 hours.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-15",

  keywords: ["Parkland", "Baxter", "Burn", "Burns", "TBSA", "Rule of Nines", "Resuscitation", "Fluids", "Emergency"],

  formula:
    "Total volume = 4 mL × weight (kg) × total BSA burned (%). Give half in the first 8 hours, the remaining half over the next 16 hours, both using Ringer's lactate",

  normalRange: "Standard starting rate, titrate to urine output (0.5 mL/kg/h)",

  referenceRanges: [],

  clinicalGuidance: {
    advice: [],
    warnings: [],
    followUp: [],
  },

  clinicalNotes:
    "For adult burns ≥20% TBSA. Rate is a starting estimate only — titrate to urine output 0.5–1.0 mL/kg/h and hemodynamics. Do not use for electrical or chemical burns (higher volumes may be needed) or isolated smoke inhalation. Burns are second- and third-degree only; do not include first-degree (superficial) burns in TBSA. Perineum is excluded from pediatric modifications (use pediatric formulas under 30 kg).",

  evidence: undefined,

  faq: undefined,

  comparison: undefined,

  references: [
    "Baxter CR. Fluid volume and electrolyte changes of the early postburn period. Clin Plast Surg. 1974;1(4):693-709.",
    "Alvarado R, et al. Burn resuscitation. Burns. 2009;35(1):4-14.",
  ],

  relatedCalculators: ["shock-index", "map"],

  inputs: [
  {
    id: "weight",
    label: "Weight",
    type: "number",
    unit: "kg",
    required: true,
    min: 2,
    max: 400,
    step: 0.1,
  },
  {
    id: "head",
    label: "Head",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 9,
    step: 0.5,
  },
  {
    id: "anterior-trunk",
    label: "Anterior trunk",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 18,
    step: 0.5,
  },
  {
    id: "posterior-trunk",
    label: "Posterior trunk",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 18,
    step: 0.5,
  },
  {
    id: "right-upper-limb",
    label: "Right upper limb",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 9,
    step: 0.5,
  },
  {
    id: "left-upper-limb",
    label: "Left upper limb",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 9,
    step: 0.5,
  },
  {
    id: "right-lower-limb",
    label: "Right lower limb",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 18,
    step: 0.5,
  },
  {
    id: "left-lower-limb",
    label: "Left lower limb",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 18,
    step: 0.5,
  },
  {
    id: "perineum",
    label: "Perineum",
    type: "number",
    unit: "% TBSA",
    required: true,
    min: 0,
    max: 1,
    step: 0.5,
  }
],

  calculate(values: Record<string, string>) {
    const weight = readNumber(values["weight"], "Weight");
    if (weight === null) {
      return critical("Weight is required.");
    }
    if (weight < 2 || weight > 400) {
      return critical("Weight must be between 2 and 400 kg.");
    }

    let tbsa = 0;
    for (const region of REGIONS) {
      const raw = readNumber(values[region.id], region.label);
      if (raw === null) {
        return critical(`${region.label} is required.`);
      }
      if (raw < 0 || raw > region.max) {
        return critical(
          `${region.label} must be between 0 and ${region.max}% TBSA.`,
        );
      }
      tbsa += raw;
    }

    if (tbsa > 100) {
      return critical(
        `Total TBSA (${tbsa}%) cannot exceed 100%. Check the burn regions entered.`,
      );
    }

    const totalVolume = 4 * weight * tbsa;
    const first8h = totalVolume / 2;
    const next16h = totalVolume / 2;
    const first8hRate = first8h / 8;
    const next16hRate = next16h / 16;

    const roundedTotal = Math.round(totalVolume * 10) / 10;
    const roundedFirst8h = Math.round(first8h * 10) / 10;
    const roundedNext16h = Math.round(next16h * 10) / 10;
    const roundedFirst8hRate = Math.round(first8hRate * 10) / 10;
    const roundedNext16hRate = Math.round(next16hRate * 10) / 10;

    let interpretation: string;
    let status: "normal" | "high" | "critical";

    const parklandWarnings = [
      "The Parkland formula provides an initial fluid estimate, not a fixed final prescription — resuscitation must be titrated to clinical endpoints.",
      "Both excess and inadequate fluid administration are harmful; the formula is a starting point for titration, not a target to be met exactly.",
    ];

    if (tbsa < 10) {
      interpretation =
        `${tbsa}% TBSA — minor burn. Formal fluid resuscitation is typically not required; ` +
        "the Parkland estimate is provided for reference only.";
      status = "normal";
      return {
        value: totalVolume,
        unit: "mL/24h",
        score: roundedTotal,
        interpretation,
        status,
        advice: [
          `First 8 hours: ${roundedFirst8h} mL (≈ ${roundedFirst8hRate} mL/h)`,
          `Next 16 hours: ${roundedNext16h} mL (≈ ${roundedNext16hRate} mL/h)`,
        ],
        warnings: [
          ...parklandWarnings,
          "At this burn size oral rehydration and standard care are usually sufficient; apply the formula only if clinical assessment indicates otherwise.",
        ],
        followUp: [
          "Reassess fluid needs if the burn extent is reassessed upward or the patient shows signs of hypoperfusion.",
        ],
      };
    }

    if (tbsa < 20) {
      interpretation =
        `${tbsa}% TBSA — moderate burn. Total 24-hour volume ${roundedTotal} mL. ` +
        `Give ${roundedFirst8h} mL over the first 8 hours (${roundedFirst8hRate} mL/h), ` +
        `then ${roundedNext16h} mL over 16 hours (${roundedNext16hRate} mL/h) of Ringer's lactate.`;
      status = "high";
      return {
        value: totalVolume,
        unit: "mL/24h",
        score: roundedTotal,
        interpretation,
        status,
        advice: [
          `First 8 hours: ${roundedFirst8h} mL (≈ ${roundedFirst8hRate} mL/h)`,
          `Next 16 hours: ${roundedNext16h} mL (≈ ${roundedNext16hRate} mL/h)`,
          "Treat these volumes as an initial estimate and adjust based on ongoing assessment of perfusion and response.",
        ],
        warnings: parklandWarnings,
        followUp: [
          "Titrate infusion to clinical endpoints (urine output, hemodynamics) rather than completing the calculated volume regardless of response.",
        ],
      };
    }

    interpretation =
      `${tbsa}% TBSA — major burn. Total 24-hour volume ${roundedTotal} mL. ` +
      `Give ${roundedFirst8h} mL over the first 8 hours (${roundedFirst8hRate} mL/h), ` +
      `then ${roundedNext16h} mL over 16 hours (${roundedNext16hRate} mL/h) of Ringer's lactate. ` +
      "Titrate to urine output 0.5–1.0 mL/kg/h.";
    status = "critical";
    return {
      value: totalVolume,
      unit: "mL/24h",
      score: roundedTotal,
      interpretation,
      status,
      advice: [
        `First 8 hours: ${roundedFirst8h} mL (≈ ${roundedFirst8hRate} mL/h)`,
        `Next 16 hours: ${roundedNext16h} mL (≈ ${roundedNext16hRate} mL/h)`,
        "Adjust the rate based on ongoing reassessment — the formula is an initial estimate for a resuscitation that must be individually titrated.",
      ],
      warnings: [
        ...parklandWarnings,
        "Clock time matters: half the calculated volume is given in the first 8 hours from the time of the burn, not from the time of calculation.",
      ],
      followUp: [
        "Monitor urine output and hemodynamic endpoints serially and adjust the infusion accordingly throughout resuscitation.",
      ],
    };
  },
};
