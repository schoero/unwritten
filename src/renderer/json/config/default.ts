import type { JSONRenderConfig } from "unwritten:renderer:json/type-definitions/config.js";
import type { Complete } from "unwritten:type-definitions/utils.js";


export const defaultJSONRenderConfig: Complete<JSONRenderConfig> = {
  includeIds: false,
  indentation: "  "
};
