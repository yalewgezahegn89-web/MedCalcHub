import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };
type StrOrErr = { s: string } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function number(
  values: Record<string, string>,
  id: string,
  label: string,
  opts: { positive?: boolean; min?: number; max?: number } = {},
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (opts.positive && n <= 0) return { err: `${label} must be a positive number.` };
  if (opts.min !== undefined && n < opts.min) return { err: `${label} must be at least ${opts.min}.` };
  if (opts.max !== undefined && n > opts.max) return { err: `${label} must not exceed ${opts.max}.` };
  return { n };
}

function stringSelect(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): StrOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { s: v };
}

export const pediatricHypotensionCalculator: CalculatorDefinition = {
  id: "pediatric-hypotension",

  slug: "pediatric-hypotension",

  name: "Pediatric Hypotension (PALS) Threshold",

  shortName: "Peds Hypotension",

  description:
    "Determines the age-based 5th-percentile systolic blood pressure threshold below which hypotension is defined in children (PALS/AAP): < 60 mmHg in term newborns to 1 month, < 70 mmHg in infants 1–12 months, < 70 + (2 × age in years) in children 1–10 years, and < 90 mmHg beyond 10 years. Compares a measured systolic blood pressure against the threshold.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Pediatric Hypotension",
    "Hypotension",
    "PALS",
    "Systolic Blood Pressure",
    "Shock",
    "Resuscitation",
    "Blood Pressure Percentile",
    "Child",
    "Infant",
    "Pediatrics",
  ],

  formula:
    "Hypotension threshold (SBP 5th percentile): < 60 mmHg (0–1 month); < 70 mmHg (1–12 months); < 70 + 2 × age(years) mmHg (1–10 years); < 90 mmHg (> 10 years).",

  normalRange:
    "Systolic blood pressure at or above the age-specific 5th-percentile threshold is considered adequate perfusion pressure for resuscitation purposes; below the threshold defines hypotension requiring intervention.",

  referenceRanges: [
    {
      label: "0–1 month",
      range: "< 60 mmHg",
      context: "Term newborn to 1 month",
    },
    {
      label: "1–12 months",
      range: "< 70 mmHg",
      context: "Infant",
    },
    {
      label: "1–10 years",
      range: "< 70 + (2 × age) mmHg",
      context: "e.g., < 78 mmHg at 4 years",
    },
    {
      label: "> 10 years",
      range: "< 90 mmHg",
      context: "Older child / adolescent",
    },
  ],



  clinicalNotes:
    "Pediatric Advanced Life Support (PALS) defines hypotension as systolic blood pressure below the 5th percentile for age, commonly summarized as: < 60 mmHg for term newborns to 1 month, < 70 mmHg for infants 1–12 months, < 70 + (2 × age in years) mmHg for children 1–10 years, and < 90 mmHg for children older than 10 years. These thresholds are used to recognize hypotensive (decompensated) shock and trigger immediate intervention, but they are only one component of the PALS systematic assessment of perfusion.",




  comparison: {
    title: "Pediatric shock assessment",
    calculators: [
      {
        name: "Shock Index",
        href: "/calculators/shock-index",
        use: "Heart rate / systolic blood pressure ratio",
        bestFor: "Early shock screening in children and adults",
      },
      {
        name: "Mean Arterial Pressure (MAP)",
        href: "/calculators/map",
        use: "Computed mean arterial pressure",
        bestFor: "Perfusion pressure monitoring",
      },
    ],
  },

  references: [
    "American Heart Association. Pediatric Advanced Life Support Provider Manual. Dallas, TX: AHA; 2020.",
    "Kleinman ME, Chameides L, Schexnayder SM, et al. Pediatric advanced life support: 2010 American Heart Association guidelines for cardiopulmonary resuscitation and emergency cardiovascular care. Pediatrics. 2010;126(5):e1361-e1399.",
  ],

  relatedCalculators: ["shock-index", "map", "peds-pews"],

  inputs: [
    {
      id: "ageGroup",
      label: "Age Group",
      type: "select",
      required: true,
      options: [
        { label: "Term newborn to 1 month", value: "0-1mo" },
        { label: "1–12 months", value: "1-12mo" },
        { label: "1–10 years", value: "1-10yr" },
        { label: "Older than 10 years", value: "over-10yr" },
      ],
      defaultValue: "1-10yr",
    },
    {
      id: "ageYears",
      label: "Age (Years)",
      type: "number",
      required: true,
      unit: "years",
      min: 1,
      max: 10,
      step: 1,
      helpText: "Required for the 1–10 year group; the threshold is 70 + 2 × age.",
    },
    {
      id: "sbp",
      label: "Measured Systolic Blood Pressure",
      type: "number",
      required: true,
      unit: "mmHg",
      min: 1,
      step: 1,
    },
  ],

  calculate(values: Record<string, string>) {
    const ageGroup = stringSelect(values, "ageGroup", "Age group", ["0-1mo", "1-12mo", "1-10yr", "over-10yr"]);
    if ("err" in ageGroup) return critical(ageGroup.err);

    let threshold: number;
    let thresholdText: string;

    switch (ageGroup.s) {
      case "0-1mo":
        threshold = 60;
        thresholdText = "< 60 mmHg";
        break;
      case "1-12mo":
        threshold = 70;
        thresholdText = "< 70 mmHg";
        break;
      case "over-10yr":
        threshold = 90;
        thresholdText = "< 90 mmHg";
        break;
      case "1-10yr":
      default: {
        const ageYears = number(values, "ageYears", "Age", { positive: true, min: 1, max: 10 });
        if ("err" in ageYears) return critical(ageYears.err);
        threshold = 70 + 2 * ageYears.n;
        thresholdText = `70 + (2 × ${ageYears.n}) = ${threshold} mmHg`;
        break;
      }
    }

    const sbp = number(values, "sbp", "Systolic blood pressure", { positive: true });
    if ("err" in sbp) return critical(sbp.err);

    const hypotensive = sbp.n < threshold;

    let interpretation: string;
    let status: "normal" | "critical";

    if (hypotensive) {
      interpretation =
        `HYPOTENSIVE — measured SBP ${sbp.n} mmHg is below the PALS 5th-percentile threshold for this age (${thresholdText}). ` +
        "Begin the PALS shock algorithm immediately: high-flow oxygen, vascular access, and 20 mL/kg isotonic fluid boluses with frequent reassessment.";
      status = "critical";
    } else {
      interpretation =
        `NOT HYPOTENSIVE — measured SBP ${sbp.n} mmHg is at or above the PALS 5th-percentile threshold for this age (${thresholdText}). ` +
        "Continue to assess the child for compensated shock using perfusion, mental status, and urine output.";
      status = "normal";
    }

    return {
      value: threshold,
      unit: "mmHg",
      interpretation,
      status,
      score: threshold,
    };
  },
};
