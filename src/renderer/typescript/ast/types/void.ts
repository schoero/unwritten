import type { VoidType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderVoidType(ctx: TypeScriptRenderContext, type: VoidType): string {
  return type.name;
}
