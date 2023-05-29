import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { Description } from "unwritten:interpreter:type-definitions/shared.js";
import type {
  ConvertedDescriptionForDocumentation,
  ConvertedDescriptionForType
} from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertDescriptionForDocumentation(ctx: MarkupRenderContexts, description: Description): ConvertedDescriptionForDocumentation {

  const t = getTranslator(ctx);

  return description
    ? createTitleNode(
      t("description", { capitalize: true, count: 1 }),
      createParagraphNode(description)
    )
    : "";
}


export function convertDescriptionForType(ctx: MarkupRenderContexts, description: Description): ConvertedDescriptionForType {
  return description ?? "";
}
