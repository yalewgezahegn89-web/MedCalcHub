# Feurea

- **Slug**: `feurea`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Calculates the fractional excretion of urea for renal evaluation, particularly useful when diuretics are present.

## Formula

```FEUrea = (urineurea / plasmaurea) / (urinecr / plasmacr) * 100```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Urine Urea | number | mg/dL | Yes |
| Plasma Urea | number | mg/dL | Yes |
| Urine Creatinine | number | mg/dL | Yes |
| Plasma Creatinine | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Urine Urea | — | — | Yes |
| Plasma Urea | — | — | Yes |
| Urine Creatinine | — | — | Yes |
| Plasma Creatinine | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Prerenal azotemia | low |
| — | Indeterminate | normal |
| — | Intrinsic renal injury (ATN) | high |

## Clinical Guidance

### Advice

- FEUrea can be useful when diuretics are present and FENa is less reliable.
- FEUrea < 35% suggests prerenal azotemia; > 50% suggests intrinsic renal injury.

### Warnings

- FEUrea is less widely validated than FENa and should be used as a complementary test.
- Protein intake and corticosteroids can affect urea handling and may alter the ratio.

### Follow-up

- If FEUrea is equivocal, combine with clinical assessment and other urine biomarkers.
- Consider renal ultrasound if intrinsic renal injury is suspected.

## Evidence

- **Source**: Nephrology Literature
- **Reference**: Pépin MN, et al. Reassessment of the fractional excretion of urea for the differential diagnosis of acute renal failure. Clin Invest Med. 2007;30:E163-167.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Renal physiology references
- Clinical nephrology references

## FAQ

**Q: When should I use FEUrea instead of FENa?**

Use FEUrea when the patient has received diuretics, which can increase urinary sodium and make FENa unreliable.

**Q: What does FEUrea > 50% mean?**

A FEUrea > 50% suggests intrinsic renal injury such as acute tubular necrosis.


## Related Calculators

- [Fena](calculators/fena.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)
- [Fractional Excretion Calculator](calculators/fractional-excretion-calculator.md)
- [Ttkg](calculators/ttkg.md)

## Comparison Calculators

