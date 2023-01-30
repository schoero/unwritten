import { TypeKind } from "unwritten:compiler/enums/types.js";
import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { ArrayType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedArrayType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderArrayType(ctx: RenderContext<MarkupRenderer>, arrayType: ArrayType): RenderedArrayType {

  const renderedType = renderType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;
  const renderedTypeWithParentheses = needsParentheses ? `(${renderedType})` : renderedType;
  const renderedTypeWithArrayBrackets = `${renderedTypeWithParentheses}[]`;

  return renderedTypeWithArrayBrackets;

}
