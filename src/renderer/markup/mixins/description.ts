import type { MarkupRenderer, RenderedDescription } from "../types/renderer.js";

import type { Description } from "quickdoks:compiler/type-definitions/mixins.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderDescription(ctx: RenderContext<MarkupRenderer>, description: Description): RenderedDescription {
  return description;
}
