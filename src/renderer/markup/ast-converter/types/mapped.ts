import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { assert } from "unwritten:utils/general";

import type { MappedType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedMappedTypeInline,
  ConvertedMappedTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertMappedTypeInline(ctx: MarkupRenderContext, mappedType: MappedType): ConvertedMappedTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "mapped",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Mapped]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Mapped])
    : encapsulatedType;

}


export function convertMappedTypeMultiline(ctx: MarkupRenderContext, mappedType: MappedType): ConvertedMappedTypeMultiline {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const readonly = mappedType.readonly === true &&
    encapsulate(translate("readonly"), renderConfig.tagEncapsulation);

  const optional = mappedType.optional === true &&
    encapsulate(translate("optional"), renderConfig.tagEncapsulation);

  assert(mappedType.typeParameter, "Mapped type must have a type parameter");
  assert(mappedType.typeParameter.constraint, "Mapped type must have a type parameter");
  assert(mappedType.valueType, "Mapped type must have a value type");

  const { inlineType: inlineKeyType, multilineType: multilineKeyType } = convertType(ctx, mappedType.typeParameter.constraint);
  const { inlineType: inlineValueType, multilineType: multilineValueType } = convertType(ctx, mappedType.valueType);

  return createListNode(
    createMultilineNode(
      spaceBetween(
        translate("keyType"),
        inlineKeyType,
        readonly
      ),
      multilineKeyType
    ),
    createMultilineNode(
      spaceBetween(
        translate("valueType"),
        inlineValueType,
        optional
      ),
      multilineValueType
    )
  );

}
