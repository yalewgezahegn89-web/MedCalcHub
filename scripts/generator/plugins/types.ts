/**
 * Plugin Architecture Types
 *
 * Defines the interface for generator plugins
 * that replace the hardcoded execution pipeline.
 */

import type { calculatorKnowledge } from "../knowledge";

export interface GeneratorPlugin {
  name: string;
  order: number;
  enabled: boolean;
  execute(
    context: PluginContext,
  ): Promise<void> | void;
}

export interface PluginContext {
  calculatorKnowledge: typeof calculatorKnowledge;
  options?: unknown;
  logger: {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
  };
}