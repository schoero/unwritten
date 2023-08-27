import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { createInlineTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { isMultilineType } from "unwritten:renderer/markup/utils/types.js";

import type { Type } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function convertInitializerForType(ctx: MarkupRenderContexts, type: Type) {

  const translate = getTranslator(ctx);

  const { inlineType, multilineType } = convertType(ctx, type);

  const inlineInitializer = !isMultilineType(type) || !multilineType
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      inlineType
    )
    : undefined;

  const multilineInitializer = isMultilineType(type) && multilineType
    ? createInlineTitleNode(
      translate("default", { capitalize: true }),
      inlineType,
      multilineType
    )
    : undefined;

  return {
    inlineInitializer,
    multilineInitializer
  };

}