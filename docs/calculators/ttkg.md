# Ttkg

- **Slug**: `ttkg`
- **Category**: Nephrology
- **Specialty**: Internal Medicine

> Calculates the transtubular potassium gradient to assess renal potassium handling.

## Formula

```TTKG = (urinek * plasmaosmolality) / (plasmak * urineosmolality)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Urine Potassium | number | mmol/L | Yes |
| Plasma Potassium | number | mmol/L | Yes |
| Urine Osmolality | number | mOsm/kg | Yes |
| Plasma Osmolality | number | mOsm/kg | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Urine Potassium | — | — | Yes |
| Plasma Potassium | — | — | Yes |
| Urine Osmolality | — | — | Yes |
| Plasma Osmolality | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Impaired K⁺ secretion | low |
| — | Normal renal K⁺ response | normal |
| — | Enhanced K⁺ secretion | high |

## Clinical Guidance

### Advice

- TTKG is used to assess the renal response to potassium handling, particularly in the evaluation of hyperkalemia.
- A TTKG > 10 in the setting of hyperkalemia suggests intact aldosterone-mediated potassium secretion.
- A TTKG < 8 in hyperkalemia suggests impaired distal potassium secretion (e.g. hypoaldosteronism, AKI).

### Warnings

- Interpretation may be affected by diuretics and other renal conditions.
- Some experts have questioned the physiological validity of TTKG; use in conjunction with clinical assessment.

### Follow-up

- If TTKG suggests impaired potassium secretion, evaluate aldosterone and renin levels.
- Consider renal biopsy if intrinsic tubular disease is suspected.

## Evidence

- **Source**: Nephrology Literature
- **Reference**: Kamel KS, et al. Transtubular potassium gradient in the assessment of hyperkalemia. J Am Soc Nephrol. 2001;12:1839-1844.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-07

- Clinical electrolyte guidelines
- Nephrology references

## FAQ

**Q: What does a low TTKG mean in hyperkalemia?**

A low TTKG (< 8) in the setting of hyperkalemia suggests impaired aldosterone-mediated potassium secretion, possibly due to hypoaldosteronism or distal tubular dysfunction.

**Q: Is TTKG still used clinically?**

TTKG remains a useful bedside tool but some experts have questioned its physiological basis. It should be used alongside other clinical data.


## Related Calculators

- [Fena](calculators/fena.md)
- [Feurea](calculators/feurea.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

