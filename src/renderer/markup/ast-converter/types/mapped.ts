import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { convertTypeLiteralTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import { isTypeLiteralType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedMappedTypeInline,
  ConvertedMappedTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertMappedTypeInline(ctx: MarkupRenderContexts, mappedType: MappedType): ConvertedMappedTypeInline {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    translate("tuple", { count: 1 }),
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Mapped]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Mapped])
    : encapsulatedType;

}


export function convertMappedTypeMultiline(ctx: MarkupRenderContexts, mappedType: MappedType): ConvertedMappedTypeMultiline {

  if(isTypeLiteralType(mappedType.type)){
    return convertTypeLiteralTypeMultiline(ctx, mappedType.type);
  }

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const readonly = mappedType.readonly === true
    ? encapsulate(translate("readonly"), renderConfig.tagEncapsulation)
    : "";

  const optional = mappedType.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  assert(mappedType.typeParameter, "Mapped type must have a type parameter");
  assert(mappedType.valueType, "Mapped type must have a value type");

  const { inlineType, multilineType } = convertType(ctx, mappedType.valueType);

  return [
    spaceBetween(
      inlineType,
      spaceBetween(readonly, optional)
    ),
    multilineType ?? ""
  ];

}
