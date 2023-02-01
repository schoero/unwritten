import type { MarkupRenderer, RenderedPosition } from "../types/renderer.js";

import type { Position } from "unwritten:compiler:type-definitions/mixins.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderPosition(ctx: MarkupRenderContext, position: Position | undefined): RenderedPosition {
  return position && ctx.renderer.renderSourceCodeLink(position.file, position.line, position.column);
}
