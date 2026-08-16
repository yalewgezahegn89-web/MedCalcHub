import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };
type StrOrErr = { s: string } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
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

export const gorelickDehydrationCalculator: CalculatorDefinition = {
  id: "gorelick-dehydration",

  slug: "gorelick-dehydration",

  name: "Gorelick Dehydration Scale",

  shortName: "Gorelick",

  description:
    "Predicts clinically important dehydration (≥ 5% body weight) in children with gastroenteritis using the validated 4-item Gorelick scale: capillary refill > 2 seconds, dry mucous membranes, absent tears, and ill/toxic appearance. Three or more of four findings predicts ≥ 5% dehydration.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Gorelick Dehydration",
    "Dehydration",
    "Gastroenteritis",
    "Diarrhea",
    "Vomiting",
    "Capillary Refill",
    "Dry Mucous Membranes",
    "Tears",
    "Child",
    "Pediatrics",
    "Rehydration",
  ],

  formula:
    "Dehydration score = capillary refill > 2 s + dry mucous membranes + absent tears + ill appearance (each present = 1) → total 0–4. ≥ 3 of 4 predicts ≥ 5% dehydration.",

  normalRange:
    "0–2 findings = estimated < 5% dehydration (mild); ≥ 3 findings = estimated ≥ 5% dehydration (moderate-to-severe, likely to need intravenous rehydration).",

  referenceRanges: [
    {
      label: "Mild (< 5%)",
      range: "0–2 of 4",
      context: "Oral rehydration generally sufficient",
    },
    {
      label: "Moderate-to-severe (≥ 5%)",
      range: "3–4 of 4",
      context: "Intravenous rehydration typically indicated",
    },
  ],

  classification: [
    {
      label: "Mild",
      range: "0–2 of 4",
      min: 0,
      max: 2,
      color: "green",
    },
    {
      label: "Moderate-to-severe",
      range: "3–4 of 4",
      min: 3,
      max: 4,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Evaluate capillary refill, mucous membranes, tears, and overall appearance in a calm, cooperative child.",
      "The 4-item scale was derived for children with gastroenteritis and is most accurate at the extremes — 0–2 findings argues against, and ≥ 3 findings argues for, significant dehydration.",
      "Use the result together with objective measures such as post-illness weight change, urine output, and vital signs.",
    ],
    warnings: [
      "None of the individual findings, or the score alone, is perfectly accurate — combine the score with clinical judgment.",
      "Fever, ambient temperature, and inter-observer variation affect capillary refill and tears.",
      "Do not delay emergent resuscitation in a shocked or markedly lethargic child to complete the scoring.",
    ],
    followUp: [
      "For ≥ 5% dehydration, plan intravenous or nasogastric rehydration and treat the cause (e.g., rehydration per WHO Plan B/C).",
      "Weigh the child and re-examine after rehydration to confirm the actual weight-based fluid deficit.",
    ],
  },

  clinicalNotes:
    "The Gorelick dehydration scale (1997) was derived from a cohort of children with acute gastroenteritis to predict dehydration ≥ 5% of body weight using bedside clinical signs. A 4-item model (capillary refill > 2 seconds, dry mucous membranes, absent tears, ill/toxic appearance) predicted ≥ 5% dehydration with a sensitivity of approximately 0.84 and a specificity of approximately 0.86 when 3 or more findings were present. It is a rapid, practical screening tool for rehydration decisions in emergency and outpatient pediatrics.",
  evidence: {
    source: "Original derivation/validation study",
    reference:
      "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
      "World Health Organization. The Treatment of Diarrhoea: A Manual for Physicians and Other Senior Health Workers. 4th rev. Geneva: WHO; 2005.",
    ],
  },

  faq: [
    {
      question: "How many positive signs mean significant dehydration?",
      answer:
        "Three or more of the four signs (prolonged capillary refill, dry mucous membranes, absent tears, ill appearance) predict ≥ 5% dehydration, which usually warrants intravenous rehydration.",
    },
    {
      question: "Can a child with 2 signs still be dehydrated?",
      answer:
        "Yes — the scale is a screening tool, not a perfect test. Weigh the child, track urine output, and combine the score with clinical judgment.",
    },
  ],

  comparison: {
    title: "Pediatric rehydration decision support",
    calculators: [
      {
        name: "Maintenance Fluids",
        href: "/calculators/maintenance-fluids",
        use: "Calculating baseline maintenance fluid rates",
        bestFor: "4-2-1 maintenance fluid planning",
      },
      {
        name: "Fluid Requirement",
        href: "/calculators/fluid-requirement",
        use: "Estimating total fluid needs",
        bestFor: "Daily fluid volume planning",
      },
    ],
  },

  references: [
    "Gorelick MH, Shaw KN, Murphy KO. Validity and reliability of clinical signs in the diagnosis of dehydration in children. Pediatrics. 1997;99(5):E6.",
    "World Health Organization. The Treatment of Diarrhoea: A Manual for Physicians and Other Senior Health Workers. 4th rev. Geneva: WHO; 2005.",
  ],

  relatedCalculators: ["maintenance-fluids", "fluid-requirement", "rochester-criteria"],

  inputs: [
    {
      id: "capillaryRefill",
      label: "Capillary Refill > 2 Seconds",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "dryMucousMembranes",
      label: "Dry Mucous Membranes",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "absentTears",
      label: "Absent Tears",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "illAppearance",
      label: "Ill / Toxic Appearance",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
  ],

  calculate(values: Record<string, string>) {
    const signs: { id: string; label: string }[] = [
      { id: "capillaryRefill", label: "capillary refill > 2 seconds" },
      { id: "dryMucousMembranes", label: "dry mucous membranes" },
      { id: "absentTears", label: "absent tears" },
      { id: "illAppearance", label: "ill/toxic appearance" },
    ];

    let present = 0;
    const presentSigns: string[] = [];
    for (const sign of signs) {
      const opt = yesNo(values, sign.id, sign.label);
      if ("err" in opt) return critical(opt.err);
      if (opt.n === 1) {
        present += 1;
        presentSigns.push(sign.label);
      }
    }

    let interpretation: string;
    let status: "normal" | "high";

    if (present >= 3) {
      interpretation =
        `Gorelick dehydration scale — ${present} of 4 findings present. ` +
        "This predicts clinically important dehydration (≥ 5% of body weight); intravenous or aggressive oral rehydration is typically indicated, with weight and clinical reassessment.";
      status = "high";
    } else {
      interpretation =
        `Gorelick dehydration scale — ${present} of 4 findings present. ` +
        "This argues against clinically important (≥ 5%) dehydration; oral rehydration and reassessment are generally appropriate.";
      status = "normal";
    }

    return {
      value: present,
      unit: "/4 findings",
      interpretation,
      status,
      score: present,
      advice: presentSigns.length > 0 ? [`Present findings: ${presentSigns.join("; ")}.`] : [],
    };
  },
};
