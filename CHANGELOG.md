# Changelog

All notable changes to the MedCalcHub Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] - 2026-08-07

### Generator V1.0.0 — Official Stable Release

#### Added

- **Configuration System** — Centralized `generator.config.ts` for all generator settings
- **Plugin Architecture** — 15 modular plugins with enable/disable control
- **Formula Engine** — 10 formula types (algebraic, score, conditional, converter, lookup, composite, descriptive, BSA, clinical, custom)
- **Knowledge Validator** — Comprehensive validation of calculator knowledge definitions
- **Auto Fix** — Automatic repair of missing metadata fields
- **Quality Score** — Per-calculator quality grading (A+ through F)
- **Dependency Graph** — Cross-calculator relationship analysis
- **Navigation Engine** — Breadcrumbs, previous/next, related, see-also links
- **SEO Engine** — OpenGraph, Twitter Cards, Breadcrumb Schema, FAQ Schema
- **Recommendation Engine** — Smart calculator recommendations with scoring
- **Impact Analysis** — Calculator importance ranking
- **Documentation Generator** — Auto-generated Markdown docs for every calculator
- **Internationalization** — 6-language locale generation (en, am, fr, es, ar, pt)
- **FHIR Export** — R4 ObservationDefinition resources
- **AI Context Export** — Structured JSON for AI assistants and RAG systems
- **Incremental Generation** — SHA-256 hash-based change detection
- **Performance Profiler** — Pipeline timing and cache hit rate reporting
- **Test Generator** — Automated calculator test generation
- **Knowledge Template Engine** — Scaffolding for new calculators
- **CLI Commands** — `generate`, `template`, `config`, `version`, `dashboard`

## [0.9.0] - 2026-08-06

### Added

- Performance Profiler with `performance/latest.json`
- Incremental Generation Engine with `.generator-cache.json`
- AI Context Export plugin
- FHIR/HL7 Export plugin

## [0.8.0] - 2026-08-05

### Added

- Internationalization plugin (6 languages)
- Documentation plugin (auto-generated Markdown)
- Impact Analysis plugin
- Recommendation Engine plugin

## [0.7.0] - 2026-08-04

### Added

- SEO Engine with structured data
- Navigation Engine with breadcrumbs
- Dependency Graph with circular detection

## [0.6.0] - 2026-08-03

### Added

- Quality Score engine with grading system
- Auto Fix engine
- Knowledge Validator plugin

## [0.5.0] - 2026-08-02

### Added

- Plugin Architecture with `loadPlugins()`
- Plugin configuration via `generator.config.ts`
- Coverage Report plugin

## [0.4.0] - 2026-08-01

### Added

- Formula Intelligence with type detection
- 10 formula builder types
- Dispatcher for formula routing

## [0.3.0] - 2026-07-31

### Added

- Knowledge base with 34 calculators
- Calculator Intelligence engine
- Input Intelligence engine
- Clinical interpretation rules

## [0.2.0] - 2026-07-30

### Added

- Calculator Generator core
- Template engine for calculator rendering
- Test Generator

## [0.1.0] - 2026-07-29

### Added

- Initial project setup
- Next.js application structure
- Basic calculator pages