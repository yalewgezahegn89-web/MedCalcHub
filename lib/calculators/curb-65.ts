import type { CalculatorDefinition } from "./calculator.types";

export const curb65Calculator: CalculatorDefinition = {
  id: "curb-65",

  slug: "curb-65",

  name: "CURB-65 Score",

  shortName: "curb-65",

  description:
    "CURB-65 severity score for community-acquired pneumonia.",

  category: "Emergency",

  specialty: "Emergency Medicine",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-06",

  keywords: ["Pneumonia", "CURB-65", "Community Acquired Pneumonia", "Emergency", "Respiratory", "Severity"],

  formula:
    "Confusion + Urea > 7 mmol/L + RR ≥ 30/min + SBP < 90 or DBP ≤ 60 mmHg + Age ≥ 65",

  normalRange: "0–5",

  referenceRanges: [],



  clinicalNotes:
    "The CURB-65 score is a validated, five-point severity index for adults with community-acquired pneumonia (CAP). It estimates 30-day mortality risk and helps guide site-of-care decisions: outpatient treatment, hospital admission, or intensive care.\n\nEach of the five criteria scores one point: Confusion (new-onset, defined as recent disorientation to person, place, or time), Urea > 7 mmol/L (approximately > 20 mg/dL), Respiratory rate ≥ 30 breaths/min, Blood pressure (systolic < 90 mmHg or diastolic ≤ 60 mmHg), and Age ≥ 65 years. The total score ranges from 0 to 5.\n\nA score of 0–1 indicates low severity with mortality risk < 2%, and outpatient management is usually appropriate when oxygenation is adequate and follow-up is reliable. A score of 2 indicates moderate severity with approximately 9% 30-day mortality; hospital admission should be strongly considered. A score of ≥ 3 indicates severe disease with mortality risk of 15–40% and warrants urgent hospital assessment and evaluation for ICU-level care.\n\nImportant limitations: CURB-65 does not assess oxygenation, immunocompromise, or multiorgan dysfunction. Hypoxemia (PaO₂ < 60 mmHg or SpO₂ < 92%) or significant clinical instability should prompt a higher level of care regardless of the CURB-65 score. The score should always be used alongside clinical judgment, assessment of comorbidities, functional status, and social circumstances. It is not validated for hospital-acquired pneumonia, ventilator-associated pneumonia, or pediatric patients.",





  comparison: undefined,

  references: [
    "Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.",
    "Lim WS, Baudouin SV, George RC, et al. BTS guidelines for the management of community acquired pneumonia in adults: update 2009. Thorax. 2009;64(Suppl III):iii1-iii55.",
  ],

  relatedCalculators: [],

  inputs: [
  {
    id: "age",
    label: "Age",
    type: "number",
    unit: "years",
    required: true,
  },
  {
    id: "confusion",
    label: "New-Onset Confusion",
    type: "select",
    required: true,
    options: [
      { label: "No", value: "0" },
      { label: "Yes", value: "1" },
    ],
  },
  {
    id: "urea",
    label: "Urea",
    type: "number",
    unit: "mmol/L",
    required: true,
  },
  {
    id: "respiratory-rate",
    label: "Respiratory Rate",
    type: "number",
    unit: "/min",
    required: true,
  },
  {
    id: "sbp",
    label: "Systolic Blood Pressure",
    type: "number",
    unit: "mmHg",
    required: true,
  }
],

  
calculate(
  values: Record<string, string>,
) {


if (
  values.age === "" ||
  values.age === undefined
) {
  return {
    value: 0,
    interpretation: "Age is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.age))
) {
  return {
    value: 0,
    interpretation: "Invalid Age.",
    status: "critical",
  };
}


if (Number(values.age) < 0) {
  return {
    value: 0,
    interpretation: "Age cannot be negative.",
    status: "critical",
  };
}


if (Number(values.age) === 0) {
  return {
    value: 0,
    interpretation: "Age cannot be zero.",
    status: "critical",
  };
}


const confusionRaw = values.confusion;

if (
  confusionRaw === "" ||
  confusionRaw === undefined
) {
  return {
    value: 0,
    interpretation: "New-Onset Confusion is required.",
    status: "critical",
  };
}

const confusion = Number(confusionRaw);

if (
  !Number.isFinite(confusion) ||
  (confusion !== 0 && confusion !== 1)
) {
  return {
    value: 0,
    interpretation: "Invalid New-Onset Confusion.",
    status: "critical",
  };
}


if (
  values.urea === "" ||
  values.urea === undefined
) {
  return {
    value: 0,
    interpretation: "Urea is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.urea))
) {
  return {
    value: 0,
    interpretation: "Invalid Urea.",
    status: "critical",
  };
}


if (Number(values.urea) < 0) {
  return {
    value: 0,
    interpretation: "Urea cannot be negative.",
    status: "critical",
  };
}


if (Number(values.urea) === 0) {
  return {
    value: 0,
    interpretation: "Urea cannot be zero.",
    status: "critical",
  };
}


const respiratoryRateRaw = values["respiratory-rate"];

if (
  respiratoryRateRaw === "" ||
  respiratoryRateRaw === undefined
) {
  return {
    value: 0,
    interpretation: "Respiratory Rate is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(respiratoryRateRaw))
) {
  return {
    value: 0,
    interpretation: "Invalid Respiratory Rate.",
    status: "critical",
  };
}


if (Number(respiratoryRateRaw) < 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be negative.",
    status: "critical",
  };
}


if (Number(respiratoryRateRaw) === 0) {
  return {
    value: 0,
    interpretation: "Respiratory Rate cannot be zero.",
    status: "critical",
  };
}


if (
  values.sbp === "" ||
  values.sbp === undefined
) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure is required.",
    status: "critical",
  };
}


if (
  Number.isNaN(Number(values.sbp))
) {
  return {
    value: 0,
    interpretation: "Invalid Systolic Blood Pressure.",
    status: "critical",
  };
}


if (Number(values.sbp) < 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be negative.",
    status: "critical",
  };
}


if (Number(values.sbp) === 0) {
  return {
    value: 0,
    interpretation: "Systolic Blood Pressure cannot be zero.",
    status: "critical",
  };
}



const age = Number(values.age);
const urea = Number(values.urea);
const respiratoryRate = Number(respiratoryRateRaw);
const sbp = Number(values.sbp);

// CURB-65 criteria (each worth 1 point):
//   - New-onset confusion
//   - Urea > 7 mmol/L
//   - Respiratory rate ≥ 30/min
//   - SBP < 90 mmHg
//   - Age ≥ 65
let score = 0;
if (confusion === 1) score += 1;
if (urea > 7) score += 1;
if (respiratoryRate >= 30) score += 1;
if (sbp < 90) score += 1;
if (age >= 65) score += 1;

const result = Math.min(score, 5);


let interpretation: string;
let status:
  "normal" |
  "low" |
  "high" |
  "critical";

switch (result) {
  case 0:
    interpretation =
      "CURB-65 0 – Low severity. Suitable for outpatient management.";
    status = "normal";
    break;
  case 1:
    interpretation =
      "CURB-65 1 – Low severity. Usually suitable for outpatient management.";
    status = "low";
    break;
  case 2:
    interpretation =
      "CURB-65 2 – Moderate severity. Strongly consider hospital admission.";
    status = "low";
    break;
  default:
    interpretation =
      "CURB-65 ≥ 3 – Severe pneumonia. Consider urgent hospital/ICU admission.";
    status = "high";
    break;
}

const referenceRange =
  "0–5";

const curbWarnings = [
  "CURB-65 estimates pneumonia severity and mortality risk; it does not replace assessment of oxygenation, sepsis physiology, comorbidities, or social circumstances.",
  "Hypoxemia or clinical instability warrants a higher level of care regardless of the score.",
];

let bandAdvice: string;
let bandFollowUp: string[];

if (result <= 1) {
  bandAdvice =
    "Outpatient management may be appropriate when oxygen saturation is acceptable, oral intake is maintained, and follow-up is reliable.";
  bandFollowUp = [
    "Provide clear return precautions for worsening breathlessness, fever, confusion, or inability to maintain intake.",
  ];
} else if (result === 2) {
  bandAdvice =
    "Hospital admission should be strongly considered; weigh oxygenation, comorbidity burden, and social support in the final disposition.";
  bandFollowUp = [
    "Reassess within hours of any treatment decision — failure to improve or new hypoxemia warrants escalation.",
  ];
} else {
  bandAdvice =
    "Severe-pneumonia band: arrange urgent hospital assessment and evaluate for critical-care need alongside standard treatment measures.";
  bandFollowUp = [
    "Monitor respiratory status and systemic signs closely and reassess severity after initial treatment.",
  ];
}

return {
  value:
    Number(result.toFixed(2)),

  interpretation,

  status,

  referenceRange,

  warnings: curbWarnings,

  advice: [bandAdvice],

  followUp: bandFollowUp,
};
},

};