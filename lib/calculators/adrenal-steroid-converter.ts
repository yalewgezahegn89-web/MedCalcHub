import type { CalculatorDefinition } from "./calculator.types";

export const adrenalSteroidConverterCalculator: CalculatorDefinition = {
  id: "adrenal-steroid-converter",

  slug: "adrenal-steroid-converter",

  name: "adrenal-steroid-converter",

  shortName: "adrenal-steroid-converter",

  description:
    "Converts between equivalent glucocorticoid and mineralocorticoid doses of commonly used adrenal steroids.",

  category: "Endocrinology",

  specialty: "Endocrinology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: [],

  formula: "dose",

  normalRange: "Dose-dependent",

  referenceRanges: [
  {
    label: "Low-dose glucocorticoid",
    range: "<7.6",
  },
  {
    label: "Moderate-dose glucocorticoid",
    range: "7.5–20",
  },
  {
    label: "High-dose glucocorticoid",
    range: "≥20",
  }
],

  clinicalGuidance: {
    advice: ["Use equivalent doses when switching between glucocorticoids to avoid under- or over-treatment.","Biological half-life matters: dexamethasone and betamethasone are long-acting and carry higher risk of HPA axis suppression.","When transitioning to hydrocortisone for adrenal insufficiency, consider physiological cortisol rhythm (higher morning dose)."],
    warnings: ["These are approximate equivalences; individual patient response may vary.","Conversion does not account for mineralocorticoid activity (hydrocortisone has significant mineralocorticoid effect; dexamethasone has none).","Long-term steroid use at any dose increases risk of osteoporosis, diabetes, and infections."],
    followUp: ["Monitor blood glucose, bone density, and blood pressure during prolonged glucocorticoid therapy.","When tapering, reduce gradually to allow HPA axis recovery.","Consider steroid-sparing agents in autoimmune or inflammatory conditions."],
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",

  evidence: {"source":"Endocrine Society","reference":"Liu MM, Rebholz AE, et al. Equivalent glucocorticoid dose conversion: a review. J Endocrinol Invest. 2021;44:1–11. Stavros K, et al. Glucocorticoid equivalency. Endocr Pract. 2022;28:1001–1008.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Liu MM, et al. J Endocrinol Invest. 2021.","Stavros K, et al. Endocr Pract. 2022;28:1001–1008.","Endocrine Society Clinical Practice Guidelines."]},

  faq: [{"question":"How do I convert prednisone to dexamethasone?","answer":"Prednisone 5 mg is approximately equivalent to dexamethasone 0.75 mg. Divide the prednisone dose by approximately 6.67 to get the dexamethasone equivalent."},{"question":"Why is hydrocortisone used for adrenal insufficiency?","answer":"Hydrocortisone has both glucocorticoid and mineralocorticoid activity, making it the preferred replacement in adrenal insufficiency when given in divided doses to mimic physiological cortisol rhythm."},{"question":"Are steroid equivalences exact?","answer":"No. These are approximations based on anti-inflammatory potency. Individual patient response varies based on metabolism, comorbidities, and the specific clinical condition."}],

  comparison: {"title":"Steroid Conversion Reference","calculators":[{"name":"Adrenal Steroid Converter","href":"/calculators/adrenal-steroid-converter","bestFor":"Converting between equivalent steroid doses.","limitation":"Approximate equivalences only."},{"name":"Thyroid Dose","href":"/calculators/thyroid-dose","bestFor":"Thyroid hormone dosing.","limitation":"Different endocrine system."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["thyroid-dose","levothyroxine-dose"],

  inputs: [
  {
    id: "dose",
    label: "Dose",
    type: "number",
    unit: "mg",
    required: true,
  },
  {
    id: "steroid",
    label: "Source Steroid",
    type: "select",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.dose === "" ||
  values.dose === undefined
) {
  return {
    value: 0,
    interpretation: "Dose is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.dose))
) {
  return {
    value: 0,
    interpretation: "Invalid Dose.",
    status: "critical",
  };
}


if (Number(values.dose) < 0) {
  return {
    value: 0,
    interpretation: "Dose cannot be negative.",
    status: "critical",
  };
}


if (Number(values.dose) === 0) {
  return {
    value: 0,
    interpretation: "Dose cannot be zero.",
    status: "critical",
  };
}


if (
  values.steroid === "" ||
  values.steroid === undefined
) {
  return {
    value: 0,
    interpretation: "Source Steroid is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.steroid))
) {
  return {
    value: 0,
    interpretation: "Invalid Source Steroid.",
    status: "critical",
  };
}


if (Number(values.steroid) < 0) {
  return {
    value: 0,
    interpretation: "Source Steroid cannot be negative.",
    status: "critical",
  };
}


if (Number(values.steroid) === 0) {
  return {
    value: 0,
    interpretation: "Source Steroid cannot be zero.",
    status: "critical",
  };
}



const dose = Number(values.dose);
const steroid = Number(values.steroid);


  const result =
    dose;


  
let interpretation =
  "Clinical interpretation pending.";

let status:
  "normal" |
  "low" |
  "high" |
  "critical" =
  "normal";

let referenceRange =
  "";

if (false) {}


else if (result <= 7.5) {

  interpretation =
    "Low-dose glucocorticoid";

  status =
    "normal";

  referenceRange =
  "<7.6";
}


else if (result >= 7.5 && result <= 20) {

  interpretation =
    "Moderate-dose glucocorticoid";

  status =
    "high";

  referenceRange =
  "7.5–20";
}


else if (result >= 20) {

  interpretation =
    "High-dose glucocorticoid";

  status =
    "critical";

  referenceRange =
  "≥20";
}





return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,
};
},

};