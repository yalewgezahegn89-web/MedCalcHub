# Homa B

- **Slug**: `homa-b`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Estimates pancreatic beta-cell function from fasting plasma glucose and fasting serum insulin using the HOMA equation.

## Formula

```HOMA-B = (20 * insulin) / (glucose - 3.5)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Fasting Glucose | number | mmol/L | Yes |
| Fasting Insulin | number | µU/mL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Fasting Glucose | — | — | Yes |
| Fasting Insulin | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Severe beta-cell dysfunction | critical |
| — | Reduced beta-cell function | low |
| — | Normal beta-cell function | normal |
| — | Hyperinsulinemia | high |

## Clinical Guidance

### Advice

- HOMA-B < 50% suggests significant beta-cell dysfunction and may indicate progression toward insulin-dependent diabetes.
- Pair with HOMA-IR to distinguish beta-cell failure from insulin resistance.
- Useful in tracking beta-cell decline in type 2 diabetes over time.

### Warnings

- HOMA-B values are not directly comparable across studies using different insulin assays.
- In newly diagnosed type 2 diabetes, HOMA-B may be transiently elevated due to glucotoxicity-driven hyperinsulinemia.
- Not validated for use in type 1 diabetes or patients on exogenous insulin.

### Follow-up

- If HOMA-B is low, consider progression of diabetes and possible need for insulin therapy.
- Pair with C-peptide measurement for a more direct assessment of beta-cell function.
- Monitor HbA1c and fasting glucose longitudinally.

## Evidence

- **Source**: Endocrine Society / ADA
- **Reference**: Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Matthews DR, et al. Diabetologia. 1985;28:412–419.
- ADA Standards of Care in Diabetes. 2025.
- UK Prospective Diabetes Study (UKPDS).

## FAQ

**Q: What does a low HOMA-B mean?**

A HOMA-B below 100% suggests reduced beta-cell function, meaning the pancreas is producing less insulin than expected for the glucose level. This is common in progressive type 2 diabetes.

**Q: How is HOMA-B different from HOMA-IR?**

HOMA-B estimates how well the pancreas produces insulin (beta-cell function), while HOMA-IR estimates how well the body responds to it (insulin resistance).

**Q: What is normal HOMA-B?**

A normal HOMA-B is approximately 100–200%. Values below 50% indicate significant beta-cell dysfunction.


## Related Calculators

- [Homa Ir](calculators/homa-ir.md)
- [Insulin Sensitivity](calculators/insulin-sensitivity.md)
- [A1c Eag Converter](calculators/a1c-eag-converter.md)
- [Estimated Average Glucose](calculators/estimated-average-glucose.md)

## Comparison Calculators

