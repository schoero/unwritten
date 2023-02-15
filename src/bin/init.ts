import { generateConfig } from "unwritten:config/generator.js";


export function init(path?: string) {
  generateConfig(path);
}
