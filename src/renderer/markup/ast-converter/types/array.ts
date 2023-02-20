import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { createWrapperNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { ArrayType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedArrayType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertArrayType(ctx: MarkupRenderContexts, arrayType: ArrayType): ConvertedArrayType {

  const renderedType = convertType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;

  return needsParentheses
    ? createWrapperNode(
      "(" as const,
      renderedType,
      ")" as const,
      "[]" as const
    )
    : createWrapperNode(
      renderedType,
      "[]" as const
    );

}
