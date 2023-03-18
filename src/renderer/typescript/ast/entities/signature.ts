import { renderParameterEntities } from "unwritten:renderer/typescript/ast/entities/parameter.js";
import { renderType } from "unwritten:renderer/typescript/ast/index.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderSignatureEntity(ctx: TypeScriptRenderContext, signatureEntity: SignatureEntity): string {

  const renderedModifiers = signatureEntity.modifiers?.map(
    modifier => modifier
  ).join(" ") ?? "";

  const renderedSignatureName = signatureEntity.name ?? "";
  const renderedParameters = signatureEntity.parameters
    ? renderParameterEntities(ctx, signatureEntity.parameters)
    : "";
  const renderedReturnType = renderType(ctx, signatureEntity.returnType);

  return `${renderedModifiers}${renderedSignatureName}(${renderedParameters}): ${renderedReturnType}`;

}
