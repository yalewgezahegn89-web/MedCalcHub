/**
 * Performance Profiler Plugin
 *
 * Wraps all plugin executions with profiling
 * and prints a performance report at the end.
 *
 * This plugin MUST NOT affect generator behavior.
 * It only measures and reports.
 */

import type { GeneratorPlugin } from "./types";
import {
  startProfiler,
  stopProfiler,
  profilePlugin,
  setGenerationMetrics,
  setTestCount,
  printPerformanceReport,
} from "../core/performance";

export {
  startProfiler,
  stopProfiler,
  profilePlugin,
  setGenerationMetrics,
  setTestCount,
} from "../core/performance";

const plugin: GeneratorPlugin = {
  name: "Performance Profiler",
  order: 100,
  enabled: true,
  execute(_context) {
    printPerformanceReport();
  },
};

export default plugin;