# Free Water Deficit

- **Slug**: `free-water-deficit`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Estimates free water deficit in hypernatremia. Helps quantify the amount of free water needed to restore normal sodium levels.

## Formula

```Free Water Deficit = 0.6 * weight * (currentNa / desiredNa - 1)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Weight | number | kg | Yes |
| Current Sodium | number | mmol/L | Yes |
| Desired Sodium | number | mmol/L | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Weight | — | — | Yes |
| Current Sodium | — | — | Yes |
| Desired Sodium | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | No deficit | normal |
| — | Mild free water deficit | low |
| — | Moderate free water deficit | high |
| — | Severe free water deficit | critical |

## Clinical Guidance

### Advice

- Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.
- This estimate represents the free water deficit only; do not forget to continue ongoing maintenance fluids.
- Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours to avoid cerebral edema.

### Warnings

- The formula does not account for ongoing losses (GI, renal, insensible), which must be added to the replacement rate.
- Rapid correction of hypernatremia can cause cerebral edema, which can be fatal.
- In patients with underlying brain injury, rapid reduction in serum osmolality is particularly dangerous.

### Follow-up

- Monitor serum sodium every 2–4 hours during correction.
- If sodium correction is too rapid, reduce the rate and reassess.
- After achieving the target, identify and treat the underlying cause of hypernatremia (e.g. inadequate free water intake, diabetes insipidus, osmotic diuresis).

## Evidence

- **Source**: Nephrology / Internal Medicine
- **Reference**: Adrogue HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1493–1499.
- Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65.

## FAQ

**Q: How is the free water deficit calculated?**

The free water deficit is calculated as: TBW × (Current Na / Target Na − 1), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total liters of free water needed.

**Q: How fast should I correct hypernatremia?**

Correct hypernatremia slowly—no more than 0.5 mmol/L per hour or 10–12 mmol/L per 24 hours. Faster correction risks cerebral edema as water shifts into brain cells.

**Q: Should I use D5W or hypotonic saline?**

D5W (which becomes free water after glucose metabolism) or hypotonic saline (0.45% NaCl) are commonly used. The choice depends on the patient's volume status—hypotonic saline for hypovolemic hypernatremia, D5W for euvolemic or hypervolemic patients.

**Q: What if the patient has ongoing losses?**

Add estimated ongoing losses (GI losses, urinary output) to the calculated deficit. Ongoing losses must be replaced in addition to the free water deficit.


## Related Calculators

- [Sodium Deficit](calculators/sodium-deficit.md)
- [Corrected Sodium](calculators/corrected-sodium.md)
- [Serum Osmolality](calculators/serum-osmolality.md)
- [Maintenance Fluids](calculators/maintenance-fluids.md)

## Comparison Calculators

