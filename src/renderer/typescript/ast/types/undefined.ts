import type { UndefinedType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderUndefinedType(ctx: TypeScriptRenderContext, type: UndefinedType): string {
  return type.name;
}
