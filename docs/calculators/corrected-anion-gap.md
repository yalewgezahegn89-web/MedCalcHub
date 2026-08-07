# Corrected Anion Gap

- **Slug**: `corrected-anion-gap`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Calculates the albumin-corrected anion gap. In hypoalbuminemia, the measured anion gap is falsely low, potentially masking a high anion gap metabolic acidosis. This correction adjusts for the albumin contribution.

## Formula

```Corrected AG = (Na − (Cl + HCO₃)) + 2.5 × (4 − Albumin)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Sodium | number | mmol/L | Yes |
| Chloride | number | mmol/L | Yes |
| Bicarbonate (HCO₃) | number | mmol/L | Yes |
| Albumin | number | g/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Sodium | — | — | Yes |
| Chloride | — | — | Yes |
| Bicarbonate (HCO₃) | — | — | Yes |
| Albumin | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Low corrected anion gap | low |
| — | Normal corrected anion gap | normal |
| — | High corrected anion gap | high |
| — | Markedly elevated corrected anion gap | critical |

## Clinical Guidance

### Advice

- Use the corrected anion gap whenever serum albumin is low (e.g. critical illness, nephrotic syndrome, liver disease, malnutrition) to unmask a hidden high anion gap metabolic acidosis.
- For every 1 g/dL decrease in albumin below 4.0, the expected anion gap decreases by ~2.5 mmol/L.
- This is especially important in ICU patients where hypoalbuminemia is common and a HAGMA may be missed on uncorrected values.

### Warnings

- This correction factor (2.5) is derived from the assumption that each g/dL of albumin contributes ~2.5 mmol/L to the anion gap; exact values may vary.
- The correction does not account for other proteins or anions that contribute to the gap.
- Very low albumin (< 2.0 g/dL) may reduce the reliability of the correction.

### Follow-up

- If the corrected anion gap is elevated, pursue the same differential diagnosis as for a standard high anion gap acidosis.
- Check lactate, ketones, and renal function; consider a toxic alcohol screen if clinically indicated.
- Reassess after treatment to confirm normalization.

## Evidence

- **Source**: Critical Care Medicine
- **Reference**: Figge J, et al. Hypoalbuminemia and the anion gap. Crit Care Med. 1998;26:1807–1810.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Figge J, et al. Crit Care Med. 1998;26:1807–1810.
- Kraut JA, Madias NE. Clin J Am Soc Nephrol. 2007;2:162–174.

## FAQ

**Q: Why does hypoalbuminemia lower the anion gap?**

Albumin is a negatively charged protein that contributes significantly to the normal anion gap (~75% of the gap in health). When albumin is low, fewer unmeasured negative charges are present, so the calculated anion gap decreases even if the underlying acid-base status is unchanged.

**Q: What correction factor is used?**

The standard correction adds 2.5 mmol/L to the measured anion gap for every 1 g/dL that serum albumin falls below 4.0 g/dL. Some studies suggest using 2.4 or 2.8 depending on the population.

**Q: When should I suspect a missed HAGMA?**

Consider a missed HAGMA when a patient is critically ill with acidosis, has a normal-appearing uncorrected anion gap, and has a low serum albumin. Apply the correction and reassess.


## Related Calculators

- [Anion Gap](calculators/anion-gap.md)
- [Serum Osmolality](calculators/serum-osmolality.md)
- [Osmolar Gap](calculators/osmolar-gap.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)
- [Corrected Calcium](calculators/corrected-calcium.md)

## Comparison Calculators

