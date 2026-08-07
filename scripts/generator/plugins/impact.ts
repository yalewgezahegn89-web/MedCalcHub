import type { GeneratorPlugin } from "./types";
import {
  printImpactReport,
} from "../core/impact-analysis";

const plugin: GeneratorPlugin = {
  name: "Impact Analysis",
  order: 90,
  enabled: true,
  execute(_context) {
    printImpactReport();
  },
};

export default plugin;