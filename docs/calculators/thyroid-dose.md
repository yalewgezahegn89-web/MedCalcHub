# Thyroid Dose

- **Slug**: `thyroid-dose`
- **Category**: Endocrinology
- **Specialty**: Endocrinology

> Estimates the starting levothyroxine replacement dose for hypothyroidism based on lean body weight.

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
| — | Conservative dose | low |
| — | Moderate dose | normal |
| — | Full replacement dose | high |

## Clinical Guidance

### Advice

- The standard full replacement dose is approximately 1.6 µg/kg/day of levothyroxine.
- Elderly patients and those with cardiac disease should start at 25–50 µg/day and titrate slowly.
- Adjust dose based on TSH levels checked 6–8 weeks after initiation or dose change.

### Warnings

- This is an estimate only; individual needs vary significantly based on aetiology, thyroid reserve, and comorbidities.
- Overtreatment in elderly patients increases risk of atrial fibrillation and osteoporosis.
- Levothyroxine absorption is affected by food, iron, calcium, and proton pump inhibitors.

### Follow-up

- Check TSH and free T4 in 6–8 weeks after starting therapy.
- Titrate dose in 12.5–25 µg increments until TSH is within target.
- Monitor TSH every 6–12 months once stable.

## Evidence

- **Source**: ATA / ETA
- **Reference**: Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism. Thyroid. 2014;24:1670–1751.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Jonklaas J, et al. Thyroid. 2014;24:1670–1751.
- ATA Guidelines for Hypothyroidism. 2014.
- ETA Clinical Practice Guidelines.

## FAQ

**Q: What is the standard dose of levothyroxine?**

The full replacement dose is approximately 1.6 µg/kg/day, but many patients require less, especially the elderly or those with residual thyroid function.

**Q: When should levothyroxine be taken?**

Take on an empty stomach, 30–60 minutes before breakfast, with water only. Separate from calcium, iron, and PPIs by at least 4 hours.

**Q: How often should TSH be checked?**

TSH should be checked 6–8 weeks after any dose change and every 6–12 months once stable.


## Related Calculators

- [Levothyroxine Dose](calculators/levothyroxine-dose.md)
- [Bmi](calculators/bmi.md)

## Comparison Calculators

