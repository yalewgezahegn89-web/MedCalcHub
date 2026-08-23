import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function positive(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n <= 0) return { err: `${label} must be a positive number.` };
  return { n };
}

function nonNegative(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (n < 0) return { err: `${label} must be a non-negative number.` };
  return { n };
}

export const eblObstetricCalculator: CalculatorDefinition = {
  id: "ebl-obstetric",

  slug: "ebl-obstetric",

  name: "Estimated Blood Loss (Obstetric)",

  shortName: "EBL",

  description:
    "Estimates intraoperative blood loss in obstetrics by two methods: gravimetric (weighed sponges/drapes, 1 g ≈ 1 mL blood) and hematocrit-based (EBL = estimated blood volume × (pre-Hct − post-Hct)/pre-Hct, using a pregnancy blood volume of approximately 85 mL/kg). Postpartum hemorrhage is defined as cumulative blood loss ≥ 1000 mL within 24 hours.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Estimated Blood Loss",
    "EBL",
    "Postpartum Hemorrhage",
    "PPH",
    "Gravimetric",
    "Hematocrit",
    "Blood Loss",
    "Delivery",
    "Obstetrics",
    "Quantitative Blood Loss",
  ],

  formula:
    "Gravimetric: EBL (mL) = (wet weight − dry weight) g × 1 mL/g; Hct-based: EBL = BV × (pre-Hct − post-Hct)/pre-Hct, BV ≈ 85 mL/kg (range 70–100 mL/kg)",

  normalRange:
    "ACOG defines postpartum hemorrhage as cumulative blood loss ≥ 1000 mL (or bleeding with signs of hypovolemia) within 24 hours of delivery, regardless of route of delivery.",

  referenceRanges: [
    {
      label: "Expected",
      range: "< 500 mL",
      context: "vaginal delivery (typical)",
    },
    {
      label: "Increased / concern",
      range: "500–999 mL",
      context: "monitor closely",
    },
    {
      label: "Postpartum hemorrhage",
      range: "≥ 1000 mL",
      context: "ACOG definition; respond urgently",
    },
  ],

  classification: [
    {
      label: "Expected",
      range: "< 500 mL",
      max: 499,
      color: "green",
    },
    {
      label: "Concern",
      range: "500–999 mL",
      min: 500,
      max: 999,
      color: "yellow",
    },
    {
      label: "Postpartum hemorrhage",
      range: "≥ 1000 mL",
      min: 1000,
      color: "red",
    },
  ],



  clinicalNotes:
    "Estimated blood loss in obstetrics is typically quantified by the gravimetric method (weighing blood-soaked materials; 1 g ≈ 1 mL) and/or calculated from hematocrit: EBL = blood volume × (pre-Hct − post-Hct)/pre-Hct. Blood volume in pregnancy averages ~85 mL/kg (range 70–100 mL/kg). ACOG (Obstetric Hemorrhage, CO 794) defines postpartum hemorrhage as cumulative blood loss ≥ 1000 mL or bleeding with signs of hypovolemia within 24 hours of delivery.",




  comparison: undefined,

  references: [
    "ACOG Committee Opinion No. 794. Obstet Gynecol. 2019;134(6):e150-e156.",
    "ACOG Practice Bulletin No. 183. Obstet Gynecol. 2017;130(4):e168-e186.",
  ],

  relatedCalculators: [
    "preeclampsia-criteria",
    "hellp-syndrome",
    "magnesium-sulfate-preeclampsia",
    "gestational-weight-gain",
  ],

  inputs: [
    {
      id: "method",
      label: "Estimation Method",
      type: "select",
      required: true,
      options: [
        { label: "Gravimetric (weighed sponges/drapes)", value: "gravimetric" },
        { label: "Hematocrit-based (pre/post Hct)", value: "hct" },
      ],
      defaultValue: "gravimetric",
    },
    {
      id: "wetWeight",
      label: "Wet Weight (blood-soaked materials)",
      type: "number",
      unit: "g",
      required: false,
      min: 1,
      helpText: "Used for the gravimetric method.",
    },
    {
      id: "dryWeight",
      label: "Dry Weight (baseline materials)",
      type: "number",
      unit: "g",
      required: false,
      min: 0,
      helpText: "Used for the gravimetric method.",
    },
    {
      id: "weightKg",
      label: "Maternal Weight",
      type: "number",
      unit: "kg",
      required: false,
      min: 1,
      helpText: "Used for the hematocrit-based method (blood volume ≈ 85 mL/kg).",
    },
    {
      id: "preHct",
      label: "Pre-Delivery Hematocrit",
      type: "number",
      unit: "%",
      required: false,
      min: 1,
      helpText: "Used for the hematocrit-based method.",
    },
    {
      id: "postHct",
      label: "Post-Delivery Hematocrit",
      type: "number",
      unit: "%",
      required: false,
      min: 1,
      helpText: "Used for the hematocrit-based method.",
    },
  ],

  calculate(values: Record<string, string>) {
    const method = values.method;
    if (method !== "gravimetric" && method !== "hct") {
      return critical("Estimation method is required.");
    }

    let ebl: number;
    let methodNote: string;

    if (method === "gravimetric") {
      const wet = positive(values, "wetWeight", "Wet weight");
      if ("err" in wet) return critical(wet.err);
      const dry = nonNegative(values, "dryWeight", "Dry weight");
      if ("err" in dry) return critical(dry.err);
      if (wet.n < dry.n) {
        return critical(
          "Wet weight must not be less than dry weight.",
        );
      }
      ebl = wet.n - dry.n;
      methodNote = `gravimetric (wet ${wet.n.toFixed(0)} g − dry ${dry.n.toFixed(0)} g)`;
    } else {
      const weight = positive(values, "weightKg", "Maternal weight");
      if ("err" in weight) return critical(weight.err);
      const pre = positive(values, "preHct", "Pre-delivery hematocrit");
      if ("err" in pre) return critical(pre.err);
      const post = positive(values, "postHct", "Post-delivery hematocrit");
      if ("err" in post) return critical(post.err);
      if (post.n > pre.n) {
        return critical(
          "Post-delivery hematocrit must not exceed pre-delivery hematocrit.",
        );
      }
      const bloodVolume = weight.n * 85;
      ebl = (bloodVolume * (pre.n - post.n)) / pre.n;
      methodNote = `hematocrit-based (BV ${bloodVolume.toFixed(0)} mL × (${pre.n.toFixed(1)} − ${post.n.toFixed(1)})/${pre.n.toFixed(1)})`;
    }

    const rounded = Math.round(ebl);

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (rounded >= 1000) {
      interpretation =
        `Estimated blood loss ~${rounded.toLocaleString()} mL (${methodNote}) — meets the ACOG definition of POSTPARTUM HEMORRHAGE (≥ 1000 mL). ` +
        "Activate the obstetric hemorrhage protocol: uterotonics, source control, fluid and blood products, and early escalation.";
      status = "critical";
      referenceRange = "≥ 1000 mL";
    } else if (rounded >= 500) {
      interpretation =
        `Estimated blood loss ~${rounded.toLocaleString()} mL (${methodNote}) — above the typical expected loss. ` +
        "Monitor closely and prepare for possible hemorrhage protocol activation if bleeding continues.";
      status = "high";
      referenceRange = "500–999 mL";
    } else {
      interpretation =
        `Estimated blood loss ~${rounded.toLocaleString()} mL (${methodNote}) — within the typical expected range for delivery. ` +
        "Continue routine monitoring of vital signs and cumulative loss.";
      status = "normal";
      referenceRange = "< 500 mL";
    }

    return {
      value: rounded,
      unit: "mL",
      interpretation,
      status,
      referenceRange,
    };
  },
};
