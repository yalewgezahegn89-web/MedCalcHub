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

export const huntHessScaleCalculator: CalculatorDefinition = {
  id: "hunt-hess-scale",

  slug: "hunt-hess-scale",

  name: "Hunt and Hess Scale",

  shortName: "Hunt and Hess",

  description:
    "The Hunt and Hess scale classifies the clinical severity of aneurysmal subarachnoid hemorrhage into five grades based on headache, nuchal rigidity, level of consciousness, and focal deficits. Higher grades predict higher mortality.",

  category: "Neurology",

  specialty: "Neurology",

  featured: false,

  version: "1.0",

  updatedAt: "2026-08-16",

  keywords: [
    "Hunt and Hess Scale",
    "Hunt Hess",
    "Subarachnoid hemorrhage",
    "SAH",
    "Aneurysmal SAH",
    "Aneurysm",
    "Neurology",
    "Neurosurgery",
    "Grading scale",
    "Prognosis",
  ],

  formula:
    "Grade assigned from clinical presentation: I (no or minimal symptoms) through V (coma with decerebrate posturing); higher grade = worse prognosis",

  normalRange:
    "Grade I is the least severe; Grade V is moribund. Historical mortality: I 1–3%, II 3–5%, III 9–19%, IV 23–42%, V 70–77%.",

  referenceRanges: [
    {
      label: "Grade I",
      range: "I",
      context: "Asymptomatic or minimal headache with slight nuchal rigidity",
    },
    {
      label: "Grade II",
      range: "II",
      context: "Moderate–severe headache with nuchal rigidity; no deficit other than cranial nerve palsy",
    },
    {
      label: "Grade III",
      range: "III",
      context: "Drowsy or confused, with mild focal deficit",
    },
    {
      label: "Grade IV",
      range: "IV",
      context: "Stupor, moderate–severe hemiparesis, possible early decerebrate rigidity",
    },
    {
      label: "Grade V",
      range: "V",
      context: "Deep coma, decerebrate rigidity, moribund",
    },
  ],

  classification: [
    {
      label: "Grade I",
      range: "I",
      min: 1,
      max: 1,
      color: "green",
    },
    {
      label: "Grade II",
      range: "II",
      min: 2,
      max: 2,
      color: "green",
    },
    {
      label: "Grade III",
      range: "III",
      min: 3,
      max: 3,
      color: "yellow",
    },
    {
      label: "Grade IV",
      range: "IV",
      min: 4,
      max: 4,
      color: "red",
    },
    {
      label: "Grade V",
      range: "V",
      min: 5,
      max: 5,
      color: "red",
    },
  ],



  clinicalNotes:
    "The Hunt and Hess scale was published by William Hunt and Robert Hess in 1968 (Journal of Neurosurgery) to grade the surgical risk in 275 patients with aneurysmal subarachnoid hemorrhage. Grade I denotes no or minimal symptoms; grade II moderate to severe headache with nuchal rigidity and no deficit other than cranial nerve palsy; grade III drowsiness, confusion, or mild focal deficit; grade IV stupor with moderate to severe hemiparesis and possible early decerebrate rigidity; and grade V deep coma with decerebrate rigidity. A 1974 modification added grades 0 and 1a and the rule to add one grade in the presence of serious systemic disease.",




  comparison: {
    title: "Subarachnoid hemorrhage grading",
    calculators: [
      {
        name: "Ottawa SAH Rule",
        href: "/calculators/ottawa-sah-rule",
        use: "Deciding which acute headache patients need a CT to rule out SAH",
        bestFor: "ED triage before the diagnosis is confirmed",
      },
      {
        name: "NIH Stroke Scale",
        href: "/calculators/nihss",
        use: "Quantifying focal neurologic deficit",
        bestFor: "Ischemic stroke severity rather than SAH grade",
      },
    ],
  },

  references: [
    "Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.",
    "Hunt WE, Kosnik EJ. Timing and perioperative care in intracranial aneurysm surgery. Clin Neurosurg. 1974;21:79-89.",
  ],

  relatedCalculators: [
    "ottawa-sah-rule",
    "nihss",
    "gcs",
    "fout-score",
    "modified-rankin-scale",
  ],

  inputs: [
    {
      id: "grade",
      label: "Clinical Grade",
      type: "select",
      required: true,
      options: [
        {
          label: "I — Asymptomatic or minimal headache, slight nuchal rigidity",
          value: "1",
        },
        {
          label: "II — Moderate to severe headache, nuchal rigidity, no neurologic deficit other than cranial nerve palsy",
          value: "2",
        },
        {
          label: "III — Drowsy, confused, or mild focal deficit",
          value: "3",
        },
        {
          label: "IV — Stupor, moderate to severe hemiparesis, possible early decerebrate rigidity",
          value: "4",
        },
        {
          label: "V — Deep coma, decerebrate rigidity, moribund",
          value: "5",
        },
      ],
      defaultValue: "1",
    },
  ],

  calculate(values: Record<string, string>) {
    const grade = selectOption(values, "grade", "Clinical grade", ["1", "2", "3", "4", "5"]);
    if ("err" in grade) return critical(grade.err);

    const gradeNum = grade.n;

    let interpretation: string;
    let status: "normal" | "high" | "critical";
    let referenceRange: string;

    if (gradeNum === 1) {
      interpretation =
        "Hunt and Hess grade I — asymptomatic or minimal headache with slight nuchal rigidity. Historical mortality ≈ 1–3%. Secure the aneurysm early and monitor on the neurosurgical unit.";
      status = "normal";
      referenceRange = "I";
    } else if (gradeNum === 2) {
      interpretation =
        "Hunt and Hess grade II — moderate to severe headache with nuchal rigidity and no neurologic deficit other than cranial nerve palsy. Historical mortality ≈ 3–5%. Early aneurysm treatment is generally appropriate.";
      status = "normal";
      referenceRange = "II";
    } else if (gradeNum === 3) {
      interpretation =
        "Hunt and Hess grade III — drowsy or confused with mild focal deficit. Historical mortality ≈ 9–19%. Stabilize and treat the aneurysm; anticipate complications such as vasospasm.";
      status = "high";
      referenceRange = "III";
    } else if (gradeNum === 4) {
      interpretation =
        "Hunt and Hess grade IV — stupor with moderate to severe hemiparesis and possible early decerebrate rigidity. Historical mortality ≈ 23–42%. Stabilization precedes aneurysm treatment; aggressive neurointensive care is indicated.";
      status = "critical";
      referenceRange = "IV";
    } else {
      interpretation =
        "Hunt and Hess grade V — deep coma with decerebrate rigidity, moribund. Historical mortality ≈ 70–77%. Multidisciplinary discussion regarding goals of care and treatment is warranted.";
      status = "critical";
      referenceRange = "V";
    }

    return {
      value: gradeNum,
      unit: " (grade I–V)",
      interpretation,
      status,
      referenceRange,
      score: gradeNum,
    };
  },
};
