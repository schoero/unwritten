import { renderSignatureEntity } from "unwritten:renderer/typescript/ast/entities/index.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { FunctionType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderFunctionType(ctx: TypeScriptRenderContext, functionType: FunctionType): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);

  return functionType.signatures.map(
    signature =>
      `${renderedIndentation}${renderSignatureEntity(ctx, signature)}`
  ).join(renderedNewLine);

}
