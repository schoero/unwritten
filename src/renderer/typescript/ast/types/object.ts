import type { ObjectType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderObjectType(ctx: TypeScriptRenderContext, type: ObjectType): string {
  return type.name ?? "Object";
}
