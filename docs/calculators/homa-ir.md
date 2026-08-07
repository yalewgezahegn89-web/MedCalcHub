# Homa Ir

- **Slug**: `homa-ir`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Estimates insulin resistance from fasting plasma glucose and fasting serum insulin using the Homeostasis Model Assessment (HOMA) equation.

## Formula

```HOMA-IR = (glucose * insulin) / 405```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Fasting Glucose | number | mg/dL | Yes |
| Fasting Insulin | number | µU/mL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Fasting Glucose | — | — | Yes |
| Fasting Insulin | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Normal insulin sensitivity | normal |
| — | Mild insulin resistance | high |
| — | Severe insulin resistance | critical |

## Clinical Guidance

### Advice

- HOMA-IR > 2.5 is commonly used as the threshold for identifying insulin resistance in clinical research and practice.
- Pair HOMA-IR with waist circumference, lipid profile, and blood pressure for a full metabolic syndrome assessment.
- Best interpreted alongside HOMA-B to differentiate insulin resistance from beta-cell dysfunction.

### Warnings

- HOMA-IR is validated for fasting conditions only; non-fasting values are unreliable.
- Less accurate in patients with advanced beta-cell failure (e.g. type 1 diabetes or late-stage type 2 diabetes).
- Insulin assay variability between laboratories may affect absolute HOMA-IR values.

### Follow-up

- If HOMA-IR is elevated, evaluate for metabolic syndrome and consider an oral glucose tolerance test.
- Monitor lipid panel and liver function for non-alcoholic fatty liver disease.
- Consider lifestyle intervention and repeat HOMA-IR in 3–6 months.

## Evidence

- **Source**: Endocrine Society / ADA
- **Reference**: Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment: insulin resistance and beta-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Matthews DR, et al. Diabetologia. 1985;28:412–419.
- ADA Standards of Care in Diabetes. 2025.
- Endocrine Society Clinical Practice Guidelines.

## FAQ

**Q: What does a high HOMA-IR mean?**

A HOMA-IR > 2.5 suggests insulin resistance, meaning the body's cells are not responding efficiently to insulin. This is a risk factor for type 2 diabetes, metabolic syndrome, and cardiovascular disease.

**Q: What are the units of HOMA-IR?**

HOMA-IR is unitless. It is calculated using fasting glucose in mg/dL and fasting insulin in µU/mL: (glucose × insulin) / 405.

**Q: How does HOMA-IR differ from HOMA-B?**

HOMA-IR estimates insulin resistance, while HOMA-B estimates pancreatic beta-cell function. Both use the same fasting glucose and insulin values but different formulas.

**Q: When should HOMA-IR be measured?**

HOMA-IR requires fasting for at least 8 hours. It is best measured in the morning before any food intake.


## Related Calculators

- [Homa B](calculators/homa-b.md)
- [Insulin Sensitivity](calculators/insulin-sensitivity.md)
- [Estimated Average Glucose](calculators/estimated-average-glucose.md)
- [A1c Eag Converter](calculators/a1c-eag-converter.md)

## Comparison Calculators

