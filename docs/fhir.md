# FHIR / HL7 Export

## Purpose

This directory contains FHIR-compatible and HL7-style metadata exports for all calculators.
These exports enable integration with healthcare information systems.

## FHIR Structure

Each calculator is exported as a FHIR `ObservationDefinition` resource:

```json
{
  "resourceType": "ObservationDefinition",
  "id": "<slug>",
  "name": "Calculator Name",
  "status": "active",
  "category": "...",
  "specialty": "...",
  "description": "...",
  "inputs": [...],
  "output": { "type": "...", "unit": "..." }
}
```

## HL7 Structure

Each calculator is exported with HL7-style metadata:

```json
{
  "calculator": "Calculator Name",
  "version": "1.0",
  "category": "...",
  "inputs": [...]
}
```

## How to Import

### FHIR

1. Load the JSON file from `exports/fhir/<slug>.json`
2. Parse as JSON and use as a FHIR ObservationDefinition resource
3. Register with your FHIR server or use for validation

### HL7

1. Load the JSON file from `exports/hl7/<slug>.json`
2. Use the metadata to map calculator inputs/outputs to HL7 message segments

## How to Extend

1. To add new fields to FHIR resources, edit `buildFhirResource()` in `scripts/generator/plugins/fhir.ts`
2. To add new fields to HL7 resources, edit `buildHl7Resource()` in `scripts/generator/plugins/fhir.ts`
3. Run `npm run generate` to regenerate all exports
