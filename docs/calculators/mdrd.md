# Mdrd

- **Slug**: `mdrd`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Estimates glomerular filtration rate using the 4-variable MDRD equation.

## Formula

```eGFR = 175 * pow(creatinine, -1.154) * pow(age, -0.203) * 0.742```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Age | number | years | Yes |
| Sex | select | — | Yes |
| Serum Creatinine | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Age | — | — | Yes |
| Sex | — | — | Yes |
| Serum Creatinine | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | G1: Normal or high | normal |
| — | G2: Mildly decreased | normal |
| — | G3a: Mild to moderate | low |
| — | G3b: Moderate to severe | low |
| — | G4: Severely decreased | low |
| — | G5: Kidney failure | critical |

## Clinical Guidance

### Advice

- MDRD has largely been replaced by CKD-EPI for routine GFR estimation.
- May still be encountered in older laboratory reports and historical records.

### Warnings

- The MDRD equation tends to underestimate GFR at higher kidney function (>60 mL/min).
- Less accurate than CKD-EPI and should not be used for new clinical decisions when CKD-EPI is available.

### Follow-up

- If transitioning from MDRD to CKD-EPI, note that eGFR values may differ and trend direction should be considered.

## Evidence

- **Source**: NKF / Levey et al.
- **Reference**: Levey AS, et al. A more accurate method to estimate glomerular filtration rate from serum creatinine: a new prediction equation. Ann Intern Med. 1999;130:461-470.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Levey AS, et al. Ann Intern Med. 1999;130:461-470.
- KDIGO 2024 Clinical Practice Guideline for CKD.

## FAQ

**Q: Is MDRD still used clinically?**

Most laboratories have transitioned to CKD-EPI, but MDRD may still appear on older reports. CKD-EPI is now preferred.

**Q: Why is MDRD less accurate at higher GFR?**

The MDRD equation was developed in patients with known CKD and was not validated in healthy individuals, leading to underestimation at higher GFR values.


## Related Calculators

- [Ckd Epi 2021](calculators/ckd-epi-2021.md)
- [Cockcroft Gault](calculators/cockcroft-gault.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

