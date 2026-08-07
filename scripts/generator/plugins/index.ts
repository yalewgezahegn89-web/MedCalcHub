/**
 * Plugin Loader
 *
 * Loads all generator plugins, sorts by order,
 * and filters out disabled ones.
 * Respects generator.config.ts settings.
 */

import type {
  GeneratorPlugin,
} from "./types";

import {
  getGeneratorConfig,
} from "../core/config";

import coveragePlugin from "./coverage";
import knowledgeValidatorPlugin from "./knowledge-validator";
import autofixPlugin from "./autofix";
import qualityPlugin from "./quality";
import dependencyPlugin from "./dependency";
import navigationPlugin from "./navigation";
import seoPlugin from "./seo";
import recommendationPlugin from "./recommendation";
import impactPlugin from "./impact";
import documentationPlugin from "./documentation";
import i18nPlugin from "./i18n";
import fhirPlugin from "./fhir";
import aiContextPlugin from "./ai-context";
import incrementalPlugin from "./incremental";
import performancePlugin from "./performance";

/**
 * Map from plugin name to config key.
 */
const PLUGIN_CONFIG_MAP: Record<
  string,
  string
> = {
  Coverage: "coverage",
  "Knowledge Validator": "knowledgeValidator",
  "Auto Fix": "autoFix",
  Quality: "quality",
  "Dependency Graph": "dependency",
  Navigation: "navigation",
  SEO: "seo",
  Recommendation: "recommendation",
  "Impact Analysis": "impact",
  Documentation: "documentation",
  Internationalization: "internationalization",
  "FHIR Export": "fhir",
  "AI Context Export": "aiContext",
  "Incremental Generation": "incremental",
  "Performance Profiler": "performance",
};

/**
 * All registered plugins.
 * To add a new plugin, simply add its import
 * and include it in this array. No CLI
 * modification required.
 */
const registeredPlugins: GeneratorPlugin[] = [
  coveragePlugin,
  knowledgeValidatorPlugin,
  autofixPlugin,
  qualityPlugin,
  dependencyPlugin,
  navigationPlugin,
  seoPlugin,
  recommendationPlugin,
  impactPlugin,
  documentationPlugin,
  i18nPlugin,
  fhirPlugin,
  aiContextPlugin,
  incrementalPlugin,
  performancePlugin,
];

/**
 * Load all enabled plugins sorted by order.
 * Checks both plugin.enabled AND config settings.
 */
export function loadPlugins(): GeneratorPlugin[] {
  const config = getGeneratorConfig();
  const pluginConfig = config.plugins as Record<
    string,
    boolean
  >;

  return registeredPlugins
    .filter((p) => {
      // Plugin must be enabled in code
      if (!p.enabled) return false;

      // Check config setting
      const configKey =
        PLUGIN_CONFIG_MAP[p.name];

      if (
        configKey &&
        pluginConfig[configKey] === false
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => a.order - b.order);
}