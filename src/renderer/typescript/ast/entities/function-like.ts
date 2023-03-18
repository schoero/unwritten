import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { renderSignatureEntity } from "unwritten:renderer:typescript/ast/entities/signature.js";
import { renderSemicolon } from "unwritten:renderer:typescript/utils/keywords.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import type { FunctionLikeEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderFunctionLikeEntity(ctx: TypeScriptRenderContext, functionLikeEntity: FunctionLikeEntities): string {

  const renderConfig = getRenderConfig(ctx);
  const renderedIndentation = renderIndentation(ctx);
  const renderedSemicolon = renderSemicolon(ctx);

  const renderedSignatures = functionLikeEntity.signatures.map(
    signature =>
      `${renderedIndentation}${renderSignatureEntity(ctx, signature)}${renderedSemicolon}`
  ).join(renderConfig.newLine);

  return renderedSignatures;

}
