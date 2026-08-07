import type { GeneratorPlugin } from "./types";
import {
  printNavigationReport,
} from "../core/navigation";

const plugin: GeneratorPlugin = {
  name: "Navigation",
  order: 60,
  enabled: true,
  execute(_context) {
    printNavigationReport();
  },
};

export default plugin;