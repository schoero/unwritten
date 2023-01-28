import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";

import type { ArrayType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedArrayType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderArrayType(ctx: RenderContext<MarkupRenderer>, arrayType: ArrayType): RenderedArrayType {

  const renderedType = renderType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;
  const renderedTypeWithParentheses = needsParentheses ? `(${renderedType})` : renderedType;
  const renderedTypeWithArrayBrackets = `${renderedTypeWithParentheses}[]`;

  return renderedTypeWithArrayBrackets;

}
