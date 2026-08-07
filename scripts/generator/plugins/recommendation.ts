import type { GeneratorPlugin } from "./types";
import {
  printRecommendationReport,
} from "../core/recommendation-engine";

const plugin: GeneratorPlugin = {
  name: "Recommendation",
  order: 80,
  enabled: true,
  execute(_context) {
    printRecommendationReport();
  },
};

export default plugin;