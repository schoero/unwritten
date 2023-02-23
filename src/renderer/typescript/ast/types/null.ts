import type { NullType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderNullType(ctx: TypeScriptRenderContext, type: NullType): string {
  return type.name;
}
