export const relatedCalculators: Record<string, string[]> = {
  // Renal
  "cockcroft-gault": [
    "ckd-epi-2021",
    "mdrd",
    "bun-creatinine-ratio",
  ],

  "ckd-epi-2021": [
    "cockcroft-gault",
    "mdrd",
    "bun-creatinine-ratio",
  ],

  "mdrd": [
    "ckd-epi-2021",
    "cockcroft-gault",
  ],

  "bun-creatinine-ratio": [
    "cockcroft-gault",
    "ckd-epi-2021",
  ],

  // Electrolytes

  "anion-gap": [
    "corrected-anion-gap",
    "serum-osmolality",
    "osmolar-gap",
  ],

  "corrected-anion-gap": [
    "anion-gap",
    "serum-osmolality",
    "osmolar-gap",
  ],

  "serum-osmolality": [
    "osmolar-gap",
    "anion-gap",
    "corrected-anion-gap",
  ],

  "osmolar-gap": [
    "serum-osmolality",
    "anion-gap",
    "corrected-anion-gap",
  ],

  "corrected-calcium": [
    "anion-gap",
  ],

  "glasgow-coma-scale": [
    "anion-gap",
  ],
};