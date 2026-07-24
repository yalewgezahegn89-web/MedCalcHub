export const relatedCalculators: Record<string, string[]> = {
  // Body composition and nutrition
  "body-surface-area": [
    "ideal-body-weight",
    "adjusted-body-weight",
    "lean-body-mass",
  ],

  "ideal-body-weight": [
    "adjusted-body-weight",
    "body-surface-area",
    "lean-body-mass",
  ],

  "adjusted-body-weight": [
    "ideal-body-weight",
    "body-surface-area",
    "lean-body-mass",
  ],

  "lean-body-weight": [
    "body-surface-area",
    "ideal-body-weight",
    "adjusted-body-weight",
  ],

  // Metabolism and nutrition
  "basal-metabolic-rate": [
    "mifflin-st-jeor",
    "harris-benedict",
    "calorie-requirement",
  ],

  "mifflin-st-jeor": [
    "basal-metabolic-rate",
    "harris-benedict",
    "calorie-requirement",
  ],

  "harris-benedict": [
    "basal-metabolic-rate",
    "mifflin-st-jeor",
    "calorie-requirement",
  ],

  "calorie-requirement": [
    "basal-metabolic-rate",
    "mifflin-st-jeor",
    "harris-benedict",
    "fluid-requirement",
  ],

  "fluid-requirement": [
    "maintenance-fluids",
    "calorie-requirement",
  ],

  "maintenance-fluids": [
    "fluid-requirement",
  ],

  // Electrolytes and fluids
  "free-water-deficit": [
    "sodium-deficit",
    "corrected-sodium",
  ],

  "sodium-deficit": [
    "free-water-deficit",
    "corrected-sodium",
  ],

  "corrected-sodium": [
    "free-water-deficit",
    "sodium-deficit",
  ],

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
    "fena",
    "feurea",
  ],

  "anion-gap": [
    "corrected-anion-gap",
    "serum-osmolality",
    "osmolar-gap",
    "corrected-calcium",
  ],

  "corrected-anion-gap": [
    "anion-gap",
    "serum-osmolality",
    "osmolar-gap",
    "albumin-corrected-calcium",
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
    "albumin-corrected-calcium",
    "anion-gap",
  ],

  "albumin-corrected-calcium": [
    "corrected-calcium",
    "corrected-anion-gap",
  ],

  "fena": [
    "bun-creatinine-ratio",
    "fractional-excretion-calculator",
    "feurea",
  ],

  "feurea": [
    "bun-creatinine-ratio",
    "fractional-excretion-calculator",
    "fena",
  ],

  "ttkg": [
    "serum-osmolality",
    "corrected-sodium",
  ],

  "calcium-phosphate-product": [
    "corrected-calcium",
    "albumin-corrected-calcium",
  ],

  "fractional-excretion-calculator": [
    "fena",
    "feurea",
    "bun-creatinine-ratio",
  ],

  // Endocrinology
  "homa-ir": [
    "homa-b",
    "insulin-sensitivity",
    "estimated-average-glucose",
  ],

  "homa-b": [
    "homa-ir",
    "insulin-sensitivity",
  ],

  "insulin-sensitivity": [
    "homa-ir",
    "homa-b",
  ],

  "estimated-average-glucose": [
    "a1c-eag-converter",
    "homa-ir",
  ],

  "a1c-eag-converter": [
    "estimated-average-glucose",
  ],

  "corrected-qt": [
    "adrenal-steroid-converter",
  ],

  "thyroid-dose": [
    "levothyroxine-dose",
  ],

  "levothyroxine-dose": [
    "thyroid-dose",
  ],

  "adrenal-steroid-converter": [
    "corrected-qt",
  ],

  "bmi-for-pediatrics": [
    "body-surface-area",
  ],
};