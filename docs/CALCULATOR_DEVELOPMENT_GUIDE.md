# MedCalcHub Calculator Development Guide

## Overview

Every calculator added to MedCalcHub follows the same architecture.

A calculator consists of:

- Calculator Definition
- FAQ
- Clinical Guidance
- Evidence
- Comparison
- Related Calculators

---

# Folder Structure

lib/calculators/

├── bmi.ts
├── ckd-epi-2021.ts
├── acr.ts

├── faqs/
├── evidence/
├── clinical/
├── comparisons/
├── related/

---

# Development Workflow

## Step 1

Create the calculator definition.

Example:

lib/calculators/new-calculator.ts

---

## Step 2

Register the calculator.

registry.ts

---

## Step 3

Create FAQ.

faqs/new-calculator.ts

---

## Step 4

Create Clinical Guidance.

clinical/new-calculator.ts

---

## Step 5

Create Evidence.

evidence/new-calculator.ts

---

## Step 6

Create Comparison.

comparisons/new-calculator.ts

---

## Step 7

Create Related Calculators.

related/new-calculator.ts

---

## Step 8

Attach all resources inside the calculator definition.

Example:

faq: xxxFaq

clinical: xxxClinical

evidence: xxxEvidence

comparison: xxxComparison

relatedCalculators: xxxRelatedCalculators

---

## Step 9

Compile

npx tsc --noEmit

No errors allowed.

---

## Step 10

Test

✓ Inputs

✓ Formula

✓ Result

✓ Interpretation

✓ Mobile Layout

✓ SEO

✓ JSON-LD

✓ PDF Export

✓ History

✓ Favorites

---

## Commit

Example

git add .

git commit -m "Add KDIGO AKI calculator"

git push