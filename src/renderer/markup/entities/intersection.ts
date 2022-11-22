import { RenderContext } from "../../../types/context.js";
import { IntersectionType } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderType } from "./type.js";


export function renderIntersectionType(ctx: RenderContext<MarkupRenderer>, type: IntersectionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" & ");
}
