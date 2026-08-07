/**
 * Performance Profiler & Build Metrics
 *
 * Measures execution time and performance of the
 * entire generator pipeline. For reporting only.
 *
 * This module MUST NOT affect generator behavior.
 */

import * as fs from "node:fs";
import * as path from "node:path";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface PluginMetric {
  name: string;
  start: number;
  end: number;
  duration: number;
}

interface PerformanceReport {
  generated: string;
  totalRuntime: number;
  plugins: { name: string; duration: number }[];
  generatedCalculators: number;
  skippedCalculators: number;
  deletedCalculators: number;
  generatedTests: number;
  cacheHitRate: number;
}

interface ProfilerState {
  startTime: number;
  pluginMetrics: PluginMetric[];
  generatedCalculators: number;
  skippedCalculators: number;
  deletedCalculators: number;
  generatedTests: number;
}

// ─────────────────────────────────────────────────
// Paths
// ─────────────────────────────────────────────────

const PERFORMANCE_DIR = path.resolve(
  process.cwd(),
  "performance",
);

const LATEST_FILE = path.join(
  PERFORMANCE_DIR,
  "latest.json",
);

// ─────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────

let state: ProfilerState = createInitialState();

function createInitialState(): ProfilerState {
  return {
    startTime: 0,
    pluginMetrics: [],
    generatedCalculators: 0,
    skippedCalculators: 0,
    deletedCalculators: 0,
    generatedTests: 0,
  };
}

// ─────────────────────────────────────────────────
// Profiler Controls
// ─────────────────────────────────────────────────

/**
 * Start the profiler. Called once at pipeline start.
 */
export function startProfiler(): void {
  state = createInitialState();
  state.startTime = performance.now();
}

/**
 * Stop the profiler. Called once at pipeline end.
 */
export function stopProfiler(): void {
  // No-op — final timing captured in report
}

/**
 * Profile a single plugin execution.
 * Wraps the plugin function and records timing.
 */
export function profilePlugin<T>(
  name: string,
  fn: () => T,
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  state.pluginMetrics.push({
    name,
    start,
    end,
    duration: Math.round(end - start),
  });

  return result;
}

/**
 * Record a plugin metric directly (for async or
 * external profiling).
 */
export function recordPluginMetric(
  name: string,
  durationMs: number,
): void {
  state.pluginMetrics.push({
    name,
    start: 0,
    end: durationMs,
    duration: durationMs,
  });
}

/**
 * Set generation metrics from incremental result.
 */
export function setGenerationMetrics(
  generated: number,
  skipped: number,
  deleted: number,
): void {
  state.generatedCalculators = generated;
  state.skippedCalculators = skipped;
  state.deletedCalculators = deleted;
}

/**
 * Set the number of generated tests.
 */
export function setTestCount(count: number): void {
  state.generatedTests = count;
}

// ─────────────────────────────────────────────────
// Report Generation
// ─────────────────────────────────────────────────

/**
 * Build the performance report from collected data.
 */
function buildReport(): PerformanceReport {
  const endTime = performance.now();
  const totalRuntime = Math.round(
    endTime - state.startTime,
  );

  const total =
    state.generatedCalculators +
    state.skippedCalculators;

  const cacheHitRate =
    total > 0
      ? Math.round(
          (state.skippedCalculators / total) * 100,
        )
      : 0;

  return {
    generated: new Date().toISOString(),
    totalRuntime,
    plugins: state.pluginMetrics.map((m) => ({
      name: m.name,
      duration: m.duration,
    })),
    generatedCalculators:
      state.generatedCalculators,
    skippedCalculators: state.skippedCalculators,
    deletedCalculators: state.deletedCalculators,
    generatedTests: state.generatedTests,
    cacheHitRate,
  };
}

/**
 * Save the performance report to disk.
 */
function saveReport(
  report: PerformanceReport,
): void {
  if (!fs.existsSync(PERFORMANCE_DIR)) {
    fs.mkdirSync(PERFORMANCE_DIR, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    LATEST_FILE,
    JSON.stringify(report, null, 2) + "\n",
    "utf-8",
  );
}

/**
 * Print the performance report to console.
 */
export function printPerformanceReport(): void {
  const report = buildReport();

  saveReport(report);

  const lines: string[] = [];

  lines.push("");
  lines.push(
    "═══════════════════════════════════════",
  );
  lines.push("");
  lines.push("  Performance Report");
  lines.push("");
  lines.push(
    "═══════════════════════════════════════",
  );
  lines.push("");

  // Plugin metrics
  for (const m of report.plugins) {
    const padded = m.name.padEnd(32);
    lines.push(`  ${padded}${String(m.duration).padStart(6)} ms`);
  }

  lines.push("");
  lines.push(
    "  ───────────────────────────────────",
  );
  lines.push("");

  // Metrics
  lines.push(
    `  Generated${String(report.generatedCalculators).padStart(25)}`,
  );
  lines.push(
    `  Skipped${String(report.skippedCalculators).padStart(27)}`,
  );
  lines.push(
    `  Deleted${String(report.deletedCalculators).padStart(27)}`,
  );
  lines.push(
    `  Generated Tests${String(report.generatedTests).padStart(19)}`,
  );
  lines.push(
    `  Cache Hit Rate${String(report.cacheHitRate + "%").padStart(21)}`,
  );

  // Average plugin time
  const avgTime =
    report.plugins.length > 0
      ? Math.round(
          report.plugins.reduce(
            (sum, p) => sum + p.duration,
            0,
          ) / report.plugins.length,
        )
      : 0;

  lines.push(
    `  Average Plugin Time${String(avgTime + " ms").padStart(17)}`,
  );

  lines.push("");
  lines.push(
    "  ───────────────────────────────────",
  );
  lines.push("");
  lines.push(
    `  Total Runtime${String(report.totalRuntime + " ms").padStart(21)}`,
  );
  lines.push("");
  lines.push(
    "═══════════════════════════════════════",
  );
  lines.push("");

  console.log(lines.join("\n"));
}