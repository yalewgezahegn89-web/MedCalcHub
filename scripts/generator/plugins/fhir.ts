/**
 * FHIR / HL7 Export Plugin
 *
 * Exports every calculator as FHIR-compatible
 * and HL7-style metadata.
 *
 * This plugin MUST NOT modify calculators.
 * It only generates export files.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { GeneratorPlugin } from "./types";
import { calculatorKnowledge } from "../knowledge";
import type {
  CalculatorSuggestion,
} from "../core/calculator-intelligence";
import {
  getGeneratorConfig,
} from "../core/config";

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(
  filePath: string,
  content: string,
): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf-8");
}

function formatDisplayName(slug: string): string {
  return slug
    .split("-")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

// ─────────────────────────────────────────────────
// FHIR Resource Builder
// ─────────────────────────────────────────────────

interface FhirInput {
  id: string;
  type: string;
  unit: string;
}

interface FhirOutput {
  type: string;
  unit: string;
}

interface FhirResource {
  resourceType: string;
  id: string;
  name: string;
  status: string;
  category: string;
  specialty: string;
  description: string;
  inputs: FhirInput[];
  output: FhirOutput;
}

function mapInputType(
  inputType?: string,
): string {
  switch (inputType) {
    case "number":
      return "decimal";
    case "integer":
      return "integer";
    case "select":
      return "CodeableConcept";
    case "boolean":
      return "boolean";
    case "date":
      return "date";
    default:
      return "decimal";
  }
}

function buildFhirResource(
  slug: string,
  entry: CalculatorSuggestion,
): FhirResource {
  const inputs: FhirInput[] = [];

  if (entry.inputs) {
    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        type?: string;
        unit?: string;
      };
      inputs.push({
        id: inpObj.id,
        type: mapInputType(inpObj.type),
        unit: inpObj.unit || "",
      });
    }
  }

  // Determine output type and unit
  const output: FhirOutput = {
    type: "decimal",
    unit: "",
  };

  if (entry.formula) {
    // Try to extract unit from description
    const desc = entry.description || "";

    if (desc.includes("kg/m²")) {
      output.unit = "kg/m²";
    } else if (desc.includes("mmol/L")) {
      output.unit = "mmol/L";
    } else if (desc.includes("mg/dL")) {
      output.unit = "mg/dL";
    } else if (desc.includes("mL/min")) {
      output.unit = "mL/min";
    } else if (desc.includes("%")) {
      output.unit = "%";
    }
  }

  return {
    resourceType: "ObservationDefinition",
    id: slug,
    name: formatDisplayName(slug),
    status: "active",
    category: entry.category || "",
    specialty: entry.specialty || "",
    description: entry.description || "",
    inputs,
    output,
  };
}

// ─────────────────────────────────────────────────
// HL7 Resource Builder
// ─────────────────────────────────────────────────

interface Hl7Input {
  id: string;
  type: string;
  unit: string;
}

interface Hl7Resource {
  calculator: string;
  version: string;
  category: string;
  inputs: Hl7Input[];
}

function buildHl7Resource(
  slug: string,
  entry: CalculatorSuggestion,
): Hl7Resource {
  const inputs: Hl7Input[] = [];

  if (entry.inputs) {
    for (const inp of entry.inputs) {
      const inpObj = inp as {
        id: string;
        type?: string;
        unit?: string;
      };
      inputs.push({
        id: inpObj.id,
        type: inpObj.type || "number",
        unit: inpObj.unit || "",
      });
    }
  }

  return {
    calculator: formatDisplayName(slug),
    version: "1.0",
    category: entry.category || "",
    inputs,
  };
}

// ─────────────────────────────────────────────────
// Plugin
// ─────────────────────────────────────────────────

const plugin: GeneratorPlugin = {
  name: "FHIR Export",
  order: 97,
  enabled: true,
  execute(_context) {
    const config = getGeneratorConfig();
    const exportsDir = path.resolve(
      process.cwd(),
      config.generator.exportsDirectory,
    );
    const docsDir = path.resolve(
      process.cwd(),
      config.generator.docsDirectory,
    );
    const fhirDir = path.join(exportsDir, "fhir");
    const hl7Dir = path.join(exportsDir, "hl7");

    const knowledge =
      calculatorKnowledge as Record<
        string,
        CalculatorSuggestion
      >;

    const slugs =
      Object.keys(knowledge).sort();

    // Ensure directories exist
    ensureDir(fhirDir);
    ensureDir(hl7Dir);

    // Generate FHIR and HL7 files
    for (const slug of slugs) {
      const entry = knowledge[slug];

      // FHIR
      const fhir = buildFhirResource(slug, entry);

      writeFile(
        path.join(fhirDir, `${slug}.json`),
        JSON.stringify(fhir, null, 2) + "\n",
      );

      // HL7
      const hl7 = buildHl7Resource(slug, entry);

      writeFile(
        path.join(hl7Dir, `${slug}.json`),
        JSON.stringify(hl7, null, 2) + "\n",
      );
    }

    // Generate manifest
    const manifest = {
      generated: new Date().toISOString(),
      calculatorCount: slugs.length,
      fhirVersion: "R4",
      hl7Version: "2.x",
    };

    writeFile(
      path.join(exportsDir, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
    );

    // Generate documentation
    const docLines: string[] = [];

    docLines.push("# FHIR / HL7 Export");
    docLines.push("");
    docLines.push("## Purpose");
    docLines.push("");
    docLines.push(
      "This directory contains FHIR-compatible and HL7-style metadata exports for all calculators.",
    );
    docLines.push(
      "These exports enable integration with healthcare information systems.",
    );
    docLines.push("");

    docLines.push("## FHIR Structure");
    docLines.push("");
    docLines.push(
      "Each calculator is exported as a FHIR `ObservationDefinition` resource:",
    );
    docLines.push("");
    docLines.push("```json");
    docLines.push("{");
    docLines.push('  "resourceType": "ObservationDefinition",');
    docLines.push('  "id": "<slug>",');
    docLines.push('  "name": "Calculator Name",');
    docLines.push('  "status": "active",');
    docLines.push('  "category": "...",');
    docLines.push('  "specialty": "...",');
    docLines.push('  "description": "...",');
    docLines.push('  "inputs": [...],');
    docLines.push('  "output": { "type": "...", "unit": "..." }');
    docLines.push("}");
    docLines.push("```");
    docLines.push("");

    docLines.push("## HL7 Structure");
    docLines.push("");
    docLines.push(
      "Each calculator is exported with HL7-style metadata:",
    );
    docLines.push("");
    docLines.push("```json");
    docLines.push("{");
    docLines.push('  "calculator": "Calculator Name",');
    docLines.push('  "version": "1.0",');
    docLines.push('  "category": "...",');
    docLines.push('  "inputs": [...]');
    docLines.push("}");
    docLines.push("```");
    docLines.push("");

    docLines.push("## How to Import");
    docLines.push("");
    docLines.push("### FHIR");
    docLines.push("");
    docLines.push(
      "1. Load the JSON file from `exports/fhir/<slug>.json`",
    );
    docLines.push(
      "2. Parse as JSON and use as a FHIR ObservationDefinition resource",
    );
    docLines.push(
      "3. Register with your FHIR server or use for validation",
    );
    docLines.push("");

    docLines.push("### HL7");
    docLines.push("");
    docLines.push(
      "1. Load the JSON file from `exports/hl7/<slug>.json`",
    );
    docLines.push(
      "2. Use the metadata to map calculator inputs/outputs to HL7 message segments",
    );
    docLines.push("");

    docLines.push("## How to Extend");
    docLines.push("");
    docLines.push(
      "1. To add new fields to FHIR resources, edit `buildFhirResource()` in `scripts/generator/plugins/fhir.ts`",
    );
    docLines.push(
      "2. To add new fields to HL7 resources, edit `buildHl7Resource()` in `scripts/generator/plugins/fhir.ts`",
    );
    docLines.push(
      "3. Run `npm run generate` to regenerate all exports",
    );
    docLines.push("");

    writeFile(
      path.join(docsDir, "fhir.md"),
      docLines.join("\n"),
    );

    console.log(
      `🏥 Generated ${slugs.length} FHIR + ${slugs.length} HL7 export files`,
    );
  },
};

export default plugin;