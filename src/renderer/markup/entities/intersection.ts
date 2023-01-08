import { renderType } from "./type.js";

import type { IntersectionType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderIntersectionType(ctx: RenderContext<MarkupRenderer>, type: IntersectionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" & ");
}
