# Architecture — MedCalcHub Generator

## Overview

The MedCalcHub Generator follows a pipeline architecture: **Knowledge → Validation → Plugins → Generation → Outputs**.

```
Knowledge Definitions (34 calculators)
        ↓
   Validation Layer
        ↓
   Plugin Pipeline (15 plugins)
        ↓
   Code Generator
        ↓
   Generated Outputs
```

---

## Knowledge Layer

Knowledge definitions are TypeScript objects in `scripts/generator/knowledge/<category>.ts`.

Each calculator has: slug, category, specialty, description, formula, inputs, classification, FAQ, evidence, clinical guidance, related calculators, and comparison calculators.

---

## Validation Layer

### Knowledge Validator (`scripts/generator/knowledge-validator.ts`)
Validates all knowledge definitions for completeness and correctness. Reports errors and warnings per calculator.

### Auto Fix (`scripts/generator/core/auto-fix.ts`)
Automatically repairs missing metadata fields (FAQ, evidence, related calculators, comparisons, clinical guidance, classification).

---

## Plugin Pipeline

Plugins execute sequentially by `order`. Each plugin is independent and receives a shared context.

### Coverage Report (order: 10)
Analyzes knowledge coverage across all calculators. Reports formula type distribution, metadata coverage, and category breakdown.

### Knowledge Validator (order: 20)
Runs full validation and reports errors/warnings.

### Auto Fix (order: 30)
Repairs missing metadata using intelligent defaults and cross-calculator references.

### Quality Score (order: 40)
Assigns quality grades (A+ through F) based on completeness of description, formula, inputs, classification, FAQ, evidence, and clinical guidance.

### Dependency Graph (order: 50)
Builds a relationship graph between calculators. Detects circular dependencies, orphan calculators, and clusters.

### Navigation (order: 60)
Generates navigation metadata: breadcrumbs, previous/next links, related calculators, and see-also recommendations.

### SEO (order: 70)
Generates OpenGraph metadata, Twitter Cards, Breadcrumb Schema, and FAQ Schema for each calculator.

### Recommendation Engine (order: 80)
Generates personalized calculator recommendations using multi-factor scoring (specialty, category, dependencies, comparison).

### Impact Analysis (order: 90)
Ranks calculators by importance based on connectivity, usage potential, and dependency count.

### Documentation (order: 95)
Generates Markdown documentation for every calculator plus index files for categories, specialties, coverage, quality, navigation, and dependency.

### Internationalization (order: 96)
Generates locale JSON files for 6 languages with placeholder translations.

### FHIR Export (order: 97)
Exports every calculator as FHIR R4 ObservationDefinition resources and HL7-style metadata.

### AI Context Export (order: 98)
Exports structured JSON knowledge for AI assistants, RAG systems, chatbots, LLMs, and clinical decision support.

### Incremental Generation (order: 99)
Computes SHA-256 hashes of knowledge data. Only marks changed calculators for regeneration. Removes outputs of deleted calculators.

### Performance Profiler (order: 100)
Measures execution time of every plugin. Prints performance report and saves `performance/latest.json`.

---

## Core Engines

### Formula Intelligence (`scripts/generator/core/formula-intelligence.ts`)
Detects formula type from knowledge definitions and routes to appropriate builder.

### Formula Builders (`scripts/generator/core/formula/`)
- `build-algebraic.ts` — Mathematical expressions
- `build-score.ts` — Point-based scoring systems
- `build-conditional.ts` — If/else logic
- `build-converter.ts` — Unit conversions
- `build-lookup.ts` — Table lookups
- `build-composite.ts` — Multi-formula combinations
- `build-descriptive.ts` — Non-numeric calculators
- `build-bsa.ts` — Body surface area formulas
- `build-clinical.ts` — Clinical decision rules

### Dispatcher (`scripts/generator/core/formula/dispatcher.ts`)
Routes formula definitions to the correct builder based on detected type.

### Calculator Generator (`scripts/generator/core/generate-calculator.ts`)
Takes metadata and inputs, renders template, writes TypeScript file.

### Test Generator (`scripts/generator/core/test-generator.ts`)
Generates automated test files for each calculator.

### Template Engine (`scripts/generator/core/template-engine.ts`)
Manages knowledge templates for scaffolding new calculators.

---

## Generated Outputs

| Output | Location | Description |
|--------|----------|-------------|
| Calculator Code | `lib/calculators/` | TypeScript calculator implementations |
| Calculator Tests | `tests/calculators/` | Automated test files |
| Documentation | `docs/calculators/` | Markdown docs per calculator |
| Locale Files | `locales/<lang>/calculators/` | JSON translations |
| FHIR Resources | `exports/fhir/` | R4 ObservationDefinition JSON |
| HL7 Resources | `exports/hl7/` | HL7-style metadata JSON |
| AI Context | `exports/ai/` | Structured JSON for AI systems |
| Performance | `performance/latest.json` | Pipeline timing metrics |
| Cache | `.generator-cache.json` | Incremental generation cache |

---

## Configuration

All settings centralized in `generator.config.ts`:
- Plugin enable/disable
- Directory paths
- Localization settings
- Formatting options
- Validation behavior

See [docs/configuration.md](docs/configuration.md) for full reference.