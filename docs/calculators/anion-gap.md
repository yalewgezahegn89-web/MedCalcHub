# Anion Gap

- **Slug**: `anion-gap`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Calculates the serum anion gap using sodium, chloride, and bicarbonate. The anion gap helps differentiate high anion gap metabolic acidosis (HAGMA) from normal anion gap metabolic acidosis (NAGMA).

## Formula

```Anion Gap = Na − (Cl + HCO₃)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Sodium | number | mmol/L | Yes |
| Chloride | number | mmol/L | Yes |
| Bicarbonate (HCO₃) | number | mmol/L | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Sodium | — | — | Yes |
| Chloride | — | — | Yes |
| Bicarbonate (HCO₃) | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Low anion gap | low |
| — | Normal anion gap | normal |
| — | High anion gap | high |
| — | Markedly elevated anion gap | critical |

## Clinical Guidance

### Advice

- An anion gap > 12 mmol/L in the context of metabolic acidosis suggests a high anion gap metabolic acidosis (MUDPILES mnemonic: methanol, uremia, DKA, propylene glycol, isoniazid, lactic acidosis, ethylene glycol, salicylates).
- Always interpret the anion gap alongside serum albumin—hypoalbuminemia falsely lowers the anion gap and can mask a HAGMA.
- Use the corrected anion gap calculator when albumin is low.

### Warnings

- The anion gap is not reliable in isolation; interpret with arterial blood gas, serum electrolytes, and clinical context.
- Hypernatremia, hypokalemia, hypercalcemia, and hypermagnesemia can all artifactually increase the anion gap.
- Lithium, bromide, and iodide can cause spurious elevation of the measured anion gap.

### Follow-up

- If the anion gap is elevated, search for the underlying cause (lactic acidosis, ketoacidosis, toxic ingestions, renal failure).
- If the cause is unclear, check lactate, ketones, BUN/creatinine, and consider a toxic alcohol screen.
- Reassess the anion gap after treatment to confirm resolution.

## Evidence

- **Source**: Critical Care Medicine
- **Reference**: Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174.
- Adrogue HJ, et al. Acid-base disorders. In: Brenner & Rector's The Kidney.

## FAQ

**Q: What does an elevated anion gap mean?**

An elevated anion gap (> 12 mmol/L) in the setting of metabolic acidosis suggests accumulation of unmeasured anions such as lactate, ketoacids, or toxic metabolites. Common causes include lactic acidosis, diabetic ketoacidosis, renal failure, and toxic alcohol ingestion.

**Q: What does a low anion gap mean?**

A low anion gap (< 8 mmol/L) may indicate hypoalbuminemia, lithium or bromide toxicity, or laboratory error. It can also be seen with hypercalcemia, hypermagnesemia, or hyperkalemia.

**Q: Why should I correct for albumin?**

About 80% of the normal anion gap is accounted for by albumin. In hypoalbuminemia, the anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. For every 1 g/dL drop in albumin below 4.0, the expected anion gap decreases by approximately 2.5 mmol/L.

**Q: When should I use the corrected anion gap?**

Use the albumin-corrected anion gap when the patient has known or suspected hypoalbuminemia (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition).


## Related Calculators

- [Corrected Anion Gap](calculators/corrected-anion-gap.md)
- [Serum Osmolality](calculators/serum-osmolality.md)
- [Osmolar Gap](calculators/osmolar-gap.md)
- [Corrected Calcium](calculators/corrected-calcium.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

