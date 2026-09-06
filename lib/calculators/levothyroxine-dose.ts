import type { CalculatorDefinition } from "./calculator.types";

export const levothyroxineDoseCalculator: CalculatorDefinition = {
  id: "levothyroxine-dose",

  slug: "levothyroxine-dose",

  name: "Levothyroxine Dose Calculator",

  shortName: "levothyroxine-dose",

  description:
    "Estimates the approximate full-replacement levothyroxine dose for adults using ~1.6 µg/kg/day (FDA levothyroxine labeling). It is NOT a universal prescribing dose calculator: the actual starting dose depends on age, duration and severity of hypothyroidism, cardiovascular status, pregnancy status, residual thyroid function, and clinical/laboratory findings.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [
    "Levothyroxine",
    "Hypothyroidism",
    "Thyroid Hormone Replacement",
    "Thyroid",
    "TSH",
    "Endocrinology",
    "Dose",
    "Free T4",
  ],

  formula:
    "Estimated full replacement dose (µg/day) ≈ 1.6 × body weight (kg)",

  normalRange:
    "Approximate full replacement dose ≈ 1.6 µg/kg/day (e.g. ~100–125 µg/day for a 70 kg adult). Elderly patients and patients with cardiac disease generally require lower starting doses, and the full replacement dose may be less than 1 µg/kg/day in the elderly. Titration is guided by clinical status, TSH, and/or free T4.",

  referenceRanges: [
  {
    label: "Lower starting dose often appropriate",
    range: "<1.1 µg/kg/day",
    context: "elderly, cardiovascular disease, cardiac risk (treat cautiously)",
  },
  {
    label: "Moderate dose",
    range: "1–1.6 µg/kg/day",
    context: "dose range seen during titration",
  },
  {
    label: "Full replacement dose",
    range: "≈1.6 µg/kg/day",
    context: "average full replacement dose for otherwise appropriate adults per FDA labeling",
  },
],



  clinicalNotes:
    "This calculator estimates only the approximate full-replacement levothyroxine dose (≈1.6 µg/kg/day) described in current FDA levothyroxine labeling. It is NOT a universal prescribing dose: the appropriate starting dose depends on age, duration and severity of hypothyroidism, cardiovascular status, pregnancy status, residual thyroid function, and clinical/laboratory findings. Elderly patients and patients with cardiac disease or atrial fibrillation risk generally require a lower starting dose (the FDA label cites 12.5–25 µg/day) and slower titration (typically every 6–8 weeks); standard adults are usually titrated in 12.5–25 µg increments every 4–6 weeks. Dose adequacy must be confirmed by clinical status and serum TSH (and/or free T4) rather than by calculator output alone, and usual doses seldom exceed 200 µg/day. Uncorrected adrenal insufficiency is a contraindication. Pregnancy-related dose management and thyroid cancer suppression dosing require separate clinical management and should not be guided by this calculator.",

  // Educational decision-support only. This calculator does not prescribe
  // a patient-specific starting dose. Actual dosing must be individualized.





  comparison: {"title":"Thyroid Replacement Dose Tools","calculators":[{"name":"Levothyroxine Dose","href":"/calculators/levothyroxine-dose","bestFor":"Clinical dosing with titration guidance.","limitation":"Requires clinical context."}]},

  references: [
    "Levothyroxine Sodium Tablets Prescribing Information. US FDA-approved labeling (DailyMed).",
    "SYNTHROID (levothyroxine sodium) Prescribing Information. US FDA-approved labeling.",
  ],

  relatedCalculators: ["bmi"],

  inputs: [
  {
    id: "weight",
    label: "Body Weight",
    type: "number",
    unit: "kg",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.weight === "" ||
  values.weight === undefined
) {
  return {
    value: 0,
    interpretation: "Body Weight is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.weight))
) {
  return {
    value: 0,
    interpretation: "Invalid Body Weight.",
    status: "critical",
  };
}


if (Number(values.weight) < 0) {
  return {
    value: 0,
    interpretation: "Body Weight cannot be negative.",
    status: "critical",
  };
}


if (Number(values.weight) === 0) {
  return {
    value: 0,
    interpretation: "Body Weight cannot be zero.",
    status: "critical",
  };
}



const weight = Number(values.weight);
const wt = weight;


  const result =
    1.6 * weight;


  const dailyDose =
    Number(result.toFixed(2));

  // The formula always yields the full replacement rate (≈1.6 µg/kg/day).
  // The result is the total estimated full-replacement daily dose in µg
  // (rate × weight). It is an educational estimate, not a prescribed dose:
  // the safe starting dose and titration schedule must be individualized.
  const interpretation =
    `Estimated full replacement dose: ${dailyDose} µg/day (≈1.6 µg/kg/day × ${weight} kg). ` +
    "This is an estimated full-replacement dose, NOT a safe starting dose for every patient. " +
    "Actual dosing depends on age, duration and severity of hypothyroidism, cardiovascular status, pregnancy status, residual thyroid function, and clinical/laboratory findings. " +
    "Elderly patients and patients with cardiovascular disease or atrial fibrillation risk generally require a lower starting dose and slower titration. " +
    "Confirm dose adequacy using clinical status and serum TSH (and/or free T4), not calculator output alone. " +
    "Uncorrected adrenal insufficiency is a contraindication; pregnancy-related and thyroid-cancer suppression dosing require separate management.";

  const status:
    "normal" |
    "low" |
    "high" |
    "critical" =
    "normal";

  const referenceRange =
    "≈1.6 µg/kg/day (full replacement)";



return {
  value: dailyDose,

  interpretation,

  status,

  referenceRange,
};
},

};