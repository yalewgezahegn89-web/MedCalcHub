import type { CalculatorDefinition } from "./calculator.types";

type NumOrErr = { n: number } | { err: string };

function critical(interpretation: string) {
  return { value: 0, interpretation, status: "critical" as const };
}

function yesNo(
  values: Record<string, string>,
  id: string,
  label: string,
): NumOrErr {
  const v = values[id];
  if (v === undefined || v === "") return { err: `${label} is required.` };
  if (v !== "no" && v !== "yes") return { err: `Invalid ${label} selection.` };
  return { n: v === "yes" ? 1 : 0 };
}

export const ottawaSahRuleCalculator: CalculatorDefinition = {
  id: "ottawa-sah-rule",

  slug: "ottawa-sah-rule",

  name: "Ottawa SAH Rule",

  shortName: "Ottawa SAH Rule",

  description:
    "The Ottawa Subarachnoid Hemorrhage Rule identifies patients with acute nontraumatic headache who require CT to rule out SAH. If any of six high-risk findings is present, CT is indicated; if none are present, CT is not required (100% sensitivity).",

  category: "Neurology",

  specialty: "Neurology",

  featured: true,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Ottawa SAH Rule",
    "Subarachnoid hemorrhage",
    "SAH",
    "Headache",
    "Thunderclap headache",
    "CT decision rule",
    "Emergency Medicine",
    "Neurology",
    "Clinical prediction rule",
  ],

  formula:
    "Rule POSITIVE if ANY of: age ≥ 40, neck pain or stiffness, witnessed loss of consciousness, onset during exertion, thunderclap (instantly peaking) headache, or limited neck flexion on examination",

  normalRange:
    "Rule negative (none present) = CT not required (sensitivity 100%, specificity 15.3%). Rule positive = CT indicated.",

  referenceRanges: [
    {
      label: "Rule negative",
      range: "0 criteria",
      context: "CT for SAH not required (100% sensitivity, 15.3% specificity)",
    },
    {
      label: "Rule positive",
      range: "≥ 1 criteria",
      context: "CT for SAH indicated",
    },
  ],

  classification: [
    {
      label: "CT not required",
      range: "0",
      min: 0,
      max: 0,
      color: "green",
    },
    {
      label: "CT indicated",
      range: "≥ 1",
      min: 1,
      max: 6,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Ottawa SAH Rule was derived and validated by Perry and colleagues in a multicenter Canadian cohort (JAMA 2013). Among patients presenting to the emergency department with acute nontraumatic headache peaking within 1 hour, the presence of any of six findings — age ≥ 40 years, neck pain or stiffness, witnessed loss of consciousness, headache onset during exertion, thunderclap headache (instantly peaking pain), or limited neck flexion on examination — identified all patients with subarachnoid hemorrhage (100% sensitivity) while being negative in 15.3% of patients without SAH. It is widely used as an ED rule-out tool for SAH.",




  comparison: {
    title: "Headache and SAH decision tools",
    calculators: [
      {
        name: "Hunt and Hess Scale",
        href: "/calculators/hunt-hess-scale",
        use: "Grading severity once SAH is confirmed",
        bestFor: "Prognosis and treatment planning after diagnosis",
      },
      {
        name: "Glasgow Coma Scale",
        href: "/calculators/gcs",
        use: "Assessing level of consciousness",
        bestFor: "Neurologic monitoring in SAH and coma",
      },
    ],
  },

  references: [
    "Perry JJ, Stiell IG, Sivilotti MLA, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255.",
    "Perry JJ, Stiell IG, Sivilotti MLA, et al. High risk clinical characteristics for subarachnoid haemorrhage in patients with acute headache: prospective cohort study. BMJ. 2010;341:c5204.",
  ],

  relatedCalculators: [
    "hunt-hess-scale",
    "gcs",
    "fout-score",
    "nihss",
  ],

  inputs: [
    {
      id: "age40",
      label: "Age ≥ 40 years",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "neckPainStiffness",
      label: "Neck Pain or Stiffness",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "witnessedLoc",
      label: "Witnessed Loss of Consciousness",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "exertionOnset",
      label: "Headache Onset During Exertion",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "thunderclap",
      label: "Thunderclap Headache (instantly peaking pain)",
      type: "select",
      required: true,
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      defaultValue: "no",
    },
    {
      id: "limitedNeckFlexion",
      label: "Limited Neck Flexion on Examination",
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
    const age40 = yesNo(values, "age40", "Age ≥ 40 years");
    if ("err" in age40) return critical(age40.err);
    const neckPainStiffness = yesNo(values, "neckPainStiffness", "Neck pain or stiffness");
    if ("err" in neckPainStiffness) return critical(neckPainStiffness.err);
    const witnessedLoc = yesNo(values, "witnessedLoc", "Witnessed loss of consciousness");
    if ("err" in witnessedLoc) return critical(witnessedLoc.err);
    const exertionOnset = yesNo(values, "exertionOnset", "Onset during exertion");
    if ("err" in exertionOnset) return critical(exertionOnset.err);
    const thunderclap = yesNo(values, "thunderclap", "Thunderclap headache");
    if ("err" in thunderclap) return critical(thunderclap.err);
    const limitedNeckFlexion = yesNo(values, "limitedNeckFlexion", "Limited neck flexion");
    if ("err" in limitedNeckFlexion) return critical(limitedNeckFlexion.err);

    const criteriaPresent = [
      age40.n,
      neckPainStiffness.n,
      witnessedLoc.n,
      exertionOnset.n,
      thunderclap.n,
      limitedNeckFlexion.n,
    ].filter((v) => v === 1).length;

    if (criteriaPresent === 0) {
      return {
        value: 0,
        unit: " criteria",
        interpretation:
          "Ottawa SAH Rule NEGATIVE (0 of 6 criteria). Non-contrast CT to rule out subarachnoid hemorrhage is NOT required. Other causes of headache should still be considered.",
        status: "normal" as const,
        referenceRange: "0",
        score: 0,
      };
    }

    return {
      value: criteriaPresent,
      unit: " criteria",
      interpretation:
        `Ottawa SAH Rule POSITIVE (${criteriaPresent} of 6 criteria present). ` +
        "Non-contrast CT is indicated to rule out subarachnoid hemorrhage.",
      status: "critical",
      referenceRange: "≥ 1",
      score: criteriaPresent,
    };
  },
};
