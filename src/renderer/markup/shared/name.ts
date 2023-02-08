import type { MarkupRenderContext, RenderedName } from "../types-definitions/renderer.js";

import type { Name } from "unwritten:compiler/type-definitions/shared.js";


export function renderName(ctx: MarkupRenderContext, name: Name | undefined): RenderedName {
  return name ?? "";
}
