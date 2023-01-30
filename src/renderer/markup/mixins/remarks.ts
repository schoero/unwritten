import type { MarkupRenderer, RenderedRemarks } from "../types/renderer.js";

import type { Remarks } from "unwritten:compiler/type-definitions/mixins.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderRemarks(ctx: RenderContext<MarkupRenderer>, remarks: Remarks): RenderedRemarks {
  return remarks;
}
