import type { NumberLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderNumberLiteralType(ctx: TypeScriptRenderContext, type: NumberLiteralType): string {
  return `${type.value}`;
}
