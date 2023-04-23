import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { Remarks } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedRemarks } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertRemarks(ctx: MarkupRenderContexts, remarks: Remarks): ConvertedRemarks {
  return remarks
    ? createTitleNode(
      "Remarks",
      createParagraphNode(remarks)
    )
    : "";
}
