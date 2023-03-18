import type { SymbolType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderSymbolType(ctx: TypeScriptRenderContext, type: SymbolType): string {
  return type.name;
}
