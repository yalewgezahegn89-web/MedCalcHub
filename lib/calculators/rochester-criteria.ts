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
  opts: { nonNegative?: boolean; positive?: boolean; max?: number } = {},
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  const n = Number(v);
  if (!Number.isFinite(n)) return { err: `Invalid ${label}.` };
  if (opts.nonNegative && n < 0) return { err: `${label} must be a non-negative number.` };
  if (opts.positive && n <= 0) return { err: `${label} must be a positive number.` };
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

function yesNo(values: Record<string, string>, id: string, label: string): NumOrErr {
  const sel = stringSelect(values, id, label, ["no", "yes"]);
  if ("err" in sel) return sel;
  return { n: sel.s === "yes" ? 1 : 0 };
}

export const rochesterCriteriaCalculator: CalculatorDefinition = {
  id: "rochester-criteria",

  slug: "rochester-criteria",

  name: "Rochester Criteria (Febrile Infant)",

  shortName: "Rochester",

  description:
    "Risk-stratifies febrile infants aged 0–60 days for serious bacterial infection (SBI) using the Rochester criteria (Jaskiewicz 1994). An infant who meets all seven criteria is considered LOW RISK and can be managed with careful outpatient follow-up; failure to meet any criterion warrants a full sepsis evaluation and admission.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Rochester Criteria",
    "Febrile Infant",
    "Fever",
    "Serious Bacterial Infection",
    "Sepsis",
    "Neonatal Sepsis",
    "UTI",
    "Bacteremia",
    "Child",
    "Pediatrics",
    "Risk Stratification",
  ],

  formula:
    "Low risk requires ALL seven criteria: term (≥ 37 weeks), previously healthy, non-toxic appearance, no focal bacterial infection, WBC 5,000–15,000/µL, urinalysis < 10 WBC/HPF, and (if diarrhea) stool < 5 WBC/HPF. Count = number of criteria met (0–7).",

  normalRange:
    "7/7 criteria met = LOW RISK (serious bacterial infection < 1–2% in this subset); fewer than 7/7 = NOT LOW RISK (full sepsis evaluation and empiric antibiotics typically indicated).",

  referenceRanges: [
    {
      label: "Low risk",
      range: "7 of 7 criteria",
      context: "Term, previously healthy, non-toxic, no focal infection, WBC 5–15k, UA < 10 WBC/HPF, stool < 5 WBC/HPF if diarrhea",
    },
    {
      label: "Not low risk",
      range: "0–6 of 7 criteria",
      context: "Full sepsis workup, empiric antibiotics, and admission",
    },
  ],

  classification: [
    {
      label: "Low risk",
      range: "7 of 7 criteria",
      min: 7,
      max: 7,
      color: "green",
    },
    {
      label: "Not low risk",
      range: "0–6 of 7 criteria",
      min: 0,
      max: 6,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Rochester criteria (Jaskiewicz 1994, based on the original Rochester, NY strategy of Dagan et al.) identify febrile infants 0–60 days at LOW risk of serious bacterial infection (SBI): term gestation ≥ 37 weeks, previously healthy, non-toxic clinical appearance, no focal bacterial infection on examination, WBC 5,000–15,000/µL, urinalysis with < 10 WBC/HPF (or negative screen), and stool with < 5 WBC/HPF when diarrhea is present. Infants meeting all criteria historically had an SBI risk of < 1–2% and could be managed as outpatients with cultures and close follow-up; infants failing any criterion require a full sepsis evaluation. The tool is an adjunct to — not a replacement for — contemporary clinical reassessment and guideline-based management of the febrile neonate.",




  comparison: {
    title: "Febrile infant risk tools",
    calculators: [
      {
        name: "PECARN Minor Head Trauma Rule",
        href: "/calculators/pecarn-head-trauma",
        use: "Head-injury risk stratification",
        bestFor: "CT decision-making after head trauma",
      },
      {
        name: "SIRS Criteria",
        href: "/calculators/sirs-criteria",
        use: "Systemic inflammatory response screening",
        bestFor: "Recognizing systemic inflammation in older children and adults",
      },
    ],
  },

  references: [
    "Jaskiewicz JA, McCarthy CA, Richardson AC, et al. Febrile infants at low risk for serious bacterial infection — an appraisal of the Rochester criteria and implications for management. Pediatrics. 1994;94(3):390-396.",
    "Dagan R, Powell KR, Hall CB, Menegus MA. Identification of infants unlikely to have serious bacterial infection although hospitalized for suspected sepsis. J Pediatr. 1985;107(6):855-860.",
    "Pantell RH, Roberts KB, Adams WG, et al. Evaluation and management of well-appearing febrile infants 8 to 60 days old. Pediatrics. 2021;148(2):e2021052228.",
  ],

  relatedCalculators: ["sirs-criteria", "peds-pews"],

  inputs: [
    {
      id: "ageDays",
      label: "Age (Days)",
      type: "number",
      required: true,
      unit: "days",
      min: 0,
      max: 60,
      step: 1,
      helpText: "The Rochester criteria apply to febrile infants aged 0–60 days.",
    },
    {
      id: "termGestation",
      label: "Term Gestation (≥ 37 weeks)",
      type: "select",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: "previouslyHealthy",
      label: "Previously Healthy",
      type: "select",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      helpText: "No perinatal complications, chronic illness, or prolonged hospitalization.",
    },
    {
      id: "nontoxic",
      label: "Non-Toxic Clinical Appearance",
      type: "select",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: "focalInfection",
      label: "Focal Bacterial Infection Present",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      helpText: "Ear, soft tissue, bone/joint, or urinary tract infection on examination.",
    },
    {
      id: "wbc",
      label: "White Blood Cell Count",
      type: "number",
      required: true,
      unit: "/µL",
      min: 1,
      step: 1,
      helpText: "Reference range for the criteria: 5,000–15,000/µL.",
    },
    {
      id: "urinalysisWbc",
      label: "Urinalysis WBC",
      type: "number",
      required: true,
      unit: "/HPF",
      min: 0,
      step: 1,
      helpText: "Criteria require < 10 WBC per high-power field.",
    },
    {
      id: "diarrhea",
      label: "Diarrhea Present",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
    {
      id: "stoolWbc",
      label: "Stool WBC (if diarrhea)",
      type: "number",
      required: true,
      unit: "/HPF",
      min: 0,
      step: 1,
      helpText: "Criteria require < 5 WBC per high-power field when diarrhea is present.",
    },
  ],

  calculate(values: Record<string, string>) {
    const ageDays = number(values, "ageDays", "Age", { nonNegative: true, max: 60 });
    if ("err" in ageDays) return critical(ageDays.err);

    const wbc = number(values, "wbc", "White blood cell count", { positive: true });
    if ("err" in wbc) return critical(wbc.err);
    const urinalysisWbc = number(values, "urinalysisWbc", "Urinalysis WBC", { nonNegative: true });
    if ("err" in urinalysisWbc) return critical(urinalysisWbc.err);
    const stoolWbc = number(values, "stoolWbc", "Stool WBC", { nonNegative: true });
    if ("err" in stoolWbc) return critical(stoolWbc.err);

    const term = yesNo(values, "termGestation", "Term gestation");
    if ("err" in term) return critical(term.err);
    const previouslyHealthy = yesNo(values, "previouslyHealthy", "Previously healthy");
    if ("err" in previouslyHealthy) return critical(previouslyHealthy.err);
    const nontoxic = yesNo(values, "nontoxic", "Non-toxic appearance");
    if ("err" in nontoxic) return critical(nontoxic.err);
    const focalInfection = yesNo(values, "focalInfection", "Focal infection");
    if ("err" in focalInfection) return critical(focalInfection.err);
    const diarrhea = yesNo(values, "diarrhea", "Diarrhea");
    if ("err" in diarrhea) return critical(diarrhea.err);

    if (ageDays.n > 60) {
      return critical(
        `Age ${ageDays.n} days is outside the Rochester criteria population (0–60 days). ` +
          "This tool applies to febrile infants 0–60 days of age; manage the infant per institutional neonatal fever guidelines.",
      );
    }

    const criteriaMet: boolean[] = [
      term.n === 1,
      previouslyHealthy.n === 1,
      nontoxic.n === 1,
      focalInfection.n === 0,
      wbc.n >= 5000 && wbc.n <= 15000,
      urinalysisWbc.n < 10,
      diarrhea.n === 0 ? true : stoolWbc.n < 5,
    ];

    const met = criteriaMet.filter(Boolean).length;

    let interpretation: string;
    let status: "normal" | "high";

    if (met === 7) {
      interpretation =
        "Rochester criteria — LOW RISK (7/7 criteria met). " +
        "This febrile infant meets all Rochester low-risk criteria; the risk of serious bacterial infection is low. Obtain blood and urine cultures, arrange close follow-up within 24 hours, and provide strict return precautions.";
      status = "normal";
    } else {
      const unmetLabels = [
        "term gestation ≥ 37 weeks",
        "previously healthy",
        "non-toxic appearance",
        "no focal bacterial infection",
        "WBC 5,000–15,000/µL",
        "urinalysis < 10 WBC/HPF",
        "stool < 5 WBC/HPF if diarrhea",
      ].filter((_, i) => !criteriaMet[i]);
      interpretation =
        `Rochester criteria — NOT LOW RISK (${met}/7 criteria met). ` +
        `Unmet criterion/criteria: ${unmetLabels.join("; ")}. A full sepsis evaluation, empiric antibiotics, and admission are typically indicated.`;
      status = "high";
    }

    return {
      value: met,
      unit: "/7 criteria",
      interpretation,
      status,
      score: met,
    };
  },
};
