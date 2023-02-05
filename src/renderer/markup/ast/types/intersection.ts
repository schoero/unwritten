import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { IntersectionType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedIntersectionType } from "unwritten:renderer:markup/types/renderer.js";


export function renderIntersectionType(ctx: MarkupRenderContext, intersectionType: IntersectionType): RenderedIntersectionType {
  return intersectionType.types.map(type => renderType(ctx, type)).join(" & ");
}
