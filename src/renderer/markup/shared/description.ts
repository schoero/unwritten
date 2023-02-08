import type { MarkupRenderContext, RenderedDescription } from "../types-definitions/renderer.js";

import type { Description } from "unwritten:compiler/type-definitions/shared.js";


export function renderDescription(ctx: MarkupRenderContext, description: Description): RenderedDescription {
  return description;
}
