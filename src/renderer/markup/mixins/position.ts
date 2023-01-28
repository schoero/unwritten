import type { MarkupRenderer, RenderedPosition } from "../types/renderer.js";

import type { Position } from "quickdoks:compiler/type-definitions/mixins.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderPosition(ctx: RenderContext<MarkupRenderer>, position: Position | undefined): RenderedPosition {
  return position && ctx.renderer.renderSourceCodeLink(position.file, position.line, position.column);
}
