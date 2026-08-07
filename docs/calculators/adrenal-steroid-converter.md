# Adrenal Steroid Converter

- **Slug**: `adrenal-steroid-converter`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Converts between equivalent glucocorticoid and mineralocorticoid doses of commonly used adrenal steroids.

## Formula

```dose```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Dose | number | mg | Yes |
| Source Steroid | select | — | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Dose | — | — | Yes |
| Source Steroid | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Low-dose glucocorticoid | normal |
| — | Moderate-dose glucocorticoid | high |
| — | High-dose glucocorticoid | critical |

## Clinical Guidance

### Advice

- Use equivalent doses when switching between glucocorticoids to avoid under- or over-treatment.
- Biological half-life matters: dexamethasone and betamethasone are long-acting and carry higher risk of HPA axis suppression.
- When transitioning to hydrocortisone for adrenal insufficiency, consider physiological cortisol rhythm (higher morning dose).

### Warnings

- These are approximate equivalences; individual patient response may vary.
- Conversion does not account for mineralocorticoid activity (hydrocortisone has significant mineralocorticoid effect; dexamethasone has none).
- Long-term steroid use at any dose increases risk of osteoporosis, diabetes, and infections.

### Follow-up

- Monitor blood glucose, bone density, and blood pressure during prolonged glucocorticoid therapy.
- When tapering, reduce gradually to allow HPA axis recovery.
- Consider steroid-sparing agents in autoimmune or inflammatory conditions.

## Evidence

- **Source**: Endocrine Society
- **Reference**: Liu MM, Rebholz AE, et al. Equivalent glucocorticoid dose conversion: a review. J Endocrinol Invest. 2021;44:1–11. Stavros K, et al. Glucocorticoid equivalency. Endocr Pract. 2022;28:1001–1008.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Liu MM, et al. J Endocrinol Invest. 2021.
- Stavros K, et al. Endocr Pract. 2022;28:1001–1008.
- Endocrine Society Clinical Practice Guidelines.

## FAQ

**Q: How do I convert prednisone to dexamethasone?**

Prednisone 5 mg is approximately equivalent to dexamethasone 0.75 mg. Divide the prednisone dose by approximately 6.67 to get the dexamethasone equivalent.

**Q: Why is hydrocortisone used for adrenal insufficiency?**

Hydrocortisone has both glucocorticoid and mineralocorticoid activity, making it the preferred replacement in adrenal insufficiency when given in divided doses to mimic physiological cortisol rhythm.

**Q: Are steroid equivalences exact?**

No. These are approximations based on anti-inflammatory potency. Individual patient response varies based on metabolism, comorbidities, and the specific clinical condition.


## Related Calculators

- [Thyroid Dose](calculators/thyroid-dose.md)
- [Levothyroxine Dose](calculators/levothyroxine-dose.md)

## Comparison Calculators

