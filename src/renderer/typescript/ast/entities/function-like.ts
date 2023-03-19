import { renderJSDoc } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { renderSignatureEntity } from "unwritten:renderer:typescript/ast/entities/signature.js";
import { renderSemicolon } from "unwritten:renderer:typescript/utils/keywords.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import type { FunctionLikeEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderFunctionLikeEntity(ctx: TypeScriptRenderContext, functionLikeEntity: FunctionLikeEntities): string {

  const renderConfig = getRenderConfig(ctx);

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = `${renderConfig.newLine}${renderConfig.newLine}`;
  const renderedIndentation = renderIndentation(ctx);
  const renderedSemicolon = renderSemicolon(ctx);

  const renderedSignatures = functionLikeEntity.signatures.map(
    signature => {

      const renderedJSDoc = renderJSDoc(ctx, signature);
      const renderedSignature = `${renderedIndentation}${renderSignatureEntity(ctx, signature)}${renderedSemicolon}`;

      return [
        renderedJSDoc,
        renderedSignature
      ].filter(line => line)
        .join(renderedNewLine);

    }
  ).join(renderedEmptyLine);

  return renderedSignatures;

}
