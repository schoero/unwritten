import type { MarkupRenderer, RenderedName } from "../types/renderer.js";

import type { Name } from "unwritten:compiler/type-definitions/mixins.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderName(ctx: RenderContext<MarkupRenderer>, name: Name | undefined): RenderedName {
  return name ?? "";
}
