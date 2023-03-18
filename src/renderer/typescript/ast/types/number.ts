import type { NumberType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderNumberType(ctx: TypeScriptRenderContext, type: NumberType): string {
  return type.name;
}
