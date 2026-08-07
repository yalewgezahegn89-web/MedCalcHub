# A1c Eag Converter

- **Slug**: `a1c-eag-converter`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Converts bidirectionally between hemoglobin A1c and estimated average glucose (eAG) using the ADA-validated ADAG formula.

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
| — | Normal A1c | normal |
| — | Pre-diabetes range | high |
| — | Diabetes range | critical |

## Clinical Guidance

### Advice

- The ADA target for most adults with diabetes is HbA1c < 7%, corresponding to eAG < 154 mg/dL.
- Use this converter to help patients relate their A1c result to familiar glucose numbers.
- Individualized targets may be higher or lower depending on age, comorbidities, and hypoglycemia risk.

### Warnings

- A1c may be unreliable in haemoglobinopathies, iron deficiency, pregnancy, and conditions with altered red blood cell turnover.
- This formula applies to the NGSP-standardized A1c assay.
- eAG represents an average and does not capture glucose variability or hypoglycemic episodes.

### Follow-up

- If A1c is above target, review medication adherence and consider therapy intensification.
- Use CGM or self-monitoring of blood glucose for detailed glycemic patterns.
- Recheck A1c in 3 months after changes to diabetes management.

## Evidence

- **Source**: ADA / ADAG Study
- **Reference**: Nathan DM, et al. Translating the A1c assay into estimated average glucose values. Diabetes Care. 2008;31:1473–1478.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Nathan DM, et al. Diabetes Care. 2008;31:1473–1478.
- ADA Standards of Care in Diabetes. 2025.

## FAQ

**Q: What does an A1c of 7% equal in mg/dL?**

An A1c of 7% corresponds to an estimated average glucose of approximately 154 mg/dL.

**Q: Why convert A1c to eAG?**

Most patients are familiar with glucose numbers from home monitoring but find A1c percentages abstract. eAG translates A1c into a familiar unit.

**Q: How accurate is the conversion?**

The formula has an R² of 0.84 in the ADAG study. Individual results may vary by ±15% due to biological and assay variability.


## Related Calculators

- [Estimated Average Glucose](calculators/estimated-average-glucose.md)
- [Homa Ir](calculators/homa-ir.md)
- [Homa B](calculators/homa-b.md)

## Comparison Calculators

