import { TypeKind } from "unwritten:compiler:enums/types.js";
import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { ArrayType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedArrayType } from "unwritten:renderer:markup/types/renderer.js";


export function renderArrayType(ctx: MarkupRenderContext, arrayType: ArrayType): RenderedArrayType {

  const renderedType = renderType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;
  const renderedTypeWithParentheses = needsParentheses ? `(${renderedType})` : renderedType;
  const renderedTypeWithArrayBrackets = `${renderedTypeWithParentheses}[]`;

  return renderedTypeWithArrayBrackets;

}
