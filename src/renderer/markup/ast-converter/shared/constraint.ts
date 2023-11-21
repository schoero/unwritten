import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { createInlineTitleNode, createParagraphNode } from "unwritten:renderer/markup/utils/nodes";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";
import { getTranslator } from "unwritten:renderer/markup/utils/translations";
import { isMultilineType } from "unwritten:renderer/markup/utils/types";

import type { Type } from "unwritten:interpreter/type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";


export function convertConstraintForType(ctx: MarkupRenderContext, type: Type) {

  const translate = getTranslator(ctx);

  const { inlineType, multilineType } = convertType(ctx, type);

  const inlineConstraint = !isMultilineType(type) || !multilineType
    ? createParagraphNode(
      spaceBetween(
        `${translate("constraint", { capitalize: true })}:`,
        inlineType
      )
    )
    : undefined;

  const title = translate("constraint", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  const multilineConstraint = isMultilineType(type) && multilineType
    ? createInlineTitleNode(
      title,
      anchor,
      inlineType,
      multilineType
    )
    : undefined;

  return {
    inlineConstraint,
    multilineConstraint
  };

}
