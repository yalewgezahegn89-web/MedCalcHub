export type ComparisonItem = {
  id: string;
  name: string;
  href: string;
  bestFor: string;
  limitation: string;
};

export const comparisonRegistry: Record<string, ComparisonItem[]> = {
  "ckd-epi-2021": [
    {
      id: "ckd-epi-2021",
      name: "CKD-EPI 2021",
      href: "/calculators/ckd-epi-2021",
      bestFor: "Routine estimation of kidney function.",
      limitation: "Not intended for medication dosing.",
    },
    {
      id: "cockcroft-gault",
      name: "Cockcroft-Gault",
      href: "/calculators/cockcroft-gault",
      bestFor: "Drug dosing adjustment.",
      limitation: "Less accurate for estimating true GFR.",
    },
    {
      id: "mdrd",
      name: "MDRD",
      href: "/calculators/mdrd",
      bestFor: "Historical comparison.",
      limitation: "Less accurate when eGFR is above 60.",
    },
  ],

  "cockcroft-gault": [
    {
      id: "ckd-epi-2021",
      name: "CKD-EPI 2021",
      href: "/calculators/ckd-epi-2021",
      bestFor: "Routine kidney function assessment.",
      limitation: "Not preferred for medication dosing.",
    },
    {
      id: "cockcroft-gault",
      name: "Cockcroft-Gault",
      href: "/calculators/cockcroft-gault",
      bestFor: "Medication dosing.",
      limitation: "Affected by body weight assumptions.",
    },
    {
      id: "mdrd",
      name: "MDRD",
      href: "/calculators/mdrd",
      bestFor: "Historical use.",
      limitation: "Older equation.",
    },
  ],

  "mdrd": [
    {
      id: "ckd-epi-2021",
      name: "CKD-EPI 2021",
      href: "/calculators/ckd-epi-2021",
      bestFor: "Current clinical practice.",
      limitation: "Not designed for drug dosing.",
    },
    {
      id: "cockcroft-gault",
      name: "Cockcroft-Gault",
      href: "/calculators/cockcroft-gault",
      bestFor: "Medication dosing.",
      limitation: "Weight dependent.",
    },
    {
      id: "mdrd",
      name: "MDRD",
      href: "/calculators/mdrd",
      bestFor: "Historical comparison.",
      limitation: "Reduced accuracy at higher GFR.",
    },
  ],
};