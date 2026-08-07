# Levothyroxine Dose

- **Slug**: `levothyroxine-dose`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Estimates levothyroxine dose for thyroid hormone replacement, accounting for patient age and cardiac risk factors.

## Formula

```Dose = 1.6 * weight```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Body Weight | number | kg | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Body Weight | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Conservative starting dose | low |
| — | Moderate dose | normal |
| — | Full replacement dose | high |

## Clinical Guidance

### Advice

- Young healthy patients can often start at the full calculated dose.
- Elderly patients (> 65 years) or those with cardiac history should start at 25–50 µg/day and titrate by 12.5–25 µg every 6–8 weeks.
- Pregnancy typically requires a 25–50% dose increase; monitor TSH monthly in the first trimester.

### Warnings

- Never start full replacement dose in patients with known cardiac disease without careful uptitration.
- Excess levothyroxine causes iatrogenic thyrotoxicosis, increasing risk of atrial fibrillation and bone loss.
- Drug interactions: iron, calcium, PPIs, cholestyramine, and aluminium all reduce absorption.

### Follow-up

- Check TSH 6–8 weeks after initiation or dose change.
- Titrate in 12.5–25 µg increments to target TSH.
- In pregnancy, check TSH every 4 weeks in first trimester.

## Evidence

- **Source**: ATA / ETA
- **Reference**: Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Jonklaas J, et al. Thyroid. 2014;24:1670–1751.
- ATA Guidelines. 2014.
- ETA Clinical Practice Guidelines.

## FAQ

**Q: What is the difference between Thyroid Dose and Levothyroxine Dose calculators?**

Both use the same 1.6 µg/kg/day formula. Thyroid Dose provides the estimate, while Levothyroxine Dose includes clinical guidance on titration, cardiac precautions, and pregnancy adjustments.

**Q: How quickly can levothyroxine dose be increased?**

In healthy patients, dose can be titrated every 6–8 weeks. In elderly or cardiac patients, increase more slowly (every 6–12 weeks).

**Q: Does levothyroxine need to be taken on an empty stomach?**

Yes. Take 30–60 minutes before breakfast with water only. Separate from calcium, iron supplements, and PPIs.


## Related Calculators

- [Thyroid Dose](calculators/thyroid-dose.md)
- [Bmi](calculators/bmi.md)

## Comparison Calculators

