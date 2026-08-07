# Bun Creatinine Ratio

- **Slug**: `bun-creatinine-ratio`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Calculates the Blood Urea Nitrogen to Creatinine ratio to help differentiate causes of kidney dysfunction.

## Formula

```BUN = bun / creatinine```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Blood Urea Nitrogen | number | mg/dL | Yes |
| Serum Creatinine | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Blood Urea Nitrogen | — | — | Yes |
| Serum Creatinine | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Low ratio | low |
| — | Normal ratio | normal |
| — | Elevated ratio | high |

## Clinical Guidance

### Advice

- An elevated BUN/Creatinine ratio may suggest prerenal azotemia, gastrointestinal bleeding, or dehydration, but should always be interpreted in clinical context.
- Use alongside urinalysis and urine electrolytes for a more complete picture of renal function.

### Warnings

- Interpret the ratio together with the clinical presentation; it is not diagnostic in isolation.
- High-protein diets, corticosteroids, and GI bleeding can elevate BUN independently of kidney function.

### Follow-up

- If the ratio is elevated, assess volume status and consider urine sodium and fractional excretion of sodium.
- If prerenal causes are excluded, evaluate for intrinsic renal or postrenal etiologies.

## Evidence

- **Source**: NKF / KDIGO
- **Reference**: KDIGO Clinical Practice Guideline for the Evaluation and Management of CKD.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- KDIGO Clinical Practice Guideline.
- National Kidney Foundation.

## FAQ

**Q: What does a high BUN/Creatinine ratio mean?**

A ratio >20:1 may suggest prerenal azotemia (e.g. dehydration, heart failure), GI bleeding, or high protein intake.

**Q: What does a low BUN/Creatinine ratio mean?**

A ratio <10:1 may indicate intrinsic renal disease, liver disease, malnutrition, or a low-protein diet.


## Related Calculators

- [Ckd Epi 2021](calculators/ckd-epi-2021.md)
- [Cockcroft Gault](calculators/cockcroft-gault.md)
- [Fena](calculators/fena.md)
- [Feurea](calculators/feurea.md)

## Comparison Calculators

