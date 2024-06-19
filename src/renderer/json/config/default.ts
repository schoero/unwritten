import type { JSONRenderConfig } from "unwritten:renderer:json:type-definitions/config";
import type { Complete } from "unwritten:type-definitions/utils";


export const defaultJSONRenderConfig: Complete<JSONRenderConfig> = {
  includeIds: false,
  indentation: "  "
};
