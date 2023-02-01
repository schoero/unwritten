import type { MarkupRenderContext, RenderedRemarks } from "../types/renderer.js";

import type { Remarks } from "unwritten:compiler:type-definitions/mixins.js";


export function renderRemarks(ctx: MarkupRenderContext, remarks: Remarks): RenderedRemarks {
  return remarks;
}
