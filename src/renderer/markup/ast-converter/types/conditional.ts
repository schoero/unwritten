import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode, createListNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedConditionalTypeInline,
  ConvertedConditionalTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


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
    [
      spaceBetween(
        translate("checkType"),
        inlineCheckType
      ),
      multilineCheckType ?? ""
    ],
    [
      spaceBetween(
        translate("extendsType"),
        inlineExtendsType
      ),
      multilineExtendsType ?? ""
    ],
    [
      spaceBetween(
        translate("trueType"),
        inlineTrueType
      ),
      multilineTrueType ?? ""
    ],
    [
      spaceBetween(
        translate("falseType"),
        inlineFalseType
      ),
      multilineFalseType ?? ""
    ]
  );

}
