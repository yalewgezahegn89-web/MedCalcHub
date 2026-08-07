# Calcium Phosphate Product

- **Slug**: `calcium-phosphate-product`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Calculates the calcium-phosphate product used in renal risk assessment for vascular calcification.

## Formula

```CaP = calcium * phosphate```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Calcium | number | mg/dL | Yes |
| Phosphate | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Calcium | — | — | Yes |
| Phosphate | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Acceptable | normal |
| — | Elevated — increased calcification risk | high |
| — | Critically elevated — high calcification risk | critical |

## Clinical Guidance

### Advice

- An elevated calcium-phosphate product (> 55 mg²/dL²) is associated with an increased risk of vascular calcification and cardiovascular morbidity.
- This product is particularly important to monitor in patients with chronic kidney disease and those on dialysis.

### Warnings

- This should be interpreted with the patient's renal and mineral metabolism status.
- Treat phosphate elevation rather than calcium alone to reduce the calcium-phosphate product.

### Follow-up

- If elevated, assess dietary phosphorus intake and consider phosphate binders.
- Monitor parathyroid hormone (PTH) and vitamin D levels in CKD patients.

## Evidence

- **Source**: Nephrology Literature
- **Reference**: KDIGO CKD-MBD Guideline. Improving global outcomes (KDIGO) CKD-MBD update. Kidney Int Suppl. 2017;7:1-59.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Nephrology references
- Clinical practice guidelines

## FAQ

**Q: What does an elevated calcium-phosphate product mean?**

A product > 55 mg²/dL² indicates an increased risk of metastatic calcification and vascular calcification, especially in CKD patients.

**Q: How do you lower the calcium-phosphate product?**

Reduce dietary phosphorus, use phosphate binders, and optimize dialysis adequacy. Avoid excessive calcium-based binders.


## Related Calculators

- [Ckd Epi 2021](calculators/ckd-epi-2021.md)
- [Cockcroft Gault](calculators/cockcroft-gault.md)
- [Albumin Creatinine Ratio](calculators/albumin-creatinine-ratio.md)

## Comparison Calculators

