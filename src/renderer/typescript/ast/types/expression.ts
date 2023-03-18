import { renderType } from "unwritten:renderer/typescript/ast/index.js";

import type { ExpressionType } from "unwritten:interpreter/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderExpressionType(ctx: TypeScriptRenderContext, expressionType: ExpressionType): string {
  return renderType(ctx, expressionType.staticType);
}
