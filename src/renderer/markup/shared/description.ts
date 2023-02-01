import type { MarkupRenderer, RenderedDescription } from "../types/renderer.js";

import type { Description } from "unwritten:compiler:type-definitions/mixins.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderDescription(ctx: MarkupRenderContext, description: Description): RenderedDescription {
  return description;
}
