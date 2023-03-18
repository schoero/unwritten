import type { ClassType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderClassType(ctx: TypeScriptRenderContext, type: ClassType): string {
  return type.name;
}
