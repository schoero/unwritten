import type { MarkupRenderContext } from "../types-definitions/markup.js";

import type { Description } from "unwritten:compiler/type-definitions/shared.js";


export function renderDescription(ctx: MarkupRenderContext, description: Description): string {
  return description ?? "";
}
