import type { GeneratorPlugin } from "./types";
import {
  printAutoFixReport,
} from "../core/auto-fix";

const plugin: GeneratorPlugin = {
  name: "Auto Fix",
  order: 30,
  enabled: true,
  execute(_context) {
    printAutoFixReport();
  },
};

export default plugin;