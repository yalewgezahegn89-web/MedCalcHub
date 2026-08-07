import type { GeneratorPlugin } from "./types";
import {
  printDependencyGraphReport,
} from "../core/dependency-graph";

const plugin: GeneratorPlugin = {
  name: "Dependency Graph",
  order: 50,
  enabled: true,
  execute(_context) {
    printDependencyGraphReport();
  },
};

export default plugin;