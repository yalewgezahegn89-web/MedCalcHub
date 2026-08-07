/**
 * Generator Configuration Loader
 *
 * Loads and caches the generator configuration
 * from generator.config.ts at project root.
 */

import * as path from "node:path";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface GeneratorConfig {
  version: string;
  generator: {
    name: string;
    outputDirectory: string;
    docsDirectory: string;
    exportsDirectory: string;
    localesDirectory: string;
    testsDirectory: string;
  };
  plugins: {
    coverage: boolean;
    knowledgeValidator: boolean;
    autoFix: boolean;
    quality: boolean;
    dependency: boolean;
    navigation: boolean;
    seo: boolean;
    recommendation: boolean;
    impact: boolean;
    documentation: boolean;
    internationalization: boolean;
    fhir: boolean;
    aiContext: boolean;
  };
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

// ─────────────────────────────────────────────────
// Cached config
// ─────────────────────────────────────────────────

let cachedConfig: GeneratorConfig | null = null;

/**
 * Load the generator configuration.
 * Caches the result after first load.
 */
export function loadGeneratorConfig(): GeneratorConfig {
  if (cachedConfig) return cachedConfig;

  try {
    // Resolve path from project root
    const configPath = path.resolve(
      process.cwd(),
      "generator.config.ts",
    );

    // Use require with timestamp to bust cache
    // if file changes
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(configPath);
    cachedConfig = mod.default || mod;
  } catch {
    // Fallback to defaults
    cachedConfig = getDefaultConfig();
  }

  return cachedConfig!;
}

/**
 * Get the cached configuration.
 * Calls loadGeneratorConfig() if not loaded yet.
 */
export function getGeneratorConfig(): GeneratorConfig {
  return loadGeneratorConfig();
}

/**
 * Reset cached config (useful for testing).
 */
export function resetConfig(): void {
  cachedConfig = null;
}

/**
 * Default configuration fallback.
 */
function getDefaultConfig(): GeneratorConfig {
  return {
    version: "1.0.0",
    generator: {
      name: "MedCalcHub Generator",
      outputDirectory: "./lib/calculators",
      docsDirectory: "./docs",
      exportsDirectory: "./exports",
      localesDirectory: "./locales",
      testsDirectory: "./tests/calculators",
    },
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
    },
    localization: {
      defaultLanguage: "en",
      supportedLanguages: [
        "en",
        "am",
        "fr",
        "es",
        "ar",
        "pt",
      ],
    },
    formatting: {
      jsonIndent: 2,
      markdownLineLength: 100,
      sortAlphabetically: true,
      deterministicOutput: true,
    },
    validation: {
      stopOnError: true,
      showWarnings: true,
      autoFixBeforeValidation: true,
    },
  };
}

/**
 * Check if a plugin is enabled by its config key.
 */
export function isPluginEnabled(
  pluginKey: string,
): boolean {
  const config = getGeneratorConfig();
  const plugins = config.plugins as Record<
    string,
    boolean
  >;
  return plugins[pluginKey] !== false;
}