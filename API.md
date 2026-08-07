# API Reference — MedCalcHub Generator v1.0.0

All public APIs are marked **Stable**.

---

## GeneratorPlugin

```typescript
interface GeneratorPlugin {
  name: string;
  order: number;
  enabled: boolean;
  execute(context: PluginContext): void;
}
```

**Purpose:** Defines a generator plugin.

**Properties:**
- `name` — Unique plugin identifier
- `order` — Execution order (10–100)
- `enabled` — Whether plugin is active
- `execute(context)` — Plugin logic

**Status:** Stable API

---

## PluginContext

```typescript
interface PluginContext {
  calculatorKnowledge: Record<string, CalculatorKnowledge>;
  logger: {
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
  };
}
```

**Purpose:** Shared context passed to every plugin.

**Properties:**
- `calculatorKnowledge` — All calculator knowledge definitions
- `logger` — Console logging interface

**Status:** Stable API

---

## CalculatorKnowledge

```typescript
interface CalculatorKnowledge {
  slug: string;
  name: string;
  category: string;
  specialty?: string;
  description: string;
  formula: FormulaDefinition;
  inputs: InputDefinition[];
  interpretation?: InterpretationDefinition[];
  classification?: ClassificationDefinition[];
  faq?: FAQDefinition[];
  evidence?: EvidenceDefinition[];
  clinicalGuidance?: string;
  relatedCalculators?: string[];
  comparisonCalculators?: string[];
}
```

**Purpose:** Complete knowledge definition for a calculator.

**Status:** Stable API

---

## FormulaDefinition

```typescript
interface FormulaDefinition {
  expression: string;
  type?: FormulaType;
  unit?: string;
  outputUnit?: string;
}
```

**Purpose:** Defines the calculation formula.

**Status:** Stable API

---

## FormulaType

```typescript
type FormulaType =
  | "algebraic"
  | "score"
  | "conditional"
  | "converter"
  | "lookup"
  | "composite"
  | "descriptive"
  | "bsa"
  | "clinical"
  | "custom";
```

**Purpose:** Identifies the formula engine to use.

**Status:** Stable API

---

## InputDefinition

```typescript
interface InputDefinition {
  id: string;
  label: string;
  type: "number" | "select" | "boolean";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string | number; label: string }[];
  defaultValue?: string | number | boolean;
  required?: boolean;
}
```

**Purpose:** Defines a calculator input field.

**Status:** Stable API

---

## GeneratorConfig

```typescript
interface GeneratorConfig {
  version: string;
  generator: {
    name: string;
    outputDirectory: string;
    docsDirectory: string;
    exportsDirectory: string;
    localesDirectory: string;
    testsDirectory: string;
  };
  plugins: Record<string, boolean>;
  localization: {
    defaultLanguage: string;
    supportedLanguages: string[];
  };
  formatting: {
    jsonIndent: number;
    markdownLineLength: number;
    sortAlphabetically: boolean;
    deterministicOutput: boolean;
  };
  validation: {
    stopOnError: boolean;
    showWarnings: boolean;
    autoFixBeforeValidation: boolean;
  };
}
```

**Purpose:** Centralized generator configuration.

**Status:** Stable API

---

## ValidationResult

```typescript
interface ValidationResult {
  slug: string;
  errors: string[];
  warnings: string[];
}
```

**Purpose:** Validation output for a single calculator.

**Status:** Stable API

---

## QualityResult

```typescript
interface QualityResult {
  slug: string;
  score: number;
  grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";
  breakdown: {
    description: number;
    formula: number;
    inputs: number;
    classification: number;
    faq: number;
    evidence: number;
    clinicalGuidance: number;
  };
}
```

**Purpose:** Quality assessment for a calculator.

**Status:** Stable API

---

## NavigationMap

```typescript
interface NavigationMap {
  calculators: Record<string, CalculatorNavigation>;
}

interface CalculatorNavigation {
  previous?: string;
  next?: string;
  related: string[];
  breadcrumbs: string[];
  seeAlso: string[];
}
```

**Purpose:** Navigation metadata for all calculators.

**Status:** Stable API

---

## DependencyGraph

```typescript
interface DependencyGraph {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
  clusters: string[][];
  circularGroups: string[][];
}

interface DependencyNode {
  slug: string;
  name: string;
  category: string;
  specialty: string;
  connections: number;
  impact: number;
}

interface DependencyEdge {
  source: string;
  target: string;
  type: "related" | "comparison" | "dependency";
}
```

**Purpose:** Cross-calculator relationship graph.

**Status:** Stable API

---

## ImpactResult

```typescript
interface ImpactResult {
  slug: string;
  impact: number;
  connections: number;
  rank: number;
}
```

**Purpose:** Calculator importance ranking.

**Status:** Stable API

---

## Function Exports

### Core Engine Functions

```typescript
// Formula Intelligence
function detectFormulaType(knowledge: CalculatorKnowledge): FormulaType;

// Calculator Generator
function generateCalculator(slug: string, knowledge: CalculatorKnowledge): void;

// Test Generator
function generateTests(slug: string, knowledge: CalculatorKnowledge): string;

// Quality Score
function calculateQuality(knowledge: CalculatorKnowledge): QualityResult;

// Knowledge Validator
function validateKnowledge(knowledge: Record<string, CalculatorKnowledge>): ValidationResult[];

// Navigation Engine
function buildNavigation(): NavigationMap;

// Dependency Graph
function buildDependencyGraph(): DependencyGraph;

// SEO Engine
function generateSEOMetadata(slug: string, knowledge: CalculatorKnowledge): Record<string, unknown>;

// Performance Profiler
function startProfiler(): void;
function stopProfiler(): void;
function profilePlugin<T>(name: string, fn: () => T): T;
function printPerformanceReport(): void;

// Incremental Generation
function runIncrementalCycle(knowledge: Record<string, CalculatorKnowledge>): {
  generated: string[];
  skipped: string[];
  deleted: string[];
};
```

**Status:** Stable API

### Plugin Loader

```typescript
function loadPlugins(): GeneratorPlugin[];
```

**Purpose:** Load all enabled plugins sorted by order.

**Status:** Stable API