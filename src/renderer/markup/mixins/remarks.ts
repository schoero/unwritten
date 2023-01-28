import type { MarkupRenderer, RenderedRemarks } from "../types/renderer.js";

import type { Remarks } from "quickdoks:compiler/type-definitions/mixins.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderRemarks(ctx: RenderContext<MarkupRenderer>, remarks: Remarks): RenderedRemarks {
  return remarks;
}
