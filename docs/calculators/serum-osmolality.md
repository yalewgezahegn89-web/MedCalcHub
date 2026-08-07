# Serum Osmolality

- **Slug**: `serum-osmolality`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Calculates the estimated serum osmolality using sodium, glucose, and blood urea nitrogen (BUN). Useful in evaluating electrolyte disorders, dehydration, toxic alcohol ingestion, and calculating the osmolar gap.

## Formula

```Calculated Osmolality = 2 × Na + Glucose / 18 + BUN / 2.8```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Sodium | number | mmol/L | Yes |
| Glucose | number | mg/dL | Yes |
| BUN | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Sodium | — | — | Yes |
| Glucose | — | — | Yes |
| BUN | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Low osmolality | low |
| — | Normal osmolality | normal |
| — | High osmolality | high |
| — | Critically elevated osmolality | critical |

## Clinical Guidance

### Advice

- Serum osmolality is most useful when measured and calculated values are compared to identify unmeasured osmoles (osmolar gap).
- Use this calculator alongside the Osmolar Gap calculator when toxic alcohol ingestion is suspected.
- In hypernatremia, serum osmolality helps guide the rate of correction.

### Warnings

- This formula uses glucose and BUN in mg/dL; results will be incorrect if different units are entered.
- The formula does not account for ethanol, which contributes to effective osmolality. Add ethanol correction if needed: Ethanol / 4.6.
- Measured osmolality must be obtained from the laboratory to calculate the osmolar gap.

### Follow-up

- If osmolality is elevated, check serum sodium, glucose, and BUN for the primary cause.
- If the osmolar gap is elevated (measured > calculated), consider toxic alcohol ingestion and obtain specific assays.
- In hyperosmolality, assess volume status and guide fluid correction.

## Evidence

- **Source**: Emergency Medicine / Nephrology
- **Reference**: Dorwart WV, Chalmers T. Comparison of methods for calculating serum osmolality from chemical concentrations, and the prognostic value of such calculations. Clin Chem. 1975;21:190–194.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Dorwart WV, Chalmers T. Clin Chem. 1975;21:190–194.
- Tintinalli's Emergency Medicine, 9th Ed.
- UpToDate: Serum osmolality.

## FAQ

**Q: What is normal serum osmolality?**

Normal serum osmolality is approximately 275–295 mOsm/kg. Values below this suggest dilutional hyponatremia; values above suggest dehydration, hyperglycemia, or ingestion of osmotically active substances.

**Q: When should I order a measured osmolality?**

Order a measured osmolality when toxic alcohol ingestion is suspected, when the calculated osmolality does not explain the clinical picture, or when you need to calculate the osmolar gap.

**Q: What does a high calculated osmolality mean?**

A high calculated osmolality suggests hypernatremia, hyperglycemia, elevated BUN (uremia), or ingestion of osmotically active substances. The differential depends on the clinical context.


## Related Calculators

- [Osmolar Gap](calculators/osmolar-gap.md)
- [Corrected Sodium](calculators/corrected-sodium.md)
- [Anion Gap](calculators/anion-gap.md)
- [Sodium Deficit](calculators/sodium-deficit.md)

## Comparison Calculators

