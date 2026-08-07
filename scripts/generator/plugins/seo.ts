import type { GeneratorPlugin } from "./types";
import { printSeoReport } from "../core/seo-engine";

const plugin: GeneratorPlugin = {
  name: "SEO",
  order: 70,
  enabled: true,
  execute(_context) {
    printSeoReport();
  },
};

export default plugin;