# Osmolar Gap

- **Slug**: `osmolar-gap`
- **Category**: Internal Medicine
- **Specialty**: Internal Medicine

> Calculates the osmolar gap as the difference between measured and calculated serum osmolality. An elevated osmolar gap may suggest toxic alcohol ingestion (methanol, ethylene glycol) or other osmotically active substances.

## Formula

```measured - (2 * sodium + glucose / 18 + bun / 2.8)```

## Inputs

| Input | Type | Unit | Required |
|-------|------|------|----------|
| Measured Osmolality | number | mOsm/kg | Yes |
| Sodium | number | mmol/L | Yes |
| Glucose | number | mg/dL | Yes |
| BUN | number | mg/dL | Yes |

## Validation

| Input | Min | Max | Required |
|-------|-----|-----|----------|
| Measured Osmolality | — | — | Yes |
| Sodium | — | — | Yes |
| Glucose | — | — | Yes |
| BUN | — | — | Yes |

## Classification

| Range | Label | Status |
|-------|-------|--------|
| — | Negatively elevated gap (lab error or dilutional) | low |
| — | Normal osmolar gap | normal |
| — | Elevated osmolar gap | high |
| — | Markedly elevated osmolar gap — toxic ingestion likely | critical |

## Clinical Guidance

### Advice

- An osmolar gap > 10 mOsm/kg in the context of a suspected toxic ingestion should raise concern for toxic alcohols (methanol, ethylene glycol, isopropanol) or other ingestions (propylene glycol, ethanol).
- Always interpret the osmolar gap alongside the anion gap—both may be elevated in toxic alcohol ingestions.
- A normal osmolar gap does not completely exclude toxic ingestion, particularly in delayed presentations where metabolism has occurred.

### Warnings

- The measured osmolality must be obtained from the laboratory; do not use the calculated value.
- Ethanol elevates osmolality. If ethanol is present, subtract its contribution (Ethanol / 4.6) before interpreting the gap.
- DKA, starvation, renal failure, and recent alcohol intoxication can all affect the osmolar gap.

### Follow-up

- If the osmolar gap is elevated and toxic ingestion is suspected, obtain serum toxic alcohol levels (methanol, ethylene glycol, isopropanol).
- Consider fomepizole or ethanol therapy if a toxic alcohol ingestion is confirmed or strongly suspected.
- Repeat the osmolar gap after treatment to confirm resolution.

## Evidence

- **Source**: Emergency Medicine / Toxicology
- **Reference**: Brent J, et al. Fomepizole for the treatment of methanol poisoning. N Engl J Med. 2001;344:424–429.
- **Reviewed by**: MedCalcHub Clinical Team
- **Updated**: 2026-08

- Brent J, et al. N Engl J Med. 2001;344:424–429.
- Tintinalli's Emergency Medicine, 9th Ed.
- UpToDate: Osmolar gap.

## FAQ

**Q: What does an elevated osmolar gap mean?**

An elevated osmolar gap (> 10 mOsm/kg) indicates the presence of unmeasured osmotically active substances. In the emergency setting, this may suggest toxic alcohol ingestion (methanol, ethylene glycol), ethanol, or propylene glycol. Other causes include DKA, uremia, and alcohol intoxication.

**Q: Can the osmolar gap be normal in toxic ingestion?**

Yes. In delayed presentations of toxic alcohol ingestion, the parent alcohol may have been metabolized to its toxic metabolites, normalizing the osmolar gap while toxicity persists. The anion gap may be elevated in these cases.

**Q: What is the normal osmolar gap?**

A normal osmolar gap is generally considered to be between -10 and +10 mOsm/kg. Values above this range are considered elevated.


## Related Calculators

- [Serum Osmolality](calculators/serum-osmolality.md)
- [Anion Gap](calculators/anion-gap.md)
- [Corrected Anion Gap](calculators/corrected-anion-gap.md)
- [Bun Creatinine Ratio](calculators/bun-creatinine-ratio.md)

## Comparison Calculators

