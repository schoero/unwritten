import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { convertSignatureEntityForType } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createLinkNode, createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedFunctionTypeInline,
  ConvertedFunctionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionTypeMultiline(ctx: MarkupRenderContexts, functionType: FunctionType): ConvertedFunctionTypeMultiline {

  const convertedSignatures = functionType.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );

  return convertedSignatures.length === 1
    ? convertedSignatures[0]
    : createListNode(...convertedSignatures);

}

export function convertFunctionTypeInline(
  ctx: MarkupRenderContexts,
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
