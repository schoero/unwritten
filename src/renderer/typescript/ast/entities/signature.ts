import { renderParameterEntities } from "unwritten:renderer/typescript/ast/entities/parameter.js";
import { renderType } from "unwritten:renderer/typescript/ast/index.js";
import { renderSemicolon } from "unwritten:renderer/typescript/utils/keywords.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderSignatureEntity(ctx: TypeScriptRenderContext, signatureEntity: SignatureEntity): string {

  const signatureName = signatureEntity.name ?? "";

  const renderedIndentation = renderIndentation(ctx);
  const renderedSemicolon = renderSemicolon(ctx);
  const renderedParameters = renderParameterEntities(ctx, signatureEntity.parameters);
  const renderedReturnType = renderType(ctx, signatureEntity.returnType);

  return `${renderedIndentation}${signatureName}(${renderedParameters}): ${renderedReturnType}${renderedSemicolon}`;

}
