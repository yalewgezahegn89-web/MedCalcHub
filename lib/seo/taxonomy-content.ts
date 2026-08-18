/**
 * Batch 4 — Taxonomy Content
 *
 * Provides concise, factual descriptions for each category and specialty,
 * plus helpers for cross-linking taxonomies derived from the calculator registry.
 *
 * Descriptions are informational and derived from the calculators in each
 * group. They do not make clinical recommendations or imply diagnosis.
 */

import {
  calculatorRegistry,
  getCalculatorsByCategory,
  getCalculatorsBySpecialty,
  getCategories,
  getSpecialties,
} from "@/lib/calculators/registry";

/* ------------------------------------------------------------------ */
/*  Category descriptions                                              */
/* ------------------------------------------------------------------ */

export const categoryDescriptions: Record<string, string> = {
  Anthropometry:
    "Body composition and nutritional status calculators, including BMI, body surface area, ideal body weight, and waist-to-hip ratio.",
  Cardiology:
    "Cardiac risk assessment and haemodynamic calculators covering acute coronary syndromes, atrial fibrillation, heart failure, and perioperative risk.",
  Emergency:
    "Acute care and emergency medicine tools for trauma scoring, sepsis screening, clinical decision rules, and resuscitation guidance.",
  Endocrinology:
    "Metabolic and endocrine calculators for glycaemic control, insulin resistance, thyroid dosing, and steroid conversion.",
  Gastroenterology:
    "Hepatology and gastrointestinal calculators for liver disease severity, GI bleeding risk, and liver transplant listing.",
  Geriatrics:
    "Functional status and comorbidity assessment tools for older adults, including the Charlson Comorbidity Index and Barthel Index.",
  "Infectious Disease":
    "Infection-related clinical calculators including pneumonia severity scores and streptococcal pharyngitis risk assessment.",
  "Internal Medicine":
    "General internal medicine tools for acid-base analysis, fluid management, and metabolic assessment.",
  Laboratory:
    "Laboratory value interpretation tools for electrolyte disorders, lipid panels, and renal tubular function.",
  "Mental Health":
    "Screening and severity tools for depression, anxiety, and sleep disorders used in primary care and psychiatry.",
  Nephrology:
    "Kidney function estimation, renal replacement therapy adequacy, electrolyte handling, and acute kidney injury assessment.",
  Neurology:
    "Neurological scoring systems for stroke severity, subarachnoid haemorrhage, functional outcome, and head injury in adults and children.",
  "Obstetrics & Gynecology":
    "Pregnancy dating, fetal weight estimation, pre-eclampsia screening, obstetric haemorrhage, and perinatal mood assessment.",
  Oncology:
    "Cancer prognosis and risk calculators including performance status scales, atherosclerotic risk, and antiplatelet therapy duration.",
  Pediatrics:
    "Age-appropriate calculators for paediatric GCS, trauma scoring, croup severity, sepsis screening, and dehydration assessment.",
  Pulmonology:
    "Respiratory physiology calculators for gas exchange assessment, oxygenation indices, and ventilator-based ratios.",
  Renal:
    "Kidney function, electrolytes, acid-base disorders, and renal dosing calculators.",
  "Sleep Medicine":
    "Sleep disorder screening tools for daytime sleepiness and obstructive sleep apnoea risk.",
};

/* ------------------------------------------------------------------ */
/*  Specialty descriptions                                              */
/* ------------------------------------------------------------------ */

export const specialtyDescriptions: Record<string, string> = {
  Cardiology:
    "Calculators for cardiac risk stratification, acute coronary syndromes, anticoagulation dosing, and perioperative cardiac assessment.",
  "Critical Care":
    "Severity scoring and organ dysfunction tools for ICU patients, including sepsis criteria, shock assessment, and ventilator ratios.",
  "Emergency Medicine":
    "Rapid assessment calculators for trauma, poisoning, syncope, chest pain, and clinical decision rules in the emergency department.",
  Endocrinology:
    "Metabolic and endocrine calculators for insulin resistance, glycaemic estimation, thyroid dosing, and metabolic syndrome screening.",
  "General Medicine":
    "Broadly applicable tools for functional status, comorbidity burden, mental health screening, and sleep disorder assessment.",
  "Internal Medicine":
    "Core clinical calculators for acid-base analysis, fluid and electrolyte management, renal function, and metabolic assessment.",
  Nephrology:
    "Kidney function estimation, dialysis adequacy, electrolyte handling, fractional excretion analysis, and renal dosing tools.",
  Neurology:
    "Neurological scoring systems for stroke severity, subarachnoid haemorrhage grading, functional outcome prediction, and seizures.",
  Obstetrics:
    "Pregnancy dating, estimated fetal weight, pre-eclampsia criteria, obstetric haemorrhage estimation, and perinatal screening.",
  Pediatrics:
    "Age-appropriate calculators for paediatric trauma, neurological assessment, croup severity, sepsis screening, and dehydration.",
};

/* ------------------------------------------------------------------ */
/*  Taxonomy cross-linking helpers                                      */
/* ------------------------------------------------------------------ */

/**
 * Returns the unique specialties whose calculators appear in a given category.
 * Derives the relationship directly from the registry — no hardcoded mappings.
 */
export function getSpecialtiesForCategory(
  category: string,
): string[] {
  const calcs = getCalculatorsByCategory(category);
  const specialties = calcs
    .map((c) => c.specialty)
    .filter((s): s is string => Boolean(s));
  return [...new Set(specialties)].sort();
}

/**
 * Returns the unique categories represented by a specialty's calculators.
 * Derives the relationship directly from the registry — no hardcoded mappings.
 */
export function getCategoriesForSpecialty(
  specialty: string,
): string[] {
  const calcs = getCalculatorsBySpecialty(specialty);
  const categories = calcs.map((c) => c.category);
  return [...new Set(categories)].sort();
}

/**
 * Converts a category or specialty name to its URL slug.
 */
export function taxonomyToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
