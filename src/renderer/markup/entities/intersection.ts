import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { IntersectionType } from "quickdoks:types:types.js";

import { renderType } from "./type.js";


export function renderIntersectionType(ctx: RenderContext<MarkupRenderer>, type: IntersectionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" & ");
}
