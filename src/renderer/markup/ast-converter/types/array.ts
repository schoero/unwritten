import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedArrayTypeInline,
  ConvertedArrayTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertArrayTypeInline(ctx: MarkupRenderContexts, arrayType: ArrayType): ConvertedArrayTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "Array",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Array]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Array])
    : encapsulatedType;

}


export function convertArrayTypeMultiline(ctx: MarkupRenderContexts, arrayType: ArrayType): ConvertedArrayTypeMultiline {

  const { inlineType, multilineType } = convertType(ctx, arrayType.type);

  return createListNode(
    createMultilineNode(
      inlineType,
      multilineType
    )
  );

}
