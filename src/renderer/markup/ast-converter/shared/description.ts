import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { Description } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedDescription } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertDescription(ctx: MarkupRenderContexts, description: Description): ConvertedDescription {
  return description
    ? createTitleNode(
      "Description",
      createParagraphNode(description)
    )
    : "";
}
