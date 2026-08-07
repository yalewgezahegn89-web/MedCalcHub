# Generator Configuration

## Overview

MedCalcHub Generator uses a centralized configuration system. The configuration file is located at the project root.

**Configuration File**: `generator.config.ts`

## Configuration Reference

### version

```typescript
version: "1.0.0"
```

The version of the generator configuration.

---

### generator

```typescript
generator: {
  name: "MedCalcHub Generator",
  outputDirectory: "./lib/calculators",
  docsDirectory: "./docs",
  exportsDirectory: "./exports",
  localesDirectory: "./locales",
  testsDirectory: "./tests/calculators",
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `name` | `"MedCalcHub Generator"` | Display name for the generator |
| `outputDirectory` | `"./lib/calculators"` | Where generated calculator files are written |
| `docsDirectory` | `"./docs"` | Where documentation is generated |
| `exportsDirectory` | `"./exports"` | Where export files (FHIR, AI, HL7) are written |
| `localesDirectory` | `"./locales"` | Where locale/translation files are generated |
| `testsDirectory` | `"./tests/calculators"` | Where generated test files are written |

---

### plugins

```typescript
plugins: {
  coverage: true,
  knowledgeValidator: true,
  autoFix: true,
  quality: true,
  dependency: true,
  navigation: true,
  seo: true,
  recommendation: true,
  impact: true,
  documentation: true,
  internationalization: true,
  fhir: true,
  aiContext: true,
}
```

Each plugin can be independently enabled or disabled.

---

### localization

```typescript
localization: {
  defaultLanguage: "en",
  supportedLanguages: ["en", "am", "fr", "es", "ar", "pt"],
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `defaultLanguage` | `"en"` | The primary language for all content |
| `supportedLanguages` | `["en", "am", "fr", "es", "ar", "pt"]` | All supported language codes |

---

### formatting

```typescript
formatting: {
  jsonIndent: 2,
  markdownLineLength: 100,
  sortAlphabetically: true,
  deterministicOutput: true,
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `jsonIndent` | `2` | Number of spaces for JSON indentation |
| `markdownLineLength` | `100` | Maximum line length for generated markdown |
| `sortAlphabetically` | `true` | Whether to sort arrays alphabetically |
| `deterministicOutput` | `true` | Whether output should be identical across runs |

---

### validation

```typescript
validation: {
  stopOnError: true,
  showWarnings: true,
  autoFixBeforeValidation: true,
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `stopOnError` | `true` | Stop generation when validation errors occur |
| `showWarnings` | `true` | Display validation warnings |
| `autoFixBeforeValidation` | `true` | Run auto-fix before validation |

---

## How to Disable Plugins

Set the plugin key to `false` in the `plugins` section:

```typescript
plugins: {
  seo: false,              // SEO plugin will not execute
  recommendation: false,    // Recommendation plugin will not execute
  fhir: false,             // FHIR Export plugin will not execute
}
```

The plugin loader checks both the plugin's `enabled` property and the config setting. Both must be true for the plugin to execute.

---

## How to Change Output Folders

Modify the `generator` section:

```typescript
generator: {
  outputDirectory: "./dist/calculators",
  docsDirectory: "./documentation",
  exportsDirectory: "./dist/exports",
  localesDirectory: "./i18n/locales",
  testsDirectory: "./__tests__/calculators",
}
```

All paths are relative to the project root.

---

## How to Add a New Language

1. Add the language code to `localization.supportedLanguages`:

```typescript
localization: {
  defaultLanguage: "en",
  supportedLanguages: ["en", "am", "fr", "es", "ar", "pt", "de"],
}
```

2. Add a display name in `scripts/generator/plugins/i18n.ts`:

```typescript
const DISPLAY_NAMES: Record<string, string> = {
  // ... existing entries
  de: "German",
};
```

3. Run the generator:

```bash
npm run generate
```

4. Translate the generated placeholder files under `locales/<lang>/calculators/`.

---

## How to Change JSON Indentation

```typescript
formatting: {
  jsonIndent: 4,  // Use 4 spaces instead of 2
}
```

---

## How to Disable Deterministic Output

```typescript
formatting: {
  deterministicOutput: false,
}
```

> **Warning**: Disabling deterministic output may cause different results across runs.

---

## Programmatic Access

The configuration can be loaded programmatically:

```typescript
import {
  loadGeneratorConfig,
  getGeneratorConfig,
} from "./scripts/generator/core/config";

// Load and cache config
const config = loadGeneratorConfig();

// Get cached config
const cached = getGeneratorConfig();

// Use config values
console.log(config.generator.docsDirectory);
console.log(config.localization.supportedLanguages);
```

---

## CLI Access

View the current configuration:

```bash
npm run generator config
```

This prints all configuration options with their current values.

---

## Configuration Loading Order

1. The config is loaded from `generator.config.ts` at project root
2. If the file cannot be loaded, default values are used
3. The config is cached after the first load
4. Use `resetConfig()` to force a reload (useful for testing)