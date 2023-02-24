import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { renderSignatureEntity } from "unwritten:renderer/typescript/ast/entities/signature.js";
import { renderExportKeyword } from "unwritten:renderer/typescript/utils/keywords.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderFunctionLikeEntity(ctx: TypeScriptRenderContext, functionLikeEntity: FunctionLikeEntities): string {

  const renderConfig = getRenderConfig(ctx);
  const renderedExportKeyword = renderExportKeyword(ctx);

  const renderedSignatures = functionLikeEntity.signatures.map(
    signature => renderSignatureEntity(ctx, signature)
  ).join(renderConfig.newLine);

  return `${renderedExportKeyword}${renderedSignatures}`;

}
