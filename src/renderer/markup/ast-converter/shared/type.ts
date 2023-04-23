import { createParagraphNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { Types } from "unwritten:interpreter/type-definitions/types.js";
import type { ConvertedTypes } from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertType(ctx: MarkupRenderContexts, type: Types): ConvertedTypes {

  const t = getTranslator(ctx);

  const convertedType = convertType(ctx, type);

  return convertedType
    ? createTitleNode(
      t("type"),
      createParagraphNode(convertedType)
    )
    : "";
}
