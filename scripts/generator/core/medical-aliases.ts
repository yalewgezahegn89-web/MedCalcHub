/**
 * Centralized Medical Alias Dictionary
 *
 * Maps formula display names / medical abbreviations
 * to canonical input IDs. Used by:
 *
 * - build-variable-map.ts: to generate extra variable
 *   declarations for aliases not matching input IDs
 * - build-algebraic.ts: to resolve expression variable
 *   names to input IDs before giving up
 *
 * Keys are case-sensitive expression variable names.
 * Values are the input ID they resolve to.
 *
 * Rule: aliases should NEVER overwrite an exact input
 * ID match. They only bridge the gap when the formula
 * text uses different terminology from the input ID.
 */
export const medicalAliases: Record<string, string> = {
  // ── Sodium variants ──────────────────────────────
  "Target Na": "desiredNa",
  "Desired Na": "desiredNa",
  "Target Sodium": "desiredNa",
  "Desired Sodium": "desiredNa",
  "Current Na": "currentNa",
  "Current Sodium": "currentNa",

  // ── Osmolality variants ──────────────────────────
  "Calculated Osmolality": "calculatedOsmolality",
  "Measured Osmolality": "measuredOsmolality",

  // ── Mental status variants ───────────────────────
  "Mental Status": "mentalStatus",
  "Altered Mental Status": "mentalStatus",
  "Altered mental status": "mentalStatus",

  // ── Vital sign abbreviations ─────────────────────
  "SBP": "sbp",
  "Systolic Blood Pressure": "sbp",
  "DBP": "dbp",
  "Diastolic Blood Pressure": "dbp",
  "Respiratory Rate": "respiratoryRate",
  "Heart Rate": "heartRate",

  // ── Electrolyte abbreviations ────────────────────
  "Na": "sodium",
  "K": "potassium",
  "Cl": "chloride",
  "HCO3": "bicarbonate",
  "HCO₃": "bicarbonate",
  "Ca": "calcium",
  "Mg": "magnesium",

  // ── Renal markers ────────────────────────────────
  "SCr": "serumCreatinine",
  "Serum Creatinine": "serumCreatinine",
  "BUN": "bun",
  "eGFR": "egfr",

  // ── Body metrics ─────────────────────────────────
  "TBW": "tbw",
  "Total Body Water": "tbw",
  "IBW": "ibw",
  "Ideal Body Weight": "ibw",
  "EBW": "ebw",
  "Estimated Body Weight": "ebw",
  "ABW": "adjbw",
  "Adjusted Body Weight": "adjbw",
  "BSA": "bsa",
  "BMI": "bmi",
  "Wt": "weight",
  "Ht": "height",

  // ── Other common mappings ────────────────────────
  "SpO2": "spo2",
  "Oxygen Saturation": "spo2",
  "GCS": "gcs",
  "Albumin": "albumin",
  "INR": "inr",
  "LDL": "ldl",
  "HDL": "hdl",
  "TSH": "tsh",
  "FeNa": "fena",
  "KtV": "ktv",
  "UOsm": "urineOsmolality",
  "SOsm": "serumOsmolality",
};

/**
 * Resolve an expression variable name to its canonical
 * input ID using the medical alias dictionary.
 *
 * @param variable - The variable name found in the
 *   formula expression (e.g. "Target Na")
 * @returns The resolved input ID, or undefined if no
 *   alias exists
 */
export function resolveAlias(
  variable: string,
): string | undefined {
  // Direct match (case-sensitive)
  if (medicalAliases[variable] !== undefined) {
    return medicalAliases[variable];
  }

  // Normalized match: strip whitespace, lowercase
  const normalized = variable
    .replace(/\s+/g, " ")
    .trim();

  if (medicalAliases[normalized] !== undefined) {
    return medicalAliases[normalized];
  }

  return undefined;
}