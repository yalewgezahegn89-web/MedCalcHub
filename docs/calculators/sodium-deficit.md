# Sodium Deficit

- **Slug**: `sodium-deficit`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Estimates sodium deficit for hyponatremia correction planning. Helps determine the total amount of sodium needed to raise serum sodium to a target level.

## Formula

```Sodium Deficit = 0.6 * weight * (desiredNa - currentNa)```

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
| — | Deficit below normal range | low |
| — | Normal (no deficit) | normal |
| — | Sodium deficit present | high |
| — | Large sodium deficit | critical |

## Clinical Guidance

### Advice

- Total body water (TBW) is estimated as 0.6 × body weight in men and 0.5 × body weight in women; this calculator uses 0.6 × weight as the default.
- This estimate represents the TOTAL sodium deficit; do not attempt to correct the full deficit rapidly.
- Limit sodium correction to 8–10 mmol/L in the first 24 hours and 18 mmol/L in 48 hours to reduce the risk of osmotic demyelination syndrome (ODS).

### Warnings

- Rapid correction of hyponatremia can cause osmotic demyelination syndrome (ODS), a devastating neurological complication.
- The calculated deficit does not account for ongoing losses or ongoing free water intake.
- In severe symptomatic hyponatremia, use hypertonic saline and follow institutional protocols rather than relying solely on this formula.

### Follow-up

- Check serum sodium every 2–4 hours during active correction to ensure safe rates.
- If sodium correction is too rapid, consider D5W infusion or desmopressin to slow or reverse the correction.
- After achieving the target, identify and treat the underlying cause of hyponatremia.

## Evidence

- **Source**: Nephrology / Internal Medicine
- **Reference**: Adrogue HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Adrogue HJ, Madias NE. N Engl J Med. 2000;342:1581–1589.
- Sterns RH. Disorders of plasma sodium. N Engl J Med. 2015;372:55–65.

## FAQ

**Q: How is the sodium deficit calculated?**

The sodium deficit is calculated as: TBW × (Target Na − Current Na), where TBW is estimated as 0.6 × body weight (men) or 0.5 × body weight (women). This gives the total millimoles of sodium needed to reach the target.

**Q: How fast should I correct sodium?**

For chronic hyponatremia, limit correction to 8–10 mmol/L in 24 hours and 18 mmol/L in 48 hours to avoid osmotic demyelination syndrome. For acute, severely symptomatic hyponatremia, a more rapid correction may be warranted using hypertonic saline.

**Q: What if I overshoot the target?**

If sodium is corrected too rapidly, immediately slow or stop sodium replacement. D5W infusion and/or desmopressin (DDAVP) can be used to bring the sodium back down to a safe range.


## Related Calculators

- [Free Water Deficit](calculators/free-water-deficit.md)
- [Corrected Sodium](calculators/corrected-sodium.md)
- [Serum Osmolality](calculators/serum-osmolality.md)
- [Fluid Requirement](calculators/fluid-requirement.md)

## Comparison Calculators

