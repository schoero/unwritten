import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode, createListNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import { assert } from "unwritten:utils/general.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedMappedTypeInline,
  ConvertedMappedTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertMappedTypeInline(ctx: MarkupRenderContexts, mappedType: MappedType): ConvertedMappedTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "mapped",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Mapped]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Mapped])
    : encapsulatedType;

}


export function convertMappedTypeMultiline(ctx: MarkupRenderContexts, mappedType: MappedType): ConvertedMappedTypeMultiline {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const readonly = mappedType.readonly === true
    ? encapsulate(translate("readonly"), renderConfig.tagEncapsulation)
    : "";

  const optional = mappedType.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  assert(mappedType.typeParameter, "Mapped type must have a type parameter");
  assert(mappedType.typeParameter.constraint, "Mapped type must have a type parameter");
  assert(mappedType.valueType, "Mapped type must have a value type");

  const { inlineType: inlineKeyType, multilineType: multilineKeyType } = convertType(ctx, mappedType.typeParameter.constraint);
  const { inlineType: inlineValueType, multilineType: multilineValueType } = convertType(ctx, mappedType.valueType);

  return createListNode(
    [
      spaceBetween(
        translate("keyType"),
        inlineKeyType,
        readonly
      ),
      multilineKeyType ?? ""
    ],
    [
      spaceBetween(
        translate("valueType"),
        inlineValueType,
        optional
      ),
      multilineValueType ?? ""
    ]
  );

}
