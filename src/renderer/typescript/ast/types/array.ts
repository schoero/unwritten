import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { renderType } from "unwritten:renderer/typescript/ast/index.js";

import type { ArrayType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderArrayType(ctx: TypeScriptRenderContext, arrayType: ArrayType): string {

  const renderedType = renderType(ctx, arrayType.type);
  const needsParentheses = arrayType.type.kind === TypeKind.Union || arrayType.type.kind === TypeKind.Intersection;
  const renderedTypeWithParentheses = needsParentheses
    ? `(${renderedType})`
    : renderedType;

  return `${renderedTypeWithParentheses}[]`;

}
