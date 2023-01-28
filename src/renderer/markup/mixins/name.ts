import type { MarkupRenderer, RenderedName } from "../types/renderer.js";

import type { Name } from "quickdoks:compiler/type-definitions/mixins.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderName(ctx: RenderContext<MarkupRenderer>, name: Name | undefined): RenderedName {
  return name ?? "";
}
