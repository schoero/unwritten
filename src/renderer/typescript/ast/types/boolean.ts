import type { BooleanType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderBooleanType(ctx: TypeScriptRenderContext, type: BooleanType): string {
  return type.name;
}
