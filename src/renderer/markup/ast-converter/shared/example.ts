import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { Example } from "unwritten:interpreter:type-definitions/shared.js";
import type { ConvertedExample } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertExample(ctx: MarkupRenderContexts, example: Example): ConvertedExample {

  const translate = getTranslator(ctx);

  return example
    ? createTitleNode(
      translate("example", { capitalize: true, count: 1 }),
      createParagraphNode(example)
    )
    : "";
}
