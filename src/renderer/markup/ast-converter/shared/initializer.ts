import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { createInlineTitleNode } from "unwritten:renderer/markup/utils/nodes";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";
import { getTranslator } from "unwritten:renderer/markup/utils/translations";
import { isMultilineType } from "unwritten:renderer/markup/utils/types";

import type { Type } from "unwritten:interpreter/type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";


export function convertInitializerForType(ctx: MarkupRenderContext, type: Type) {

  const translate = getTranslator(ctx);

  const { inlineType, multilineType } = convertType(ctx, type);

  const inlineInitializer = !isMultilineType(type) || !multilineType
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      inlineType
    )
    : undefined;

  const title = translate("default", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  const multilineInitializer = isMultilineType(type) && multilineType
    ? createInlineTitleNode(
      title,
      anchor,
      inlineType,
      multilineType
    )
    : undefined;

  return {
    inlineInitializer,
    multilineInitializer
  };

}
