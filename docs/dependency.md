# Dependency Graph

**Total Nodes**: 34
**Orphan Calculators**: 0
**Circular Dependencies**: 61

## Statistics

- **Total**: 34
- **Connected**: 34
- **Orphans**: 0
- **Circular Groups**: 61
- **Average Connections**: 5

## Clusters

- **Nephrology**: 9 calculators
- **Endocrinology**: 8 calculators
- **Internal Medicine**: 7 calculators
- **Emergency**: 5 calculators
- **Anthropometry**: 2 calculators
- **Cardiology**: 2 calculators
- **Laboratory**: 1 calculators

## Circular Dependencies

- bmi
- bmi → bsa
- bsa
- levothyroxine-dose → thyroid-dose
- bmi → bsa → levothyroxine-dose → thyroid-dose
- bmi → bsa → thyroid-dose
- free-water-deficit → sodium-deficit
- corrected-sodium → free-water-deficit → sodium-deficit
- corrected-sodium → free-water-deficit
- osmolar-gap → serum-osmolality
- anion-gap → corrected-anion-gap
- anion-gap → corrected-anion-gap → osmolar-gap → serum-osmolality
- anion-gap → corrected-anion-gap → osmolar-gap
- ckd-epi-2021 → cockcroft-gault
- ckd-epi-2021 → cockcroft-gault → mdrd
- cockcroft-gault → mdrd
- bun-creatinine-ratio → ckd-epi-2021 → cockcroft-gault → mdrd
- bun-creatinine-ratio → ckd-epi-2021 → cockcroft-gault
- albumin-creatinine-ratio → ckd-epi-2021
- fena → feurea
- albumin-creatinine-ratio → bun-creatinine-ratio → ckd-epi-2021 → fena → feurea
- fena → feurea → ttkg
- feurea → ttkg
- albumin-creatinine-ratio → bun-creatinine-ratio → ckd-epi-2021 → fena → feurea → ttkg
- albumin-creatinine-ratio → bun-creatinine-ratio → ckd-epi-2021 → fena
- bun-creatinine-ratio → ckd-epi-2021
- anion-gap → corrected-anion-gap → corrected-calcium
- anion-gap → osmolar-gap → serum-osmolality
- anion-gap → osmolar-gap
- corrected-sodium → serum-osmolality
- corrected-sodium → free-water-deficit → serum-osmolality → sodium-deficit
- map
- heart-rate → map
- heart-rate
- heart-rate → map → qsofa
- heart-rate → qsofa
- qsofa
- heart-rate → map → news2 → qsofa
- heart-rate → news2 → qsofa
- news2 → qsofa
- news2
- heart-rate → map → news2 → qsofa → shock-index
- heart-rate → news2 → qsofa → shock-index
- news2 → qsofa → shock-index
- news2 → shock-index
- shock-index
- curb-65 → heart-rate → map → news2 → qsofa → shock-index
- curb-65 → heart-rate → news2 → qsofa → shock-index
- curb-65 → news2 → qsofa → shock-index
- curb-65 → news2 → shock-index
- curb-65 → shock-index
- curb-65
- gcs
- homa-b → homa-ir
- homa-b → homa-ir → insulin-sensitivity
- homa-b → insulin-sensitivity
- a1c-eag-converter → estimated-average-glucose
- a1c-eag-converter → estimated-average-glucose → homa-b → homa-ir → insulin-sensitivity
- a1c-eag-converter → estimated-average-glucose → homa-b → insulin-sensitivity
- a1c-eag-converter → homa-b → homa-ir → insulin-sensitivity
- a1c-eag-converter → homa-b → insulin-sensitivity
