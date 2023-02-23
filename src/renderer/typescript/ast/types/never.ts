import type { NeverType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderNeverType(ctx: TypeScriptRenderContext, type: NeverType): string {
  return type.name;
}
