import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { IntersectionType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedIntersectionType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderIntersectionType(ctx: RenderContext<MarkupRenderer>, intersectionType: IntersectionType): RenderedIntersectionType {
  return intersectionType.types.map(type => renderType(ctx, type)).join(" & ");
}
