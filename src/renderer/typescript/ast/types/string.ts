import type { StringType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderStringType(ctx: TypeScriptRenderContext, type: StringType): string {
  return type.name;
}
