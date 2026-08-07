import type { GeneratorPlugin } from "./types";
import {
  validateKnowledge,
} from "../core/knowledge-validator";

const plugin: GeneratorPlugin = {
  name: "Knowledge Validator",
  order: 20,
  enabled: true,
  execute(context) {
    const result = validateKnowledge();

    if (result.errors.length > 0) {
      context.logger.error(
        "\n❌ Knowledge validation errors:",
      );
      for (const e of result.errors) {
        context.logger.error(
          `  [${e.code}] ${e.message}`,
        );
      }
    }

    if (result.warnings.length > 0) {
      context.logger.warn(
        "\n⚠️  Knowledge validation warnings:",
      );
      for (const w of result.warnings) {
        context.logger.warn(
          `  [${w.code}] ${w.message}`,
        );
      }
    }

    if (result.valid) {
      context.logger.info(
        "\n✅ Knowledge validation passed",
      );
    }
  },
};

export default plugin;