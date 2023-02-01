import type { MarkupRenderContext, RenderedPosition } from "../types/renderer.js";

import type { Position } from "unwritten:compiler:type-definitions/mixins.js";


export function renderPosition(ctx: MarkupRenderContext, position: Position | undefined): RenderedPosition {
  return position && ctx.renderer.renderSourceCodeLink(position.file, position.line, position.column);
}
