import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedConditionalTypeInline,
  ConvertedConditionalTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertConditionalTypeInline(ctx: MarkupRenderContexts, conditionalType: ConditionalType): ConvertedConditionalTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "conditional",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Conditional]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Conditional])
    : encapsulatedType;

}


export function convertConditionalTypeMultiline(ctx: MarkupRenderContexts, conditionalType: ConditionalType): ConvertedConditionalTypeMultiline {

  const translate = getTranslator(ctx);

  const { inlineType: inlineCheckType, multilineType: multilineCheckType } = convertType(ctx, conditionalType.checkType);
  const { inlineType: inlineExtendsType, multilineType: multilineExtendsType } = convertType(ctx, conditionalType.extendsType);
  const { inlineType: inlineTrueType, multilineType: multilineTrueType } = convertType(ctx, conditionalType.trueType);
  const { inlineType: inlineFalseType, multilineType: multilineFalseType } = convertType(ctx, conditionalType.falseType);

  return createListNode(
    createMultilineNode(
      spaceBetween(
        translate("checkType"),
        inlineCheckType
      ),
      multilineCheckType
    ),
    createMultilineNode(
      spaceBetween(
        translate("extendsType"),
        inlineExtendsType
      ),
      multilineExtendsType
    ),
    createMultilineNode(
      spaceBetween(
        translate("trueType"),
        inlineTrueType
      ),
      multilineTrueType
    ),
    createMultilineNode(
      spaceBetween(
        translate("falseType"),
        inlineFalseType
      ),
      multilineFalseType
    )
  );

}
