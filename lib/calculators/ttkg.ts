import type { CalculatorDefinition } from "./calculator.types";

export const ttkgCalculator: CalculatorDefinition = {
  id: "ttkg",

  slug: "ttkg",

  name: "Transtubular Potassium Gradient (TTKG)",

  shortName: "ttkg",

  description:
    "Calculates the transtubular potassium gradient to assess renal potassium handling.",

  category: "Nephrology",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Transtubular Potassium Gradient", "TTKG", "Kidney", "Renal", "Potassium", "Hypokalemia", "Hyperkalemia"],

  formula: "TTKG = (urinek * plasmaosmolality) / (plasmak * urineosmolality)",

  normalRange: "8–12",

  referenceRanges: [
  {
    label: "Impaired K⁺ secretion",
    range: "<8.1",
  },
  {
    label: "Normal renal K⁺ response",
    range: "8–12",
  },
  {
    label: "Enhanced K⁺ secretion",
    range: "≥12",
  }
],



  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",





  comparison: {"title":"Which Potassium Assessment Should I Use?","calculators":[{"name":"TTKG","href":"/calculators/ttkg","bestFor":"Assessing renal potassium secretion in hyperkalemia.","limitation":"Physiological validity has been questioned."},{"name":"FENa","href":"/calculators/fena","bestFor":"Assessing sodium handling in AKI.","limitation":"Does not assess potassium."},{"name":"FEUrea","href":"/calculators/feurea","bestFor":"Prerenal vs. intrinsic AKI when on diuretics.","limitation":"Does not assess potassium."}]},

  references: [
    "MedCalcHub Clinical References",
  ],

  relatedCalculators: ["fena","feurea","bun-creatinine-ratio"],

  inputs: [
  {
    id: "urineK",
    label: "Urine Potassium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "plasmaK",
    label: "Plasma Potassium",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "urineOsmolality",
    label: "Urine Osmolality",
    type: "number",
    unit: "mOsm/kg",
    required: true,
  },
  {
    id: "plasmaOsmolality",
    label: "Plasma Osmolality",
    type: "number",
    unit: "mOsm/kg",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.urineK === "" ||
  values.urineK === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Potassium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urineK))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Potassium.",
    status: "critical",
  };
}


if (Number(values.urineK) < 0) {
  return {
    value: 0,
    interpretation: "Urine Potassium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urineK) === 0) {
  return {
    value: 0,
    interpretation: "Urine Potassium cannot be zero.",
    status: "critical",
  };
}


if (
  values.plasmaK === "" ||
  values.plasmaK === undefined
) {
  return {
    value: 0,
    interpretation: "Plasma Potassium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.plasmaK))
) {
  return {
    value: 0,
    interpretation: "Invalid Plasma Potassium.",
    status: "critical",
  };
}


if (Number(values.plasmaK) < 0) {
  return {
    value: 0,
    interpretation: "Plasma Potassium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.plasmaK) === 0) {
  return {
    value: 0,
    interpretation: "Plasma Potassium cannot be zero.",
    status: "critical",
  };
}


if (
  values.urineOsmolality === "" ||
  values.urineOsmolality === undefined
) {
  return {
    value: 0,
    interpretation: "Urine Osmolality is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urineOsmolality))
) {
  return {
    value: 0,
    interpretation: "Invalid Urine Osmolality.",
    status: "critical",
  };
}


if (Number(values.urineOsmolality) < 0) {
  return {
    value: 0,
    interpretation: "Urine Osmolality cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urineOsmolality) === 0) {
  return {
    value: 0,
    interpretation: "Urine Osmolality cannot be zero.",
    status: "critical",
  };
}


if (
  values.plasmaOsmolality === "" ||
  values.plasmaOsmolality === undefined
) {
  return {
    value: 0,
    interpretation: "Plasma Osmolality is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.plasmaOsmolality))
) {
  return {
    value: 0,
    interpretation: "Invalid Plasma Osmolality.",
    status: "critical",
  };
}


if (Number(values.plasmaOsmolality) < 0) {
  return {
    value: 0,
    interpretation: "Plasma Osmolality cannot be negative.",
    status: "critical",
  };
}


if (Number(values.plasmaOsmolality) === 0) {
  return {
    value: 0,
    interpretation: "Plasma Osmolality cannot be zero.",
    status: "critical",
  };
}



const urineK = Number(values.urineK);
const plasmaK = Number(values.plasmaK);
const urineOsmolality = Number(values.urineOsmolality);
const uosm = urineOsmolality;
const plasmaOsmolality = Number(values.plasmaOsmolality);


  const result =
    (urineK * plasmaOsmolality) / (plasmaK * urineOsmolality);


  
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


else if (result <= 8) {

  interpretation =
    "Impaired K⁺ secretion";

  status =
    "low";

  referenceRange =
  "<8.1";
}


else if (result >= 8 && result <= 12) {

  interpretation =
    "Normal renal K⁺ response";

  status =
    "normal";

  referenceRange =
  "8–12";
}


else if (result >= 12) {

  interpretation =
    "Enhanced K⁺ secretion";

  status =
    "high";

  referenceRange =
  "≥12";
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