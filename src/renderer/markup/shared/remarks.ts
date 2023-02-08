import type { MarkupRenderContext, RenderedRemarks } from "../types-definitions/renderer.js";

import type { Remarks } from "unwritten:compiler/type-definitions/shared.js";


export function renderRemarks(ctx: MarkupRenderContext, remarks: Remarks): RenderedRemarks {
  return remarks;
}
