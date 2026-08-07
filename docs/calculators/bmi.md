# Bmi

- **Slug**: `bmi`
- **Category**: Anthropometry
- **Specialty**: General Medicine

> Calculates Body Mass Index.

## Formula

```weight / (height * height)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Weight | number | kg | Yes |
| Height | number | cm | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Weight | — | — | Yes |
| Height | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Underweight | low |
| — | Normal weight | normal |
| — | Overweight | high |
| — | Obesity | critical |

## Clinical Guidance

### Advice

- Maintain a balanced diet and regular physical activity.
- Assess cardiovascular and metabolic risk factors when clinically indicated.

### Warnings

- BMI may not accurately reflect body composition in athletes, elderly patients, or individuals with significant muscle mass.

### Follow-up

- Interpret BMI together with clinical history and physical examination.
- Consider additional risk assessment based on the patient's overall health profile.

## Evidence

- **Source**: TODO
- **Reference**: TODO

## FAQ

**Q: What is BMI?**

BMI is a screening tool that estimates body fat using height and weight.

**Q: Can BMI diagnose obesity?**

No. BMI is only a screening tool and should always be interpreted together with clinical findings.


## Related Calculators

- [Bmi](calculators/bmi.md)
- [Bsa](calculators/bsa.md)

## Comparison Calculators

- [Bmi](calculators/bmi.md)
- [Bsa](calculators/bsa.md)
- [Thyroid Dose](calculators/thyroid-dose.md)
- [Levothyroxine Dose](calculators/levothyroxine-dose.md)
- [Sodium Deficit](calculators/sodium-deficit.md)
- [Free Water Deficit](calculators/free-water-deficit.md)
- [Cockcroft Gault](calculators/cockcroft-gault.md)
