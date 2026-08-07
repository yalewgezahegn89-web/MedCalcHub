import type { GeneratorPlugin } from "./types";
import {
  printQualityReport,
} from "../core/quality-score";

const plugin: GeneratorPlugin = {
  name: "Quality",
  order: 40,
  enabled: true,
  execute(_context) {
    printQualityReport();
  },
};

export default plugin;