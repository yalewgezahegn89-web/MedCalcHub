# Corrected Sodium

- **Slug**: `corrected-sodium`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Corrects serum sodium for hyperglycemia using the conventional correction factor. Hyperglycemia draws water into the extracellular space, diluting sodium; this correction estimates what sodium would be at a normal glucose level.

## Formula

```Corrected Sodium = Measured Sodium + 1.6 × (Glucose − 100) / 100```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Measured Sodium | number | mmol/L | Yes |
| Glucose | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Measured Sodium | — | — | Yes |
| Glucose | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Hyponatremia (corrected) | low |
| — | Normal corrected sodium | normal |
| — | Hypernatremia (corrected) | high |
| — | Severe hypernatremia | critical |

## Clinical Guidance

### Advice

- Use corrected sodium in patients with significant hyperglycemia (e.g. diabetic ketoacidosis, hyperosmolar hyperglycemic state) to assess the true sodium status.
- A normal corrected sodium with a low measured sodium indicates true dilutional hyponatremia; a low corrected sodium indicates true coexisting hyponatremia.
- For every 100 mg/dL increase in glucose above 100, sodium decreases by approximately 1.6 mmol/L.

### Warnings

- This correction factor (1.6) is the conventional value; some references use 2.0–2.4 for extreme hyperglycemia.
- The formula assumes glucose is in mg/dL; results will be incorrect if mmol/L is used.
- This correction is less accurate in patients with concurrent disorders affecting water and sodium handling (e.g. renal failure, SIADH).

### Follow-up

- If corrected sodium is high, the patient has true hypernatremia; assess free water deficit.
- If corrected sodium is low, treat the underlying hyponatremia alongside hyperglycemia management.
- Recheck sodium as glucose normalizes during treatment, especially in DKA.

## Evidence

- **Source**: Internal Medicine / Endocrinology
- **Reference**: Hillier TA, et al. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399–403.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Hillier TA, et al. Am J Med. 1999;106:399–403.
- Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.

## FAQ

**Q: Why does hyperglycemia lower sodium?**

High glucose increases serum osmolality, drawing water from the intracellular to the extracellular space. This dilutes the serum sodium, causing a falsely low measured value. The corrected sodium estimates what the sodium would be at a normal glucose.

**Q: What correction factor should I use?**

The conventional correction factor is 1.6 mmol/L for every 100 mg/dL increase in glucose above 100 mg/dL. For very high glucose (> 400 mg/dL), some experts use a factor of 2.0–2.4.

**Q: When should I correct sodium for glucose?**

Correct sodium whenever glucose is significantly elevated (> 200 mg/dL), especially in diabetic ketoacidosis (DKA) and hyperosmolar hyperglycemic state (HHS), to accurately assess the patient's true sodium status.


## Related Calculators

- [Sodium Deficit](calculators/sodium-deficit.md)
- [Free Water Deficit](calculators/free-water-deficit.md)
- [Serum Osmolality](calculators/serum-osmolality.md)
- [Anion Gap](calculators/anion-gap.md)

## Comparison Calculators

