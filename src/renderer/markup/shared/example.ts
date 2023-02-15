import type { MarkupRenderContext } from "../types-definitions/markup.js";

import type { Example } from "unwritten:compiler/type-definitions/shared.js";


export function renderExample(ctx: MarkupRenderContext, example: Example): string {
  return example ?? "";
}
