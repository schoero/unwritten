import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";

import type { IntersectionType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedIntersectionType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderIntersectionType(ctx: RenderContext<MarkupRenderer>, intersectionType: IntersectionType): RenderedIntersectionType {
  return intersectionType.types.map(type => renderType(ctx, type)).join(" & ");
}
