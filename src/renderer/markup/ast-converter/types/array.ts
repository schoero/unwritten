import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";

import type { ArrayType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedArrayTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertArrayTypeInline(ctx: MarkupRenderContexts, arrayType: ArrayType): ConvertedArrayTypeInline {

  const { inlineType } = convertType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;

  return needsParentheses
    ? [
      "(" as const,
      inlineType,
      ")" as const,
      "[]" as const
    ]
    : [
      inlineType,
      "[]" as const
    ];

}
