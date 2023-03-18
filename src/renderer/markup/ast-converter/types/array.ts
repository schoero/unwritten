import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedArrayType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertArrayType(ctx: MarkupRenderContexts, arrayType: ArrayType): ConvertedArrayType {

  const renderedType = convertType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;

  return needsParentheses
    ? [
      "(" as const,
      renderedType,
      ")" as const,
      "[]" as const
    ]
    : [
      renderedType,
      "[]" as const
    ];

}
