# Ckd Epi 2021

- **Slug**: `ckd-epi-2021`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Estimates glomerular filtration rate (eGFR) using the 2021 CKD-EPI creatinine equation.

## Formula

```eGFR = 142 * pow(min(creatinine / 0.9, 1), -0.302) * pow(max(creatinine / 0.9, 1), -1.2) * pow(0.9938, age) * 1.012```

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

- Use CKD-EPI 2021 (race-free) as the preferred equation for estimating GFR in clinical practice.
- Interpret eGFR alongside albuminuria (ACR) for CKD staging per KDIGO guidelines.
- Repeat testing after 3 months to confirm chronicity before diagnosing CKD.

### Warnings

- CKD-EPI is an estimate and may be inaccurate in extremes of muscle mass, amputees, or pregnancy.
- Do not use CKD-EPI for medication dosing without checking drug-specific guidance; Cockcroft-Gault may be required.

### Follow-up

- If eGFR < 60 mL/min/1.73 m², repeat within 3 months to assess for chronicity.
- Evaluate for albuminuria with urine ACR in all patients with reduced eGFR.
- Refer to nephrology if eGFR < 30 or rapidly declining.

## Evidence

- **Source**: NKF / KDIGO
- **Reference**: Inker LA, et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. NEJM. 2021;385:1737-1749.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Inker LA, et al. NEJM. 2021.
- KDIGO 2024 Clinical Practice Guideline for CKD.

## FAQ

**Q: What does eGFR measure?**

eGFR estimates how well the kidneys are filtering waste from the blood, expressed in mL/min/1.73 m².

**Q: Why was the race variable removed from CKD-EPI?**

The 2021 equation removed race because including it was not scientifically justified and contributed to health disparities in CKD detection.

**Q: Is CKD-EPI better than MDRD?**

Yes. CKD-EPI is more accurate at higher GFR values and is now the preferred equation in most guidelines.


## Related Calculators

- [Cockcroft Gault](calculators/cockcroft-gault.md)
- [Mdrd](calculators/mdrd.md)
- [Albumin Creatinine Ratio](calculators/albumin-creatinine-ratio.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

