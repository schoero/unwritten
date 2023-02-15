import type { MarkupRenderContext } from "../types-definitions/markup.js";

import type { Remarks } from "unwritten:compiler/type-definitions/shared.js";


export function renderRemarks(ctx: MarkupRenderContext, remarks: Remarks): string {
  return remarks ?? "";
}
