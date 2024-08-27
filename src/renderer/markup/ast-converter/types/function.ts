import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertSignatureEntityForType } from "unwritten:renderer:markup/ast-converter/entities/index";
import { createLinkNode, createListNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedFunctionTypeInline,
  ConvertedFunctionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertFunctionTypeInline(
  ctx: MarkupRenderContext,
  functionType: FunctionType
): ConvertedFunctionTypeInline {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    translate("function", { count: 1 }),
    renderConfig.typeEncapsulation
  );
  return ctx.config.externalTypes[TypeKind.Function]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Function])
    : encapsulatedType;

}

export function convertFunctionTypeMultiline(ctx: MarkupRenderContext, functionType: FunctionType): ConvertedFunctionTypeMultiline {

  const convertedSignatures = functionType.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );

  return convertedSignatures.length === 1
    ? convertedSignatures[0]
    : createListNode(...convertedSignatures);

}
