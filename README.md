# MedCalcHub

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-stable-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/license-MIT-green)

**Open-source medical calculators for healthcare professionals, students, and AI systems.**

---

## Overview

MedCalcHub is a modern platform for medical calculators, clinical decision support, and healthcare education. It includes a powerful generator engine that transforms minimal knowledge definitions into production-ready calculators with tests, documentation, localization, and healthcare interoperability exports.

---

## Features

- **34 Medical Calculators** — BMI, eGFR, CURB-65, NEWS2, Anion Gap, and more
- **15 Plugin Pipeline** — Coverage, validation, quality, navigation, SEO, and more
- **10 Formula Engines** — Algebraic, score, conditional, converter, lookup, composite, BSA, clinical
- **6 Languages** — English, Amharic, French, Spanish, Arabic, Portuguese
- **FHIR R4 Export** — ObservationDefinition resources for interoperability
- **AI Context Export** — Structured JSON for AI assistants and RAG systems
- **Incremental Generation** — Only regenerate what changed
- **Performance Profiling** — Pipeline timing and cache hit rates
- **Automated Tests** — Generated test files for every calculator
- **Auto-Generated Documentation** — Markdown docs for every calculator

---

## Architecture

```
Knowledge Base (TypeScript)
        ↓
Plugin Pipeline (15 plugins)
        ↓
Code Generator
        ↓
Outputs
  ├── lib/calculators/      (TypeScript code)
  ├── tests/calculators/    (Test files)
  ├── docs/calculators/     (Documentation)
  ├── locales/              (6 languages)
  ├── exports/fhir/         (R4 resources)
  ├── exports/hl7/          (HL7 metadata)
  └── exports/ai/           (AI context)
```

---

## Folder Structure

```
MedCalcHub/
├── app/                         # Next.js pages
├── components/                  # React components
├── lib/
│   └── calculators/             # Generated calculator code
├── scripts/
│   └── generator/
│       ├── core/                # Generator engines
│       ├── knowledge/           # Knowledge definitions (34 calculators)
│       ├── plugins/             # 15 plugins
│       └── cli/                 # CLI interface
├── tests/calculators/           # Generated test files
├── docs/calculators/            # Generated documentation
├── locales/<lang>/calculators/  # Generated translations
├── exports/
│   ├── fhir/                    # FHIR R4 resources
│   ├── hl7/                     # HL7 metadata
│   └── ai/                      # AI context files
├── performance/                 # Performance reports
├── generator.config.ts          # Generator configuration
├── CHANGELOG.md
├── RELEASE_NOTES.md
├── CONTRIBUTING.md
├── ARCHITECTURE.md
├── API.md
└── ROADMAP.md
```

---

## Installation

```bash
git clone https://github.com/yalewgezahegn89-web/MedCalcHub.git
cd MedCalcHub
npm install
```

---

## Quick Start

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

---

## Commands

### Generator

```bash
# Run full generation
npm run generate

# Generate specific calculator
npm run generate -- <slug>

# View version
npm run generator version

# View configuration
npm run generator config

# View dashboard
npm run generator dashboard
```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npx vitest run --coverage
```

### TypeScript

```bash
# Type check
npx tsc --noEmit
```

---

## Generator Pipeline

```
Coverage Report (10)
    ↓
Knowledge Validator (20)
    ↓
Auto Fix (30)
    ↓
Quality Score (40)
    ↓
Dependency Graph (50)
    ↓
Navigation Engine (60)
    ↓
SEO Engine (70)
    ↓
Recommendation Engine (80)
    ↓
Impact Analysis (90)
    ↓
Documentation (95)
    ↓
Internationalization (96)
    ↓
FHIR Export (97)
    ↓
AI Context Export (98)
    ↓
Incremental Generation (99)
    ↓
Performance Profiler (100)
    ↓
Calculator Generator
    ↓
Test Generator
```

---

## Plugin System

All generator features are modular plugins. Each plugin is independent and configurable.

| Plugin | Order | Purpose |
|--------|-------|---------|
| Coverage Report | 10 | Knowledge coverage analysis |
| Knowledge Validator | 20 | Metadata validation |
| Auto Fix | 30 | Automatic metadata repair |
| Quality Score | 40 | Per-calculator grading |
| Dependency Graph | 50 | Cross-calculator relationships |
| Navigation | 60 | Breadcrumbs, related links |
| SEO | 70 | Structured data, OpenGraph |
| Recommendation | 80 | Smart suggestions |
| Impact Analysis | 90 | Calculator importance |
| Documentation | 95 | Auto-generated Markdown |
| Internationalization | 96 | 6-language locales |
| FHIR Export | 97 | R4 ObservationDefinition |
| AI Context | 98 | Structured JSON for AI |
| Incremental | 99 | Change detection |
| Performance | 100 | Timing metrics |

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

---

## Documentation

- [Architecture](ARCHITECTURE.md) — System design and components
- [API Reference](API.md) — Stable public interfaces
- [Contributing](CONTRIBUTING.md) — How to contribute
- [Changelog](CHANGELOG.md) — Version history
- [Release Notes](RELEASE_NOTES.md) — v1.0.0 release details
- [Roadmap](ROADMAP.md) — Future plans
- [Configuration](docs/configuration.md) — Settings reference

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding calculators, plugins, and formula types.

---

## Tech Stack

- **Framework:** Next.js 16, React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest
- **Build:** Node.js

---

## License

MIT

---

## Author

Developed by **Yalew Gezahegn**