# Estimated Average Glucose

- **Slug**: `estimated-average-glucose`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Estimates mean plasma glucose from HbA1c using the ADAG formula validated by the American Diabetes Association.

## Formula

```eAG = 28.7 * a1c - 46.7```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| HbA1c | number | % | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| HbA1c | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Normal average glucose | normal |
| — | Pre-diabetic range | high |
| — | Diabetic range | critical |

## Clinical Guidance

### Advice

- Use eAG to translate HbA1c into a unit (mg/dL) that patients already understand from home glucose monitoring.
- eAG represents the average glucose over the preceding 2–3 months.
- The ADA recommends an HbA1c target of < 7% (eAG ≈ 154 mg/dL) for most non-pregnant adults with diabetes.

### Warnings

- eAG may be inaccurate in conditions affecting red blood cell lifespan (e.g. iron deficiency anaemia, sickle cell trait, pregnancy).
- This formula is derived from continuous glucose monitoring studies and may differ from self-monitored blood glucose averages.
- Use as a guide only; individual glucose targets should be personalized.

### Follow-up

- If eAG is above target, review current diabetes management including diet, exercise, and medications.
- Consider continuous glucose monitoring for more detailed glycemic assessment.
- Recheck HbA1c in 3 months after therapy changes.

## Evidence

- **Source**: ADA / ADAG Study
- **Reference**: Nathan DM, Steffes MW, et al. International multicenter A1c-derived average glucose (ADAG) study. Diabetes Care. 2008;31:1913–1917.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Nathan DM, et al. Diabetes Care. 2008;31:1913–1917.
- ADA Standards of Care in Diabetes. 2025.

## FAQ

**Q: What is estimated average glucose?**

eAG converts your HbA1c into an average blood glucose value in mg/dL over the past 2–3 months, making it easier to compare with home glucose readings.

**Q: What HbA1c equals an eAG of 126 mg/dL?**

An eAG of 126 mg/dL corresponds to an HbA1c of approximately 6.0%.

**Q: Is eAG the same as average blood glucose?**

eAG is a statistical estimate of average glucose validated by CGM studies. It may not exactly match simple averages of finger-stick measurements.


## Related Calculators

- [A1c Eag Converter](calculators/a1c-eag-converter.md)
- [Homa Ir](calculators/homa-ir.md)
- [Homa B](calculators/homa-b.md)

## Comparison Calculators

