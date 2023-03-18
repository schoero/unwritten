import type { AnyType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderAnyType(ctx: TypeScriptRenderContext, type: AnyType): string {
  return type.name;
}
