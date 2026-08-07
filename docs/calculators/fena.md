# Fena

- **Slug**: `fena`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Calculates the fractional excretion of sodium to distinguish prerenal azotemia from acute tubular necrosis.

## Formula

```FENa = (urinena / plasmana) / (urinecr / plasmacr) * 100```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Urine Sodium | number | mmol/L | Yes |
| Plasma Sodium | number | mmol/L | Yes |
| Urine Creatinine | number | mg/dL | Yes |
| Plasma Creatinine | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Urine Sodium | — | — | Yes |
| Plasma Sodium | — | — | Yes |
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

- FENa < 1% suggests prerenal azotemia; FENa > 2% suggests intrinsic renal injury (e.g. acute tubular necrosis).
- Use urine studies and clinical context to guide interpretation.

### Warnings

- FENa may be unreliable in patients receiving diuretics, which increase urinary sodium excretion.
- In the elderly and in chronic kidney disease, FENa may not accurately distinguish prerenal from intrinsic causes.

### Follow-up

- If FENa is equivocal (1–2%), consider FEUrea as a complementary test.
- Repeat urine electrolytes if the clinical picture does not match the initial result.

## Evidence

- **Source**: Nephrology Literature
- **Reference**: Carvounis CP, et al. Significance of fractional excretion of sodium in the diagnosis of acute renal failure. Kidney Int. 2002;62:1184-1191.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Renal physiology references
- Clinical nephrology references

## FAQ

**Q: What does FENa < 1% mean?**

A FENa < 1% suggests prerenal azotemia, meaning the kidneys are appropriately retaining sodium in response to decreased perfusion.

**Q: When is FENa unreliable?**

FENa is unreliable in patients on diuretics, in chronic kidney disease, and in the elderly. Consider FEUrea in these situations.


## Related Calculators

- [Feurea](calculators/feurea.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)
- [Fractional Excretion Calculator](calculators/fractional-excretion-calculator.md)
- [Ttkg](calculators/ttkg.md)

## Comparison Calculators

