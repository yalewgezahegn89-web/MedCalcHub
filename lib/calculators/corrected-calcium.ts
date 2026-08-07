import type { CalculatorDefinition } from "./calculator.types";

export const correctedCalciumCalculator: CalculatorDefinition = {
  id: "corrected-calcium",

  slug: "corrected-calcium",

  name: "corrected-calcium",

  shortName: "corrected-calcium",

  description:
<<<<<<< HEAD
    "Calculates corrected serum calcium based on albumin concentration.",
=======
    "Calculates corrected total serum calcium adjusted for hypoalbuminemia. In hypoalbuminemia, measured total calcium is falsely low because less calcium is protein-bound; this correction estimates the physiologically active total calcium.",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  category: "Laboratory",

  specialty: "Internal Medicine",

  featured: false,

  version: "1.0",

<<<<<<< HEAD
  updatedAt: "2026-08-05",

  keywords: [],

  formula: "Corrected Calcium = Measured Calcium + 0.8 × (4 − Albumin)",
=======
  updatedAt: "2026-08-06",

  keywords: [],

  formula: "Corrected Calcium = calcium + 0.8 * (4 - albumin)",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  normalRange: "8.5–10.5 mg/dL",

  referenceRanges: [
  {
<<<<<<< HEAD
    label: "Severe hypocalcemia",
    range: "<7",
  },
  {
    label: "Hypocalcemia",
    range: "7–8.4",
  },
  {
    label: "Normal",
=======
    label: "Hypocalcemia",
    range: "<8.5",
  },
  {
    label: "Normal corrected calcium",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
    range: "8.5–10.5",
  },
  {
    label: "Hypercalcemia",
<<<<<<< HEAD
    range: "10.6–12",
  },
  {
    label: "Severe hypercalcemia",
    range: "≥12.1",
=======
    range: "≥10.6",
  },
  {
    label: "Severe hypercalcemia",
    range: "≥12.5",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
  }
],

  clinicalGuidance: {
<<<<<<< HEAD
    advice: [
      "Corrected calcium adjusts for the effect of albumin on total calcium measurement.",
      "This correction is essential when albumin is low, as total calcium may appear falsely normal."
    ],
    warnings: [
      "This correction assumes albumin of 4.0 g/dL as normal. It may not be accurate in hypoalbuminemia due to other causes.",
      "Ionized calcium measurement is preferred when available and is not affected by albumin."
    ],
    followUp: [
      "If corrected calcium is abnormal, check ionized calcium and PTH levels.",
      "Consider vitamin D deficiency, malignancy, or primary hyperparathyroidism as causes."
    ],
=======
    advice: ["Use this correction when serum albumin is low (e.g. nephrotic syndrome, liver disease, malnutrition) and the measured total calcium appears falsely normal or low.","The corrected calcium is an estimate; ionized (free) calcium measurement is the gold standard when available.","This formula assumes albumin is 4.0 g/dL as normal; results become less reliable when albumin is < 2.0 g/dL."],
    warnings: ["This correction is not validated for hypercalcemia—ionized calcium is preferred in that setting.","Does not account for changes in serum pH, which also affect calcium binding to albumin.","The factor 0.8 may not apply across all patient populations; some institutions use 0.7 or 0.73."],
    followUp: ["If corrected calcium is abnormal, confirm with ionized calcium measurement.","Evaluate for underlying causes: hypoalbuminemia, hyperparathyroidism, vitamin D deficiency, malignancy.","In critically ill patients, measure ionized calcium directly rather than relying on correction."],
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
  },

  clinicalNotes:
    "Interpret results together with the patient's clinical presentation.",
<<<<<<< HEAD

  references: [
    "MedCalcHub Clinical References",
  ],

  faq: [
    {
      "question": "Why correct calcium for albumin?",
      "answer": "About 40% of serum calcium is bound to albumin. When albumin is low (e.g., in liver disease, nephrotic syndrome, malnutrition), total calcium appears falsely low. Corrected calcium estimates what the total calcium would be with a normal albumin."
    },
    {
      "question": "What is the corrected calcium formula?",
      "answer": "Corrected Calcium = Measured Calcium + 0.8 × (4.0 − Measured Albumin). This assumes 4.0 g/dL is normal albumin."
    }
  ],

  comparison: {
    "title": "Calcium and Electrolyte Calculators",
    "calculators": [
      {
        "name": "Anion Gap",
        "href": "/calculators/anion-gap",
        "use": "Metabolic acidosis evaluation"
      },
      {
        "name": "Calcium-Phosphate Product",
        "href": "/calculators/calcium-phosphate-product",
        "use": "Calcification risk"
      }
    ]
  },

  clinical: {
    "advice": [
      "Corrected calcium adjusts for the effect of albumin on total calcium measurement.",
      "This correction is essential when albumin is low, as total calcium may appear falsely normal."
    ],
    "warnings": [
      "This correction assumes albumin of 4.0 g/dL as normal. It may not be accurate in hypoalbuminemia due to other causes.",
      "Ionized calcium measurement is preferred when available and is not affected by albumin."
    ],
    "followUp": [
      "If corrected calcium is abnormal, check ionized calcium and PTH levels.",
      "Consider vitamin D deficiency, malignancy, or primary hyperparathyroidism as causes."
    ]
  },

  evidence: {
    "source": "Clinical Guidelines",
    "reference": "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990.",
    "references": [
      "Payne RB, et al. Corrected calcium and corrected albumin. Ann Clin Biochem. 1990;27:497-503.",
      "Labriola L, et al. New formula for correcting total calcium for albumin. Nephrol Dial Transplant. 2007."
    ]
  },

  relatedCalculators: [
    "anion-gap",
    "calcium-phosphate-product"
=======

  evidence: {"source":"NACB / Lab Medicine","reference":"Pay DA, et al. Corrected calcium in hypercalcaemia and hypocalcaemia. Ann Clin Biochem. 2004;41:486–488.","reviewedBy":"MedCalcHub Clinical Team","version":"1.0","updatedAt":"2026-08","references":["Pay DA, et al. Ann Clin Biochem. 2004;41:486–488.","NACB Guidelines on Calcium and Phosphate Measurement.","KDIGO CKD-MBD Guideline. Kidney Int Suppl. 2017."]},

  faq: [{"question":"Why correct calcium for albumin?","answer":"About 40–50% of serum calcium is bound to albumin. When albumin is low (e.g. liver disease, nephrotic syndrome), total calcium appears falsely low even though ionized (biologically active) calcium may be normal. The correction factor estimates what total calcium would be at a normal albumin of 4.0 g/dL."},{"question":"What does a corrected calcium above normal mean?","answer":"A corrected calcium > 10.5 mg/dL suggests true hypercalcemia. Common causes include primary hyperparathyroidism, malignancy, vitamin D toxicity, and granulomatous disease. Confirm with ionized calcium and investigate accordingly."},{"question":"Is ionized calcium better than corrected calcium?","answer":"Yes. Ionized (free) calcium directly measures the physiologically active fraction and is not affected by albumin. It is the preferred test, but the correction is useful when ionized calcium measurement is unavailable."},{"question":"Can this formula be used in children?","answer":"The formula is validated in adults. Neonatal and paediatric reference ranges and correction factors differ; consult local guidelines for those populations."}],

  comparison: {"title":"Related Calcium / Mineral Metabolism Calculators","calculators":[{"name":"Corrected Calcium","href":"/calculators/corrected-calcium","bestFor":"Correcting total calcium in hypoalbuminemia.","limitation":"Does not replace ionized calcium measurement."},{"name":"Calcium-Phosphate Product","href":"/calculators/calcium-phosphate-product","bestFor":"Assessing vascular calcification risk in CKD.","limitation":"Does not assess albumin or calcium correction."},{"name":"Albumin-to-Creatinine Ratio","href":"/calculators/albumin-creatinine-ratio","bestFor":"CKD screening and staging.","limitation":"Assesses albuminuria, not serum calcium status."}]},

  references: [
    "MedCalcHub Clinical References",
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
  ],

  relatedCalculators: ["calcium-phosphate-product","albumin-creatinine-ratio","ckd-epi-2021","anion-gap"],

  inputs: [
  {
    id: "calcium",
    label: "Measured Calcium",
    type: "number",
    unit: "mg/dL",
    required: true,
  },
  {
    id: "albumin",
    label: "Albumin",
    type: "number",
    unit: "g/dL",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


<<<<<<< HEAD

for (
  const key of Object.keys(values)
) {

  const inputValue =
    Number(values[key]);


  if (
    values[key] === "" ||
    values[key] === undefined
  ) {

    return {

      value: 0,

      interpretation:
        "Required input missing.",

      status:
        "critical",

    };

  }


  if (
    Number.isNaN(inputValue)
  ) {

    return {

      value: 0,

      interpretation:
        "Invalid numeric input.",

      status:
        "critical",

    };

  }


  if (
    inputValue < 0
  ) {

    return {

      value: 0,

      interpretation:
        "Negative values are not allowed.",

      status:
        "critical",

    };

  }

=======
if (
  values.calcium === "" ||
  values.calcium === undefined
) {
  return {
    value: 0,
    interpretation: "Measured Calcium is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.calcium))
) {
  return {
    value: 0,
    interpretation: "Invalid Measured Calcium.",
    status: "critical",
  };
}


if (Number(values.calcium) < 0) {
  return {
    value: 0,
    interpretation: "Measured Calcium cannot be negative.",
    status: "critical",
  };
}


if (Number(values.calcium) === 0) {
  return {
    value: 0,
    interpretation: "Measured Calcium cannot be zero.",
    status: "critical",
  };
}


if (
  values.albumin === "" ||
  values.albumin === undefined
) {
  return {
    value: 0,
    interpretation: "Albumin is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.albumin))
) {
  return {
    value: 0,
    interpretation: "Invalid Albumin.",
    status: "critical",
  };
}


if (Number(values.albumin) < 0) {
  return {
    value: 0,
    interpretation: "Albumin cannot be negative.",
    status: "critical",
  };
}


if (Number(values.albumin) === 0) {
  return {
    value: 0,
    interpretation: "Albumin cannot be zero.",
    status: "critical",
  };
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
}



<<<<<<< HEAD


const calcium =
    Number(values.calcium);

const albumin =
    Number(values.albumin);
=======
const calcium = Number(values.calcium);
const ca = calcium;
const albumin = Number(values.albumin);
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1


  const result =
    calcium + 0.8 * (4 - albumin);


  
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


<<<<<<< HEAD
else if (result <= 6.9) {

  interpretation =
    "Severe hypocalcemia";

  status =
    "critical";

  referenceRange =
  "<7";
}


else if (result >= 7 && result <= 8.4) {
=======
else if (result <= 8.4) {
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  interpretation =
    "Hypocalcemia";

  status =
    "low";

  referenceRange =
<<<<<<< HEAD
  "7–8.4";
=======
  "<8.5";
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
}


else if (result >= 8.5 && result <= 10.5) {

  interpretation =
<<<<<<< HEAD
    "Normal";
=======
    "Normal corrected calcium";
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  status =
    "normal";

  referenceRange =
  "8.5–10.5";
}


<<<<<<< HEAD
else if (result >= 10.6 && result <= 12) {
=======
else if (result >= 10.6) {
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  interpretation =
    "Hypercalcemia";

  status =
    "high";

  referenceRange =
<<<<<<< HEAD
  "10.6–12";
}


else if (result >= 12.1) {
=======
  "≥10.6";
}


else if (result >= 12.5) {
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1

  interpretation =
    "Severe hypercalcemia";

  status =
    "critical";

  referenceRange =
<<<<<<< HEAD
  "≥12.1";
=======
  "≥12.5";
>>>>>>> 8e2d77b7cde955a3de55276349fde49d9b1cd2c1
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