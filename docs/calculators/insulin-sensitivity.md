# Insulin Sensitivity

- **Slug**: `insulin-sensitivity`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Provides a simple estimate of insulin sensitivity as the reciprocal of HOMA-IR.

## Formula

```IS = 1 / homair```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| HOMA-IR | number | — | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| HOMA-IR | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Severe insulin resistance | critical |
| — | Reduced insulin sensitivity | low |
| — | Normal insulin sensitivity | normal |

## Clinical Guidance

### Advice

- Values > 0.4 indicate better insulin sensitivity; values < 0.2 suggest significant insulin resistance.
- Use alongside HOMA-IR for a more intuitive representation of metabolic health.
- Higher values (closer to 1.0) reflect better metabolic flexibility.

### Warnings

- This is a derived metric from HOMA-IR and inherits all HOMA-IR limitations.
- Not validated for use in type 1 diabetes.
- Single fasting measurement; does not capture dynamic insulin response to meals.

### Follow-up

- If insulin sensitivity is low, assess for metabolic syndrome components.
- Dietary modification and exercise are first-line interventions to improve insulin sensitivity.
- Repeat testing after lifestyle changes to track improvement.

## Evidence

- **Source**: Endocrine Society
- **Reference**: Wallace TM, Levy JC, Matthews DR. Use and abuse of HOMA modeling. Diabetes Care. 2004;27:1487–1495.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Wallace TM, et al. Diabetes Care. 2004;27:1487–1495.
- Matthews DR, et al. Diabetologia. 1985;28:412–419.

## FAQ

**Q: What is insulin sensitivity?**

Insulin sensitivity measures how effectively the body's cells respond to insulin. A higher value means cells are more responsive, requiring less insulin to manage blood glucose.

**Q: How is this different from HOMA-IR?**

This is simply 1 / HOMA-IR. It presents the same information in a more intuitive direction: higher values mean better sensitivity.

**Q: What is a good insulin sensitivity score?**

A score > 0.4 is generally considered good insulin sensitivity. Below 0.2 suggests significant insulin resistance.


## Related Calculators

- [Homa Ir](calculators/homa-ir.md)
- [Homa B](calculators/homa-b.md)
- [A1c Eag Converter](calculators/a1c-eag-converter.md)

## Comparison Calculators

