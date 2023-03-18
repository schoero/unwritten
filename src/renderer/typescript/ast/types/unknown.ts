import type { UnknownType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderUnknownType(ctx: TypeScriptRenderContext, type: UnknownType): string {
  return type.name;
}
