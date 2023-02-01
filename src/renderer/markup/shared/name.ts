import type { MarkupRenderContext, RenderedName } from "../types/renderer.js";

import type { Name } from "unwritten:compiler:type-definitions/mixins.js";


export function renderName(ctx: MarkupRenderContext, name: Name | undefined): RenderedName {
  return name ?? "";
}
