import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedArrayTypeInline,
  ConvertedArrayTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertArrayTypeInline(ctx: MarkupRenderContext, arrayType: ArrayType): ConvertedArrayTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "Array",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Array]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Array])
    : encapsulatedType;

}


export function convertArrayTypeMultiline(ctx: MarkupRenderContext, arrayType: ArrayType): ConvertedArrayTypeMultiline {

  const { inlineType, multilineType } = convertType(ctx, arrayType.type);

  return createListNode(
    createMultilineNode(
      inlineType,
      multilineType
    )
  );

}
