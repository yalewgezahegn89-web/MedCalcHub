# Albumin Creatinine Ratio

- **Slug**: `albumin-creatinine-ratio`
- **Category**: Nephrology
- **Specialty**: Nephrology

> Calculates urine albumin-to-creatinine ratio (ACR) for CKD screening and staging.

## Formula

```ACR = albumin / creatinine```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Urine Albumin | number | mg/L | Yes |
| Urine Creatinine | number | g/L | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Urine Albumin | — | — | Yes |
| Urine Creatinine | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | A1: Normal to mildly increased | normal |
| — | A2: Moderately increased | high |
| — | A3: Severely increased | critical |

## Clinical Guidance

### Advice

- Persistent albuminuria is one of the earliest indicators of chronic kidney disease and should always be interpreted together with eGFR.
- ACR is recommended for CKD screening in patients with diabetes, hypertension, or family history of kidney disease.

### Warnings

- Diagnosing CKD from a single abnormal ACR result.
- Ignoring transient albuminuria caused by fever, exercise, or urinary tract infection.
- Using ACR alone without assessing kidney function (eGFR).

### Follow-up

- Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months.
- If ACR > 30 mg/g, repeat testing and evaluate eGFR for CKD staging.

## Evidence

- **Source**: KDIGO
- **Reference**: KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

## FAQ

**Q: What is the Albumin-to-Creatinine Ratio (ACR)?**

The Albumin-to-Creatinine Ratio estimates the amount of albumin excreted in urine while correcting for urine concentration using creatinine.

**Q: Why is ACR important?**

ACR is one of the earliest markers of kidney damage and is recommended for screening chronic kidney disease, especially in patients with diabetes or hypertension.

**Q: What is considered a normal ACR?**

An ACR below 30 mg/g is considered normal or mildly increased (A1).

**Q: When should ACR be repeated?**

Persistent albuminuria should be confirmed with at least two abnormal measurements over a period of three months.


## Related Calculators

- [Ckd Epi 2021](calculators/ckd-epi-2021.md)
- [Cockcroft Gault](calculators/cockcroft-gault.md)
- [Mdrd](calculators/mdrd.md)
- [Fena](calculators/fena.md)
- [Feurea](calculators/feurea.md)
- [Ttkg](calculators/ttkg.md)

## Comparison Calculators

