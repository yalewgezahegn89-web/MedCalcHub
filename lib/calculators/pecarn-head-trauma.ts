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

export const pecarnHeadTraumaCalculator: CalculatorDefinition = {
  id: "pecarn-head-trauma",

  slug: "pecarn-head-trauma",

  name: "PECARN Minor Head Trauma Rule",

  shortName: "PECARN",

  description:
    "Risk-stratifies children with minor blunt head trauma for clinically important traumatic brain injury (ciTBI) using the age-specific PECARN decision rule (Kuppermann 2009). Two separate rules apply for children under 2 years and children 2 years and older; the risk of ciTBI is < 0.02–0.05% when none of the rule's predictors are present.",

  category: "Pediatrics",

  specialty: "Pediatrics",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "PECARN",
    "Head Trauma",
    "Traumatic Brain Injury",
    "Head Injury",
    "Minor Head Trauma",
    "CT Head",
    "Pediatric Emergency",
    "Child",
    "Pediatrics",
    "Decision Rule",
    "Scalp Hematoma",
    "Vomiting",
  ],

  formula:
    "Under 2 years: 0 of 6 predictors present (altered mental status, palpable skull fracture, non-frontal scalp hematoma, LOC ≥ 5 s, not acting normally, dangerous mechanism) → very low risk (< 0.02%). Age ≥ 2 years: 0 of 6 predictors present (altered mental status, basilar skull fracture signs, vomiting, severe headache, LOC, dangerous mechanism) → very low risk (< 0.05%).",

  normalRange:
    "A child with NONE of the rule's predictors for their age group has a < 0.02% (under 2 years) or < 0.05% (2 years and older) risk of clinically important traumatic brain injury and does not require CT.",

  referenceRanges: [
    {
      label: "Very low risk",
      range: "0 predictors",
      context: "ciTBI < 0.02% (under 2 y) / < 0.05% (≥ 2 y); CT not indicated",
    },
    {
      label: "Not very low risk",
      range: "1 predictor",
      context: "ciTBI ≈ 0.9%; observation preferred over CT when isolated",
    },
    {
      label: "Higher risk",
      range: "≥ 2 predictors",
      context: "ciTBI risk substantially increased; CT indicated",
    },
  ],

  classification: [
    {
      label: "Very low risk",
      range: "0 predictors",
      min: 0,
      max: 0,
      color: "green",
    },
    {
      label: "Not very low risk",
      range: "1 predictor",
      min: 1,
      max: 1,
      color: "yellow",
    },
    {
      label: "Higher risk",
      range: "≥ 2 predictors",
      min: 2,
      max: 6,
      color: "red",
    },
  ],

  clinicalGuidance: {
    advice: [
      "Apply the rule only to children who have suffered blunt head trauma within the last 24 hours, have GCS 14–15, and had no more than brief (< 1 minute) LOC, if any.",
      "Answer the predictors for the child's age group (under 2 years vs 2 years and older).",
      "The rule predicts clinically important traumatic brain injury (death, intubation > 24 h, neurosurgery, or TBI with hospital admission ≥ 2 nights); it is not a substitute for clinical judgment in high-energy or penetrating mechanisms.",
    ],
    warnings: [
      "Do not apply when the mechanism is high-energy (e.g., polytrauma, ejection), in children with known bleeding disorders or ventriculoperitoneal shunts, or when GCS < 14 — these children are not covered by the very-low-risk conclusion.",
      "In infants under 3 months with a head injury, even a small scalp hematoma confers substantial ciTBI risk; CT is generally recommended for these infants regardless of the rule.",
      "An isolated predictor does not rule out ciTBI; the 'very low risk' conclusion requires ALL predictors to be absent.",
    ],
    followUp: [
      "If no predictor is present, provide head-injury return precautions and discharge.",
      "If one predictor is present, observe for 4–6 hours and reassess; proceed to CT for any deterioration or additional predictors.",
      "If two or more predictors are present, obtain CT per the rule.",
    ],
  },

  clinicalNotes:
    "The PECARN (Pediatric Emergency Care Applied Research Network) rule (Kuppermann 2009) was derived and validated on 42,412 children with minor blunt head trauma (GCS 14–15). For children under 2 years, the six predictors are altered mental status (including GCS < 15), palpable skull fracture, non-frontal scalp hematoma, loss of consciousness ≥ 5 seconds, not acting normally per the parent, and a dangerous mechanism. For children 2 years and older the predictors are altered mental status, signs of basilar skull fracture, vomiting, severe headache, any loss of consciousness, and a dangerous mechanism. Children with none of the predictors have a ciTBI risk below 0.05% and can be managed without CT. A dangerous mechanism is a motor-vehicle crash with ejection, death of another passenger, or rollover; a pedestrian or cyclist (without a helmet) struck by a motorized vehicle; a fall from > 3 feet (under 2 years) or > 5 feet (2 years and older); or a head struck by a high-impact object.",
  evidence: {
    source: "Derivation and validation cohort study (42,412 children)",
    reference:
      "Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
    reviewedBy: "MedCalcHub Clinical Team",
    version: "1.0",
    updatedAt: "2026-08",
    references: [
      "Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
      "Schonfeld D, Fitz BM, Nigrovic LE. Effect of the duration of emergency department observation on computed tomography use in children with minor blunt head trauma. Ann Emerg Med. 2013;62(6):597-603.",
    ],
  },

  faq: [
    {
      question: "What is 'clinically important' TBI in the PECARN rule?",
      answer:
        "Death, the need for neurosurgery, intubation for more than 24 hours, or traumatic brain injury with a hospital stay of 2 or more nights.",
    },
    {
      question: "When is a CT definitely needed?",
      answer:
        "In general, CT is recommended for children with two or more PECARN predictors, any high-risk predictor with substantial clinical concern, or deterioration during observation. Children under 3 months with any scalp hematoma are also generally scanned.",
    },
  ],

  comparison: {
    title: "Pediatric head trauma decision support",
    calculators: [
      {
        name: "Pediatric Glasgow Coma Scale",
        href: "/calculators/pediatric-gcs",
        use: "Quantifying the neurologic status component",
        bestFor: "Scoring consciousness impairment",
      },
      {
        name: "Pediatric Trauma Score (PTS)",
        href: "/calculators/pediatric-trauma-score",
        use: "Whole-body trauma triage",
        bestFor: "Multi-system injury severity",
      },
    ],
  },

  references: [
    "Kuppermann N, Holmes JF, Dayan PS, et al. Identification of children at very low risk of clinically-important brain injuries after head trauma: a prospective cohort study. Lancet. 2009;374(9696):1160-1170.",
    "American College of Emergency Physicians. Clinical policy for children younger than three years presenting to the emergency department with fever. Ann Emerg Med. 2003;42(4):530-545.",
  ],

  relatedCalculators: ["pediatric-gcs", "pediatric-trauma-score", "gcs"],

  inputs: [
    {
      id: "ageGroup",
      label: "Age Group",
      type: "select",
      required: true,
      options: [
        { label: "Under 2 years (< 2 y)", value: "under-2" },
        { label: "2 years and older (≥ 2 y)", value: "two-and-older" },
      ],
      defaultValue: "under-2",
    },
    {
      id: "u2AlteredMentation",
      label: "Altered Mental Status or GCS < 15 (under 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Any agitation, sleepiness, slow response, or GCS < 15.",
    },
    {
      id: "u2PalpableSkullFracture",
      label: "Palpable Skull Fracture (under 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "u2ScalpHematoma",
      label: "Non-Frontal Scalp Hematoma (under 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Any scalp hematoma other than a frontal location.",
    },
    {
      id: "u2Loc5Seconds",
      label: "Loss of Consciousness ≥ 5 Seconds (under 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "u2NotActingNormal",
      label: "Not Acting Normally per Parent (under 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "p2AlteredMentation",
      label: "Altered Mental Status or GCS < 15 (≥ 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "p2BasilarSkullFracture",
      label: "Signs of Basilar Skull Fracture (≥ 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "Hemotympanum, raccoon eyes, Battle sign, CSF otorrhea/rhinorrhea.",
    },
    {
      id: "p2Vomiting",
      label: "Vomiting (≥ 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText: "One or more episodes of vomiting.",
    },
    {
      id: "p2SevereHeadache",
      label: "Severe Headache (≥ 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "p2LossOfConsciousness",
      label: "Loss of Consciousness (≥ 2 y)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "dangerousMechanism",
      label: "Dangerous Mechanism",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
      helpText:
        "MVC with ejection, death of another passenger, or rollover; pedestrian/cyclist (no helmet) struck by a motorized vehicle; fall from > 3 ft (< 2 y) or > 5 ft (≥ 2 y); head struck by a high-impact object.",
    },
  ],

  calculate(values: Record<string, string>) {
    const ageGroup = stringSelect(values, "ageGroup", "Age group", ["under-2", "two-and-older"]);
    if ("err" in ageGroup) return critical(ageGroup.err);

    const under2 = ageGroup.s === "under-2";

    const predictorIds = under2
      ? [
          "u2AlteredMentation",
          "u2PalpableSkullFracture",
          "u2ScalpHematoma",
          "u2Loc5Seconds",
          "u2NotActingNormal",
          "dangerousMechanism",
        ]
      : [
          "p2AlteredMentation",
          "p2BasilarSkullFracture",
          "p2Vomiting",
          "p2SevereHeadache",
          "p2LossOfConsciousness",
          "dangerousMechanism",
        ];

    let present = 0;
    for (const id of predictorIds) {
      const opt = yesNo(values, id, "Predictor");
      if ("err" in opt) return critical(opt.err);
      if (opt.n === 1) present += 1;
    }

    const groupLabel = under2 ? "under 2 years" : "2 years and older";
    const veryLowThreshold = under2 ? "0.02%" : "0.05%";

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (present === 0) {
      interpretation =
        `PECARN (${groupLabel}) — VERY LOW RISK. ` +
        `None of the 6 predictors are present; the risk of clinically important traumatic brain injury is < ${veryLowThreshold}. CT is not indicated; provide return precautions.`;
      status = "normal";
      referenceRange = "0 predictors";
    } else if (present === 1) {
      interpretation =
        `PECARN (${groupLabel}) — NOT VERY LOW RISK (1 predictor). ` +
        "The risk of clinically important traumatic brain injury is approximately 0.9%. Observation for 4–6 hours is generally preferred over immediate CT when only one predictor is present; obtain CT for any deterioration.";
      status = "high";
      referenceRange = "1 predictor";
    } else {
      interpretation =
        `PECARN (${groupLabel}) — HIGHER RISK (${present} predictors). ` +
        "The risk of clinically important traumatic brain injury is substantially increased; CT imaging of the head is indicated.";
      status = "critical";
      referenceRange = "≥ 2 predictors";
    }

    return {
      value: present,
      unit: "predictors present",
      interpretation,
      status,
      referenceRange,
      score: present,
    };
  },
};
