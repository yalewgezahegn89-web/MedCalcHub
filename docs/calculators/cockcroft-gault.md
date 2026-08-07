# Cockcroft Gault

- **Slug**: `cockcroft-gault`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Estimates creatinine clearance (CrCl) for medication dosing using the Cockcroft-Gault equation.

## Formula

```CrCl = ((140 - age) * weight) / (72 * creatinine) * 0.85```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Age | number | years | Yes |
| Weight | number | kg | Yes |
| Sex | select | — | Yes |
| Serum Creatinine | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Age | — | — | Yes |
| Weight | — | — | Yes |
| Sex | — | — | Yes |
| Serum Creatinine | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Normal renal function | normal |
| — | Mild renal impairment | normal |
| — | Moderate renal impairment | low |
| — | Severe renal impairment | low |
| — | Kidney failure | critical |

## Clinical Guidance

### Advice

- Use actual body weight unless adjusted body weight is clinically indicated (e.g. obesity).
- Cockcroft-Gault remains the preferred equation for many drug dosing recommendations.
- Use stable serum creatinine; avoid using values during acute kidney injury for chronic dosing.

### Warnings

- Not recommended for unstable kidney function or acute kidney injury.
- Overestimates creatinine clearance in elderly patients with low muscle mass.
- Does not provide direct GFR estimation; use CKD-EPI for CKD staging.

### Follow-up

- Verify drug-specific dosing guidelines for renal adjustment thresholds.
- Monitor renal function periodically in patients with CrCl < 50 mL/min.

## Evidence

- **Source**: Original Publication
- **Reference**: Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31-41.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Cockcroft DW, Gault MH. Nephron. 1976;16:31-41.
- KDIGO Clinical Practice Guideline.

## FAQ

**Q: When should I use Cockcroft-Gault instead of CKD-EPI?**

Use Cockcroft-Gault when adjusting medication doses, as many drug labels still reference CrCl from this equation.

**Q: What weight should I use in the Cockcroft-Gault equation?**

Use actual body weight by default. Adjusted body weight may be used in obese patients per institutional guidelines.


## Related Calculators

- [Ckd Epi 2021](calculators/ckd-epi-2021.md)
- [Mdrd](calculators/mdrd.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

