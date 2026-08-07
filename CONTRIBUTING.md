# Contributing to MedCalcHub Generator

Thank you for contributing to MedCalcHub Generator.

---

## How to Add a Calculator

1. Create a knowledge definition in `scripts/generator/knowledge/<category>.ts`
2. Define slug, description, formula, inputs, classification, FAQ, and evidence
3. Run `npm run generate -- <slug>`
4. Tests are auto-generated in `tests/calculators/`
5. Documentation is auto-generated in `docs/calculators/`

### Knowledge Definition Example

```typescript
{
  slug: "my-calculator",
  category: "Laboratory",
  specialty: "Internal Medicine",
  description: "Brief description",
  formula: "a + b",
  inputs: [
    { id: "a", label: "Value A", type: "number", unit: "mg/dL", required: true },
    { id: "b", label: "Value B", type: "number", unit: "mg/dL", required: true },
  ],
  classification: [
    { label: "Normal", range: "0-10", status: "normal", min: 0, max: 10 },
  ],
  faq: [
    { question: "What does this measure?", answer: "Measures the combined value." },
  ],
  relatedCalculators: ["related-slug-1", "related-slug-2"],
}
```

---

## How to Add a Plugin

1. Create `scripts/generator/plugins/my-plugin.ts`
2. Implement the `GeneratorPlugin` interface:

```typescript
import type { GeneratorPlugin } from "./types";

const plugin: GeneratorPlugin = {
  name: "My Plugin",
  order: 60,     // Execution order (10-100)
  enabled: true, // Can be disabled via config
  execute(context) {
    // Your logic here
    console.log("My plugin executed");
  },
};

export default plugin;
```

3. Register in `scripts/generator/plugins/index.ts`:

```typescript
import myPlugin from "./my-plugin";

// Add to PLUGIN_CONFIG_MAP
"My Plugin": "myPlugin",

// Add to registeredPlugins array
myPlugin,
```

4. Add config option to `generator.config.ts`:

```typescript
plugins: {
  // ...
  myPlugin: true,
}
```

---

## How to Add a Formula Type

1. Create `scripts/generator/core/formula/build-my-type.ts`
2. Export a builder function:

```typescript
export function buildMyType(
  slug: string,
  formula: string,
  inputs: string[],
): string {
  return `// Generated formula code`;
}
```

3. Register in `scripts/generator/core/formula/dispatcher.ts`
4. Add type detection in `scripts/generator/core/formula-intelligence.ts`

---

## How to Run Tests

```bash
# Run all tests
npm test

# Run specific calculator tests
npx vitest run tests/calculators/bmi.test.ts

# Run with coverage
npx vitest run --coverage
```

---

## How to Run the Generator

```bash
# Full generation
npm run generate

# Generate specific calculator
npm run generate -- my-calculator

# Force regenerate
npm run generate -- my-calculator --force

# View configuration
npm run generator config

# View version
npm run generator version

# View dashboard
npm run generator dashboard
```

---

## Coding Conventions

- **Language:** TypeScript (strict mode)
- **Formatting:** 2-space indentation, double quotes
- **Naming:** camelCase for variables, PascalCase for types
- **Files:** kebab-case for filenames
- **Exports:** Named exports preferred
- **Comments:** JSDoc for public APIs
- **Immutability:** Prefer `const` over `let`

---

## Folder Structure

```
MedCalcHub/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/
│   └── calculators/        # Generated calculator code
├── scripts/
│   ├── generator/
│   │   ├── core/           # Generator engines
│   │   ├── knowledge/      # Knowledge definitions
│   │   ├── plugins/        # Plugin implementations
│   │   └── cli/            # CLI interface
│   └── types.ts
├── tests/
│   └── calculators/        # Generated test files
├── docs/
│   └── calculators/        # Generated documentation
├── locales/
│   └── <lang>/calculators/ # Generated locale files
├── exports/
│   ├── fhir/               # FHIR resources
│   ├── hl7/                # HL7 resources
│   └── ai/                 # AI context files
├── generator.config.ts     # Generator configuration
└── package.json
```

---

## Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new calculator
fix: correct formula calculation
docs: update documentation
refactor: improve plugin loader
test: add calculator tests
chore: update dependencies
```

---

## Pull Request Guidelines

1. One feature per PR
2. Include tests if applicable
3. Run `npx tsc --noEmit` before submitting
4. Ensure all existing tests pass
5. Update documentation if needed
6. Use descriptive commit messages

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.