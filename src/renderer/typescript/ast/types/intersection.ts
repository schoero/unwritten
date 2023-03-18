import { renderType } from "unwritten:renderer/typescript/ast/index.js";

import type { IntersectionType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderIntersectionType(ctx: TypeScriptRenderContext, intersectionType: IntersectionType): string {
  return intersectionType.types.map(type => renderType(ctx, type)).join(" & ");
}
