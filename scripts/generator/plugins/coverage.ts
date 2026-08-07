import type { GeneratorPlugin } from "./types";
import { printCoverageReport } from "../core/dashboard";

const plugin: GeneratorPlugin = {
  name: "Coverage",
  order: 10,
  enabled: true,
  execute(_context) {
    printCoverageReport();
  },
};

export default plugin;