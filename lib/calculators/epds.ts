import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function selectOption(
  values: Record<string, string>,
  id: string,
  label: string,
  allowed: string[],
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (!allowed.includes(v)) return { err: `Invalid ${label} selection.` };
  return { n: Number(v) };
}

export const epdsCalculator: CalculatorDefinition = {
  id: "epds",

  slug: "epds",

  name: "Edinburgh Postnatal Depression Scale (EPDS)",

  shortName: "EPDS",

  description:
    "Screens for postpartum (and antenatal) depression using the 10-item Edinburgh Postnatal Depression Scale (Cox 1987). Each item is scored 0–3 for a total of 0–30. A total ≥ 10 (or ≥ 13 in some settings) is screen-positive, and any positive response on item 10 (self-harm) requires immediate evaluation.",
  category: "Obstetrics & Gynecology",

  specialty: "Obstetrics",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Edinburgh Postnatal Depression Scale",
    "EPDS",
    "Postpartum Depression",
    "Postnatal Depression",
    "Depression Screening",
    "Self-Harm",
    "Perinatal Mental Health",
    "Cox",
    "Obstetrics",
  ],

  formula:
    "EPDS = sum of 10 items, each scored 0–3 (total 0–30); screen-positive ≥ 10 (some settings ≥ 13)",

  normalRange:
    "0–30; a total ≥ 10 is commonly used as the screening cutoff (some settings use ≥ 13 for higher specificity). Any positive response on item 10 warrants urgent assessment.",

  referenceRanges: [
    {
      label: "Screen negative",
      range: "0–9",
      context: "repeat at routine intervals",
    },
    {
      label: "Screen positive",
      range: "10–30",
      context: "possible depression; full assessment",
    },
  ],

  classification: [
    {
      label: "Screen negative",
      range: "0–9",
      min: 0,
      max: 9,
      color: "green",
    },
    {
      label: "Screen positive",
      range: "10–30",
      min: 10,
      color: "yellow",
    },
  ],



  clinicalNotes:
    "The Edinburgh Postnatal Depression Scale (Cox, Holden & Sagovsky 1987) is a 10-item self-report instrument validated in both antenatal and postnatal settings. Each item is scored 0–3 (total 0–30). A threshold of ≥ 10 is widely used for screening; item 10 addresses thoughts of self-harm and any positive response mandates urgent assessment. This calculator sums the 10 selected item scores.",




  comparison: undefined,

  references: [
    "Cox JL, et al. Br J Psychiatry. 1987;150:782-786.",
    "ACOG Committee Opinion No. 757. Obstet Gynecol. 2018;132(5):e208-e212.",
  ],

  relatedCalculators: [
    "gestational-weight-gain",
    "gestational-age",
    "biophysical-profile",
  ],

  inputs: [
    {
      id: "item1",
      label: "1. I have been able to laugh and see the funny side of things",
      type: "select",
      required: true,
      options: [
        { label: "As much as I always could (0)", value: "0" },
        { label: "Not quite so much now (1)", value: "1" },
        { label: "Definitely not so much (2)", value: "2" },
        { label: "Not at all (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item2",
      label: "2. I have looked forward with enjoyment to things",
      type: "select",
      required: true,
      options: [
        { label: "As much as I ever did (0)", value: "0" },
        { label: "Rather less than I used to (1)", value: "1" },
        { label: "Definitely less than I used to (2)", value: "2" },
        { label: "Hardly at all (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item3",
      label: "3. I have blamed myself unnecessarily when things went wrong",
      type: "select",
      required: true,
      options: [
        { label: "No, never (0)", value: "0" },
        { label: "Hardly ever (1)", value: "1" },
        { label: "Yes, sometimes (2)", value: "2" },
        { label: "Yes, most of the time (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item4",
      label: "4. I have been anxious or worried for no good reason",
      type: "select",
      required: true,
      options: [
        { label: "No, not at all (0)", value: "0" },
        { label: "Hardly ever (1)", value: "1" },
        { label: "Yes, sometimes (2)", value: "2" },
        { label: "Yes, very often (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item5",
      label: "5. I have felt scared or panicky for no very good reason",
      type: "select",
      required: true,
      options: [
        { label: "No, not at all (0)", value: "0" },
        { label: "No, not much (1)", value: "1" },
        { label: "Yes, sometimes (2)", value: "2" },
        { label: "Yes, quite a lot (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item6",
      label: "6. Things have been getting on top of me",
      type: "select",
      required: true,
      options: [
        { label: "No, I have been coping as well as ever (0)", value: "0" },
        { label: "No, most of the time I have coped quite well (1)", value: "1" },
        { label: "Yes, sometimes I have not been coping as well as usual (2)", value: "2" },
        { label: "Yes, most of the time I have not been able to cope at all (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item7",
      label: "7. I have been so unhappy that I have had difficulty sleeping",
      type: "select",
      required: true,
      options: [
        { label: "No, not at all (0)", value: "0" },
        { label: "Not very often (1)", value: "1" },
        { label: "Yes, sometimes (2)", value: "2" },
        { label: "Yes, most of the time (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item8",
      label: "8. I have felt sad or miserable",
      type: "select",
      required: true,
      options: [
        { label: "No, not at all (0)", value: "0" },
        { label: "Not very often (1)", value: "1" },
        { label: "Yes, quite often (2)", value: "2" },
        { label: "Yes, most of the time (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item9",
      label: "9. I have been so unhappy that I have been crying",
      type: "select",
      required: true,
      options: [
        { label: "No, never (0)", value: "0" },
        { label: "Only occasionally (1)", value: "1" },
        { label: "Yes, quite often (2)", value: "2" },
        { label: "Yes, most of the time (3)", value: "3" },
      ],
      defaultValue: "0",
    },
    {
      id: "item10",
      label: "10. The thought of harming myself has occurred to me",
      type: "select",
      required: true,
      options: [
        { label: "Never (0)", value: "0" },
        { label: "Hardly ever (1)", value: "1" },
        { label: "Sometimes (2)", value: "2" },
        { label: "Yes, quite often (3)", value: "3" },
      ],
      defaultValue: "0",
      helpText: "Any response other than 'Never' requires immediate clinical assessment.",
    },
  ],

  calculate(values: Record<string, string>) {
    const ids = [
      "item1",
      "item2",
      "item3",
      "item4",
      "item5",
      "item6",
      "item7",
      "item8",
      "item9",
      "item10",
    ];

    let total = 0;
    for (const id of ids) {
      const item = selectOption(values, id, `Item ${id.slice(4)}`, [
        "0",
        "1",
        "2",
        "3",
      ]);
      if ("err" in item) return critical(item.err);
      total += item.n;
    }

    const selfHarm = Number(values.item10) > 0;

    let interpretation: string;
    let status: "normal" | "low" | "high" | "critical";
    let referenceRange: string;

    if (selfHarm) {
      interpretation =
        `EPDS total ${total}/30 with a POSITIVE item 10 (thoughts of harming self). ` +
        "This requires URGENT evaluation of suicide risk and immediate clinical follow-up — do not delay.";
      status = "critical";
      referenceRange = "item 10 > 0";
    } else if (total >= 10) {
      interpretation =
        `EPDS total ${total}/30 — SCREEN POSITIVE for possible postpartum depression (cutoff ≥ 10). ` +
        "Arrange a full clinical assessment for depression and treatment as indicated.";
      status = "high";
      referenceRange = "≥ 10";
    } else {
      interpretation =
        `EPDS total ${total}/30 — screen negative (cutoff < 10). ` +
        "Continue routine screening and monitor for symptoms at subsequent visits.";
      status = "normal";
      referenceRange = "0–9";
    }

    return {
      value: total,
      unit: "/30",
      interpretation,
      status,
      referenceRange,
      score: total,
    };
  },
};
