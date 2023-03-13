import type { TypeScriptRenderConfig } from "unwritten:renderer/typescript/type-definitions/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export const defaultTypeScriptRenderConfig: Complete<TypeScriptRenderConfig> = {
  indentation: "  ",
  newLine: "\n",
  quote: "\"",
  renderJSDoc: true,
  renderSemicolon: true,
  renderTypesInSignatures: true
};
