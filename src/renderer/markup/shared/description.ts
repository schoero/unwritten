import type { MarkupRenderContext, RenderedDescription } from "../types/renderer.js";

import type { Description } from "unwritten:compiler:type-definitions/mixins.js";


export function renderDescription(ctx: MarkupRenderContext, description: Description): RenderedDescription {
  return description;
}
