/**
 * MedCalcHub Generator Configuration
 *
 * Single source of truth for all generator settings.
 * Changing this file updates generator behavior
 * without code changes.
 */

export default {
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
    incremental: true,
    performance: true,
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